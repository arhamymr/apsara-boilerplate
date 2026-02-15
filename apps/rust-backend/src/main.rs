use actix_web::{get, post, HttpResponse, Responder, App, HttpServer, web};
use actix_cors::Cors;
use actix_web::http::header;
use actix_web_httpauth::middleware::HttpAuthentication;

mod config;
mod auth;
mod middleware;
mod routes;
mod lib;

#[get("/")]
async fn hello() -> impl Responder {
    HttpResponse::Ok().body("this is the rust backend")
}

#[post("/echo")]
async fn echo(req_body: String) -> impl Responder {
    HttpResponse::Ok().body(req_body)
}

async fn manual_hello() -> impl Responder {
    HttpResponse::Ok().body("Hey there!")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let cfg = config::get_config();

    HttpServer::new(move || {
        let cors = Cors::default()
            .allowed_origin(&cfg.cors_allowed_origin)
            .allowed_methods(vec!["GET", "POST", "PUT", "DELETE", "OPTIONS"])
            .allowed_headers(vec![header::AUTHORIZATION, header::CONTENT_TYPE])
            .supports_credentials();

        let bearer = HttpAuthentication::bearer(middleware::auth::validator);

        App::new()
            .wrap(cors)
            .service(
                web::scope("/api")
                    // Public auth endpoints
                    .service(
                        web::scope("/auth")
                            .service(routes::auth::login)
                            .service(routes::auth::refresh)
                            .service(routes::auth::logout),
                    )
                    // Protected endpoints under /api/** (including /api/me)
                    .service(
                        web::scope("")
                            .wrap(bearer)
                            .service(routes::auth::me)
                            .service(routes::protected::health),
                    ),
            )
            .service(hello)
            .service(echo)
            .route("/manual_hello", web::get().to(manual_hello))
    })
    .bind(("127.0.0.1", cfg.server_port))?
    .run()
    .await
}
