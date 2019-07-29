import Question from "./Question";

export default class Answer {
	answerId?: number;

	numericAnswer?: number;

	textAnswer?: string;

	yesNoAnswer?: boolean;

	question: Question;

	constructor($question: Question) {
		this.question = $question;
	}

}
