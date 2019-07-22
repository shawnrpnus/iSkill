package com.iskill.backend.repositories;

import com.iskill.backend.models.Role;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoleRepository extends CrudRepository<Role, Long> {

    Optional<Role> findByName(String name);
    Optional<Role> findByRoleId(Long roleId);

    @Override
    List<Role> findAll();
}
