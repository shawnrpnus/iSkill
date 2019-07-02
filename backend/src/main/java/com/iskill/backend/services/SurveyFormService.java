package com.iskill.backend.services;

import com.iskill.backend.exceptions.CreateNewSurveyFormException;
import com.iskill.backend.exceptions.EmployeeNotFoundException;
import com.iskill.backend.exceptions.SurveyFormNotFoundException;
import com.iskill.backend.exceptions.ToolProcessNotFoundException;
import com.iskill.backend.models.Employee;
import com.iskill.backend.models.SurveyForm;
import com.iskill.backend.models.ToolProcess;
import com.iskill.backend.repositories.EmployeeRepository;
import com.iskill.backend.repositories.QuestionRepository;
import com.iskill.backend.repositories.SurveyFormRepository;
import com.iskill.backend.repositories.ToolProcessRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SurveyFormService {

    private final SurveyFormRepository surveyFormRepository;
    private final EmployeeRepository employeeRepository;
    private final QuestionRepository questionRepository;
    private final ToolProcessRepository toolProcessRepository;

    @Autowired
    public SurveyFormService(SurveyFormRepository surveyFormRepository,
                             EmployeeRepository employeeRepository,
                             QuestionRepository questionRepository,
                             ToolProcessRepository toolProcessRepository) {
        this.surveyFormRepository = surveyFormRepository;
        this.employeeRepository = employeeRepository;
        this.questionRepository = questionRepository;
        this.toolProcessRepository = toolProcessRepository;
    }

    public SurveyForm createNewSurveyForm (SurveyForm surveyForm, Long toolProcessId, Long employeeId){
        try {
            ToolProcess toolProcess = toolProcessRepository.findByToolProcessId(toolProcessId).orElseThrow(
                    () -> new ToolProcessNotFoundException("Tool/Process not found")
            );

            Employee manager = employeeRepository.findById(employeeId).orElseThrow(
                    () -> new EmployeeNotFoundException("Employee with id" + employeeId + "not found!")
            );

            surveyForm.setToolProcess(toolProcess);
            toolProcess.getSurveyForms().add(surveyForm);
            surveyForm.setCreator(manager);
            manager.getCreatedSurveyForms().add(surveyForm);

            return surveyFormRepository.save(surveyForm);
        } catch(Exception e) {
            Optional<SurveyForm> surveyFormOptional = surveyFormRepository.findById(surveyForm.getFormId());
            surveyFormOptional.ifPresent(project1 -> {
                throw new SurveyFormNotFoundException("Project ID " +
                        " already exists!");
            });
            return null;
        }
    }
}
