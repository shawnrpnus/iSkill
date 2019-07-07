import { CREATE_SURVEY_FORM } from "../actions/types";
import SurveyForm from "../models/SurveyForm";

const initialState = {
	//initialState of the project attribute in the global redux store (defined in index.ts)
	surveyForms: [],
	surveyForm: {}
};

// const initialState: Array<Project> = [];

interface Action {
	type: string;
	surveyForms: SurveyForm[];
	surveyForm: SurveyForm;
	surveyFormId: number;
}

export default function(state = initialState, action: Action | any) {
	switch (action.type) {
		case CREATE_SURVEY_FORM:
			return {
				...state,
				projects: action.projects //override the projects field in state
			};
		default:
			return state;
	}
}
