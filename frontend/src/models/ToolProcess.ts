import SurveyForm from "./SurveyForm";

export default class ToolProcess {
	toolProcessId?: number;
	toolProcessName: String;

	constructor($toolProcessName: String) {
		this.toolProcessName = $toolProcessName;
	}

}
