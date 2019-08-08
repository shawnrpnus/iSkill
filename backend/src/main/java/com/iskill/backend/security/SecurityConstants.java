package com.iskill.backend.security;

public class SecurityConstants {

    public static final String SIGN_UP_URLS = "/api/employee/**";
    public static final String REGISTER_URLS = "/api/role/**";
    public static final String H2_URL = "h2-console/**";
    public static final String SECRET ="SecretKeyToGenJWTs";
    public static final String TOKEN_PREFIX= "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final long EXPIRATION_TIME = 900_000; //300 seconds
}