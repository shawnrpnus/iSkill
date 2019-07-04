package com.iskill.backend.services;

import com.iskill.backend.exceptions.Question.QuestionCannotDelete.QuestionCannotDeleteException;
import com.iskill.backend.exceptions.Question.QuestionNotFound.QuestionNotFoundException;
import com.iskill.backend.models.Question;
import com.iskill.backend.repositories.QuestionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class QuestionService {

    private final QuestionRepository questionRepository;

    public QuestionService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    public Question getQuestion(Long questionId){
        return questionRepository.findById(questionId).orElseThrow(
                () -> new QuestionNotFoundException(String.format("Question with id '%s' not found", questionId))
        );
    }
    public Question updateQuestion(Question question){
        Question questionToUpdate = getQuestion(question.getQuestionId());
        questionToUpdate.setQuestionText(question.getQuestionText());
        questionToUpdate.setQuestionSequence(question.getQuestionSequence());
        return questionToUpdate;
    }

    public Long deleteQuestion(Long questionId){
        Question question = getQuestion(questionId);

        if (question.getAnswers() != null && question.getAnswers().size()>0){
            throw new QuestionCannotDeleteException(String.
                    format("Question with id '%s' cannot be deleted as it has already been answered", questionId));
        }

        //remove question from category in surveyFormService
        question.setCategory(null);

        questionRepository.delete(question);

        return questionId;
    }

}
