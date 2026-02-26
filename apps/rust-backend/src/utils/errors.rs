
use actix_web::{HttpResponse,ResponseError};
use validator::ValidationErrors;
use thiserror::Error;
use sea_orm::DbErr;

#[derive(Debug, Error)]
pub enum CustomError {
    #[error("validation error")]
    Validation(ValidationErrors),

    #[error("database error")]
    Database(DbErr),

    #[error("internal server error")]
    Internal(String)
}

impl ResponseError for CustomError {
    fn error_response(&self) -> HttpResponse {
        match self {
            CustomError::Validation(e) => {
                HttpResponse::BadRequest().json(serde_json::json!({
                    "status": "error",
                    "message": "Validation failed",
                    "errors": e,
                }))
            }

            CustomError::Database(e) => {
                HttpResponse::InternalServerError().json(serde_json::json!({
                    "status": "error",
                    "message": "Database error",
                    "details": e.to_string()
                }))
            }

            CustomError::Internal(msg) => {
                HttpResponse::InternalServerError().json(serde_json::json!({
                    "status": "error",
                    "message": msg,
                }))
            }
        }
    }
}