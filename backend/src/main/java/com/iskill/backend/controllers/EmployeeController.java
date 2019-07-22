package com.iskill.backend.controllers;

import com.iskill.backend.models.Employee;
import com.iskill.backend.models.Role;
import com.iskill.backend.request.LoginRequest;
import com.iskill.backend.request.RegisterEmployeeRequest;
import com.iskill.backend.services.EmployeeService;
import com.iskill.backend.services.ValidationService;
import org.springframework.web.bind.annotation.*;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;

import javax.validation.Valid;
import javax.validation.Validation;
import javax.xml.ws.Response;
import java.util.Map;

@RestController
@RequestMapping("/api/employee")
@CrossOrigin(origins = "http://localhost:3000")
public class EmployeeController {

    private final EmployeeService employeeService;
    private final ValidationService validationService;

    public EmployeeController(EmployeeService employeeService, ValidationService validationService) {

        this.employeeService = employeeService;
        this.validationService = validationService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> employeeLogin(@Valid @RequestBody LoginRequest loginRequest, BindingResult result) {
        ResponseEntity<Map<String, String>> errorMapRsp = validationService.generateErrorMapResponse(result);
        if (errorMapRsp != null) {
            return errorMapRsp;
        }
        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();
        Employee employeeLoggedIn = employeeService.getEmployeeByUsernameAndPassword(username, password);
        return new ResponseEntity<>(employeeLoggedIn, HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<?> employeeRegister(@Valid @RequestBody Employee newEmployee, BindingResult result) {
        ResponseEntity<Map<String, String>> errorMapRsp = validationService.generateErrorMapResponse(result);
        if (errorMapRsp != null) {
            return errorMapRsp;
        }
//        String username = registerEmployeeRequest.getUsername();
//        String name = registerEmployeeRequest.getName();
//        String password = registerEmployeeRequest.getPassword();
//        String costCenter = registerEmployeeRequest.getCostCenter();
//        String shift = registerEmployeeRequest.getShift();
//        Role role = registerEmployeeRequest.getRole();

//        Employee newEmployee = new Employee(name, username, password, costCenter, shift, role);
        Employee createdNewEmployee = employeeService.createNewEmployee(newEmployee);
        return new ResponseEntity<>(createdNewEmployee, HttpStatus.CREATED);
    }
}
