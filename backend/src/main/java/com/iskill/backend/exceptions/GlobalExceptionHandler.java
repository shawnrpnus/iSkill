package com.iskill.backend.exceptions;

import com.iskill.backend.exceptions.Employee.EmployeeNotFound.EmployeeNotFoundException;
import com.iskill.backend.exceptions.Employee.EmployeeNotFound.EmployeeNotFoundExceptionResponse;
import com.iskill.backend.exceptions.SurveyForm.CreateSurveyForm.CreateNewSurveyFormException;
import com.iskill.backend.exceptions.SurveyForm.CreateSurveyForm.CreateNewSurveyFormExceptionResponse;
import com.iskill.backend.exceptions.SurveyForm.SurveyFormNotFound.SurveyFormNotFoundException;
import com.iskill.backend.exceptions.SurveyForm.SurveyFormNotFound.SurveyFormNotFoundExceptionResponse;
import com.iskill.backend.exceptions.ToolProcess.ToolProcessNotFound.ToolProcessNotFoundException;
import com.iskill.backend.exceptions.ToolProcess.ToolProcessNotFound.ToolProcessNotFoundExceptionResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice //global exception handler for controllers (methods with a @RequestMapping etc annotation)
@RestController
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler
    public final ResponseEntity<Object> handleEmployeeNotFoundException(EmployeeNotFoundException ex, WebRequest req){
        EmployeeNotFoundExceptionResponse expRsp = new EmployeeNotFoundExceptionResponse(ex.getMessage()); //format to json response
        return new ResponseEntity<>(expRsp, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleToolProcessNotFoundException(ToolProcessNotFoundException ex, WebRequest req){
        ToolProcessNotFoundExceptionResponse expRsp = new ToolProcessNotFoundExceptionResponse(ex.getMessage()); //format to json response
        return new ResponseEntity<>(expRsp, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleSurveyFormNotFoundException(SurveyFormNotFoundException ex, WebRequest req){
        SurveyFormNotFoundExceptionResponse expRsp = new SurveyFormNotFoundExceptionResponse(ex.getMessage()); //format to json response
        return new ResponseEntity<>(expRsp, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleCreateNewSurveyFormException(CreateNewSurveyFormException ex, WebRequest req){
        CreateNewSurveyFormExceptionResponse expRsp = new CreateNewSurveyFormExceptionResponse(ex.getMessage()); //format to json response
        return new ResponseEntity<>(expRsp, HttpStatus.BAD_REQUEST);
    }

}
