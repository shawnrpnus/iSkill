package com.iskill.backend.services;

import com.iskill.backend.exceptions.Category.CategoryNotFound.CategoryNotFoundException;
import com.iskill.backend.exceptions.Question.QuestionCannotDelete.QuestionCannotDeleteException;
import com.iskill.backend.exceptions.Question.QuestionNotFound.QuestionNotFoundException;
import com.iskill.backend.models.Category;
import com.iskill.backend.models.Question;
import com.iskill.backend.models.SurveyForm;
import com.iskill.backend.repositories.CategoryRepository;
import com.iskill.backend.repositories.QuestionRepository;
import org.springframework.stereotype.Service;

@Service
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final CategoryRepository categoryRepository;

    public QuestionService(QuestionRepository questionRepository, CategoryRepository categoryRepository) {
        this.questionRepository = questionRepository;
        this.categoryRepository = categoryRepository;
    }

    public Question createNewQuestion(Question question, SurveyForm surveyForm, String categoryName){
        Category category = categoryRepository.findByCategoryNameIgnoreCase(categoryName).orElseThrow(
                () -> new CategoryNotFoundException(String.format("Category '%s' not found", categoryName))
        );

        question.setSurveyForm(surveyForm);

        question.setCategory(category);
        category.getQuestions().add(question);

        return questionRepository.save(question);
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
        return questionRepository.save(questionToUpdate);
    }

    public Long deleteQuestion(Long questionId){
        Question question = getQuestion(questionId);

        if (question.getAnswers() != null && question.getAnswers().size()>0){
            throw new QuestionCannotDeleteException(String.
                    format("Question with id '%s' cannot be deleted as it has already been answered", questionId));
        }

        question.getSurveyForm().getQuestions().remove(question);
        question.setSurveyForm(null);
        question.getCategory().getQuestions().remove(question);
        question.setCategory(null);

        questionRepository.delete(question);

        return questionId;
    }

}
