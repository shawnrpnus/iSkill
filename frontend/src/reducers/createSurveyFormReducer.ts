import { CREATE_SURVEY_FORM, CREATE_NEW_FORM_SUCCESS } from "../actions/types";
import SurveyForm from "../models/SurveyForm";

const initialState = {
	//initialState of the surveyForm attribute in the global redux store (defined in RootReducer.ts)
	surveyForms: [],
	surveyFormToUpdate: {}
};

interface Action {
	type: string;
	surveyForms: SurveyForm[];
	surveyForm: SurveyForm;
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
		default:
			return state;
	}
}
