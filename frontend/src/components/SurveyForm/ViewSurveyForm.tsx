import { Card, Col, Form, Radio, Row, Typography, Input } from "antd";
import { FormComponentProps, WrappedFormUtils } from "antd/lib/form/Form";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { getSurveyForm } from "../../actions/surveyFormActions";
import CategoryModel from "../../models/Category";
import NumericChoiceQuestion from "../../models/NumericChoiceQuestion";
import QuestionModel from "../../models/Question";
import SurveyFormModel from "../../models/SurveyForm";
import {
	getCategoryTotalMaxScore,
	sortCategoriesByCategorySequence,
	sortQuestionsByQuestionSequence,
	COL_FOUR_SIZE,
	COL_THREE_SIZE,
	COL_TWO_SIZE,
	COL_ONE_SIZE
} from "../../utils/SurveyFormUtils";
import "./ViewSurveyForm.css";

export interface IViewSurveyFormProps extends FormComponentProps, RouteComponentProps {
	getSurveyForm: typeof getSurveyForm;
	surveyFormToViewOrUpdate?: SurveyFormModel;
	surveyFormToPreview?: SurveyFormModel;
}

export interface IViewSurveyFormState {}

interface IRouteParams {
	formId?: number;
}

class ViewSurveyForm extends React.Component<IViewSurveyFormProps, IViewSurveyFormState> {
	constructor(props: IViewSurveyFormProps) {
		super(props);

		this.state = {};

		this.calcCategoryScore = this.calcCategoryScore.bind(this);
	}

	componentWillMount() {
		if (this.props.match) {
			let params: IRouteParams = this.props.match.params;
			if (params.formId && this.props.getSurveyForm) {
				this.props.getSurveyForm(params.formId);
			}
		}
	}

	calcCategoryScore(questionList: Array<QuestionModel>): number {
		let sum = 0;
		for (let i = 0; i < questionList.length; i++) {
			let fieldVal: number = this.props.form.getFieldValue(`radio-${questionList[i].questionId}`);
			if (typeof fieldVal === "number") {
				sum += fieldVal;
			} else if (questionList[i].hasOwnProperty("lowerBound")) {
				//not defined
				sum += (questionList[i] as NumericChoiceQuestion).lowerBound;
			}
		}
		return sum;
	}

	public render() {
		let surveyFormName = "";
		let toolProcessName = "";
		let skillLevel = "";
		let categories: Array<CategoryModel> = [];
		if (this.props.surveyFormToPreview) {
			console.log("PREVIEWING");
			surveyFormName = this.props.surveyFormToPreview.surveyFormName;
			toolProcessName = this.props.surveyFormToPreview.toolProcess.toolProcessName;
			skillLevel = this.props.surveyFormToPreview.skillLevel;
			categories = this.props.surveyFormToPreview.categories;
		} else if (this.props.surveyFormToViewOrUpdate && this.props.match) {
			surveyFormName = this.props.surveyFormToViewOrUpdate.surveyFormName;
			toolProcessName = this.props.surveyFormToViewOrUpdate.toolProcess.toolProcessName;
			skillLevel = this.props.surveyFormToViewOrUpdate.skillLevel;
			categories = this.props.surveyFormToViewOrUpdate.categories;
		}
		categories = sortCategoriesByCategorySequence(categories);
		let totalScore = 0;
		let totalMaxScore = 0;
		return (
			<div style={this.props.surveyFormToPreview? {} : { padding: "2vw 5vw 0 5vw" }}>
				{this.props.surveyFormToPreview ? (
					""
				) : (
					<Row>
						<Col span={24}>
							<Typography.Title style={{ textAlign: "center" }}>
								Viewing Evaluation Form
							</Typography.Title>
							<hr />
						</Col>
					</Row>
				)}
				<Card
					bordered={true}
					title={
						<Row gutter={24}>
							<Col span={24} style={{ fontSize: "48px", textAlign: "center" }}>
								<Typography.Title>{surveyFormName}</Typography.Title>
							</Col>
							<Col span={24} style={{ textAlign: "center" }}>
								Tool / Process:{" "}
								<span style={{ fontWeight: "normal" }}>{toolProcessName}</span>&nbsp;&nbsp;
								Skill Level: <span style={{ fontWeight: "normal" }}>{skillLevel}</span>
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
					{categories.map(category => {
						let sortedQuestions = sortQuestionsByQuestionSequence(category.questions);
						let catScore = this.calcCategoryScore(sortedQuestions);
						let catTotalScore = getCategoryTotalMaxScore(sortedQuestions);
						let percentageScore = ((catScore / catTotalScore) * 100).toFixed(2);
						totalScore += catScore;
						totalMaxScore += catTotalScore;
						console.log(sortedQuestions);
						return (
							<React.Fragment key={category.categoryId}>
								<Row
									gutter={24}
									style={{ backgroundColor: "#e8e8e8", padding: "5px", fontWeight: "bold" }}
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
										console.log(numericQn);
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
													form={this.props.form}
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

const wrappedViewSurveyForm = Form.create({ name: "view_survey_form" })(ViewSurveyForm);

const mapStateToProps = (state: any) => ({
	surveyFormToViewOrUpdate: state.surveyForm.surveyFormToViewOrUpdate,
	surveyFormToPreview: state.surveyForm.surveyFormToPreview
});

const mapDispatchToProps = {
	getSurveyForm
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(wrappedViewSurveyForm);

interface IRadioButtonsProps {
	lowerBound: number;
	upperBound: number;
	questionId: number;
	form: WrappedFormUtils<any>;
}

const RadioButtons: React.FunctionComponent<IRadioButtonsProps> = props => {
	let radioOptions: Array<number> = [];
	for (let i = props.lowerBound; i <= props.upperBound; i++) {
		radioOptions.push(i);
	}
	const { getFieldDecorator } = props.form;
	return (
		<React.Fragment>
			{getFieldDecorator(`radio-${props.questionId}`, { initialValue: props.lowerBound })(
				<Radio.Group>
					{radioOptions.map((option, index) => (
						<React.Fragment key={`radio-${option}-${props.questionId}`}>
							<Radio value={option}>{option}</Radio>
							{index === 4 ? <br /> : ""}
						</React.Fragment>
					))}
				</Radio.Group>
			)}
		</React.Fragment>
	);
};
