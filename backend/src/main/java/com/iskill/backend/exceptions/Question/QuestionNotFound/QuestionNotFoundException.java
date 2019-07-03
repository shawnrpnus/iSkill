package com.iskill.backend.exceptions.Question.QuestionNotFound;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)

public class QuestionNotFoundException extends RuntimeException{

    public QuestionNotFoundException(String message){
        super(message);
    }
}
