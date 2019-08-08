package com.iskill.backend.controllers;

import com.iskill.backend.models.Evaluation;
import com.iskill.backend.models.SurveyForm;
import com.iskill.backend.services.EmployeeService;
import com.iskill.backend.services.SurveyFormService;
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
@RequestMapping("/api/surveyForm")
@CrossOrigin
public class SurveyFormController {

    private final SurveyFormService surveyFormService;
    private final ValidationService validationService;

    public SurveyFormController(SurveyFormService surveyFormService,
                                ValidationService validationService) {
        this.surveyFormService = surveyFormService;
        this.validationService = validationService;
    }

    @PostMapping("/createSurveyForm")
    public ResponseEntity<?> createNewSurveyForm(@Valid @RequestBody SurveyForm surveyForm, BindingResult result,
                                                 @RequestParam("creatorEmployeeId") Long creatorEmployeeId) {

        ResponseEntity<Map<String, String>> errorMapRsp = validationService.generateErrorMapResponse(result);
        if (errorMapRsp != null) {
            return errorMapRsp;
        }

        SurveyForm createdSurveyForm = surveyFormService.createNewSurveyForm(surveyForm, creatorEmployeeId);
        return new ResponseEntity<>(createdSurveyForm, HttpStatus.CREATED);
    }

    @GetMapping("/{surveyFormId}")
    public ResponseEntity<?> getSurveyForm(@PathVariable Long surveyFormId){
        SurveyForm surveyForm = surveyFormService.getSurveyForm(surveyFormId);

        return new ResponseEntity<>(surveyForm, HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllSurveyForms(){
        List<SurveyForm> allForms = surveyFormService.getAllSurveyForms();
        for(SurveyForm s: allForms) {
            for(Evaluation e: s.getEvaluations()) {
                e.setSurveyForm(null);
            }

        }
        return new ResponseEntity<>(allForms, HttpStatus.OK);
    }

    @GetMapping("/all/{employeeId}")
    public ResponseEntity<?> getAllSurveyFormsByEmployeeId(@PathVariable Long employeeId){
        return new ResponseEntity<>(surveyFormService.getAllSurveyFormsByEmployeeId(employeeId), HttpStatus.OK);
    }

    @PostMapping("/updateSurveyForm")
    public ResponseEntity<?> updateSurveyForm(@Valid @RequestBody SurveyForm surveyForm,
                                              BindingResult result) {
        ResponseEntity<Map<String, String>> errorMapRsp = validationService.generateErrorMapResponse(result);
        if (errorMapRsp != null) {
            return errorMapRsp;
        }

        SurveyForm updatedSurveyForm = surveyFormService.updateSurveyForm(surveyForm);

        return new ResponseEntity<>(updatedSurveyForm, HttpStatus.OK);
    }

    @DeleteMapping("/deleteSurveyForm")
    public ResponseEntity<?> deleteSurveyForm(@RequestParam("surveyFormId") Long surveyFormId){
        String deletedSurveyFormName = surveyFormService.deleteSurveyForm(surveyFormId);

        HashMap<String, String> deleteSuccessMessage = new HashMap<>();

        deleteSuccessMessage.put("SurveyFormDeleted", deletedSurveyFormName);

        return new ResponseEntity<>(deleteSuccessMessage, HttpStatus.OK);
    }

}
