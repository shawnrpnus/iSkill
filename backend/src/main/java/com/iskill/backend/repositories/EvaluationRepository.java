package com.iskill.backend.repositories;

import com.iskill.backend.models.Category;
import com.iskill.backend.models.Evaluation;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EvaluationRepository extends CrudRepository<Evaluation, Long> {

    List<Evaluation> findEvaluationByEvaluatorEmployeeId(Long employeeId);

    List<Evaluation> findEvaluationByEvaluateeEmployeeId(Long employeeId);

    List<Evaluation> findEvaluationByCreatorEmployeeId(Long employeeId);
}
