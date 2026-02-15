use crate::auth::claims::RefreshClaims;
use crate::auth::error::{AuthError, AuthResult};
use crate::config::get_config;

use pasetors::claims::{Claims, ClaimsValidationRules};
use pasetors::keys::SymmetricKey;
use pasetors::local::{self, Local, version4::V4};
use pasetors::token::{TrustedToken, UntrustedToken};
use serde_json::json;
use std::convert::TryFrom;
use time::{Duration, OffsetDateTime};

pub fn issue_refresh_token(sub: &str) -> AuthResult<String> {
    let cfg = get_config();

    // Build claims for refresh token
    let mut claims = Claims::new();
    let now = OffsetDateTime::now_utc();
    let exp = now + Duration::days(cfg.refresh_ttl_days);
    claims.add_iat(now.unix_timestamp());
    claims.add_exp(exp.unix_timestamp());

    // Minimal additional claims
    claims.add_additional("sub", json!(sub));
    claims.add_additional("jti", json!(uuid::Uuid::new_v4().to_string()));

    // Symmetric key
    let sk = SymmetricKey::<V4>::try_from(cfg.refresh_key.as_slice())
        .map_err(|e| AuthError::CryptoError(format!("refresh key error: {e}")))?;

    // Encrypt (no footer/implicit assertion)
    let token = local::encrypt(&sk, &claims, None, None)
        .map_err(|e| AuthError::CryptoError(format!("encrypt error: {e}")))?;

    Ok(token)
}

pub fn verify_refresh_token(token: &str) -> AuthResult<RefreshClaims> {
    let cfg = get_config();

    let sk = SymmetricKey::<V4>::try_from(cfg.refresh_key.as_slice())
        .map_err(|e| AuthError::CryptoError(format!("refresh key error: {e}")))?;

    let untrusted = UntrustedToken::<Local, V4>::try_from(token)
        .map_err(|_| AuthError::InvalidTokenFormat)?;

    let rules = ClaimsValidationRules::new();

    let trusted: TrustedToken<Local, V4> = local::decrypt(&sk, &untrusted, &rules, None)
        .map_err(|_| AuthError::RefreshTokenInvalid)?;

    let payload = trusted
        .payload_claims()
        .ok_or_else(|| AuthError::ClaimValidationFailed("missing payload".into()))?;

    let sub = payload
        .get_claim("sub")
        .and_then(|v| v.as_str().map(|s| s.to_string()))
        .ok_or_else(|| AuthError::MissingClaim("sub".into()))?;

    let jti = payload
        .get_claim("jti")
        .and_then(|v| v.as_str().map(|s| s.to_string()))
        .unwrap_or_default();

    let exp = payload
        .get_claim("exp")
        .and_then(|v| v.as_i64())
        .ok_or_else(|| AuthError::MissingClaim("exp".into()))?;

    let iat = payload
        .get_claim("iat")
        .and_then(|v| v.as_i64())
        .unwrap_or_default();

    Ok(RefreshClaims { sub, exp, iat, jti })
}

pub fn rotate_refresh_token(old_token: &str) -> AuthResult<(String, RefreshClaims)> {
    let old = verify_refresh_token(old_token)?;
    // Create new refresh token with same subject
    let new_token = issue_refresh_token(&old.sub)?;
    let new_claims = verify_refresh_token(&new_token)?;
    Ok((new_token, new_claims))
}
