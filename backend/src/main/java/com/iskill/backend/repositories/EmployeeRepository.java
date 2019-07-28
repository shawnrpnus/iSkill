package com.iskill.backend.repositories;

import com.iskill.backend.models.Employee;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmployeeRepository extends CrudRepository<Employee, Long> {

    Employee findByUsername(String username);

    Employee getByEmployeeId(Long id);

    Optional<Employee> findByUsernameAndPassword(String username, String password);
}
