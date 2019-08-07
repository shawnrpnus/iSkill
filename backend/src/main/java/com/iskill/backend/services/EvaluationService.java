package com.iskill.backend.services;

import com.iskill.backend.exceptions.Evaluation.EvaluationNotFound.EvaluationNotFoundException;
import com.iskill.backend.models.*;
import com.iskill.backend.repositories.AnswerRepository;
import com.iskill.backend.repositories.EvaluationRepository;
import com.iskill.backend.repositories.SurveyFormRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class EvaluationService {

    private final EvaluationRepository evaluationRepository;
    private final AnswerRepository answerRepository;
    private final SurveyFormRepository surveyFormRepository;
    private final EmployeeService employeeService;
    private final SurveyFormService surveyFormService;
    private final QuestionService questionService;

    public EvaluationService(EvaluationRepository evaluationRepository, AnswerRepository answerRepository, SurveyFormRepository surveyFormRepository, EmployeeService employeeService, SurveyFormService surveyFormService, QuestionService questionService) {
        this.evaluationRepository = evaluationRepository;
        this.answerRepository = answerRepository;
        this.surveyFormRepository = surveyFormRepository;
        this.employeeService = employeeService;
        this.surveyFormService = surveyFormService;
        this.questionService = questionService;
    }

    public Evaluation createNewEvaluation(Evaluation evaluation, Long creatorEmployeeId, Long evaluatorEmployeeId,
                                          Long evaluateeEmployeeId, Long surveyFormId){
        Employee evaluatorEmployee = employeeService.getEmployeeById(evaluatorEmployeeId);
        Employee creatorEmployee = employeeService.getEmployeeById(creatorEmployeeId);
        Employee evaluateeEmployee = employeeService.getEmployeeById(evaluateeEmployeeId);

        SurveyForm surveyForm = surveyFormService.getSurveyForm(surveyFormId);

        evaluation.setCreator(creatorEmployee);
        creatorEmployee.getCreatedEvaluations().add(evaluation);

        evaluation.setEvaluator(evaluatorEmployee);
        evaluatorEmployee.getGivenEvaluations().add(evaluation);

        evaluation.setEvaluatee(evaluateeEmployee);
        evaluateeEmployee.getReceivedEvaluations().add(evaluation);

        evaluation.setSurveyForm(surveyForm);
        surveyForm.getEvaluations().add(evaluation);

        //evaluation already contains answers
        for (Answer answer : evaluation.getAnswers()){
            //each answer already contains question
            Question question = questionService.getQuestion(answer.getQuestion().getQuestionId());
            question.getAnswers().add(answer);
            answer.setQuestion(question);
            answerRepository.save(answer);

        }

        return evaluationRepository.save(evaluation);
    }

    public Evaluation getEvaluationById (Long evaluationId){
        return evaluationRepository.findById(evaluationId).orElseThrow(
                () -> new EvaluationNotFoundException(String.format("Evaluation with id: '%s' not found!", evaluationId))
        );
    }

    public List<Evaluation> getEmployeeCreatedEvaluations(Long creatorEmployeeId){
        return evaluationRepository.findEvaluationByCreatorEmployeeId(creatorEmployeeId);
    }

    public List<Evaluation> getEmployeeGivenEvaluations(Long evaluatorEmployeeId){
        return evaluationRepository.findEvaluationByEvaluatorEmployeeId(evaluatorEmployeeId);
    }

    public List<Evaluation> getEmployeeReceivedEvaluations(Long evaluateeEmployeeId){
        List<Evaluation> allEval = evaluationRepository.findEvaluationByEvaluateeEmployeeId(evaluateeEmployeeId);

        for(Evaluation e : allEval) {
            e.getSurveyForm().setEvaluations(null);
        }
        return allEval;
    }

    public Evaluation updateEvaluation(Evaluation updatedEvaluation, Long newEvaluatorEmployeeId, Long newEvaluateeEmployeeId, Long newSurveyFormId){
        Evaluation existingEvaluation = getEvaluationById(updatedEvaluation.getEvaluationId());
        Employee newEvaluatorEmployee = employeeService.getEmployeeById(newEvaluatorEmployeeId);
        Employee newEvaluateeEmployee = employeeService.getEmployeeById(newEvaluateeEmployeeId);
        SurveyForm newSurveyForm = surveyFormService.getSurveyForm(newSurveyFormId);

        //remove all current answers
        List<Answer> previousAnswers = existingEvaluation.getAnswers();
        existingEvaluation.setAnswers(new ArrayList<>());
        for (Answer answer: previousAnswers){
            answer.getQuestion().getAnswers().remove(answer);
            answer.setQuestion(null);
            answerRepository.delete(answer);
        }

        for (Answer answer: updatedEvaluation.getAnswers()){
            Long questionId = answer.getQuestion().getQuestionId();
            Question question = questionService.getQuestion(questionId);
            answer.setQuestion(question);
            answerRepository.save(answer);
            question.getAnswers().add(answer);
            existingEvaluation.getAnswers().add(answer);
        }
        //override remarks and status
        existingEvaluation.setRemarks(updatedEvaluation.getRemarks());
        existingEvaluation.setStatus(updatedEvaluation.getStatus());

        //remove evaluation from previous evaluator, replace with new one
        Employee previousEvaluator = existingEvaluation.getEvaluator();
        if (previousEvaluator != null){
            previousEvaluator.getGivenEvaluations().remove(existingEvaluation);
        }
        existingEvaluation.setEvaluator(newEvaluatorEmployee);

        //remove evaluation from previous evaluatee, replace with new one
        Employee previousEvaluatee = existingEvaluation.getEvaluatee();
        if (previousEvaluatee != null){
            previousEvaluatee.getReceivedEvaluations().remove(existingEvaluation);
        }
        existingEvaluation.setEvaluatee(newEvaluateeEmployee);

        //remove evaluation from previous survey form
        //remove survey form from existing evaluation
        SurveyForm previousSurveyForm = surveyFormService.getSurveyForm(existingEvaluation.getSurveyForm().getSurveyFormId());
        if (previousSurveyForm != null){
            previousSurveyForm.getEvaluations().remove(existingEvaluation);
            existingEvaluation.setSurveyForm(null);
        }

        newSurveyForm.getEvaluations().add(existingEvaluation);
        existingEvaluation.setSurveyForm(newSurveyForm);

        Evaluation savedEvaluation = evaluationRepository.save(existingEvaluation);
        System.out.println(savedEvaluation.getSurveyForm().getSurveyFormId());
        System.out.println(savedEvaluation.getSurveyForm().getEvaluations().get(0).getEvaluationId());
        return savedEvaluation;
    }

    public void deleteEvaluation(Long evaluationId){
        Evaluation evaluationToDelete = getEvaluationById(evaluationId);

        evaluationToDelete.getCreator().getCreatedEvaluations().remove(evaluationToDelete);
        evaluationToDelete.setCreator(null);
        evaluationToDelete.getEvaluatee().getReceivedEvaluations().remove(evaluationToDelete);
        evaluationToDelete.setEvaluatee(null);
        evaluationToDelete.getEvaluator().getGivenEvaluations().remove(evaluationToDelete);
        evaluationToDelete.setEvaluator(null);
        evaluationToDelete.getSurveyForm().getEvaluations().remove(evaluationToDelete);
        evaluationToDelete.setSurveyForm(null);

        for (Answer answer : evaluationToDelete.getAnswers()){
            answer.getQuestion().getAnswers().remove(answer);
            answer.setQuestion(null);
            answerRepository.delete(answer);
        }

        evaluationToDelete.setAnswers(null);

        evaluationRepository.delete(evaluationToDelete);
    }
}