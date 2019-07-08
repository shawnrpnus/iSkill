package com.iskill.backend.repositories;

import com.iskill.backend.models.SurveyForm;
import com.iskill.backend.models.ToolProcess;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ToolProcessRepository extends CrudRepository<ToolProcess, Long> {

    Optional<ToolProcess> findByToolProcessName(String name);

    Optional<ToolProcess> findByToolProcessId(Long id);

    List<ToolProcess> findAll();


}
