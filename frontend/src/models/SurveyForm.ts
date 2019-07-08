import ToolProcess from "./ToolProcess";
import Category from "./Category";
import Evaluation from "./Evaluation";
import Employee from "./Employee";

export default class SurveyForm {
	surveyFormId?: Number;
	surveyFormName: String;
	totalScore?: Number;
	actualScore?: Number;
	skillLevel: String;

	creator?: Employee;

	categories: Category[];

	toolProcess?: ToolProcess;

	evaluations?: Evaluation[];

	constructor($formName: String, $skillLevel: String, $categories: Category[], $toolProcess: ToolProcess | undefined) {
		this.surveyFormName = $formName;
		this.skillLevel = $skillLevel;
		this.categories = $categories;
		this.toolProcess = $toolProcess
	}

}
