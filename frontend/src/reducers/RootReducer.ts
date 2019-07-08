import { combineReducers } from "redux";
import surveyFormReducer from "./surveyFormReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
	surveyForm: surveyFormReducer,
	errors: errorReducer
});
