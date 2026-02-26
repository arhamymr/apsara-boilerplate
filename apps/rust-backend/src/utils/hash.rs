use argon2::{Argon2, PasswordHasher};
use password_hash::{SaltString, rand_core::OsRng};
use crate::utils::errors::CustomError;


fn Hash_Password(password: &str) -> Result<String, CustomError> {
    let salt = SaltString::generate(&mut OsRng);
    let argon2 = Argon2::default();

    argon2
        .hash_password(password.as_bytes(), &salt)
        .map(|hash| hash.to_string())
        .map_err(|_| CustomError::Internal("Password hashing failed".into()))
}