import Answer from "./Answer";

export default class Question {
	type?: String;

	questionId?: number;

	questionSequence: number;

	questionText: String;

	answers?: Answer[];

	constructor(questionSeq: number, qnText: String) {
		this.questionSequence = questionSeq;
		this.questionText = qnText;
	}

}
