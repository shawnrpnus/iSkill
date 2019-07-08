import { combineReducers } from "redux";
import createSurveyFormReducer from "./createSurveyFormReducer";
import errorReducer from "./errorReducer";
import toolProcessReducer from "./toolProcessReducer";

export default combineReducers({
	surveyForm: createSurveyFormReducer,
	errors: errorReducer,
	toolProcess: toolProcessReducer
});
