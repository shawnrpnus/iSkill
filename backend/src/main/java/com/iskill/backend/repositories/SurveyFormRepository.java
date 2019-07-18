package com.iskill.backend.repositories;

import com.iskill.backend.models.SurveyForm;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SurveyFormRepository extends CrudRepository<SurveyForm, Long> {

    @Override
    List<SurveyForm> findAll();

    Optional<SurveyForm> findBySurveyFormNameIgnoreCase(String formName);

    List<SurveyForm> findSurveyFormByCreatorEmployeeId(Long employeeId);
}
