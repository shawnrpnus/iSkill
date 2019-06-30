package com.iskill.backend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice //global exception handler for controllers (methods with a @RequestMapping etc annotation)
@RestController
public class CustomEntityResponseExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler
    public final ResponseEntity<Object> handleEmployeeNotFoundException(EmployeeNotFoundException ex, WebRequest req){
        EmployeeNotFoundExceptionResponse expRsp = new EmployeeNotFoundExceptionResponse(ex.getMessage()); //format to json response
        return new ResponseEntity<>(expRsp, HttpStatus.BAD_REQUEST);
    }


}
