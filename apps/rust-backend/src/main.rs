use actix_web::{
    middleware::Logger,
    dev::{Service as _}, 
};
use futures_util::future::FutureExt;

mod handlers;
mod middleware;

use crate::handlers::{auth, users};

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    use actix_web::{App, HttpServer}; 

    HttpServer::new(|| {
        App::new()
            // this middleware example in rust 
            .wrap_fn(|req, srv| {
                println!("Incoming request: {} {}", req.method(), req.path());
                srv.call(req).map(|res| {
                    println!("Hi from response middleware!");
                    res
                })
            }) 

            

            // Authentication and user management handlers
            .service(auth::register)
            .service(auth::login)
            .service(auth::refresh)
            .service(auth::logout)
            .service(auth::logout_all)
            .service(users::get_me)
            .service(users::update_me)

            // Another api
    })
    .bind(("127.0.0.1", 4444))?
    .run()
    .await

}