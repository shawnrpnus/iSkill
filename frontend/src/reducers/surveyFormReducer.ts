import { CREATE_SURVEY_FORM, CREATE_NEW_FORM_SUCCESS, GET_SURVEY_FORM, UPDATE_FORM_SUCCESS, CLEAR_UPDATING_FORM } from "../actions/types";
import SurveyForm from "../models/SurveyForm";

const initialState = {
	//initialState of the surveyForm attribute in the global redux store (defined in RootReducer.ts)
	surveyForms: [],
	surveyFormToUpdate: undefined
};

interface Action {
	type: string;
	surveyForms: SurveyForm[];
	surveyFormToUpdate: SurveyForm;
	surveyFormId: number;
}

export default function (state = initialState, action: Action | any) {
	switch (action.type) {
		case CREATE_SURVEY_FORM:
			return {
				...state,
				surveyForms: state.surveyForms.concat(action.surveyForm) //override the surveyForms field in state
			};
		case CREATE_NEW_FORM_SUCCESS:
			alert("Create success!");
			window.location.reload();
			return state;
		case UPDATE_FORM_SUCCESS:
			alert("Update success");
			window.location.reload();
			return state;
		case GET_SURVEY_FORM:
			return {
				...state,
				surveyFormToUpdate: action.surveyFormToUpdate
			}
		case CLEAR_UPDATING_FORM:
			return {
				...state,
				surveyFormToUpdate: undefined
			}
		default:
			return state;
	}
}
