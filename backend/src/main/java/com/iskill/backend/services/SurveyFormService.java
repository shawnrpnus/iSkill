package com.iskill.backend.services;

import com.iskill.backend.repositories.EmployeeRepository;
import com.iskill.backend.repositories.SurveyFormRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SurveyFormService {

    private final SurveyFormRepository surveyFormRepository;
    private final EmployeeRepository employeeRepository;

    @Autowired
    public SurveyFormService(SurveyFormRepository surveyFormRepository, EmployeeRepository employeeRepository) {
        this.surveyFormRepository = surveyFormRepository;
        this.employeeRepository = employeeRepository;
    }
}
