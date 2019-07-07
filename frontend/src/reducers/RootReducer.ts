import { combineReducers } from "redux";
import surveyFormReducer from "./surveyFormReducer";

export default combineReducers({
	surveyForm: surveyFormReducer
});
