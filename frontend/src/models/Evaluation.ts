import Employee from "./Employee";
import SurveyForm from "./SurveyForm";
import Answer from "./Answer";
import EvaluationStatusEnum from "./EvaluationStatusEnum";

export default class Evaluation {
	private evaluationId?: Number;

	private remarks?: String;

	private status: EvaluationStatusEnum;

	private evaluator: Employee;

	private evaluatee: Employee;

	private surveyForm: SurveyForm;

	private answers?: Answer[];

	constructor(
		$remarks: String,
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

	/**
	 * Getter $remarks
	 * @return {String}
	 */
	public get $remarks(): String | undefined {
		return this.remarks;
	}

	/**
	 * Getter $status
	 * @return {EvaluationStatusEnum}
	 */
	public get $status(): EvaluationStatusEnum {
		return this.status;
	}

	/**
	 * Getter $evaluator
	 * @return {Employee}
	 */
	public get $evaluator(): Employee {
		return this.evaluator;
	}

	/**
	 * Getter $evaluatee
	 * @return {Employee}
	 */
	public get $evaluatee(): Employee {
		return this.evaluatee;
	}

	/**
	 * Getter $surveyForm
	 * @return {SurveyForm}
	 */
	public get $surveyForm(): SurveyForm {
		return this.surveyForm;
	}

	/**
	 * Setter $remarks
	 * @param {String} value
	 */
	public set $remarks(value: String | undefined) {
		this.remarks = value;
	}

	/**
	 * Setter $status
	 * @param {EvaluationStatusEnum} value
	 */
	public set $status(value: EvaluationStatusEnum) {
		this.status = value;
	}

	/**
	 * Setter $evaluator
	 * @param {Employee} value
	 */
	public set $evaluator(value: Employee) {
		this.evaluator = value;
	}

	/**
	 * Setter $evaluatee
	 * @param {Employee} value
	 */
	public set $evaluatee(value: Employee) {
		this.evaluatee = value;
	}

	/**
	 * Setter $surveyForm
	 * @param {SurveyForm} value
	 */
	public set $surveyForm(value: SurveyForm) {
		this.surveyForm = value;
	}
}
