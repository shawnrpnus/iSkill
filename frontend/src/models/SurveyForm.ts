import ToolProcess from "./ToolProcess";
import Category from "./Category";
import Evaluation from "./Evaluation";
import Employee from "./Employee";

export default class SurveyForm {
	surveyFormId?: number;
	surveyFormName: string;
	totalScore?: number;
	actualScore?: number;
	skillLevel: string;

	creator?: Employee;

	categories: Category[];

	toolProcess: ToolProcess;

	evaluations?: Evaluation[];

	constructor($formName: string, $skillLevel: string, $categories: Category[], $toolProcess: ToolProcess) {
		this.surveyFormName = $formName;
		this.skillLevel = $skillLevel;
		this.categories = $categories;
		this.toolProcess = $toolProcess
	}

}
