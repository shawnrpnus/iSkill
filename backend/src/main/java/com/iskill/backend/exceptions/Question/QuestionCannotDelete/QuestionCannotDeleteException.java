package com.iskill.backend.exceptions.Question.QuestionCannotDelete;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)

public class QuestionCannotDeleteException extends RuntimeException{

    public QuestionCannotDeleteException(String message){
        super(message);
    }
}
