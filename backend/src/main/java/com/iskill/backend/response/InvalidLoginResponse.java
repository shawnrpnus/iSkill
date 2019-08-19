package com.iskill.backend.response;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class InvalidLoginResponse {
    private String username;
    private String password;

    public InvalidLoginResponse(){
        username = "Invalid Username or Password";
        password = "Invalid Username or Password";
    }

}
