import { CreateEvaluationRequest } from "../models/CreateEvaluationRequest";
import axios from "axios";
import { GET_ERRORS, CREATE_EVALUATION_SUCCESS } from "./types";

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

