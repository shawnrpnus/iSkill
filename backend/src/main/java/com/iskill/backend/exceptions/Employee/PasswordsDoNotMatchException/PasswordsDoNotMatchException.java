package com.iskill.backend.exceptions.Employee.PasswordsDoNotMatchException;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)

public class PasswordDoNotMatchException extends RuntimeException{

    public PasswordDoNotMatchException(String message){
        super(message);
    }
}
