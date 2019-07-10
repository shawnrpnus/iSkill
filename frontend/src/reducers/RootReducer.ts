import { combineReducers } from "redux";
import surveyFormReducer from "./surveyFormReducer";
import errorReducer from "./errorReducer";
import toolProcessReducer from "./toolProcessReducer";

export default combineReducers({
	surveyForm: surveyFormReducer,
	errors: errorReducer,
	toolProcess: toolProcessReducer
});
