import SurveyForm from "../models/SurveyForm";
import axios from "axios";
import { GET_ERRORS, CLEAR_ERRORS, CREATE_NEW_FORM_SUCCESS } from "./types";


export const clearStateErrors = () => ({
	type: CLEAR_ERRORS
});

export const createSurveyForm = (
	newSurveyForm: SurveyForm,
	employeeId: number
) => {
	let url = `/api/surveyForm/createSurveyForm?creatorEmployeeId=${employeeId}`;
	return (dispatch: any) => {
		axios
			.post(url, newSurveyForm)
			.then(response => {
				console.log(response);
				dispatch(createSurveyFormSuccess(response.data));
			})
			.catch(err => {
				dispatch(createSurveyFormError(err.response.data));
				if (err.response.status === 500) {
					alert("Internal server error has occured. Please contact the system administrator.");
					console.log(err.response)
				}
			});
	};
};

const createSurveyFormSuccess = (payload: any) => ({
	type: CREATE_NEW_FORM_SUCCESS,
	payload: payload
});

const createSurveyFormError = (errorData: any) => ({
	type: GET_ERRORS,
	errorObj: errorData
});


