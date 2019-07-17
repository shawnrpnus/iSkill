package com.iskill.backend.services;

import com.iskill.backend.exceptions.Evaluation.EvaluationCannotDelete.EvaluationCannotDeleteException;
import com.iskill.backend.exceptions.Evaluation.EvaluationNotFound.EvaluationNotFoundException;
import com.iskill.backend.models.Answer;
import com.iskill.backend.models.Employee;
import com.iskill.backend.models.Evaluation;
import com.iskill.backend.models.SurveyForm;
import com.iskill.backend.repositories.AnswerRepository;
import com.iskill.backend.repositories.EvaluationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class EvaluationService {

    private final EvaluationRepository evaluationRepository;
    private final AnswerRepository answerRepository;
    private final EmployeeService employeeService;
    private final SurveyFormService surveyFormService;

    public EvaluationService(EvaluationRepository evaluationRepository, AnswerRepository answerRepository, EmployeeService employeeService, SurveyFormService surveyFormService) {
        this.evaluationRepository = evaluationRepository;
        this.answerRepository = answerRepository;
        this.employeeService = employeeService;
        this.surveyFormService = surveyFormService;
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
            answer.getQuestion().getAnswers().add(answer);
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
        return evaluationRepository.findEvaluationByEvaluateeEmployeeId(evaluateeEmployeeId);
    }

    public Evaluation updateEvaluation(Evaluation updatedEvaluation, Long newEvaluatorEmployeeId, Long newEvaluateeEmployeeId, Long newSurveyFormId){
        Evaluation existingEvaluation = getEvaluationById(updatedEvaluation.getEvaluationId());
        Employee newEvaluatorEmployee = employeeService.getEmployeeById(newEvaluatorEmployeeId);
        Employee newEvaluateeEmployee = employeeService.getEmployeeById(newEvaluateeEmployeeId);
        SurveyForm newSurveyForm = surveyFormService.getSurveyForm(newSurveyFormId);

        existingEvaluation.setEvaluatee(newEvaluateeEmployee);
        existingEvaluation.setEvaluator(newEvaluatorEmployee);
        existingEvaluation.setSurveyForm(newSurveyForm);
        existingEvaluation.setRemarks(updatedEvaluation.getRemarks());
        existingEvaluation.setStatus(updatedEvaluation.getStatus());

        Employee currentEvaluator = existingEvaluation.getEvaluator();
        if (currentEvaluator != null){
            currentEvaluator.getGivenEvaluations().remove(existingEvaluation);
        }
        Employee currentEvaluatee = existingEvaluation.getEvaluatee();
        if (currentEvaluatee != null){
            currentEvaluatee.getReceivedEvaluations().remove(existingEvaluation);
        }
        SurveyForm currentSurveyForm = existingEvaluation.getSurveyForm();
        if (currentSurveyForm != null){
            currentSurveyForm.getEvaluations().remove(existingEvaluation);
        }

        for (Answer answer : existingEvaluation.getAnswers()){
            answer.getQuestion().getAnswers().remove(answer);
            answer.setQuestion(null);
            answerRepository.delete(answer);
        }

        existingEvaluation.setAnswers(updatedEvaluation.getAnswers());
        for (Answer answer: existingEvaluation.getAnswers()){
            answer.getQuestion().getAnswers().add(answer);
            answerRepository.save(answer);
        }

        return evaluationRepository.save(existingEvaluation);
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