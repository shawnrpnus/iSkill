import Employee from "../models/Employee";
import { GET_LOGIN_DETAILS, REGISTER_NEW_EMPLOYEE } from "../actions/types";

const initialState = {
	//initialState of the surveyForm attribute in the global redux store (defined in RootReducer.ts)
	employeeLoggedIn: undefined
};

interface Action {
    type: string;
    employeeLoggedIn : Employee;
}

export default function (state = initialState, action: Action | any) {
	switch (action.type) {
        case GET_LOGIN_DETAILS:
            // alert("Create success!");
            // return state;
            // window.location.reload();
            return {
                ...state,
                employeeLoggedIn: action.payload
            }
        case REGISTER_NEW_EMPLOYEE:
            return {
                ...state,
                newEmployee: action.newEmployee
            }
		default:
			return state;
	}
}
