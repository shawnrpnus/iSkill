import ToolProcess from "./ToolProcess";
import Question from "./Question";
import Evaluation from "./Evaluation";
import Employee from "./Employee";

export default class SurveyForm {
	private formId?: Number;
	private formName: String;
	private totalScore: Number;
	private actualScore: Number;
	private skillLevel: String;

	private creator: Employee;

	private questions: Question[];

	private toolProcess: ToolProcess[];

	private evaluations: Evaluation[];

	constructor(
		$formName: String,
		$totalScore: Number,
		$actualScore: Number,
		$skillLevel: String,
		$creator: Employee,
		$questions: Question[],
		$toolProcess: ToolProcess[],
		$evaluations: Evaluation[]
	) {
		this.formName = $formName;
		this.totalScore = $totalScore;
		this.actualScore = $actualScore;
		this.skillLevel = $skillLevel;
		this.creator = $creator;
		this.questions = $questions;
		this.toolProcess = $toolProcess;
		this.evaluations = $evaluations;
	}

	/**
	 * Getter $formId
	 * @return {Number}
	 */
	public get $formId(): Number | undefined {
		return this.formId;
	}

	/**
	 * Getter $formName
	 * @return {String}
	 */
	public get $formName(): String {
		return this.formName;
	}

	/**
	 * Getter $totalScore
	 * @return {Number}
	 */
	public get $totalScore(): Number {
		return this.totalScore;
	}

	/**
	 * Getter $actualScore
	 * @return {Number}
	 */
	public get $actualScore(): Number {
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
	 * @return {Question[]}
	 */
	public get $questions(): Question[] {
		return this.questions;
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
		this.formId = value;
	}

	/**
	 * Setter $formName
	 * @param {String} value
	 */
	public set $formName(value: String) {
		this.formName = value;
	}

	/**
	 * Setter $totalScore
	 * @param {Number} value
	 */
	public set $totalScore(value: Number) {
		this.totalScore = value;
	}

	/**
	 * Setter $actualScore
	 * @param {Number} value
	 */
	public set $actualScore(value: Number) {
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
	 * @param {Question[]} value
	 */
	public set $questions(value: Question[]) {
		this.questions = value;
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
