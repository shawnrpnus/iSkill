import Question from "./Question";

export default class Category {
	private categoryId?: Number;

	private categorySequence: Number;
	private categoryName: String;

	private questions: Question[];

	constructor(
		$categoryName: String,
		$categorySequence: Number,
		$questions: Question[]
	) {
		this.categoryName = $categoryName;
		this.categorySequence = $categorySequence;
		this.questions = $questions;
	}

	/**
	 * Getter $categoryId
	 * @return {Number}
	 */
	public get $categoryId(): Number | undefined {
		return this.categoryId;
	}

	/**
	 * Getter $categoryName
	 * @return {String}
	 */
	public get $categoryName(): String {
		return this.categoryName;
	}

	/**
	 * Getter $questions
	 * @return {Question[]}
	 */
	public get $questions(): Question[] {
		return this.questions;
	}

	/**
	 * Setter $categoryId
	 * @param {Number} value
	 */
	public set $categoryId(value: Number | undefined) {
		this.categoryId = value;
	}

	/**
	 * Setter $categoryName
	 * @param {String} value
	 */
	public set $categoryName(value: String) {
		this.categoryName = value;
	}

	/**
	 * Setter $questions
	 * @param {Question[]} value
	 */
	public set $questions(value: Question[]) {
		this.questions = value;
	}

	/**
	 * Getter $categorySequence
	 * @return {Number}
	 */
	public get $categorySequence(): Number {
		return this.categorySequence;
	}

	/**
	 * Setter $categorySequence
	 * @param {Number} value
	 */
	public set $categorySequence(value: Number) {
		this.categorySequence = value;
	}
}
