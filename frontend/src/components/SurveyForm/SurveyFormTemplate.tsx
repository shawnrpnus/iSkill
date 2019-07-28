import { Card, Col, Radio, Row, Typography } from "antd";
import { WrappedFormUtils } from "antd/lib/form/Form";
import * as React from "react";
import Category from "../../models/Category";
import NumericChoiceQuestion from "../../models/NumericChoiceQuestion";
import QuestionModel from "../../models/Question";
import { getCategoryTotalMaxScore, sortQuestionsByQuestionSequence } from "../../utils/SurveyFormUtils";
import Answer from "../../models/Answer";

export interface ISurveyFormTemplateProps {
	surveyFormName: string;
	toolProcessName: string;
	skillLevel: string;
	categories: Category[];
	form: WrappedFormUtils<any>;
	answers?: Array<Answer>;
}

export interface ISurveyFormTemplateState {
	firstRender: boolean;
}

const COL_ONE_SIZE = 8;
const COL_TWO_SIZE = 8;
const COL_THREE_SIZE = 4;
const COL_FOUR_SIZE = 4;

export default class SurveyFormTemplate extends React.Component<
	ISurveyFormTemplateProps,
	ISurveyFormTemplateState
> {
	constructor(props: ISurveyFormTemplateProps) {
		super(props);

		this.state = {
			firstRender: false
		};
		this.calcCategoryScore = this.calcCategoryScore.bind(this);
		this.getAnswerForQuestionId = this.getAnswerForQuestionId.bind(this);
		this.getExistingAnswerScore = this.getExistingAnswerScore.bind(this);
	}

	calcCategoryScore(questionList: Array<QuestionModel>, categoryId: number | undefined): number {
		let sum = 0;
		for (let i = 0; i < questionList.length; i++) {
			let fieldVal: number = this.props.form.getFieldValue(
				`radio-${categoryId}-${questionList[i].questionId}`
			);
			if (typeof fieldVal === "number") {
				sum += fieldVal;
			} else if (questionList[i].hasOwnProperty("lowerBound")) {
				//not defined
				sum += (questionList[i] as NumericChoiceQuestion).lowerBound;
			}
		}
		return sum;
	}

	getAnswerForQuestionId(questionId: number) {
		if (this.props.answers) {
			for (let i = 0; i < this.props.answers.length; i++) {
				if (this.props.answers[i].question.questionId === questionId) {
					return this.props.answers[i].numericAnswer;
				}
			}
		}
		return undefined;
	}

	getExistingAnswerScore() {
		let totalExistingAnswerScore = 0;
		if (this.props.answers) {
			for (let i = 0; i < this.props.answers.length; i++) {
				let score = this.props.answers[i].numericAnswer;
				if (score) {
					totalExistingAnswerScore += score;
				}
			}
		}
		return totalExistingAnswerScore;
	}

	componentDidMount() {
		this.setState({ firstRender: true });
	}

	componentDidUpdate() {
		if (this.props.answers && this.state.firstRender) {
			this.setState({ firstRender: false });
		}
	}

	public render() {
		let totalScore = 0;
		let totalMaxScore = 0;
		return (
			<div>
				<Card
					bordered={true}
					title={
						<Row gutter={24}>
							<Col span={24} style={{ fontSize: "48px", textAlign: "center" }}>
								<Typography.Title>{this.props.surveyFormName}</Typography.Title>
							</Col>
							<Col span={24} style={{ textAlign: "center" }}>
								Tool / Process:{" "}
								<span style={{ fontWeight: "normal" }}>{this.props.toolProcessName}</span>
								&nbsp;&nbsp; Skill Level:{" "}
								<span style={{ fontWeight: "normal" }}>{this.props.skillLevel}</span>
							</Col>
						</Row>
					}
				>
					<Row style={{ fontWeight: "bold", padding: "5px" }} gutter={24}>
						<Col span={COL_ONE_SIZE}>Checklist</Col>
						<Col span={COL_TWO_SIZE}>Input</Col>
						<Col span={COL_THREE_SIZE} className="colCentered">
							Max Score
						</Col>
						<Col span={COL_FOUR_SIZE} className="colCentered">
							Performance
						</Col>
					</Row>
					<hr />
					{this.props.categories.map(category => {
						let sortedQuestions = sortQuestionsByQuestionSequence(category.questions);
						let catScore = this.calcCategoryScore(sortedQuestions, category.categoryId);
						let catTotalScore = getCategoryTotalMaxScore(sortedQuestions);
						let percentageScore = ((catScore / catTotalScore) * 100).toFixed(2);
						totalScore += catScore;
						totalMaxScore += catTotalScore;
						return (
							<React.Fragment key={category.categoryId}>
								<Row
									gutter={24}
									style={{
										backgroundColor: "#e8e8e8",
										padding: "5px",
										fontWeight: "bold"
									}}
								>
									<Col span={COL_ONE_SIZE + COL_TWO_SIZE + COL_THREE_SIZE}>
										{category.categoryName}
									</Col>
									<Col
										span={COL_FOUR_SIZE}
										className="colCentered"
									>{`${catScore}/${catTotalScore} (${percentageScore}%)`}</Col>
								</Row>

								{sortedQuestions.map(question => {
									let numericQn;
									if (
										question.hasOwnProperty("lowerBound") &&
										question.hasOwnProperty("upperBound") &&
										question.hasOwnProperty("questionId")
									) {
										numericQn = question as NumericChoiceQuestion;
									}
									return numericQn && numericQn.questionId !== undefined ? (
										<Row
											style={{ padding: "5px" }}
											key={`${category.categoryId}-${question.questionId}`}
											gutter={24}
										>
											<Col span={COL_ONE_SIZE} style={{ wordWrap: "break-word" }}>
												{question.questionText}
											</Col>
											<Col span={COL_TWO_SIZE}>
												<RadioButtons
													lowerBound={numericQn.lowerBound}
													upperBound={numericQn.upperBound}
													questionId={numericQn.questionId}
													categoryId={category.categoryId}
													form={this.props.form}
													answer={
														this.props.answers
															? this.getAnswerForQuestionId(
																	numericQn.questionId
															  )
															: undefined
													}
												/>
											</Col>
											<Col span={COL_THREE_SIZE} className="colCentered">
												{numericQn.upperBound}
											</Col>
											<Col span={COL_FOUR_SIZE}>&nbsp;</Col>
										</Row>
									) : (
										""
									);
								})}
							</React.Fragment>
						);
					})}
					<Row
						gutter={24}
						style={{ backgroundColor: "#e8e8e8", padding: "5px", fontWeight: "bold" }}
					>
						<Col span={20}>Total</Col>
						<Col span={4} className="colCentered">
							{`${totalScore}/${totalMaxScore} (${((totalScore / totalMaxScore) * 100).toFixed(
								2
							)}%)`}
						</Col>
					</Row>
				</Card>
			</div>
		);
	}
}

interface IRadioButtonsProps {
	lowerBound: number;
	upperBound: number;
	questionId: number;
	categoryId?: number;
	form: WrappedFormUtils<any>;
	answer?: number;
}

const RadioButtons: React.FunctionComponent<IRadioButtonsProps> = props => {
	let radioOptions: Array<number> = [];
	for (let i = props.lowerBound; i <= props.upperBound; i++) {
		radioOptions.push(i);
	}
	const { getFieldDecorator } = props.form;
	return (
		<React.Fragment>
			{getFieldDecorator(`radio-${props.categoryId}-${props.questionId}`, {
				initialValue: props.answer ? props.answer : props.lowerBound
			})(
				<Radio.Group>
					{radioOptions.map((option, index) => (
						<React.Fragment key={`radio-${option}-${props.categoryId}-${props.questionId}`}>
							<Radio value={option}>{option}</Radio>
							{index === 4 ? <br /> : ""}
						</React.Fragment>
					))}
				</Radio.Group>
			)}
		</React.Fragment>
	);
};
