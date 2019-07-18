package com.iskill.backend.services;

import com.iskill.backend.exceptions.Evaluation.EvaluationNotFound.EvaluationNotFoundException;
import com.iskill.backend.exceptions.Employee.EmployeeNotFound.EmployeeNotFoundException;
import com.iskill.backend.exceptions.Question.QuestionNotFound.QuestionNotFoundException;
import com.iskill.backend.exceptions.SurveyForm.CreateSurveyForm.CreateNewSurveyFormException;
import com.iskill.backend.exceptions.SurveyForm.DeleteSurveyForm.SurveyFormCannotDeleteException;
import com.iskill.backend.exceptions.SurveyForm.SurveyFormCannotUpdate.SurveyFormCannotUpdateException;
import com.iskill.backend.exceptions.SurveyForm.SurveyFormNotFound.SurveyFormNotFoundException;
import com.iskill.backend.exceptions.ToolProcess.ToolProcessNotFound.ToolProcessNotFoundException;
import com.iskill.backend.models.*;
import com.iskill.backend.repositories.EmployeeRepository;
import com.iskill.backend.repositories.SurveyFormRepository;
import com.iskill.backend.repositories.ToolProcessRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class SurveyFormService {

    private final SurveyFormRepository surveyFormRepository;
    private final EmployeeRepository employeeRepository;
    private final ToolProcessRepository toolProcessRepository;
    private final CategoryService categoryService;
    private final QuestionService questionService;

    @Autowired
    public SurveyFormService(SurveyFormRepository surveyFormRepository,
                             EmployeeRepository employeeRepository,
                             ToolProcessRepository toolProcessRepository, CategoryService categoryService, QuestionService questionService) {
        this.surveyFormRepository = surveyFormRepository;
        this.employeeRepository = employeeRepository;
        this.toolProcessRepository = toolProcessRepository;
        this.categoryService = categoryService;
        this.questionService = questionService;
    }


    public SurveyForm createNewSurveyForm(SurveyForm surveyForm, Long employeeId) {
        //form has categories
        //categories have questions
        //Create new category objects for the form (associate questions with them as well)
        ToolProcess toolProcess = toolProcessRepository.findByToolProcessId(surveyForm.getToolProcess().getToolProcessId()).orElseThrow(
                () -> new ToolProcessNotFoundException("Tool/Process with id '" + surveyForm.getToolProcess().getToolProcessId() + "' not found!")
        );

        Employee creator = employeeRepository.findById(employeeId).orElseThrow(
                () -> new EmployeeNotFoundException("Employee with id '" + employeeId + "' not found!")
        );

        checkForDuplicateFormName(surveyForm.getSurveyFormName());

        surveyForm.setToolProcess(toolProcess);
        toolProcess.getSurveyForms().add(surveyForm);
        surveyForm.setCreator(creator);
        creator.getCreatedSurveyForms().add(surveyForm);

        for (Category category : surveyForm.getCategories()) {
            category.setSurveyForm(surveyForm);
            //questions already in category object
            for (Question question : category.getQuestions()) {
                question.setCategory(category);
            }
        }
        return surveyFormRepository.save(surveyForm);

    }

    public SurveyForm getSurveyForm(Long surveyFormId) {
        return surveyFormRepository.findById(surveyFormId).orElseThrow(
                () -> new SurveyFormNotFoundException("Survey form with id '" + surveyFormId + "' not found")
        );
    }

    public List<SurveyForm> getAllSurveyForms() {
        return surveyFormRepository.findAll();
    }

    public List<SurveyForm> getAllSurveyFormsByEmployeeId(Long employeeId) {
        return surveyFormRepository.findSurveyFormByCreatorEmployeeId(employeeId);
    }

    //update categories & questions, toolProcess & own attributes
    public SurveyForm updateSurveyForm(SurveyForm receivedSurveyForm) {

        //check if survey form has been used for evaluations
        SurveyForm surveyFormToUpdate = getSurveyForm(receivedSurveyForm.getSurveyFormId());
        if (surveyFormToUpdate.getEvaluations() != null && surveyFormToUpdate.getEvaluations().size() > 0) {
            throw new SurveyFormCannotUpdateException("Survey Form has been used for evaluations and cannot be updated!");
        }

        //if the name has changed, check whether its a duplicate
        if (!surveyFormToUpdate.getSurveyFormName().equalsIgnoreCase(receivedSurveyForm.getSurveyFormName())) {
            checkForDuplicateFormName(receivedSurveyForm.getSurveyFormName());
        }

        //---------------- Update ToolProcess -------------------
        ToolProcess newToolProcessForForm = toolProcessRepository.findByToolProcessName(receivedSurveyForm.getToolProcess().getToolProcessName()).orElseThrow(
                () -> new ToolProcessNotFoundException("Tool/Process with name '" + receivedSurveyForm.getToolProcess().getToolProcessName() + "' not found!")
        );
        //change tool process associated with the form
        surveyFormToUpdate.getToolProcess().getSurveyForms().remove(surveyFormToUpdate);
        surveyFormToUpdate.setToolProcess(newToolProcessForForm);
        newToolProcessForForm.getSurveyForms().add(surveyFormToUpdate);
        //---------------End of Update ToolProcess---------------

        //-------------Update Categories and Questions-----------

        //categories before receiving the post request
        List<Category> previousCategories = surveyFormToUpdate.getCategories();

        //For each previous category, check if it still exists in the updated categories
        //if it does not exist in updated categories, delete it and all its questions
        for (int i = 0; i < previousCategories.size(); i++) {
            if (!receivedSurveyForm.getCategories().contains(previousCategories.get(i))) { //has been deleted
                categoryService.deleteCategory(previousCategories.get(i).getCategoryId());
                //remove from the categories in the surveyForm object from the DB
                previousCategories.remove(previousCategories.get(i));
            }
        }

        //this loop is for creating new categories or updating existing categories
        for (Category receivedCategory : receivedSurveyForm.getCategories()) {
            if (receivedCategory.getCategoryId() == null) { //brand new category
                //two way association: Category and SurveyForm
                receivedCategory.setSurveyForm(surveyFormToUpdate);
                surveyFormToUpdate.getCategories().add(receivedCategory);
                //two way association: Category and Questions
                //questions are already in category
                for (Question question : receivedCategory.getQuestions()) {
                    question.setCategory(receivedCategory);
                    if (question.getQuestionId()!=null){
                        throw new QuestionNotFoundException(
                                "New questions should not have a id field."
                        );
                    }
                }
            } else if (previousCategories.contains(receivedCategory)) { //existing category from before the update
                /*this method changes attributes of the category in the list fetched from DB,
                based on the ID of the received category. Returns the category from db*/
                Category categoryToUpdate = categoryService.updateCategory(receivedCategory);
                List<Question> previousCategoryQuestions = categoryToUpdate.getQuestions();
                //for each previous question in the category, check if it exists in the updated list of questions
                //for that category. If does not exist, delete the question
                for (int i = 0; i < previousCategoryQuestions.size(); i++) {
                    if (!receivedCategory.getQuestions().contains(previousCategoryQuestions.get(i))) {
                        questionService.deleteQuestion(previousCategoryQuestions.get(i).getQuestionId());
                        previousCategoryQuestions.remove(previousCategoryQuestions.get(i));
                    }
                }
                //this loop is for creating new questions or updating existing ones
                //for each question in new question list for the category
                for (Question question : receivedCategory.getQuestions()) {
                    if (question.getQuestionId() == null) { //brand new question
                        //two way association
                        question.setCategory(categoryToUpdate);
                        previousCategoryQuestions.add(question);
                    } else if (previousCategoryQuestions.contains(question)) { //existing, so just update
                        //update attributes of question in the question object fetched from db
                        questionService.updateQuestion(question); //only update text and sequence
                    } else {
                        throw new QuestionNotFoundException(
                                String.format("Question with id '%s' was not found in this form category. " +
                                        "New questions should not have a id field.", question.getQuestionId())
                        );
                    }
                }
            } else {
                throw new EvaluationNotFoundException(
                        String.format("Category with id '%s' was not found in this form. " +
                                "New categories should not have a id field.", receivedCategory.getCategoryId()));
            }
        }
        //--------End of update Categories and Questions---------

        //------------update SurveyForm's attributes-------------
        surveyFormToUpdate.setSurveyFormName(receivedSurveyForm.getSurveyFormName());
        surveyFormToUpdate.setTotalScore(receivedSurveyForm.getTotalScore());
        surveyFormToUpdate.setActualScore(receivedSurveyForm.getActualScore());
        surveyFormToUpdate.setSkillLevel(receivedSurveyForm.getSkillLevel());
        surveyFormToUpdate.setUpdated_At(new Date());
        //---------End of update SurveyForm's attributes---------

        //updates cascaded to Categories and Questions
        return surveyFormRepository.save(surveyFormToUpdate);
    }

    public String deleteSurveyForm(Long surveyFormId){
        SurveyForm surveyForm = getSurveyForm(surveyFormId);

        if (surveyForm.getEvaluations() != null && surveyForm.getEvaluations().size() > 0){ //has evaluations
            throw new SurveyFormCannotDeleteException("Survey form cannot be deleted as there are " +
                    surveyForm.getEvaluations().size() + " evaluations already done using this survey form");
        }
        //clear associations - toolProcess, creator, categories
        surveyForm.getCreator().getCreatedSurveyForms().remove(surveyForm);
        surveyForm.setCreator(null);

        for (Category category : surveyForm.getCategories()) {
            categoryService.deleteCategory(category.getCategoryId());
        }
        surveyForm.getToolProcess().getSurveyForms().remove(surveyForm);
        surveyForm.setToolProcess(null);

        surveyFormRepository.delete(surveyForm);
        return surveyForm.getSurveyFormName();
    }

    private void checkForDuplicateFormName(String surveyFormName) {
        Optional<SurveyForm> surveyFormResult = surveyFormRepository.findBySurveyFormNameIgnoreCase(surveyFormName);
        surveyFormResult.ifPresent(surveyForm1 -> {
            throw new CreateNewSurveyFormException("Form with name '" + surveyFormName + "' already exists! " +
                    "Please use a different name");
        }); //name already exist
    }
}

