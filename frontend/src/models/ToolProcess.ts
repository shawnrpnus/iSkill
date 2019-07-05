import SurveyForm from "./SurveyForm";

export default class ToolProcess {
	private toolProcessId?: Number;
	private toolProcessName: String;
	private surveyForms: SurveyForm[];

	constructor($toolProcessName: String, $surveyForms: SurveyForm[]) {
		this.toolProcessName = $toolProcessName;
		this.surveyForms = $surveyForms;
	}

	/**
	 * Getter $toolProcessId
	 * @return {Number}
	 */
	public get $toolProcessId(): Number | undefined {
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
