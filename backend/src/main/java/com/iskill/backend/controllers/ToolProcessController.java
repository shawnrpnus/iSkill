package com.iskill.backend.controllers;

import com.iskill.backend.models.Employee;
import com.iskill.backend.models.Evaluation;
import com.iskill.backend.models.ToolProcess;
import com.iskill.backend.response.EmployeeToolProcessScoreResponse;
import com.iskill.backend.response.Scores;
import com.iskill.backend.services.EmployeeService;
import com.iskill.backend.services.EvaluationService;
import com.iskill.backend.services.ToolProcessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/toolProcess")
@CrossOrigin
public class ToolProcessController {

    private final ToolProcessService toolProcessService;
    private final EmployeeService employeeService;
    private final EvaluationService evaluationService;

    public ToolProcessController(ToolProcessService toolProcessService, EmployeeService employeeService, EvaluationService evaluationService) {
        this.toolProcessService = toolProcessService;
        this.employeeService = employeeService;
        this.evaluationService = evaluationService;
    }

    @GetMapping("")
    public ResponseEntity<?> getAllToolProcess(){
        return new ResponseEntity<>(toolProcessService.getAllToolProcess(), HttpStatus.OK);
    }

    @GetMapping("/toolProcessScores")
    public ResponseEntity<?> getEmployeeToolProcessScore(@RequestParam Long managerId) {
        List<Employee> employeeByCostCenter = employeeService.getEmployeesForManager(managerId);
        List<ToolProcess> toolProcesses = toolProcessService.getAllToolProcess();

        List<EmployeeToolProcessScoreResponse> employeeToolProcessScoreResponses = new ArrayList<>();

        for(Employee e : employeeByCostCenter) {
            List<Evaluation> evaluationList = evaluationService.getEmployeeReceivedEvaluations(e.getEmployeeId());
            EmployeeToolProcessScoreResponse employeeToolProcessScoreResponse = new EmployeeToolProcessScoreResponse();
//            e.setPassword(null);
            employeeToolProcessScoreResponse.setEmployee(e);
            Map<String, Scores> toolProcessMap = new HashMap<>();

            for(ToolProcess t: toolProcesses) {
                toolProcessMap.put(t.getToolProcessName(), new Scores( new BigDecimal(0), new BigDecimal(0)));
            }

            for(Evaluation evaluation: evaluationList) {
                String toolProcessName = evaluation.getSurveyForm().getToolProcess().getToolProcessName();
                BigDecimal percentageScore = new BigDecimal((evaluation.getTotalScore()*100.0)/evaluation.getMaxScore());
                percentageScore = percentageScore.setScale(2, BigDecimal.ROUND_HALF_EVEN);
                if(evaluation.getEvaluatee().getEmployeeId() == evaluation.getEvaluator().getEmployeeId()) {
                    // means self evaluation
                    if(percentageScore.compareTo(toolProcessMap.get(toolProcessName).getSelf()) >= 0) {
                        toolProcessMap.get(toolProcessName).setSelf(percentageScore);
                    }
                } else {
                    // means manager evaluation
                    if(percentageScore.compareTo(toolProcessMap.get(toolProcessName).getManager()) >= 0) {
                        toolProcessMap.get(toolProcessName).setManager(percentageScore);
                    }
                }

            }
            employeeToolProcessScoreResponse.setKey(e.getEmployeeId());
            employeeToolProcessScoreResponse.setToolProcessScores(toolProcessMap);
            employeeToolProcessScoreResponses.add(employeeToolProcessScoreResponse);
        }

        return new ResponseEntity<>(employeeToolProcessScoreResponses, HttpStatus.OK);

    }
}
