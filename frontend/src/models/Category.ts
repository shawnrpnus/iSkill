import Question from "./Question";

export default class Category {
	categoryId?: Number;

	categorySequence: Number;
	categoryName: String;

	questions: Question[];

	constructor(
		$categoryName: String,
		$categorySequence: Number,
		$questions: Question[]
	) {
		this.categoryName = $categoryName;
		this.categorySequence = $categorySequence;
		this.questions = $questions;
	}

	
}
