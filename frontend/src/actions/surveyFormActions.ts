import SurveyForm from "../models/SurveyForm";
import axios from "axios";
import { GET_ERRORS, CLEAR_ERRORS, CREATE_NEW_FORM_SUCCESS, UPDATE_FORM_SUCCESS, GET_SURVEY_FORM, CLEAR_UPDATING_FORM, PREVIEW_SURVEY_FORM, CLEAR_PREVIEW_FORM, GET_ALL_SURVEY_FORM, DELETE_SURVEY_FORM } from "./types";
import { History } from "history";


export const clearStateErrors = () => ({
	type: CLEAR_ERRORS
});

const getErrors = (errorData: any) => ({
	type: GET_ERRORS,
	errorObj: errorData
})

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
				dispatch(getErrors(err.response.data));
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


export const getSurveyForm = (
	surveyFormId: number
) => {
	let url = `/api/surveyForm/${surveyFormId}`;
	return (dispatch: any) => {
		axios
			.get(url)
			.then(response => {
				dispatch(getSurveyFormSuccess(response.data));
			})
			.catch(err => {
				dispatch(getErrors(err));
				// if (err.response.status === 500) {
				// 	alert("Internal server error has occured. Please contact the system administrator.");
				// 	console.log(err.response)
				// }
			});
	};
};

const getSurveyFormSuccess = (surveyForm: SurveyForm) => ({
	type: GET_SURVEY_FORM,
	surveyFormToViewOrUpdate: surveyForm
});



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
				dispatch(getErrors(err.response.data));
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

export const clearUpdatingForm = () => ({
	type: CLEAR_UPDATING_FORM
})

export const previewSurveyForm = (surveyForm: SurveyForm) => ({
	type: PREVIEW_SURVEY_FORM,
	surveyFormToPreview: surveyForm
})

export const clearPreviewForm = () => ({
	type: CLEAR_PREVIEW_FORM
})

export const getAllSurveyForms = () => {
	return (dispatch: any) => {
		axios.get("/api/surveyForm/all").then(response => {
			dispatch(getAllSurveyFormSuccess(response.data))
			console.log(response.data);
		}).catch(err => {
			console.log(err);
			alert("Error fetching all survey forms");
			console.log(err.response);
		})
	}
}

const getAllSurveyFormSuccess = (surveyForms: any) => ({
	type: GET_ALL_SURVEY_FORM,
	surveyForms: surveyForms
})

export const deleteSurveyForm = (surveyFormId: number, history: History) => {
	return (dispatch: any) => {
		axios.delete(`/api/surveyForm/deleteSurveyForm?surveyFormId=${surveyFormId}`).then(response => {
			dispatch(deleteSurveyFormSuccess(response.data.surveyFormId))
			alert("Form deleted!");
			history.push("/viewAllForms");
		}).catch(err => {
			dispatch(getErrors(err.response.data));
		})
	}
}

const deleteSurveyFormSuccess = (surveyFormId: number) => ({
	type: DELETE_SURVEY_FORM,
	surveyFormId: surveyFormId
})