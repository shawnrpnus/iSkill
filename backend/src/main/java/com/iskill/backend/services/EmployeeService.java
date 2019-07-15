package com.iskill.backend.services;

import com.iskill.backend.exceptions.Employee.EmployeeNotFound.EmployeeNotFoundException;
import com.iskill.backend.models.Employee;
import com.iskill.backend.models.Evaluation;
import com.iskill.backend.repositories.EmployeeRepository;
import com.iskill.backend.repositories.SurveyFormRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    @Autowired
    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    public Employee getEmployeeById (Long employeeId){
        return employeeRepository.findById(employeeId).orElseThrow(
                () -> new EmployeeNotFoundException(String.format("Employee with id: '%s' not found!", employeeId))
        );
    }
}
