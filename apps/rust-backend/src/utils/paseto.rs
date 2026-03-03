use pasetors::{
    claims::{Claims},
    keys::{AsymmetricSecretKey}, 
    public::sign,
    version4::V4,
};
use std::env;
use base64::{engine::general_purpose::STANDARD, Engine };

use crate::utils::errors::CustomError;


fn get_auth_secret_key() -> Result<AsymmetricSecretKey<V4>, CustomError> {
    let secret_key = env::var("ACCESS_PRIVATE_KEY").expect("Secret key not set");

    let secret_key_byte = STANDARD
    .decode(secret_key)
    .map_err(|_| CustomError::Internal("Invalid base64 format".into()))?;

    println!("key length {}", &secret_key_byte.len());

    let secret_key = AsymmetricSecretKey::from(&secret_key_byte)?;

    Ok(secret_key)
}


pub fn create_token() -> Result<String, CustomError> {
    let secret_key = get_auth_secret_key()?;
    // create claims 
    let claims = Claims::new()?;

    // generate token
    let pub_token = sign(&secret_key, &claims, None, None)?;

    Ok(pub_token)
}