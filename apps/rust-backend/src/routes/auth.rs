use actix_web::{get, post, web, HttpRequest, HttpResponse, Responder};
use actix_web::web::ReqData;
use serde::Deserialize;
use serde_json::json;

use crate::auth::claims::AuthenticatedUser;
use crate::auth::refresh::{issue_refresh_token, rotate_refresh_token, verify_refresh_token};
use crate::auth::token::issue_access_token;
use crate::config::get_config;
use crate::lib::cookies::{clear_refresh_cookie, set_refresh_cookie};

#[derive(Debug, Deserialize)]
pub struct LoginPayload {
    pub user_id: String,
    #[serde(default)]
    pub roles: Vec<String>,
}

#[post("/login")]
pub async fn login(payload: web::Json<LoginPayload>) -> impl Responder {
    let cfg = get_config();
    let access = match issue_access_token(&payload.user_id, &payload.roles) {
        Ok(t) => t,
        Err(_) => return HttpResponse::InternalServerError().finish(),
    };
    let refresh = match issue_refresh_token(&payload.user_id) {
        Ok(t) => t,
        Err(_) => return HttpResponse::InternalServerError().finish(),
    };

    let expires_at = time::OffsetDateTime::now_utc() + time::Duration::minutes(cfg.access_ttl_min);

    let mut resp = HttpResponse::Ok().json(json!({
        "token_type": "Bearer",
        "access_token": access,
        "expires_at": expires_at.unix_timestamp(),
        "user": {
            "id": payload.user_id,
            "roles": payload.roles,
        }
    }));

    set_refresh_cookie(&mut resp, &refresh);
    resp
}

#[post("/refresh")]
pub async fn refresh(req: HttpRequest) -> impl Responder {
    let cfg = get_config();
    let cookie_name = cfg.refresh_cookie_name.clone();

    let cookie = match req.cookie(&cookie_name) {
        Some(c) => c,
        None => return HttpResponse::Unauthorized().finish(),
    };

    // verify and rotate refresh token
    let (new_refresh, claims) = match rotate_refresh_token(cookie.value()) {
        Ok(tuple) => tuple,
        Err(_) => return HttpResponse::Unauthorized().finish(),
    };

    // issue fresh access token; roles are not encoded in refresh, so caller gets empty roles by default
    let access = match issue_access_token(&claims.sub, &Vec::new()) {
        Ok(t) => t,
        Err(_) => return HttpResponse::InternalServerError().finish(),
    };

    let expires_at = time::OffsetDateTime::now_utc() + time::Duration::minutes(cfg.access_ttl_min);

    let mut resp = HttpResponse::Ok().json(json!({
        "token_type": "Bearer",
        "access_token": access,
        "expires_at": expires_at.unix_timestamp(),
    }));

    set_refresh_cookie(&mut resp, &new_refresh);
    resp
}

#[post("/logout")]
pub async fn logout() -> impl Responder {
    let mut resp = HttpResponse::Ok().finish();
    clear_refresh_cookie(&mut resp);
    resp
}

#[get("/me")]
pub async fn me(user: ReqData<AuthenticatedUser>) -> impl Responder {
    let user = user.into_inner();
    HttpResponse::Ok().json(json!({
        "user": {
            "id": user.user_id,
            "roles": user.roles,
        },
        "exp": user.exp,
        "jti": user.jti
    }))
}
