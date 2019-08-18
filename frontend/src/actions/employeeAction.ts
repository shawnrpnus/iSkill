import axios from "axios";
import { History } from "history";
import Employee from "../models/Employee";
import setAuthorizationToken from "../utils/setAuthorizationToken";
import { GET_EMPLOYEES_FOR_MANAGER_SUCCESS, GET_ERRORS, GET_LOGIN_DETAILS, REGISTER_NEW_EMPLOYEE, SET_CURRENT_USER } from "./types";

const getErrors = (errorData: any) => ({
	type: GET_ERRORS,
	errorObj: errorData
})

export function setCurrentUser(user: any) {
	return {
		type: SET_CURRENT_USER,
		user: user
	}
}

export const getLoginDetails = (
	username: string,
	password: string,
	history: History
) => {
	let url = `/api/employee/login`;
	// let bodyFormData = new FormData();
	// bodyFormData.set('username', username);
	// bodyFormData.set('password', password);
	// console.log(bodyFormData);
	return (dispatch: any) => {
		axios
			.post(url, {
				username: username,
				password: password
			})
			.then(response => {
				console.log(response);
				const token: string = response.data.token.substring(7, response.data.token.length);
				// const token1 = token.substring(7, token.length);
				localStorage.setItem('jwtToken', token);
				setAuthorizationToken(token);
				let jwt = require('jsonwebtoken');
				// console.log(jwt);
				// console.log(token);
				let thisUser: Employee = jwt.decode(token);
				console.log(thisUser); //this returns employee object
				// dispatch(getLoginDetailsSuccess(response.data));
				dispatch(setCurrentUser(jwt.decode(token)));
				console.log("dispatched");
				// window.location.reload();
				history.push("/viewAllForms");
			})
			.catch(err => {
				console.log("got reach");
				// console.log(getErrors(err).errorObj.response.data);
				dispatch(getErrors(err.response.data));
				// if (err.response.status === 500) {
				// 	alert("Internal server error has occured. Please contact the system administrator.");
				// 	console.log(err.response)
				// }
			});
	};
};

export function logout(): any {
	return (dispatch: any) => {
		localStorage.removeItem('jwtToken');
		setAuthorizationToken(false);
		dispatch(setCurrentUser({}));
	}
}

const getLoginDetailsSuccess = (payload: any) => ({
	type: GET_LOGIN_DETAILS,
	// employeeLoggedIn: employee
	payload: payload
});

export const registerNewEmployee = (
	newEmployee: Employee
) => {
	let url = `/api/employee/register`;
	console.log(newEmployee);
	return (dispatch: any) => {
		axios
			.post(url, newEmployee)
			.then(response => {
				console.log(response);
				dispatch(registerNewEmployeeSuccess(response.data));
				console.log("dispatched");
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

const registerNewEmployeeSuccess = (payload: any) => ({
	type: REGISTER_NEW_EMPLOYEE,
	payload: payload
});

export const getEmployeesForManager = (managerId: number) => {
	let url = `/api/employee/getEmployeesForManager/${managerId}`
	return (dispatch: any) => {
		axios.get(url).then(response => {
			dispatch(getEmployeesForManagerSuccess(response.data))
		}).catch(err => {
			dispatch(getErrors(err.response.data))
		})
	}
}

const getEmployeesForManagerSuccess = (employeeList: any) => ({
	type: GET_EMPLOYEES_FOR_MANAGER_SUCCESS,
	employees: employeeList
})