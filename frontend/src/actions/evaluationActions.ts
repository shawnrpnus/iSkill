import { CreateEvaluationRequest, UpdateEvaluationRequest } from "../models/CreateUpdateEvaluationRequest";
import axios from "axios";
import { GET_ERRORS, CREATE_EVALUATION_SUCCESS, GET_EVALUATION_SUCCESS, UPDATE_EVALUATION_SUCCESS } from "./types";
import Evaluation from "../models/Evaluation";

const getErrors = (errorData: any) => ({
    type: GET_ERRORS,
    errorObj: errorData
})

export const createEvaluation = (
    createEvaluationRequest: CreateEvaluationRequest
) => {
    let url = `/api/evaluation/createEvaluation`;
    return (dispatch: any) => {
        axios
            .post(url, createEvaluationRequest)
            .then(response => {
                console.log(response);
                dispatch(createEvaluationSuccess(response.data));
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

const createEvaluationSuccess = (newEvaluation: any) => ({
    type: CREATE_EVALUATION_SUCCESS,
    newEvaluation: newEvaluation
})


export const getEvaluation = (
    evaluationId: number
) => {
    let url = `/api/evaluation/${evaluationId}`;
    return (dispatch: any) => {
        axios
            .get(url)
            .then(response => {
                dispatch(getEvaluationSuccess(response.data));
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

const getEvaluationSuccess = (evaluation: Evaluation) => ({
    type: GET_EVALUATION_SUCCESS,
    evaluation: evaluation
})

export const updateEvaluation = (
    updateEvaluationRequest: UpdateEvaluationRequest
) => {
    let url = `/api/evaluation/updateEvaluation`;
    return (dispatch: any) => {
        axios
            .post(url, updateEvaluationRequest)
            .then(response => {
                console.log(response);
                dispatch(updateEvaluationSuccess(response.data));
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

const updateEvaluationSuccess = (updatedEvaluation: any) => ({
    type: UPDATE_EVALUATION_SUCCESS,
    evaluation: updatedEvaluation
})





