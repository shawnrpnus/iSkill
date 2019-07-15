package com.iskill.backend.exceptions.Evaluation.EvaluationCannotDelete;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)

public class EvaluationCannotDeleteException extends RuntimeException{

    public EvaluationCannotDeleteException(String message){
        super(message);
    }
}
