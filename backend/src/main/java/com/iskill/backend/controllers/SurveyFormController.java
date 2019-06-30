package com.iskill.backend.controllers;

import com.iskill.backend.services.EmployeeService;
import com.iskill.backend.services.SurveyFormService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/surveyForm")
@CrossOrigin(origins = "http://localhost:3000")
public class SurveyFormController {

    private final SurveyFormService surveyFormService;
    private final EmployeeService employeeService;

    public SurveyFormController(SurveyFormService surveyFormService, EmployeeService employeeService) {
        this.surveyFormService = surveyFormService;
        this.employeeService = employeeService;
    }
}
