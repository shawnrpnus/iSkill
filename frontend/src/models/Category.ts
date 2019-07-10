import Question from "./Question";

export default class Category {
	categoryId?: number;

	categorySequence: number;
	categoryName: String;

	questions: Question[];

	constructor(
		$categoryName: String,
		$categorySequence: number,
		$questions: Question[]
	) {
		this.categoryName = $categoryName;
		this.categorySequence = $categorySequence;
		this.questions = $questions;
	}


}
