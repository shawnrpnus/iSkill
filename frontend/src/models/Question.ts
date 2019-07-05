import SurveyForm from "./SurveyForm";
import Answer from "./Answer";
import Category from "./Category";

export default class Question {
	protected questionId?: Number;

	protected questionSequence: Number;

	protected questionText: String;

	protected answers?: Answer[];

	protected category: Category;

	constructor(questionSeq: Number, qnText: String, category: Category) {
		this.questionSequence = questionSeq;
		this.questionText = qnText;
		this.category = category;
	}

	/**
	 * Getter $questionId
	 * @return {Number}
	 */
	public get $questionId(): Number | undefined {
		return this.questionId;
	}

	/**
	 * Getter $questionSequence
	 * @return {Number}
	 */
	public get $questionSequence(): Number {
		return this.questionSequence;
	}

	/**
	 * Getter $questionText
	 * @return {String}
	 */
	public get $questionText(): String {
		return this.questionText;
	}

	/**
	 * Getter $answers
	 * @return {Answer[]}
	 */
	public get $answers(): Answer[] | undefined {
		return this.answers;
	}

	/**
	 * Getter $category
	 * @return {Category}
	 */
	public get $category(): Category {
		return this.category;
	}

	/**
	 * Setter $questionId
	 * @param {Number} value
	 */
	public set $questionId(value: Number | undefined) {
		this.questionId = value;
	}

	/**
	 * Setter $questionSequence
	 * @param {Number} value
	 */
	public set $questionSequence(value: Number) {
		this.questionSequence = value;
	}

	/**
	 * Setter $questionText
	 * @param {String} value
	 */
	public set $questionText(value: String) {
		this.questionText = value;
	}

	/**
	 * Setter $answers
	 * @param {Answer[]} value
	 */
	public set $answers(value: Answer[] | undefined) {
		this.answers = value;
	}

	/**
	 * Setter $category
	 * @param {Category} value
	 */
	public set $category(value: Category) {
		this.category = value;
	}
}
