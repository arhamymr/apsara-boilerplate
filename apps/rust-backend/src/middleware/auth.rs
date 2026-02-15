use actix_web::{dev::ServiceRequest, Error};
use actix_web_httpauth::extractors::bearer::BearerAuth;

use crate::auth::token::verify_access_token;
use crate::auth::claims::AuthenticatedUser;

pub async fn validator(mut req: ServiceRequest, credentials: BearerAuth) -> Result<ServiceRequest, (Error, ServiceRequest)> {
    let token = credentials.token();
    match verify_access_token(token) {
        Ok(user) => {
            req.extensions_mut().insert::<AuthenticatedUser>(user);
            Ok(req)
        }
        Err(_e) => Err((actix_web::error::ErrorUnauthorized("invalid or expired token"), req)),
    }
}
