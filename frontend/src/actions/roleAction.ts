import axios from "axios";
import { GET_ALL_ROLES } from "./types";

export const getAllRoles = () => {
	return (dispatch: any) => {
		axios.get("/api/role/all").then(response => {
			dispatch(getAllRolesSuccess(response.data))
			console.log(response.data);
		}).catch(err => {
			console.log(err);
			alert("Error fetching all roles");
			console.log(err.response);
		})
	}
}

const getAllRolesSuccess = (roles: any) => ({
	type: GET_ALL_ROLES,
	roles: roles
})