package com.iskill.backend.exceptions;

import com.iskill.backend.exceptions.Category.CategoryNotFound.CategoryNotFoundException;
import com.iskill.backend.exceptions.Evaluation.EvaluationCannotDelete.EvaluationCannotDeleteException;
import com.iskill.backend.exceptions.Evaluation.EvaluationCannotDelete.EvaluationCannotDeleteExceptionResponse;
import com.iskill.backend.exceptions.Evaluation.EvaluationNotFound.EvaluationNotFoundException;
import com.iskill.backend.exceptions.Category.CategoryNotFound.CategoryNotFoundExceptionResponse;
import com.iskill.backend.exceptions.Employee.EmployeeNotFound.EmployeeNotFoundException;
import com.iskill.backend.exceptions.Employee.EmployeeNotFound.EmployeeNotFoundExceptionResponse;
import com.iskill.backend.exceptions.Evaluation.EvaluationNotFound.EvaluationNotFoundExceptionResponse;
import com.iskill.backend.exceptions.Question.QuestionNotFound.QuestionNotFoundException;
import com.iskill.backend.exceptions.Question.QuestionNotFound.QuestionNotFoundExceptionResponse;
import com.iskill.backend.exceptions.SurveyForm.CreateSurveyForm.CreateNewSurveyFormException;
import com.iskill.backend.exceptions.SurveyForm.CreateSurveyForm.CreateNewSurveyFormExceptionResponse;
import com.iskill.backend.exceptions.SurveyForm.SurveyFormCannotUpdate.SurveyFormCannotUpdateException;
import com.iskill.backend.exceptions.SurveyForm.SurveyFormCannotUpdate.SurveyFormCannotUpdateExceptionResponse;
import com.iskill.backend.exceptions.SurveyForm.SurveyFormNotFound.SurveyFormNotFoundException;
import com.iskill.backend.exceptions.SurveyForm.SurveyFormNotFound.SurveyFormNotFoundExceptionResponse;
import com.iskill.backend.exceptions.ToolProcess.ToolProcessNotFound.ToolProcessNotFoundException;
import com.iskill.backend.exceptions.ToolProcess.ToolProcessNotFound.ToolProcessNotFoundExceptionResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice //global exception handler for controllers (methods with a @RequestMapping etc annotation)
@RestController
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @Override
    public final ResponseEntity<Object> handleHttpMessageNotReadable(HttpMessageNotReadableException ex, HttpHeaders headers, HttpStatus status, WebRequest request){
        Map<String, String> errorMsg = new HashMap<>();
        errorMsg.put("message", "Your input is invalid!");
        return new ResponseEntity<>(errorMsg, HttpStatus.BAD_REQUEST);
    }

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

    @ExceptionHandler
    public final ResponseEntity<Object> handleSurveyFormCannotUpdateException(SurveyFormCannotUpdateException ex, WebRequest req){
        SurveyFormCannotUpdateExceptionResponse expRsp = new SurveyFormCannotUpdateExceptionResponse(ex.getMessage()); //format to json response
        return new ResponseEntity<>(expRsp, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleQuestionNotFoundException(QuestionNotFoundException ex, WebRequest req){
        QuestionNotFoundExceptionResponse expRsp = new QuestionNotFoundExceptionResponse(ex.getMessage()); //format to json response
        return new ResponseEntity<>(expRsp, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleCategoryNotFoundException(CategoryNotFoundException ex, WebRequest req){
        CategoryNotFoundExceptionResponse expRsp = new CategoryNotFoundExceptionResponse(ex.getMessage()); //format to json response
        return new ResponseEntity<>(expRsp, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleEvaluationNotFoundException(EvaluationNotFoundException ex, WebRequest req){
        EvaluationNotFoundExceptionResponse expRsp = new EvaluationNotFoundExceptionResponse(ex.getMessage()); //format to json response
        return new ResponseEntity<>(expRsp, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleEvaluationCannotDeleteException(EvaluationCannotDeleteException ex, WebRequest req){
        EvaluationCannotDeleteExceptionResponse expRsp = new EvaluationCannotDeleteExceptionResponse(ex.getMessage()); //format to json response
        return new ResponseEntity<>(expRsp, HttpStatus.BAD_REQUEST);
    }

}
