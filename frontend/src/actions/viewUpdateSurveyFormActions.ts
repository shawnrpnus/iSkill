import SurveyForm from "../models/SurveyForm";
import axios from "axios";
import { GET_SURVEY_FORM, GET_ERRORS, UPDATE_FORM_SUCCESS } from "./types";

export const getSurveyForm = (
	surveyFormId: number
) => {
	let url = `/api/surveyForm/${surveyFormId}`;
	return (dispatch: any) => {
		axios
			.get(url)
			.then(response => {
				console.log(response.data);
				dispatch(getSurveyFormSuccess(response.data));
			})
			.catch(err => {
				dispatch(getSurveyFormError(err));
				// if (err.response.status === 500) {
				// 	alert("Internal server error has occured. Please contact the system administrator.");
				// 	console.log(err.response)
				// }
			});
	};
};

const getSurveyFormSuccess = (surveyForm: SurveyForm) => ({
	type: GET_SURVEY_FORM,
	surveyFormToViewUpdate: surveyForm
});

const getSurveyFormError = (errorData: any) => ({
	type: GET_ERRORS,
	errorObj: errorData
})

export const updateSurveyForm = (
	updatedSurveyForm: SurveyForm,
) => {
	let url = `/api/surveyForm/updateSurveyForm`;
	return (dispatch: any) => {
		axios
			.post(url, updatedSurveyForm)
			.then(response => {
				console.log(response.data);
				dispatch(updateSurveyFormSuccess(response.data));
			})
			.catch(err => {
				dispatch(updateSurveyFormError(err.response.data));
				if (err.response.status === 500) {
					alert("Internal server error has occured. Please contact the system administrator.");
					console.log(err.response)
				}
			});
	};
};

const updateSurveyFormSuccess = (updatedSurveyForm: any) => ({
	type: UPDATE_FORM_SUCCESS,
	updatedSurveyForm: updatedSurveyForm
})

const updateSurveyFormError = (errorData: any) => ({
	type: GET_ERRORS,
	errorObj: errorData
})