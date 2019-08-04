package com.iskill.backend.controllers;

import com.iskill.backend.models.Evaluation;
import com.iskill.backend.models.EvaluationStatusEnum;
import com.iskill.backend.request.AssignEvaluationRequest;
import com.iskill.backend.request.CreateEvaluationRequest;
import com.iskill.backend.request.UpdateEvaluationRequest;
import com.iskill.backend.services.EvaluationService;
import com.iskill.backend.services.ValidationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/evaluation")
@CrossOrigin(origins = "http://localhost:3000")
public class EvaluationController {

    private final EvaluationService evaluationService;
    private final ValidationService validationService;

    public EvaluationController(EvaluationService evaluationService, ValidationService validationService) {
        this.evaluationService = evaluationService;
        this.validationService = validationService;
    }

    @PostMapping("/createEvaluation")
    public ResponseEntity<?> createEvaluation(@Valid @RequestBody CreateEvaluationRequest createEvaluationRequest, BindingResult result){
        ResponseEntity<Map<String, String>> errorMapRsp = validationService.generateErrorMapResponse(result);
        if (errorMapRsp != null) {
            return errorMapRsp;
        }
        Evaluation newEvaluation = createEvaluationRequest.getEvaluation();
        Long creatorEmployeeId = createEvaluationRequest.getCreatorEmployeeId();
        Long evaluatorEmployeeId = createEvaluationRequest.getEvaluatorEmployeeId();
        Long evaluateeEmployeeId = createEvaluationRequest.getEvaluateeEmployeeId();
        Long surveyFormId = createEvaluationRequest.getSurveyFormId();
        Evaluation createdEvaluation = evaluationService.createNewEvaluation(newEvaluation, creatorEmployeeId, evaluatorEmployeeId,
                evaluateeEmployeeId, surveyFormId);
        return new ResponseEntity<>(createdEvaluation, HttpStatus.CREATED);
    }

    @PostMapping("/assignEvaluations")
    public ResponseEntity<?> assignEvaluation(@Valid @RequestBody AssignEvaluationRequest assignEvaluationRequest, BindingResult result) {
        ResponseEntity<Map<String, String>> errorMapRsp = validationService.generateErrorMapResponse(result);
        if (errorMapRsp != null) {
            return errorMapRsp;
        }
        Long creatorEmployeeId = assignEvaluationRequest.getCreatorEmployeeId();
        Long[] evaluatorEmployeeIds = assignEvaluationRequest.getEvaluatorEmployeeIds();
        Long[] evaluateeEmployeeIds = assignEvaluationRequest.getEvaluateeEmployeeIds();
        Long surveyFormId = assignEvaluationRequest.getSurveyFormId();
        Evaluation[] createdEvaluations = new Evaluation[evaluateeEmployeeIds.length];
        for(int i = 0; i < evaluatorEmployeeIds.length; i++) {
            createdEvaluations[i] = evaluationService.createNewEvaluation(new Evaluation("TEST", EvaluationStatusEnum.NEW), creatorEmployeeId, evaluatorEmployeeIds[i],
                    evaluateeEmployeeIds[i], surveyFormId);
        }

        return new ResponseEntity<>(createdEvaluations, HttpStatus.CREATED);
    }

    @GetMapping("/{evaluationId}")
    public ResponseEntity<?> getEvaluationById(@PathVariable Long evaluationId){
        Evaluation evaluation = evaluationService.getEvaluationById(evaluationId);
        return new ResponseEntity<>(evaluation, HttpStatus.OK);
    }

    @GetMapping("/getGivenEvaluations")
    public ResponseEntity<?> getGivenEvaluationsForEmployee(@RequestParam Long employeeId){
        List<Evaluation> evalList = evaluationService.getEmployeeGivenEvaluations(employeeId);
        return new ResponseEntity<>(evalList, HttpStatus.OK);
    }

    @GetMapping("/getReceivedEvaluations")
    public ResponseEntity<?> getReceivedEvaluationsForEmployee(@RequestParam Long employeeId){
        List<Evaluation> evalList = evaluationService.getEmployeeReceivedEvaluations(employeeId);
        return new ResponseEntity<>(evalList, HttpStatus.OK);
    }

    @GetMapping("/getCreatedEvaluations")
    public ResponseEntity<?> getCreatedEvaluationsForEmployee(@RequestParam Long employeeId){
        List<Evaluation> evalList = evaluationService.getEmployeeCreatedEvaluations(employeeId);
        return new ResponseEntity<>(evalList, HttpStatus.OK);
    }

    @PostMapping("/updateEvaluation")
    public ResponseEntity<?> updateEvaluation(@Valid @RequestBody UpdateEvaluationRequest updateEvaluationRequest, BindingResult result){
        Evaluation incomingEvaluation = updateEvaluationRequest.getEvaluation();
        Long newEvaluatorEmployeeId = updateEvaluationRequest.getNewEvaluatorEmployeeId();
        Long newEvaluateeEmployeeId = updateEvaluationRequest.getNewEvaluateeEmployeeId();
        Long newSurveyFormId = updateEvaluationRequest.getNewSurveyFormId();

        Evaluation updatedEvaluation = evaluationService.updateEvaluation(incomingEvaluation, newEvaluatorEmployeeId, newEvaluateeEmployeeId, newSurveyFormId);

        return new ResponseEntity<>(updatedEvaluation, HttpStatus.OK);

    }

    @DeleteMapping("/deleteEvaluation/{evaluationId}")
    public ResponseEntity<?> deleteEvaluation(@PathVariable Long evaluationId){
        evaluationService.deleteEvaluation(evaluationId);
        Map<String, String> deleteMsg = new HashMap<>();
        deleteMsg.put("EvaluationDeleted", evaluationId.toString());

        return new ResponseEntity<>(deleteMsg, HttpStatus.OK);
    }
}
