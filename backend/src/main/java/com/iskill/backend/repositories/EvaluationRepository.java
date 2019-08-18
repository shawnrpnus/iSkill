package com.iskill.backend.repositories;

import com.iskill.backend.models.Category;
import com.iskill.backend.models.Evaluation;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EvaluationRepository extends CrudRepository<Evaluation, Long> {

    //find evaluations assigned to me (evaluator == evaluatee)
    List<Evaluation> findEvaluationsByEvaluatorEmployeeIdAndEvaluateeEmployeeId(Long evaluatorEmployeeId, Long evaluateeEmployeeId);

    //find evaluations i have done for others (creator == evaluator)
    List<Evaluation> findEvaluationsByCreatorEmployeeIdAndEvaluatorEmployeeId(Long creatorId, Long evaluatorId);

    //find evaluations i assigned to others (creator != evaluator)
    List<Evaluation> findEvaluationsByCreatorEmployeeIdAndEvaluatorEmployeeIdNot(Long employeeId1, Long employeeId2);

    List<Evaluation> findEvaluationByEvaluateeEmployeeId(Long employeeId);
}
