import Question from "./Question";

export default class Answer {
	answerId?: Number;

	numericAnswer?: Number;

	textAnswer?: String;

	yesNoAnswer?: Boolean;

	question: Question;

	constructor($question: Question) {
		this.question = $question;
	}

}
