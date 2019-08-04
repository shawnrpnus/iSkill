package com.iskill.backend.services;

import com.iskill.backend.models.Employee;
import com.iskill.backend.repositories.EmployeeRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class CustomEmployeeService implements UserDetailsService {

    private final EmployeeRepository employeeRepository;

    public CustomEmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Employee employee = employeeRepository.findByUsername(username);

        if(employee==null) throw new UsernameNotFoundException("Employee not found");
        System.out.println(employee);
        return employee;
    }


    @Transactional
    public Employee loadUserById(Long id){
        Employee employee = employeeRepository.getByEmployeeId(id);
        if(employee==null) throw new UsernameNotFoundException("Employee not found");
        return employee;

    }
}