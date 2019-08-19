package com.iskill.backend.controllers;

import com.iskill.backend.models.Employee;
import com.iskill.backend.request.LoginRequest;
import com.iskill.backend.response.JWTLoginSuccessResponse;
import com.iskill.backend.security.JwtTokenProvider;
import com.iskill.backend.services.EmployeeService;
import com.iskill.backend.services.ValidationService;
import com.iskill.backend.validators.EmployeeValidator;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Map;

import static com.iskill.backend.security.SecurityConstants.TOKEN_PREFIX;

@RestController
@RequestMapping("/api/employee")
@CrossOrigin(origins = "http://localhost:3000")
public class EmployeeController {

    private final EmployeeService employeeService;
    private final ValidationService validationService;

    private final JwtTokenProvider jwtTokenProvider;

    private final AuthenticationManager authenticationManager;

    private final EmployeeValidator employeeValidator;

    public EmployeeController(EmployeeService employeeService, ValidationService validationService, JwtTokenProvider jwtTokenProvider, AuthenticationManager authenticationManager, EmployeeValidator employeeValidator) {

        this.employeeService = employeeService;
        this.validationService = validationService;
        this.jwtTokenProvider = jwtTokenProvider;
        this.authenticationManager = authenticationManager;
        this.employeeValidator = employeeValidator;
    }

    @PostMapping("/login")
    public ResponseEntity<?> employeeLogin(@Valid @RequestBody LoginRequest loginRequest, BindingResult result) {
        ResponseEntity<Map<String, String>> errorMapRsp = validationService.generateErrorMapResponse(result);
        if (errorMapRsp != null) {
            return errorMapRsp;
        }

        //authenticationManager is configured to use CustomEmployeeService in SecurityConfig
        //if authentication fails, exception is caught, then commence() method in JwtAuthenticationEntryPoint is called
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = TOKEN_PREFIX + jwtTokenProvider.generateToken(authentication);
        System.out.println(jwt);

        return ResponseEntity.ok(new JWTLoginSuccessResponse(true, jwt));

    }

    @PostMapping("/register")
    public ResponseEntity<?> employeeRegister(@Valid @RequestBody Employee newEmployee, BindingResult result) {
//        employeeValidator.validate(newEmployee, result);
        ResponseEntity<Map<String, String>> errorMapRsp = validationService.generateErrorMapResponse(result);
        if (errorMapRsp != null) {
            return errorMapRsp;
        }

        Employee createdNewEmployee = employeeService.createNewEmployee(newEmployee);
        return new ResponseEntity<>(createdNewEmployee, HttpStatus.CREATED);
    }

    @GetMapping("/getEmployeesForManager/{managerId}")
    public ResponseEntity<?> getEmployeesForManager(@PathVariable Long managerId){
        return new ResponseEntity<>(employeeService.getEmployeesForManager(managerId), HttpStatus.OK);

    }
}
