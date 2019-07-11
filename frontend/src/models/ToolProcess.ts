import SurveyForm from "./SurveyForm";

export default class ToolProcess {
	toolProcessId?: number;
	toolProcessName: string;

	constructor($toolProcessName: string) {
		this.toolProcessName = $toolProcessName;
	}

}
