import { CREATE_SURVEY_FORM, CREATE_NEW_FORM_SUCCESS, GET_SURVEY_FORM, UPDATE_FORM_SUCCESS, CLEAR_UPDATING_FORM, PREVIEW_SURVEY_FORM, CLEAR_PREVIEW_FORM, GET_ALL_SURVEY_FORM, DELETE_SURVEY_FORM } from "../actions/types";
import SurveyForm from "../models/SurveyForm";

const initialState = {
	//initialState of the surveyForm attribute in the global redux store (defined in RootReducer.ts)
	surveyForms: [],
	surveyFormToViewOrUpdate: undefined,
	surveyFormToPreview: undefined
};

interface Action {
	type: string;
	surveyForms: SurveyForm[];
	surveyFormToViewOrUpdate: SurveyForm;
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
				surveyFormToViewOrUpdate: action.surveyFormToViewOrUpdate
			}
		case GET_ALL_SURVEY_FORM:
			return {
				...state,
				surveyForms: action.surveyForms
			}
		case PREVIEW_SURVEY_FORM:
			return {
				...state,
				surveyFormToPreview: action.surveyFormToPreview
			}
		case CLEAR_PREVIEW_FORM:
			return {
				...state,
				surveyFormToPreview: undefined
			}
		case CLEAR_UPDATING_FORM:
			return {
				...state,
				surveyFormToViewOrUpdate: undefined
			}
		case DELETE_SURVEY_FORM:
			return {
				...state,
				surveyForms: state.surveyForms.filter((surveyForm: SurveyForm) => Number(action.surveyFormId) !== Number(surveyForm.surveyFormId))
			}
		default:
			return state;
	}
}
