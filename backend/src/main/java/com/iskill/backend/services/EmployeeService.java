package com.iskill.backend.services;

import com.iskill.backend.exceptions.Employee.CreateNewEmployeeException.CreateNewEmployeeException;
import com.iskill.backend.exceptions.Employee.EmployeeNotFound.EmployeeNotFoundException;
import com.iskill.backend.models.Employee;
import com.iskill.backend.models.Evaluation;
import com.iskill.backend.models.Role;
import com.iskill.backend.repositories.EmployeeRepository;
import com.iskill.backend.repositories.RoleRepository;
import com.iskill.backend.repositories.SurveyFormRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final RoleRepository roleRepository;

    @Autowired
    public EmployeeService(EmployeeRepository employeeRepository, RoleRepository roleRepository) {

        this.employeeRepository = employeeRepository;
        this.roleRepository = roleRepository;
    }

    public Employee getEmployeeById (Long employeeId){
        return employeeRepository.findById(employeeId).orElseThrow(
                () -> new EmployeeNotFoundException(String.format("Employee with id: '%s' not found!", employeeId))
        );
    }

    public Employee getEmployeeByUsernameAndPassword(String username, String password) {
        return employeeRepository.findByUsernameAndPassword(username, password).orElseThrow(
                () -> new EmployeeNotFoundException(String.format("Employee with username: '%s' and password: '%s' not found!", username, password))
        );
    }

    public Employee createNewEmployee(Employee newEmployee) {
        checkForDuplicateUsername(newEmployee.getUsername());
        return employeeRepository.save(newEmployee);
    }

    private void checkForDuplicateUsername(String username) {
        Optional<Employee> employeeResult = employeeRepository.findByUsername(username);
        employeeResult.ifPresent(employee1 -> {
            throw new CreateNewEmployeeException("Employee Account with username '" + username + "' already exists! " +
                    "Please use a different username");
        }); //name already exist
    }
}
