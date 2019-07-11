import Question from "./Question";

export default class Category {
	categoryId?: number;

	categorySequence: number;
	categoryName: string;

	questions: Question[];

	constructor(
		$categoryName: string,
		$categorySequence: number,
		$questions: Question[]
	) {
		this.categoryName = $categoryName;
		this.categorySequence = $categorySequence;
		this.questions = $questions;
	}


}
