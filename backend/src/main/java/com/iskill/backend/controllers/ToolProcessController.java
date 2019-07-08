package com.iskill.backend.controllers;

import com.iskill.backend.services.ToolProcessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/toolProcess")
@CrossOrigin
public class ToolProcessController {

    private final ToolProcessService toolProcessService;

    public ToolProcessController(ToolProcessService toolProcessService) {
        this.toolProcessService = toolProcessService;
    }

    @GetMapping("")
    public ResponseEntity<?> getAllToolProcess(){
        return new ResponseEntity<>(toolProcessService.getAllToolProcess(), HttpStatus.OK);
    }
}
