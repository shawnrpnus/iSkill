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
        Role employeeRole = createRoleIfNotFound(("EMPLOYEE"));
        Employee manager = employeeRepository.findByUsername("manager");
        if(manager == null) {
            String password = "password";
            String hashedPassword = bCryptPasswordEncoder.encode(password);
            String confirmedHashed = bCryptPasswordEncoder.encode(password);
            manager = new Employee("Manager", "manager", hashedPassword, confirmedHashed, "Cost Center 1", "shift1", managerRole);

        }
        employeeRepository.save(manager);
        Employee employee = employeeRepository.findByUsername("employee");
        if (employee == null){
            String password = "password";
            String hashedPassword = bCryptPasswordEncoder.encode(password);
            String confirmedHashed = bCryptPasswordEncoder.encode(password);
            employee = new Employee("Employee", "employee", hashedPassword, confirmedHashed, "Cost Center 1", "shift1", employeeRole);
        }
        employeeRepository.save(employee);
    }

    private Role createRoleIfNotFound(String name){
        Role role = roleRepository.findByName(name).orElse(new Role(name));
        roleRepository.save(role);
        return role;
    }

    private void createToolProcessIfNotFound() {
        for (int i = 1; i <= 10; i++){
            ToolProcess t = toolProcessRepository.findByToolProcessName("Tool " + i).orElse(new ToolProcess("Tool " + i));
            toolProcessRepository.save(t);
        }
    }

}
