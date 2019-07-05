import ToolProcess from "./ToolProcess";
import Category from "./Question";
import Evaluation from "./Evaluation";
import Employee from "./Employee";

export default class SurveyForm {
	private surveyFormId?: Number;
	private surveyFormName: String;
	private totalScore?: Number;
	private actualScore?: Number;
	private skillLevel: String;

	private creator: Employee;

	private categories: Category[];

	private toolProcess: ToolProcess[];

	private evaluations: Evaluation[];

	constructor(
		$formName: String,
		$totalScore: Number,
		$actualScore: Number,
		$skillLevel: String,
		$creator: Employee,
		$categories: Category[],
		$toolProcess: ToolProcess[],
		$evaluations: Evaluation[]
	) {
		this.surveyFormName = $formName;
		this.totalScore = $totalScore;
		this.actualScore = $actualScore;
		this.skillLevel = $skillLevel;
		this.creator = $creator;
		this.categories = $categories;
		this.toolProcess = $toolProcess;
		this.evaluations = $evaluations;
	}

	/**
	 * Getter $formId
	 * @return {Number}
	 */
	public get $formId(): Number | undefined {
		return this.surveyFormId;
	}

	/**
	 * Getter $formName
	 * @return {String}
	 */
	public get $formName(): String {
		return this.surveyFormName;
	}

	/**
	 * Getter $totalScore
	 * @return {Number}
	 */
	public get $totalScore(): Number | undefined {
		return this.totalScore;
	}

	/**
	 * Getter $actualScore
	 * @return {Number}
	 */
	public get $actualScore(): Number | undefined {
		return this.actualScore;
	}

	/**
	 * Getter $skillLevel
	 * @return {String}
	 */
	public get $skillLevel(): String {
		return this.skillLevel;
	}

	/**
	 * Getter $creator
	 * @return {Employee}
	 */
	public get $creator(): Employee {
		return this.creator;
	}

	/**
	 * Getter $questions
	 * @return {Category[]}
	 */
	public get $questions(): Category[] {
		return this.categories;
	}

	/**
	 * Getter $toolProcess
	 * @return {ToolProcess[]}
	 */
	public get $toolProcess(): ToolProcess[] {
		return this.toolProcess;
	}

	/**
	 * Getter $evaluations
	 * @return {Evaluation[]}
	 */
	public get $evaluations(): Evaluation[] {
		return this.evaluations;
	}

	/**
	 * Setter $formId
	 * @param {Number} value
	 */
	public set $formId(value: Number | undefined) {
		this.surveyFormId = value;
	}

	/**
	 * Setter $formName
	 * @param {String} value
	 */
	public set $formName(value: String) {
		this.surveyFormName = value;
	}

	/**
	 * Setter $totalScore
	 * @param {Number} value
	 */
	public set $totalScore(value: Number | undefined) {
		this.totalScore = value;
	}

	/**
	 * Setter $actualScore
	 * @param {Number} value
	 */
	public set $actualScore(value: Number | undefined) {
		this.actualScore = value;
	}

	/**
	 * Setter $skillLevel
	 * @param {String} value
	 */
	public set $skillLevel(value: String) {
		this.skillLevel = value;
	}

	/**
	 * Setter $creator
	 * @param {Employee} value
	 */
	public set $creator(value: Employee) {
		this.creator = value;
	}

	/**
	 * Setter $questions
	 * @param {Category[]} value
	 */
	public set $questions(value: Category[]) {
		this.categories = value;
	}

	/**
	 * Setter $toolProcess
	 * @param {ToolProcess[]} value
	 */
	public set $toolProcess(value: ToolProcess[]) {
		this.toolProcess = value;
	}

	/**
	 * Setter $evaluations
	 * @param {Evaluation[]} value
	 */
	public set $evaluations(value: Evaluation[]) {
		this.evaluations = value;
	}
}
