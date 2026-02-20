use actix_web::{
    get, 
    dev::{ServiceRequest, ServiceResponse }, 
    middleware::{from_fn, Next, Logger},  
    post, 
    HttpResponse, 
    Responder, 
    web,
    Error,
    body::MessageBody,
};
// use actix_cors::Cors;
// use actix_web::http::header;

#[get("/")]
async fn hello() -> impl Responder {
    HttpResponse::Ok().body("this is the rust backend edit")
}

#[post("/echo")]
async fn echo(req_body: String) -> impl Responder {
    HttpResponse::Ok().body(req_body)
}

async fn manual_hello() -> impl Responder {
    HttpResponse::Ok().body("Hey there!")
}

async fn my_middleware(
    req: ServiceRequest,
    next: Next<impl MessageBody>,
) -> Result<ServiceResponse<impl MessageBody>, Error> {
    print!("Incoming request: {} {}", req.method(), req.path());
    next.call(req).await
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    use actix_web::{App, HttpServer}; 

    HttpServer::new(|| {
        App::new()
            .wrap(from_fn(my_middleware))
            .wrap(Logger::default())
            .wrap(Logger::new("%a %{User-Agent}i"))
            .service(hello)
            .service(echo)
            .route("/hey", web::get().to(manual_hello))
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}