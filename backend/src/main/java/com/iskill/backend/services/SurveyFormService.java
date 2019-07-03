package com.iskill.backend.services;

import com.iskill.backend.exceptions.Employee.EmployeeNotFound.EmployeeNotFoundException;
import com.iskill.backend.exceptions.SurveyForm.SurveyFormNotFound.SurveyFormNotFoundException;
import com.iskill.backend.exceptions.ToolProcess.ToolProcessNotFound.ToolProcessNotFoundException;
import com.iskill.backend.models.Employee;
import com.iskill.backend.models.Question;
import com.iskill.backend.models.SurveyForm;
import com.iskill.backend.models.ToolProcess;
import com.iskill.backend.repositories.EmployeeRepository;
import com.iskill.backend.repositories.QuestionRepository;
import com.iskill.backend.repositories.SurveyFormRepository;
import com.iskill.backend.repositories.ToolProcessRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
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
        ToolProcess toolProcess = toolProcessRepository.findByToolProcessId(toolProcessId).orElseThrow(
                () -> new ToolProcessNotFoundException("Tool/Process with id '" + toolProcessId + "' not found!")
        );

        Employee manager = employeeRepository.findById(employeeId).orElseThrow(
                () -> new EmployeeNotFoundException("Employee with id '" + employeeId + "' not found!")
        );

        surveyForm.setToolProcess(toolProcess);
        toolProcess.getSurveyForms().add(surveyForm);
        surveyForm.setCreator(manager);
        manager.getCreatedSurveyForms().add(surveyForm);

        return surveyFormRepository.save(surveyForm);
    }

    public SurveyForm getSurveyForm(Long surveyFormId){
        return surveyFormRepository.findById(surveyFormId).orElseThrow(
                () -> new SurveyFormNotFoundException("Survey form with id '" + surveyFormId + "' not found")
        );
    }

    public SurveyForm updateSurveyForm(SurveyForm surveyForm, List<Question> questions){
        SurveyForm surveyFormToUpdate = surveyFormRepository.findById(surveyForm.getFormId()).orElseThrow(
                () -> new SurveyFormNotFoundException("Survey form with id '" + surveyForm.getFormId() + "' not found")
        );

        surveyForm.setQuestions(questions);
        for (Question question : questions){
            question.setSurveyForm(surveyForm);
            questionRepository.save(question);
        }

        surveyFormToUpdate.setFormName(surveyForm.getFormName());
        surveyFormToUpdate.setTotalScore(surveyForm.getTotalScore());
        surveyFormToUpdate.setActualScore(surveyForm.getActualScore());
        surveyFormToUpdate.setSkillLevel(surveyForm.getSkillLevel());

        return surveyFormRepository.save(surveyFormToUpdate);
    }
}
