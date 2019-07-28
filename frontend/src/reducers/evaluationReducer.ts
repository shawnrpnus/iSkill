import { CREATE_EVALUATION_SUCCESS } from "../actions/types";

const initialState = {
	//initialState of the surveyForm attribute in the global redux store (defined in RootReducer.ts)
};

interface Action {
	type: string
}

export default function (state = initialState, action: Action | any) {
	switch (action.type) {
		case CREATE_EVALUATION_SUCCESS:
            alert("Evaluation Submitted!");
            window.location.reload();
            return state;
		default:
			return state;
	}
}
