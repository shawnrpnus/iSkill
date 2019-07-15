package com.iskill.backend.controllers;

import com.iskill.backend.models.Question;
import com.iskill.backend.services.QuestionService;
import com.iskill.backend.services.ValidationService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Map;

@RestController
@RequestMapping("/api/question")
@CrossOrigin(origins = "http://localhost:3000")
public class QuestionController {

    private final QuestionService questionService;
    private final ValidationService validationService;

    public QuestionController(QuestionService questionService, ValidationService validationService) {
        this.questionService = questionService;
        this.validationService = validationService;
    }

}
