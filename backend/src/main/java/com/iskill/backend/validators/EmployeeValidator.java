package com.iskill.backend.validators;

import com.iskill.backend.models.Employee;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class EmployeeValidator implements Validator {

    @Override
    public boolean supports(Class<?> aClass) {
        return Employee.class.equals(aClass);
    }

    @Override
    public void validate(Object object, Errors errors) {
        Employee employee = (Employee) object;

        if(employee.getPassword().length() < 6) {
            errors.rejectValue("password", "Length", "Password must be at least 6 characters!");
        }
    }
}
