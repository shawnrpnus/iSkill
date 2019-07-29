import { CREATE_EVALUATION_SUCCESS, GET_EVALUATION_SUCCESS, UPDATE_EVALUATION_SUCCESS } from "../actions/types";
import Evaluation from "../models/Evaluation";

const initialState = {
	//initialState of the surveyForm attribute in the global redux store (defined in RootReducer.ts)
	evaluationToViewOrUpdate: undefined
};

interface Action {
	type: string
	evaluation: Evaluation
}

export default function (state = initialState, action: Action | any) {
	switch (action.type) {
		case CREATE_EVALUATION_SUCCESS:
			alert("Evaluation Submitted!");
			window.location.reload();
			return state;
		case GET_EVALUATION_SUCCESS:
			return {
				...state,
				evaluationToViewOrUpdate: action.evaluation
			}
		case UPDATE_EVALUATION_SUCCESS:
			alert("Evaluation Updated!");
			window.location.reload();
			return {
				...state,
				evaluationToViewOrUpdate: action.evaluation
			}
		default:
			return state;
	}
}
