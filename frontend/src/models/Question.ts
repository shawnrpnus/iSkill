import Answer from "./Answer";

export default class Question {
	type?: String;

	questionId?: Number;

	questionSequence: Number;

	questionText: String;

	answers?: Answer[];

	constructor(questionSeq: Number, qnText: String) {
		this.questionSequence = questionSeq;
		this.questionText = qnText;
	}

}
