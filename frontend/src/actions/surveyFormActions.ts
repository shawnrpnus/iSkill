import SurveyForm from "../models/SurveyForm";
import axios from "axios";
import { GET_ERRORS } from "./types";

export const createSurveyForm = (
	newSurveyForm: SurveyForm,
	toolProcessId: number,
	employeeId: number
) => {
	let url = `/api/surveyForm/createSurveyForm?toolProcessId=${toolProcessId}&creatorEmployeeId=${employeeId}`;
	return (dispatch: any) => {
		axios
			.post(url, newSurveyForm)
			.then(response => {
				console.log(response);
				dispatch(createSurveyFormSuccess(response));
				alert("Create success!");
			})
			.catch(err => {
				dispatch(createSurveyFormError(err.response.data));
				alert("Create ERROR!");
				console.log(err.reponse.data);
			});
	};
};

const createSurveyFormSuccess = (payload: any) => ({
	type: "SUCCESS",
	payload: payload
});

const createSurveyFormError = (errorData: any) => ({
	type: GET_ERRORS,
	errorObj: errorData
});
