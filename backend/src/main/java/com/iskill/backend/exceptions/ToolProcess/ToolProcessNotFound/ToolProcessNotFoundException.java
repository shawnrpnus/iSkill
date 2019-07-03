package com.iskill.backend.exceptions.ToolProcess.ToolProcessNotFound;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)

public class ToolProcessNotFoundException extends RuntimeException{

    public ToolProcessNotFoundException(String message){
        super(message);
    }
}
