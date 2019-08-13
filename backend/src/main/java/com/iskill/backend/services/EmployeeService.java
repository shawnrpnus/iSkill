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
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final RoleRepository roleRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public EmployeeService(EmployeeRepository employeeRepository, RoleRepository roleRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {

        this.employeeRepository = employeeRepository;
        this.roleRepository = roleRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    public Employee getEmployeeById (Long employeeId){
        return employeeRepository.findById(employeeId).orElseThrow(
                () -> new EmployeeNotFoundException(String.format("Employee with id: '%s' not found!", employeeId))
        );
    }

    public List<Employee> getEmployeesForManager(Long managerId){
        Employee manager = getEmployeeById(managerId);
        String costCenter = manager.getCostCenter();
        return employeeRepository.findByCostCenter(costCenter);
    }

    public Employee getEmployeeByUsernameAndPassword(String username, String password) {
        return employeeRepository.findByUsernameAndPassword(username, password).orElseThrow(
                () -> new EmployeeNotFoundException(String.format("Employee with username: '%s' and password: '%s' not found!", username, password))
        );
    }

    public Employee createNewEmployee(Employee newEmployee) {
        checkForDuplicateUsername(newEmployee.getUsername());
        String password = newEmployee.getPassword();
        String hashedPassword = bCryptPasswordEncoder.encode(password);
//        System.out.println(hashedPassword);
        newEmployee.setPassword(hashedPassword);
        String confirmPassword = newEmployee.getConfirmPassword();
        String confirmedHashed = bCryptPasswordEncoder.encode(confirmPassword);
        newEmployee.setConfirmPassword(confirmedHashed);
        return employeeRepository.save(newEmployee);
    }

    private void checkForDuplicateUsername(String username) {
        Optional<Employee> employeeResult = Optional.ofNullable(employeeRepository.findByUsername(username));
        employeeResult.ifPresent(employee1 -> {
            throw new CreateNewEmployeeException("Employee Account with username '" + username + "' already exists! " +
                    "Please use a different username");
        }); //name already exist
    }
}
