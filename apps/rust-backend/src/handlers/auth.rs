use actix_web::{post, HttpResponse, Responder};

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

#[post("/api/v1/auth/register")]
pub async fn register() -> impl Responder {
    HttpResponse::Ok().body("User registered successfully")
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
