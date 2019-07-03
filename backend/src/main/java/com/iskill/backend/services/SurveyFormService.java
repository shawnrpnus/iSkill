package com.iskill.backend.services;

import com.iskill.backend.exceptions.Employee.EmployeeNotFound.EmployeeNotFoundException;
import com.iskill.backend.exceptions.SurveyForm.CreateSurveyForm.CreateNewSurveyFormException;
import com.iskill.backend.exceptions.SurveyForm.DeleteSurveyForm.SurveyFormCannotDeleteException;
import com.iskill.backend.exceptions.SurveyForm.SurveyFormCannotUpdate.SurveyFormCannotUpdatexception;
import com.iskill.backend.exceptions.SurveyForm.SurveyFormNotFound.SurveyFormNotFoundException;
import com.iskill.backend.exceptions.ToolProcess.ToolProcessNotFound.ToolProcessNotFoundException;
import com.iskill.backend.models.Employee;
import com.iskill.backend.models.Question;
import com.iskill.backend.models.SurveyForm;
import com.iskill.backend.models.ToolProcess;
import com.iskill.backend.repositories.EmployeeRepository;
import com.iskill.backend.repositories.SurveyFormRepository;
import com.iskill.backend.repositories.ToolProcessRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class SurveyFormService {

    private final SurveyFormRepository surveyFormRepository;
    private final EmployeeRepository employeeRepository;
    private final QuestionService questionService;
    private final ToolProcessRepository toolProcessRepository;

    @Autowired
    public SurveyFormService(SurveyFormRepository surveyFormRepository,
                             EmployeeRepository employeeRepository,
                             QuestionService questionService,
                             ToolProcessRepository toolProcessRepository) {
        this.surveyFormRepository = surveyFormRepository;
        this.employeeRepository = employeeRepository;
        this.questionService = questionService;
        this.toolProcessRepository = toolProcessRepository;
    }


    public SurveyForm createNewSurveyForm (SurveyForm surveyForm, Long toolProcessId, Long employeeId){
        ToolProcess toolProcess = toolProcessRepository.findByToolProcessId(toolProcessId).orElseThrow(
                () -> new ToolProcessNotFoundException("Tool/Process with id '" + toolProcessId + "' not found!")
        );

        Employee creator = employeeRepository.findById(employeeId).orElseThrow(
                () -> new EmployeeNotFoundException("Employee with id '" + employeeId + "' not found!")
        );
        checkForDuplicateFormName(surveyForm.getSurveyFormName());

        surveyForm.setToolProcess(toolProcess);
        toolProcess.getSurveyForms().add(surveyForm);
        surveyForm.setCreator(creator);
        creator.getCreatedSurveyForms().add(surveyForm);
        SurveyForm savedSurveyForm = surveyFormRepository.save(surveyForm);
        for (Question question : surveyForm.getQuestions()){
             Question createdQn = questionService.createNewQuestion(question, savedSurveyForm, question.getCategory().getCategoryName());
        }

        SurveyForm createdSurveyForm = surveyFormRepository.save(savedSurveyForm);

//        //nullify relationships, might want to access questions from category,
//        //and vice versa, so cant jsonignore
//        for (Question q: createdSurveyForm.getQuestions()){
//            q.getCategory().setQuestions(null);
//        }

        return createdSurveyForm;

    }

    public SurveyForm getSurveyForm(Long surveyFormId){
        SurveyForm foundSurveyForm =  surveyFormRepository.findById(surveyFormId).orElseThrow(
                () -> new SurveyFormNotFoundException("Survey form with id '" + surveyFormId + "' not found")
        );

//        for (Question q: foundSurveyForm.getQuestions()){
//            q.getCategory().setQuestions(null);
//        }

        return foundSurveyForm;
    }

    public List<SurveyForm> getAllSurveyForms(){
        return surveyFormRepository.findAll();
    }

    public SurveyForm updateSurveyForm(SurveyForm surveyForm){ //will have id
        //questions might be existing ones, but with attributes updated --> update
        //questions might have been removed --> delete
        //there might be new questions --> create
        SurveyForm surveyFormToUpdate = getSurveyForm(surveyForm.getSurveyFormId());
        if (surveyFormToUpdate.getEvaluations() != null && surveyFormToUpdate.getEvaluations().size()>0){
            throw new SurveyFormCannotUpdatexception("Survey Form has been used for evaluations and cannot be updated!");
        }

        //if the name has changed, check whether its a duplicate
        if (!surveyFormToUpdate.getSurveyFormName().equalsIgnoreCase(surveyForm.getSurveyFormName())) {
            checkForDuplicateFormName(surveyForm.getSurveyFormName());
        }

        List<Question> previousQuestions = surveyFormToUpdate.getQuestions();

        for (Question question : surveyForm.getQuestions()){

            if (question.getQuestionId() == null){ //brand new question
                questionService.createNewQuestion(question, surveyFormToUpdate, question.getCategory().getCategoryName());
            } else if (previousQuestions.contains(question)){ //existing, so just update
                questionService.updateQuestion(question); //only update text and sequence
            }
        }

        for (int i = 0; i < previousQuestions.size(); i++){
            if (!surveyForm.getQuestions().contains(previousQuestions.get(i))){ //been removed
                questionService.deleteQuestion(previousQuestions.get(i).getQuestionId());
            }
        }

        surveyFormToUpdate.setSurveyFormName(surveyForm.getSurveyFormName());
        surveyFormToUpdate.setTotalScore(surveyForm.getTotalScore());
        surveyFormToUpdate.setActualScore(surveyForm.getActualScore());
        surveyFormToUpdate.setSkillLevel(surveyForm.getSkillLevel());

        return surveyFormRepository.save(surveyFormToUpdate);

    }

    public String deleteSurveyForm(Long surveyFormId){
        SurveyForm surveyForm = getSurveyForm(surveyFormId);

        if (surveyForm.getEvaluations() != null && surveyForm.getEvaluations().size() > 0){ //has evaluations
            throw new SurveyFormCannotDeleteException("Survey form cannot be deleted: There are evaluations " +
                    "done using this survey form");
        }
        //clear associations
        surveyForm.getCreator().getCreatedSurveyForms().remove(surveyForm);
        surveyForm.setCreator(null);

        for (Question question : surveyForm.getQuestions()){
            questionService.deleteQuestion(question.getQuestionId());
        }
        surveyForm.setQuestions(null);

        surveyForm.getToolProcess().getSurveyForms().remove(surveyForm);
        surveyForm.setToolProcess(null);

        surveyFormRepository.delete(surveyForm);
        return surveyForm.getSurveyFormName();
    }

    private void checkForDuplicateFormName(String surveyFormName){
        Optional<SurveyForm> surveyFormResult = surveyFormRepository.findBySurveyFormNameIgnoreCase(surveyFormName);
        surveyFormResult.ifPresent(surveyForm1 -> {
            throw new CreateNewSurveyFormException("Form with name '" + surveyFormName + "' already exists! " +
                    "Please use a different name");
        }); //name already exist
    }
}
