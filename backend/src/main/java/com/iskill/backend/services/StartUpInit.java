package com.iskill.backend.services;

import com.iskill.backend.models.Category;
import com.iskill.backend.models.Employee;
import com.iskill.backend.models.Role;
import com.iskill.backend.models.ToolProcess;
import com.iskill.backend.repositories.CategoryRepository;
import com.iskill.backend.repositories.EmployeeRepository;
import com.iskill.backend.repositories.RoleRepository;
import com.iskill.backend.repositories.ToolProcessRepository;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class StartUpInit {

    private final EmployeeRepository employeeRepository;
    private final RoleRepository roleRepository;
    private final ToolProcessRepository toolProcessRepository;
    private final CategoryRepository categoryRepository;

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
        createTestCategoryIfNotFound();

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

    private ToolProcess createToolProcessIfNotFound() {
        ToolProcess toolProcess = toolProcessRepository.findByToolProcessName("Tool 1").orElse(new ToolProcess("Tool 1"));
        toolProcessRepository.save(toolProcess);
        return toolProcess;
    }

    private void createTestCategoryIfNotFound() {
        Category category = categoryRepository.findByCategoryNameIgnoreCase("TestCategory").orElse(new Category("TestCategory"));
        categoryRepository.save(category);
    }
}
