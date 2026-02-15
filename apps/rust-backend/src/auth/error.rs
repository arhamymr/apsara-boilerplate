use thiserror::Error;

#[derive(Debug, Error)]
pub enum AuthError {
    #[error("invalid token format")]
    InvalidTokenFormat,

    #[error("signature verification failed")]
    SignatureVerificationFailed,

    #[error("token expired")]
    TokenExpired,

    #[error("token not yet valid")]
    TokenNotYetValid,

    #[error("claim validation failed: {0}")]
    ClaimValidationFailed(String),

    #[error("missing claim: {0}")]
    MissingClaim(String),

    #[error("cryptography error: {0}")]
    CryptoError(String),

    #[error("refresh token invalid or expired")]
    RefreshTokenInvalid,

    #[error("internal error: {0}")]
    Internal(String),
}

pub type AuthResult<T> = Result<T, AuthError>;
