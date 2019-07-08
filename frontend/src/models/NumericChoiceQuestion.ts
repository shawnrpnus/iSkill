import Question from "./Question";

export default class NumericChoiceQuestion extends Question {
	lowerBound: number;

	upperBound: number;

	constructor(
		questionSeq: number,
		qnText: String,
		$lowerBound: number,
		$upperBound: number
	) {
		super(questionSeq, qnText);
		this.lowerBound = $lowerBound;
		this.upperBound = $upperBound;
		this.type = "numericChoice";
	}

}
