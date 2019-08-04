import Employee from "../models/Employee";
import { GET_LOGIN_DETAILS, REGISTER_NEW_EMPLOYEE, GET_EMPLOYEES_FOR_MANAGER_SUCCESS, SET_CURRENT_USER } from "../actions/types";
import isEmpty from "lodash/isEmpty";

const initialState = {
	//initialState of the surveyForm attribute in the global redux store (defined in RootReducer.ts)
    employeeLoggedIn: undefined,
    newEmployee: undefined,
    employeesForManager: [],
    isAuthenticated: false,
    user: {}
};

interface Action {
    type: string;
    employeeLoggedIn : Employee;
    // newEmployee: Employee;
    // employeesForManager: Employee[];
    // user: Employee;
    // isAuthenticated: boolean;
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
        case GET_EMPLOYEES_FOR_MANAGER_SUCCESS:
            return {
                ...state,
                employeesForManager: action.employees
            }
        case SET_CURRENT_USER:
            console.log(action);
            console.log(isEmpty(action.user));
            return {
                // isAuthenticated: (action.user != null || action.user != undefined),
                ...state,
                isAuthenticated: !isEmpty(action.user),
                user: action.use
            };
		default:
			return state;
	}
}
