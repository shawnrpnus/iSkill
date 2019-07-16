package com.iskill.backend.repositories;

import com.iskill.backend.models.Answer;
import com.iskill.backend.models.Category;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AnswerRepository extends CrudRepository<Answer, Long> {

}
