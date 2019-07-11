import { GET_ALL_TOOL_PROCESS } from "./types";
import axios from "axios";

export const getAllToolProcess = () => {
	return (dispatch: any) => {
		axios.get("/api/toolProcess").then(response => {
			dispatch(getToolProcess(response.data))
		}).catch(err => {
			console.log(err);
			alert("Error fetching tool/process");
			console.log(err.response);
		})
	}
}

const getToolProcess = (toolProcessList: any) => ({
	type: GET_ALL_TOOL_PROCESS,
	toolProcessList: toolProcessList
})