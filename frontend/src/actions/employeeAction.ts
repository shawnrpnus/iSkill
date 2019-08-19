import axios from "axios";
import { History } from "history";
import Employee from "../models/Employee";
import setAuthorizationToken from "../utils/setAuthorizationToken";
import { GET_EMPLOYEES_FOR_MANAGER_SUCCESS, GET_ERRORS, REGISTER_NEW_EMPLOYEE, SET_CURRENT_USER } from "./types";

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
	return (dispatch: any) => {
		axios
			.post(url, {
				username: username,
				password: password
			})
			.then(response => {
				console.log(response);
				const token: string = response.data.token.substring(7, response.data.token.length);
				localStorage.setItem('jwtToken', token);
				setAuthorizationToken(token);
				let jwt = require('jsonwebtoken');
				let thisUser: Employee = jwt.decode(token);
				console.log(thisUser); //this returns employee object
				dispatch(setCurrentUser(jwt.decode(token)));
				console.log("dispatched");
				if (thisUser.role.name === "ROLE_MANAGER") {
					history.push("/viewAllForms")
				} else {
					history.push("/evaluationsAssignedToMe");
				}
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

export const registerNewEmployee = (
	newEmployee: Employee
) => {
	let url = `/api/employee/register`;
	console.log(newEmployee);
	return (dispatch: any) => {
		axios
			.post(url, newEmployee)
			.then(response => {
				dispatch(registerNewEmployeeSuccess(response.data));
				alert("Registration Successful!");
				window.location.reload();
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