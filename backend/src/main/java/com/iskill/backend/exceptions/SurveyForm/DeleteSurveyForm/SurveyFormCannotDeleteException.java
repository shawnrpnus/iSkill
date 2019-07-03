package com.iskill.backend.exceptions.SurveyForm.DeleteSurveyForm;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)

public class SurveyFormCannotDeleteException extends RuntimeException{

    public SurveyFormCannotDeleteException(String message){
        super(message);
    }
}
