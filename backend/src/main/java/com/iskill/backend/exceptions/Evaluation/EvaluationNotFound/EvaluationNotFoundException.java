package com.iskill.backend.exceptions.Evaluation.EvaluationNotFound;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)

public class EvaluationNotFoundException extends RuntimeException{

    public EvaluationNotFoundException(String message){
        super(message);
    }
}
