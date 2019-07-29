import Employee from "./Employee";
import SurveyForm from "./SurveyForm";
import Answer from "./Answer";
import EvaluationStatusEnum from "./EvaluationStatusEnum";

export default class Evaluation {
	evaluationId?: number;

	remarks?: string;

	status: EvaluationStatusEnum;

	evaluator: Employee;

	evaluatee: Employee;

	surveyForm: SurveyForm;

	answers?: Answer[];

	constructor(
		$remarks: string,
		$status: EvaluationStatusEnum,
		$evaluator: Employee,
		$evaluatee: Employee,
		$surveyForm: SurveyForm
	) {
		this.remarks = $remarks;
		this.status = $status;
		this.evaluator = $evaluator;
		this.evaluatee = $evaluatee;
		this.surveyForm = $surveyForm;
	}

}
