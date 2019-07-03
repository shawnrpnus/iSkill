package com.iskill.backend.exceptions.SurveyForm.SurveyFormCannotUpdate;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)

public class SurveyFormCannotUpdatexception extends RuntimeException{

    public SurveyFormCannotUpdatexception(String message){
        super(message);
    }
}
