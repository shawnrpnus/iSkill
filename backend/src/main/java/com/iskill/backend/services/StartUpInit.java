package com.iskill.backend.services;

import com.iskill.backend.models.Employee;
import com.iskill.backend.models.Role;
import com.iskill.backend.repositories.EmployeeRepository;
import com.iskill.backend.repositories.RoleRepository;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class StartUpInit {

    private final EmployeeRepository employeeRepository;
    private final RoleRepository roleRepository;

    public StartUpInit(EmployeeRepository employeeRepository, RoleRepository roleRepository) {
        this.employeeRepository = employeeRepository;
        this.roleRepository = roleRepository;
    }

    @PostConstruct
    public void init(){
        createManagerIfNotFound();
    }

    private void createManagerIfNotFound(){
        Role managerRole = createRoleIfNotFound("ROLE_MANAGER");
        Employee employee = employeeRepository.findByUsername("manager")
                .orElse(new Employee("Manager", "manager", "password", "Cost Center 1", "shift1", managerRole));
        employeeRepository.save(employee);
    }

    private Role createRoleIfNotFound(String name){
        Role role = roleRepository.findByName(name).orElse(new Role(name));
        roleRepository.save(role);
        return role;
    }
}
