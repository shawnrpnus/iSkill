package com.iskill.backend.services;

import com.iskill.backend.exceptions.Employee.EmployeeNotFound.EmployeeNotFoundException;
import com.iskill.backend.models.Category;
import com.iskill.backend.models.Employee;
import com.iskill.backend.models.Role;
import com.iskill.backend.models.ToolProcess;
import com.iskill.backend.repositories.CategoryRepository;
import com.iskill.backend.repositories.EmployeeRepository;
import com.iskill.backend.repositories.RoleRepository;
import com.iskill.backend.repositories.ToolProcessRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class StartUpInit {

    private final EmployeeRepository employeeRepository;
    private final RoleRepository roleRepository;
    private final ToolProcessRepository toolProcessRepository;
    private final CategoryRepository categoryRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public StartUpInit(EmployeeRepository employeeRepository,
                       RoleRepository roleRepository,
                       ToolProcessRepository toolProcessRepository, CategoryRepository categoryRepository) {
        this.employeeRepository = employeeRepository;
        this.roleRepository = roleRepository;
        this.toolProcessRepository = toolProcessRepository;
        this.categoryRepository = categoryRepository;
    }

    @PostConstruct
    public void init(){
        createManagerIfNotFound();
        createToolProcessIfNotFound();
    }

    private void createManagerIfNotFound(){
        Role managerRole = createRoleIfNotFound("ROLE_MANAGER");
        Employee employee = employeeRepository.findByUsername("manager");
        if(employee == null) {
            String password = "password";
            String hashedPassword = bCryptPasswordEncoder.encode(password);
            employee = new Employee("Manager", "manager", hashedPassword, "Cost Center 1", "shift1", managerRole);

        };
        employeeRepository.save(employee);
    }

    private Role createRoleIfNotFound(String name){
        Role role = roleRepository.findByName(name).orElse(new Role(name));
        roleRepository.save(role);
        return role;
    }

    private void createToolProcessIfNotFound() {
        ToolProcess toolProcess1 = toolProcessRepository.findByToolProcessName("Tool 1").orElse(new ToolProcess("Tool 1"));
        ToolProcess toolProcess2 = toolProcessRepository.findByToolProcessName("Tool 2").orElse(new ToolProcess("Tool 2"));
        toolProcessRepository.save(toolProcess1);
        toolProcessRepository.save(toolProcess2);
    }

}
