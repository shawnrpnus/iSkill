package com.iskill.backend.services;

import com.iskill.backend.exceptions.Employee.CreateNewEmployeeException.CreateNewEmployeeException;
import com.iskill.backend.exceptions.Employee.EmployeeNotFound.EmployeeNotFoundException;
import com.iskill.backend.exceptions.Employee.PasswordsDoNotMatchException.PasswordsDoNotMatchException;
import com.iskill.backend.models.Employee;
import com.iskill.backend.repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public EmployeeService(EmployeeRepository employeeRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {

        this.employeeRepository = employeeRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    public Employee getEmployeeById(Long employeeId) {
        return employeeRepository.findById(employeeId).orElseThrow(
                () -> new EmployeeNotFoundException(String.format("Employee with id: '%s' not found!", employeeId))
        );
    }

    public List<Employee> getEmployeesForManager(Long managerId) {
        Employee manager = getEmployeeById(managerId);
        String costCenter = manager.getCostCenter();
        return employeeRepository.findByCostCenter(costCenter);
    }

    public Employee createNewEmployee(Employee newEmployee) {
        checkForDuplicateUsername(newEmployee.getUsername());
        String password = newEmployee.getPassword();
        String hashedPassword = bCryptPasswordEncoder.encode(password);
        newEmployee.setPassword(hashedPassword);
        String confirmPassword = newEmployee.getConfirmPassword();
        if (!password.equals(confirmPassword)) {
            throw new PasswordsDoNotMatchException("Passwords do not match!");
        }
        return employeeRepository.save(newEmployee);
    }

    private void checkForDuplicateUsername(String username) {
        Optional<Employee> employeeResult = Optional.ofNullable(employeeRepository.findByUsername(username));
        employeeResult.ifPresent(employee1 -> {
            throw new CreateNewEmployeeException("Username '" + username + "' is already taken");
        }); //name already exist
    }
}
