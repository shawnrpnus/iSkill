import { GET_ALL_TOOL_PROCESS, GET_TOOL_PROCESS_SCORES} from "./types";
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


export const getAllToolProcessScores = (employeeId:number) => {
	let url = `/api/toolProcess/toolProcessScores?managerId=${employeeId}`;
	return (dispatch: any) => {
		axios.get(url).then(response => {
			dispatch(getToolProcessScores(response.data))
		}).catch(err => {
			console.log(err);
			alert("Error fetching tool/process scores");
			console.log(err.response);
		})
	}
}

const getToolProcessScores = (toolProcessScoreList: any) => ({
	type: GET_TOOL_PROCESS_SCORES,
	toolProcessScoreList: toolProcessScoreList
})