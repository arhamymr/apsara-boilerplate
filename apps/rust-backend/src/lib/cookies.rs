use actix_web::http::header::{HeaderValue, SET_COOKIE};
use actix_web::HttpResponse;
use cookie::{Cookie, SameSite};

use crate::config::get_config;

pub fn set_refresh_cookie(resp: &mut HttpResponse, token: &str) {
    let cfg = get_config();
    let mut cookie = Cookie::build(cfg.refresh_cookie_name.clone(), token.to_string())
        .path(cfg.cookie_path.clone())
        .http_only(true)
        .secure(cfg.cookie_secure)
        .same_site(SameSite::Lax)
        .domain(cfg.cookie_domain.clone())
        .finish();

    resp.headers_mut().append(
        SET_COOKIE,
        HeaderValue::from_str(&cookie.to_string()).expect("valid cookie"),
    );
}

pub fn clear_refresh_cookie(resp: &mut HttpResponse) {
    let cfg = get_config();
    let mut cookie = Cookie::build(cfg.refresh_cookie_name.clone(), "")
        .path(cfg.cookie_path.clone())
        .http_only(true)
        .secure(cfg.cookie_secure)
        .same_site(SameSite::Lax)
        .domain(cfg.cookie_domain.clone())
        .max_age(time::Duration::seconds(-1))
        .finish();

    resp.headers_mut().append(
        SET_COOKIE,
        HeaderValue::from_str(&cookie.to_string()).expect("valid cookie"),
    );
}
