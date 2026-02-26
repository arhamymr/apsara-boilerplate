use actix_web::{web, post, HttpResponse, Responder, Result};
use serde::{Deserialize, Serialize};
use sea_orm::DatabaseConnection;

use validator::Validate;

use crate::utils::errors::CustomError;

// POST /api/v1/auth/register
// request example 
// {
//      "username": "john_doe",
//      "email": "john@example.com"
//      "password": "securepassword123"
//      "name": "John Doe"
// }
// response example
// {
//      "message": "User registered successfully",
// }

#[derive(Deserialize, Debug, Serialize, Validate)]
struct RegisterRequest {
    #[validate(length(min = 3, max = 50))]
    username: String,

    #[validate(email)]
    email: String,

    
    password: String,
    name: String,
}

#[post("/api/v1/auth/register")]
pub async fn register(data: web::Json<RegisterRequest>, db: web::Data<DatabaseConnection>) -> Result<impl Responder> {
    data.validate().map_err(CustomError::Validation)?;
    
    println!("Registering user: {:?}", data);

    Ok(web::Json(serde_json::json!({
        "message": "User registered successfully"
    })))
}

// Test for register handler

#[cfg(test)]
mod tests {
    use super::*;
    use actix_web::{test, App};

    #[actix_web::test]
    async fn test_register() {
        let app = test::init_service(App::new().service(register)).await;
        let req = test::TestRequest::post()
            .uri("/api/v1/auth/register")
            .to_request();
        let resp = test::call_service(&app, req).await;
        assert!(resp.status().is_success());
    }
}


// POST /api/v1/auth/login
// request example
// {
//      "email": "
//      "password": "securepassword123"
// }
// response example
// {
//      "message": "User logged in successfully",
//      "token": "eyJhbGciOi(...) paseto token ",
//      "expires_in": 3600
// }

#[post("/api/v1/auth/login")]
pub async fn login() -> impl Responder {
    HttpResponse::Ok().body("User logged in successfully")
}

// POST /api/v1/auth/refresh
// refresh token get from cookie and return new access token
// response example
// {
//      "message": "Token refreshed successfully",
//      "token": "eyJhbGciOi(...) paseto token ",
//      "expires_in": 3600
// }

#[post("/api/v1/auth/refresh")]
pub async fn refresh() -> impl Responder {
    HttpResponse::Ok().body("Token refreshed successfully")
}


// POST /api/v1/auth/logout 
// Flow 
// Get refresh token from cookie and invalidate it
// Mark as revoked in db
// Clear cookie
// response example
// {
//      "message": "User logged out successfully"
// }

#[post("/api/v1/auth/logout")]
pub async fn logout() -> impl Responder {
    HttpResponse::Ok().body("User logged out successfully")
}


// POST /api/v1/auth/logout_all
// implement later 

#[post("/api/v1/auth/logout_all")]
pub async fn logout_all() -> impl Responder {
    HttpResponse::Ok().body("User logged out from all devices successfully")
}
