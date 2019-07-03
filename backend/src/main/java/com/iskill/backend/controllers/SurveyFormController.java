package com.iskill.backend.controllers;

import com.iskill.backend.models.SurveyForm;
import com.iskill.backend.services.EmployeeService;
import com.iskill.backend.services.SurveyFormService;
import com.iskill.backend.services.ValidationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Map;

@RestController
@RequestMapping("/api/surveyForm")
@CrossOrigin(origins = "http://localhost:3000")
public class SurveyFormController {

    private final SurveyFormService surveyFormService;
    private final EmployeeService employeeService;
    private final ValidationService validationService;

    public SurveyFormController(SurveyFormService surveyFormService,
                                EmployeeService employeeService,
                                ValidationService validationService) {
        this.surveyFormService = surveyFormService;
        this.employeeService = employeeService;
        this.validationService = validationService;
    }

    @PostMapping("/{toolProcessId}/{creatorEmployeeId}")
    public ResponseEntity<?> createNewSurveyForm(@Valid @RequestBody SurveyForm surveyForm, BindingResult result,
                                                 @PathVariable Long toolProcessId,
                                                 @PathVariable Long creatorEmployeeId) {

        ResponseEntity<Map<String,String>> errorMapRsp = validationService.generateErrorMapResponse(result);
        if(errorMapRsp != null) {
            return errorMapRsp;
        }

        SurveyForm createdSurveyForm = surveyFormService.createNewSurveyForm(surveyForm, toolProcessId, creatorEmployeeId);
        return new ResponseEntity<>(createdSurveyForm, HttpStatus.CREATED);
    }
}
