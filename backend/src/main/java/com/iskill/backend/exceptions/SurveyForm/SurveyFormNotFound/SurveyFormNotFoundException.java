package com.iskill.backend.exceptions.SurveyForm.SurveyFormNotFound;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)

public class SurveyFormNotFoundException extends RuntimeException{

    public SurveyFormNotFoundException(String message){
        super(message);
    }
}
