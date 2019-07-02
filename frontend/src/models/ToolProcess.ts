import SurveyForm from "./SurveyForm";

export default class ToolProcess {
	private toolProcessId: Number;
	private toolProcessName: String;
	private surveyForms: SurveyForm[];

	constructor(
		$toolProcessId: Number,
		$toolProcessName: String,
		$surveyForms: SurveyForm[]
	) {
		this.toolProcessId = $toolProcessId;
		this.toolProcessName = $toolProcessName;
		this.surveyForms = $surveyForms;
	}

	/**
	 * Getter $toolProcessId
	 * @return {Number}
	 */
	public get $toolProcessId(): Number {
		return this.toolProcessId;
	}

	/**
	 * Getter $toolProcessName
	 * @return {String}
	 */
	public get $toolProcessName(): String {
		return this.toolProcessName;
	}

	/**
	 * Getter $surveyForms
	 * @return {SurveyForm}
	 */
	public get $surveyForms(): SurveyForm[] {
		return this.surveyForms;
	}

	/**
	 * Setter $toolProcessId
	 * @param {Number} value
	 */
	public set $toolProcessId(value: Number) {
		this.toolProcessId = value;
	}

	/**
	 * Setter $toolProcessName
	 * @param {String} value
	 */
	public set $toolProcessName(value: String) {
		this.toolProcessName = value;
	}

	/**
	 * Setter $surveyForms
	 * @param {SurveyForm} value
	 */
	public set $surveyForms(value: SurveyForm[]) {
		this.surveyForms = value;
	}
}
