import { combineReducers } from "redux";
import surveyFormReducer from "./surveyFormReducer";
import errorReducer from "./errorReducer";
import toolProcessReducer from "./toolProcessReducer";
import employeeReducer from "./employeeReducer";
import roleReducer from "./roleReducer";
import evaluationReducer from "./evaluationReducer";

export default combineReducers({
	surveyForm: surveyFormReducer,
	errors: errorReducer,
	toolProcess: toolProcessReducer,
	employee: employeeReducer,
	role: roleReducer,
	evaluation: evaluationReducer
});
