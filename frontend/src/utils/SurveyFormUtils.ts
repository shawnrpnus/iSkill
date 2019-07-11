import SurveyFormModel from "../models/SurveyForm";
import CategoryModel from "../models/Category";
import QuestionModel from "../models/Question";

export const COL_ONE_SIZE = 8;
export const COL_TWO_SIZE = 8;
export const COL_THREE_SIZE = 4;
export const COL_FOUR_SIZE = 4;

export const getExistingCategoryByCategoryId = (surveyForm: SurveyFormModel | undefined, categoryId: number) => {
    return surveyForm
        ? surveyForm.categories.find(category => category.categoryId === categoryId)
        : undefined;
};

export const getExistingQuestionByQuestionId = (category: CategoryModel | undefined, questionId: number) => {
    return category ? category.questions.find(question => question.questionId === questionId) : undefined;
};

export const sortCategoriesByCategorySequence = (categoryList: Array<CategoryModel>) => {
    return categoryList.sort((a, b) => {
        if (a.categorySequence && b.categorySequence) {
            return a.categorySequence - b.categorySequence;
        } else {
            return 0;
        }
    });
};

export const sortQuestionsByQuestionSequence = (questionList: Array<QuestionModel>) => {
    return questionList.sort((a, b) => {
        if (a.questionSequence && b.questionSequence) {
            return a.questionSequence - b.questionSequence;
        } else {
            return 0;
        }
    });
};

export const getCategoryTotalMaxScore = (questionList: Array<any>) => {
    return questionList.reduce((sum: number, currentQuestion) => sum + parseInt(currentQuestion.upperBound), 0)
}

