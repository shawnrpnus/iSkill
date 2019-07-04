package com.iskill.backend.services;

import com.iskill.backend.exceptions.Category.CategoryNotFound.CategoryNotFoundException;
import com.iskill.backend.exceptions.Question.QuestionCannotDelete.QuestionCannotDeleteException;
import com.iskill.backend.models.Category;
import com.iskill.backend.models.Question;
import com.iskill.backend.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final QuestionService questionService;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository, @Lazy QuestionService questionService) {
        this.categoryRepository = categoryRepository;
        this.questionService = questionService;
    }

    public Category updateCategory(Category category){
        Category categoryToUpdate = getCategory(category.getCategoryId());
        categoryToUpdate.setCategorySequence(category.getCategorySequence());
        categoryToUpdate.setCategoryName(category.getCategoryName());
        return categoryToUpdate;
    }

    public Category getCategory(Long categoryId){
        return categoryRepository.findById(categoryId).orElseThrow(
                () -> new CategoryNotFoundException(String.format("Category with id '%s' Not Found", categoryId))
        );
    }
    public void deleteCategory(Long categoryId){
        Category categoryToDelete = getCategory(categoryId);

        for (Question question: categoryToDelete.getQuestions()){
            if (question.getAnswers() != null && question.getAnswers().size() > 0){
                throw new QuestionCannotDeleteException(String.format(
                        "Question id '%s' in Category id '%s' has been answered and cannot be deleted",
                        question.getQuestionId(), categoryId));
            }
        }

        //once here, all questions have no answers

        for (Question question: categoryToDelete.getQuestions()){
            question.setCategory(null);
            questionService.deleteQuestion(question.getQuestionId());
        }
        categoryToDelete.setQuestions(null);

        categoryToDelete.setSurveyForm(null);
        //manually remove from survey form in surveyFormService

        categoryRepository.delete(categoryToDelete);

    }



}
