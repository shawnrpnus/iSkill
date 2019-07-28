package com.iskill.backend.controllers;

import com.iskill.backend.models.Employee;
import com.iskill.backend.models.Role;
import com.iskill.backend.request.LoginRequest;
import com.iskill.backend.request.RegisterEmployeeRequest;
import com.iskill.backend.response.JWTLoginSuccessResponse;
import com.iskill.backend.security.JwtAuthenticationEntryPoint;
import com.iskill.backend.security.JwtTokenProvider;
import com.iskill.backend.services.EmployeeService;
import com.iskill.backend.services.ValidationService;
import io.jsonwebtoken.Header;
import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.impl.crypto.JwtSignatureValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.oauth2.resource.OAuth2ResourceServerProperties;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;

import javax.validation.Valid;
import javax.validation.Validation;
import javax.xml.ws.Response;
import java.util.Map;

import static com.iskill.backend.security.SecurityConstants.TOKEN_PREFIX;

@RestController
@RequestMapping("/api/employee")
@CrossOrigin(origins = "http://localhost:3000")
public class EmployeeController {

    private final EmployeeService employeeService;
    private final ValidationService validationService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private AuthenticationManager authenticationManager;

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
        System.out.println("didrun");
        System.out.println(loginRequest.getUsername() + " " + loginRequest.getPassword());
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );
        System.out.println("authentication" + authentication);
        System.out.println("didrun1");

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = TOKEN_PREFIX + jwtTokenProvider.generateToken(authentication);
        System.out.println(jwt);

        return ResponseEntity.ok(new JWTLoginSuccessResponse(true, jwt));

//        String username = loginRequest.getUsername();
//        String password = loginRequest.getPassword();
//        Employee employeeLoggedIn = employeeService.getEmployeeByUsernameAndPassword(username, password);
//        if(employeeLoggedIn != null) {
//            BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
//            if(bCryptPasswordEncoder.matches(password,employeeLoggedIn.getPassword())) {
//                return new ResponseEntity<>(employeeLoggedIn, HttpStatus.OK);
//            }
//        }
//        return null;
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

    @GetMapping("/getEmployeesForManager/{managerId}")
    public ResponseEntity<?> getEmployeesForManager(@PathVariable Long managerId){
        return new ResponseEntity<>(employeeService.getEmployeesForManager(managerId), HttpStatus.OK);

    }
}
