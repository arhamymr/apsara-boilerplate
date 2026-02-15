use serde::{Deserialize, Serialize};
use time::{Duration, OffsetDateTime};
use uuid::Uuid;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AccessClaims {
    pub iss: String,
    pub aud: String,
    pub sub: String,
    pub exp: i64,
    pub iat: i64,
    pub nbf: i64,
    pub jti: String,
    pub roles: Vec<String>,
}

impl AccessClaims {
    pub fn new(iss: String, aud: String, sub: String, roles: Vec<String>, ttl_minutes: i64) -> Self {
        let now = OffsetDateTime::now_utc();
        let exp = now + Duration::minutes(ttl_minutes);
        Self {
            iss,
            aud,
            sub,
            exp: exp.unix_timestamp(),
            iat: now.unix_timestamp(),
            nbf: now.unix_timestamp(),
            jti: Uuid::new_v4().to_string(),
            roles,
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct RefreshClaims {
    pub sub: String,
    pub exp: i64,
    pub iat: i64,
    pub jti: String,
}

impl RefreshClaims {
    pub fn new(sub: String, ttl_days: i64) -> Self {
        let now = OffsetDateTime::now_utc();
        let exp = now + Duration::days(ttl_days);
        Self {
            sub,
            exp: exp.unix_timestamp(),
            iat: now.unix_timestamp(),
            jti: Uuid::new_v4().to_string(),
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AuthenticatedUser {
    pub user_id: String,
    pub roles: Vec<String>,
    pub jti: String,
    pub exp: i64,
}
