import Question from "./Question";

export default class Answer {
	private answerId?: Number;

	private numericAnswer?: Number;

	private textAnswer?: String;

	private yesNoAnswer?: Boolean;

	private question: Question;

	constructor($question: Question) {
		this.question = $question;
	}

	/**
	 * Getter $answerId
	 * @return {Number}
	 */
	public get $answerId(): Number | undefined {
		return this.answerId;
	}

	/**
	 * Getter $numericAnswer
	 * @return {Number}
	 */
	public get $numericAnswer(): Number | undefined {
		return this.numericAnswer;
	}

	/**
	 * Getter $textAnswer
	 * @return {String}
	 */
	public get $textAnswer(): String | undefined {
		return this.textAnswer;
	}

	/**
	 * Getter $yesNoAnswer
	 * @return {Boolean}
	 */
	public get $yesNoAnswer(): Boolean | undefined {
		return this.yesNoAnswer;
	}

	/**
	 * Getter $question
	 * @return {Question}
	 */
	public get $question(): Question {
		return this.question;
	}

	/**
	 * Setter $answerId
	 * @param {Number} value
	 */
	public set $answerId(value: Number | undefined) {
		this.answerId = value;
	}

	/**
	 * Setter $numericAnswer
	 * @param {Number} value
	 */
	public set $numericAnswer(value: Number | undefined) {
		this.numericAnswer = value;
	}

	/**
	 * Setter $textAnswer
	 * @param {String} value
	 */
	public set $textAnswer(value: String | undefined) {
		this.textAnswer = value;
	}

	/**
	 * Setter $yesNoAnswer
	 * @param {Boolean} value
	 */
	public set $yesNoAnswer(value: Boolean | undefined) {
		this.yesNoAnswer = value;
	}

	/**
	 * Setter $question
	 * @param {Question} value
	 */
	public set $question(value: Question) {
		this.question = value;
	}
}
