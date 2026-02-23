use actix_web::{
    middleware::{Logger},
};
use env_logger::Env;

mod handlers;
mod middlewares;

use crate::handlers::{auth, users};

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    use actix_web::{App, HttpServer}; 
    // Initialize logger
    env_logger::init_from_env(Env::default().default_filter_or("info"));

    // Intialize database connection using sea-orm and run migrations using refinery

    



    HttpServer::new(|| {
        App::new()
            .wrap(Logger::default())
            .wrap(Logger::new("%a %{User-Agent}i"))

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