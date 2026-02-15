use crate::auth::claims::AuthenticatedUser;
use crate::auth::error::{AuthError, AuthResult};
use crate::config::get_config;

use pasetors::claims::{Claims, ClaimsValidationRules};
use pasetors::keys::{AsymmetricPublicKey, AsymmetricSecretKey};
use pasetors::public::{self, Public, version4::V4};
use pasetors::token::{TrustedToken, UntrustedToken};
use serde_json::json;
use std::convert::TryFrom;
use time::OffsetDateTime;

pub fn issue_access_token(sub: &str, roles: &[String]) -> AuthResult<String> {
    let cfg = get_config();

    // Build registered and custom claims
    let mut claims = Claims::new().map_err(|e| AuthError::Internal(format!("claims new: {e}")))?;
    let now = OffsetDateTime::now_utc();
    let exp = now + time::Duration::minutes(cfg.access_ttl_min);
    claims
        .add_iat(now.unix_timestamp())
        .map_err(|e| AuthError::Internal(format!("add_iat: {e}")))?;
    claims
        .add_nbf(now.unix_timestamp())
        .map_err(|e| AuthError::Internal(format!("add_nbf: {e}")))?;
    claims
        .add_exp(exp.unix_timestamp())
        .map_err(|e| AuthError::Internal(format!("add_exp: {e}")))?;

    claims
        .add_additional("iss", json!(cfg.iss))
        .map_err(|e| AuthError::Internal(format!("add iss: {e}")))?;
    claims
        .add_additional("aud", json!(cfg.aud))
        .map_err(|e| AuthError::Internal(format!("add aud: {e}")))?;
    claims
        .add_additional("sub", json!(sub))
        .map_err(|e| AuthError::Internal(format!("add sub: {e}")))?;
    claims
        .add_additional("roles", json!(roles))
        .map_err(|e| AuthError::Internal(format!("add roles: {e}")))?;
    claims
        .add_additional("jti", json!(uuid::Uuid::new_v4().to_string()))
        .map_err(|e| AuthError::Internal(format!("add jti: {e}")))?;

    // Convert our Ed25519 secret key bytes into pasetors key
    let sk_bytes = cfg.signing_key.to_bytes();
    let sk = AsymmetricSecretKey::<V4>::try_from(sk_bytes.as_slice())
        .map_err(|e| AuthError::CryptoError(format!("secret key error: {e}")))?;

    // No footer/implicit assertion for now
    let token = public::sign(&sk, &claims, None, None)
        .map_err(|e| AuthError::CryptoError(format!("sign error: {e}")))?;

    Ok(token)
}

pub fn verify_access_token(token: &str) -> AuthResult<AuthenticatedUser> {
    let cfg = get_config();

    // Convert verifying key
    let pk_bytes = cfg.verifying_key.to_bytes();
    let pk = AsymmetricPublicKey::<V4>::try_from(pk_bytes.as_slice())
        .map_err(|e| AuthError::CryptoError(format!("public key error: {e}")))?;

    // Parse and verify
    let untrusted = UntrustedToken::<Public, V4>::try_from(token)
        .map_err(|_| AuthError::InvalidTokenFormat)?;

    let rules = ClaimsValidationRules::new();

    let trusted: TrustedToken = public::verify(&pk, &untrusted, &rules, None, None)
        .map_err(|_| AuthError::SignatureVerificationFailed)?;

    // Extract custom claims from payload
    let payload = trusted
        .payload_claims()
        .ok_or_else(|| AuthError::ClaimValidationFailed("missing payload".into()))?;

    // Validate iss/aud/sub/roles
    let iss = payload
        .get_claim("iss")
        .and_then(|v| v.as_str().map(|s| s.to_string()))
        .ok_or_else(|| AuthError::MissingClaim("iss".into()))?;
    if iss != cfg.iss {
        return Err(AuthError::ClaimValidationFailed("issuer mismatch".into()));
    }

    let aud = payload
        .get_claim("aud")
        .and_then(|v| v.as_str().map(|s| s.to_string()))
        .ok_or_else(|| AuthError::MissingClaim("aud".into()))?;
    if aud != cfg.aud {
        return Err(AuthError::ClaimValidationFailed("audience mismatch".into()));
    }

    let sub = payload
        .get_claim("sub")
        .and_then(|v| v.as_str().map(|s| s.to_string()))
        .ok_or_else(|| AuthError::MissingClaim("sub".into()))?;

    let roles: Vec<String> = payload
        .get_claim("roles")
        .and_then(|v| v.as_array().cloned())
        .unwrap_or_default()
        .into_iter()
        .filter_map(|v| v.as_str().map(|s| s.to_string()))
        .collect();

    let jti = payload
        .get_claim("jti")
        .and_then(|v| v.as_str().map(|s| s.to_string()))
        .unwrap_or_default();

    let exp = payload
        .get_claim("exp")
        .and_then(|v| v.as_i64())
        .ok_or_else(|| AuthError::MissingClaim("exp".into()))?;

    Ok(AuthenticatedUser { user_id: sub, roles, jti, exp })
}
