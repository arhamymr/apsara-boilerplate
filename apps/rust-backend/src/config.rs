use std::sync::OnceLock;
use std::{env, fmt};

use base64::engine::general_purpose::STANDARD as BASE64;
use base64::Engine;
use dotenvy::dotenv;
use pasetors::keys::{AsymmetricKeyPair, AsymmetricPublicKey, AsymmetricSecretKey, Generate, SymmetricKey};
use pasetors::version4::V4;

pub struct AppConfig {
    pub signing_key: AsymmetricSecretKey<V4>,   // v4.public secret key
    pub verifying_key: AsymmetricPublicKey<V4>, // v4.public public key
    pub refresh_key: SymmetricKey<V4>,          // v4.local symmetric key
    pub iss: String,
    pub aud: String,
    pub access_ttl_min: i64,
    pub refresh_ttl_days: i64,
    pub cookie_secure: bool,
    pub cookie_domain: String,
    pub cookie_path: String,
    pub refresh_cookie_name: String,
    pub cors_allowed_origin: String,
    pub server_port: u16,
    pub dev_fallback_keys: bool,
}

impl fmt::Debug for AppConfig {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.debug_struct("AppConfig")
            .field("iss", &self.iss)
            .field("aud", &self.aud)
            .field("access_ttl_min", &self.access_ttl_min)
            .field("refresh_ttl_days", &self.refresh_ttl_days)
            .field("cookie_secure", &self.cookie_secure)
            .field("cookie_domain", &self.cookie_domain)
            .field("cookie_path", &self.cookie_path)
            .field("refresh_cookie_name", &self.refresh_cookie_name)
            .field("cors_allowed_origin", &self.cors_allowed_origin)
            .field("server_port", &self.server_port)
            .field("dev_fallback_keys", &self.dev_fallback_keys)
            .finish()
    }
}

static CONFIG: OnceLock<AppConfig> = OnceLock::new();

pub fn get_config() -> &'static AppConfig {
    CONFIG.get_or_init(|| load_config())
}

fn load_config() -> AppConfig {
    let _ = dotenv();

    let dev_fallback_keys = env_bool("DEV_FALLBACK_KEYS", true);

    let iss = env_str("TOKEN_ISS", "apsara-devkit");
    let aud = env_str("TOKEN_AUD", "web");

    let access_ttl_min = env_i64("ACCESS_TOKEN_TTL_MIN", 15);
    let refresh_ttl_days = env_i64("REFRESH_TOKEN_TTL_DAYS", 7);

    let cookie_secure = env_bool("COOKIE_SECURE", false);
    let cookie_domain = env_str("COOKIE_DOMAIN", "localhost");
    let cookie_path = env_str("COOKIE_PATH", "/");
    let refresh_cookie_name = env_str("REFRESH_COOKIE_NAME", "refresh_token");

    let cors_allowed_origin = env_str("CORS_ALLOWED_ORIGIN", "http://localhost:1111");
    let server_port = env_u16("SERVER_PORT", 4444);

    // Keys: require both private and public if provided; otherwise generate pair in dev
    let priv_env = env::var("ACCESS_PRIVATE_KEY_BASE64").ok().filter(|v| !v.is_empty());
    let pub_env = env::var("ACCESS_PUBLIC_KEY_BASE64").ok().filter(|v| !v.is_empty());

    let (signing_key, verifying_key) = match (priv_env, pub_env) {
        (Some(sk_b64), Some(pk_b64)) => {
            let sk_bytes = BASE64.decode(sk_b64).expect("ACCESS_PRIVATE_KEY_BASE64 must be valid base64");
            let pk_bytes = BASE64.decode(pk_b64).expect("ACCESS_PUBLIC_KEY_BASE64 must be valid base64");
            let sk = AsymmetricSecretKey::<V4>::try_from(sk_bytes.as_slice())
                .expect("ACCESS_PRIVATE_KEY_BASE64 must be 32 bytes Ed25519 secret");
            let pk = AsymmetricPublicKey::<V4>::try_from(pk_bytes.as_slice())
                .expect("ACCESS_PUBLIC_KEY_BASE64 must be 32 bytes Ed25519 public");
            (sk, pk)
        }
        _ if dev_fallback_keys => {
            println!("[auth] DEV_FALLBACK_KEYS enabled; generating ephemeral v4.public keypair");
            let kp = AsymmetricKeyPair::<V4>::generate().expect("keypair generation");
            (kp.secret, kp.public)
        }
        _ => panic!(
            "ACCESS_PRIVATE_KEY_BASE64 and ACCESS_PUBLIC_KEY_BASE64 must both be set, or DEV_FALLBACK_KEYS=true for ephemeral generation"
        ),
    };

    let refresh_key = match env::var("REFRESH_SYMMETRIC_KEY_BASE64") {
        Ok(v) if !v.is_empty() => {
            let bytes = BASE64.decode(v).expect("REFRESH_SYMMETRIC_KEY_BASE64 must be valid base64");
            SymmetricKey::<V4>::try_from(bytes.as_slice()).expect("REFRESH_SYMMETRIC_KEY_BASE64 must be 32 bytes")
        }
        _ if dev_fallback_keys => {
            println!("[auth] DEV_FALLBACK_KEYS enabled; generating ephemeral v4.local symmetric key");
            SymmetricKey::<V4>::generate().expect("symmetric key generation")
        }
        _ => panic!(
            "REFRESH_SYMMETRIC_KEY_BASE64 not set and DEV_FALLBACK_KEYS=false. Provide a base64-encoded 32-byte key."
        ),
    };

    AppConfig {
        signing_key,
        verifying_key,
        refresh_key,
        iss,
        aud,
        access_ttl_min,
        refresh_ttl_days,
        cookie_secure,
        cookie_domain,
        cookie_path,
        refresh_cookie_name,
        cors_allowed_origin,
        server_port,
        dev_fallback_keys,
    }
}

fn env_str(key: &str, default: &str) -> String {
    env::var(key).unwrap_or_else(|_| default.to_string())
}

fn env_bool(key: &str, default: bool) -> bool {
    match env::var(key) {
        Ok(v) => matches!(v.to_ascii_lowercase().as_str(), "1" | "true" | "yes"),
        Err(_) => default,
    }
}

fn env_i64(key: &str, default: i64) -> i64 {
    match env::var(key) {
        Ok(v) => v.parse().unwrap_or(default),
        Err(_) => default,
    }
}

fn env_u16(key: &str, default: u16) -> u16 {
    match env::var(key) {
        Ok(v) => v.parse().unwrap_or(default),
        Err(_) => default,
    }
}
