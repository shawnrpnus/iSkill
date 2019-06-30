package com.iskill.backend.repositories;

import com.iskill.backend.models.SurveyForm;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FormRepository extends CrudRepository<SurveyForm, Long> {
}
