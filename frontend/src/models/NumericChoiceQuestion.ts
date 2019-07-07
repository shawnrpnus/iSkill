import Question from "./Question";

export default class NumericChoiceQuestion extends Question {
	private lowerBound: Number;

	private upperBound: Number;

	constructor(
		questionSeq: Number,
		qnText: String,
		$lowerBound: Number,
		$upperBound: Number
	) {
		super(questionSeq, qnText);
		this.lowerBound = $lowerBound;
		this.upperBound = $upperBound;
		this.type = "numericChoice";
	}

	/**
	 * Getter $lowerBound
	 * @return {Number}
	 */
	public get $lowerBound(): Number {
		return this.lowerBound;
	}

	/**
	 * Getter $upperBound
	 * @return {Number}
	 */
	public get $upperBound(): Number {
		return this.upperBound;
	}

	/**
	 * Setter $lowerBound
	 * @param {Number} value
	 */
	public set $lowerBound(value: Number) {
		this.lowerBound = value;
	}

	/**
	 * Setter $upperBound
	 * @param {Number} value
	 */
	public set $upperBound(value: Number) {
		this.upperBound = value;
	}
}
