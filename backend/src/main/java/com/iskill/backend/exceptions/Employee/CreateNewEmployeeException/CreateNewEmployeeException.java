package com.iskill.backend.exceptions.Employee.CreateNewEmployeeException;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class CreateNewEmployeeException extends RuntimeException{

    public CreateNewEmployeeException(String message) { super(message); }
}
