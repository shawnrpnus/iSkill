import { Affix, Button, Card, Col, Form, Icon, Input, Row, Select, Typography } from "antd";
import { FormComponentProps } from "antd/lib/form";
import * as React from "react";
import { connect } from "react-redux";
import { getEmployeesForManager } from "../../actions/employeeAction";
import { createEvaluation } from "../../actions/evaluationActions";
import { getAllSurveyForms } from "../../actions/surveyFormActions";
import Category from "../../models/Category";
import {
	CreateEvaluationRequest,
	EvaluationReqObject,
	NumericChoiceAnswerReqObject,
	NumericChoiceQuestionReqObject
} from "../../models/CreateEvaluationRequest";
import Employee from "../../models/Employee";
import SurveyForm from "../../models/SurveyForm";
import { sortCategoriesByCategorySequence } from "../../utils/SurveyFormUtils";
import SurveyFormTemplate from "../SurveyForm/SurveyFormTemplate";

export interface ICreateEvaluationProps extends FormComponentProps {
	errors: any;
	employees: Array<Employee>;
	surveyForms: Array<SurveyForm>;
	getEmployeesForManager: typeof getEmployeesForManager;
	getAllSurveyForms: typeof getAllSurveyForms;
	createEvaluation: typeof createEvaluation;
}

export interface ICreateEvaluationState {}

class CreateEvaluation extends React.Component<ICreateEvaluationProps, ICreateEvaluationState> {
	constructor(props: ICreateEvaluationProps) {
		super(props);

		this.state = {};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.getCategoriesFromSurveyForm = this.getCategoriesFromSurveyForm.bind(this);
	}

	componentWillMount() {
		this.props.getEmployeesForManager(1); // TODO: Use dynamic id based on who is logged in
		this.props.getAllSurveyForms();
	}

	handleSubmit(e: React.FormEvent<EventTarget>) {
		e.preventDefault();
		let creatorEmployeeId = 1;
		let evaluatorEmployeeId = 1;
		let evaluateeEmployeeId = this.props.form.getFieldValue("evaluatee");
		let surveyFormId = this.props.form.getFieldValue("surveyForm");
		let status = "COMPLETED";
		let remarks = this.props.form.getFieldValue("remarks");
		let evaluationReqObject = new EvaluationReqObject(status, remarks);
		let createEvaluationRequest = new CreateEvaluationRequest(
			creatorEmployeeId,
			evaluatorEmployeeId,
			evaluateeEmployeeId,
			surveyFormId,
			evaluationReqObject
		);
		let answerArray: Array<NumericChoiceAnswerReqObject> = [];
		let surveyFormCategories = this.getCategoriesFromSurveyForm();
		for (let i = 0; i < surveyFormCategories.length; i++) {
			let category = surveyFormCategories[i];
			let categoryId = category.categoryId;
			for (let j = 0; j < category.questions.length; j++) {
				let question = category.questions[j];
				let questionId = question.questionId;
				if (questionId) {
					let questionObject = new NumericChoiceQuestionReqObject(questionId);
					let answer = this.props.form.getFieldValue(`radio-${categoryId}-${questionId}`);
					let answerObject = new NumericChoiceAnswerReqObject(answer, questionObject);
					answerArray.push(answerObject);
				}
			}
		}
		createEvaluationRequest.evaluation.answers = answerArray;
		this.props.createEvaluation(createEvaluationRequest);
		// console.log(JSON.stringify(createEvaluationRequest));
	}

	getCategoriesFromSurveyForm() {
		let surveyFormId = this.props.form.getFieldValue("surveyForm");
		if (surveyFormId !== undefined) {
			let chosenSurveyForm: SurveyForm | undefined = this.props.surveyForms.find(
				(surveyForm: SurveyForm) => surveyForm.surveyFormId === surveyFormId
			);
			if (chosenSurveyForm) {
				return chosenSurveyForm.categories;
			}
		}
		return [];
	}

	public render() {
		const { getFieldDecorator } = this.props.form;
		let surveyFormId = this.props.form.getFieldValue("surveyForm");
		let surveyFormName = "";
		let toolProcessName = "";
		let skillLevel = "";
		let categories: Array<Category> = [];
		if (surveyFormId !== undefined) {
			let chosenSurveyForm: SurveyForm | undefined = this.props.surveyForms.find(
				(surveyForm: SurveyForm) => surveyForm.surveyFormId === surveyFormId
			);
			if (chosenSurveyForm) {
				surveyFormName = chosenSurveyForm.surveyFormName;
				toolProcessName = chosenSurveyForm.toolProcess.toolProcessName;
				skillLevel = chosenSurveyForm.skillLevel;
				categories = sortCategoriesByCategorySequence(chosenSurveyForm.categories);
			}
		}
		return (
			<Form onSubmit={this.handleSubmit} style={{ padding: "2vw 5vw 0 5vw" }}>
				<Row>
					<Col span={24}>
						<Typography.Title style={{ textAlign: "center" }}>
							Creating Evaluation
						</Typography.Title>
						<hr />
					</Col>
				</Row>
				<Card
					title={
						<Row gutter={24} type="flex" justify="center">
							<Col sm={12} xs={24} style={{ textAlign: "center", fontSize: "24px" }}>
								<Form.Item
									validateStatus={this.props.errors.evaluateeEmployeeId ? "error" : ""}
									help={this.props.errors.evaluateeEmployeeId}
									hasFeedback={true}
									label="Select an employee to evaluate:"
								>
									{getFieldDecorator("evaluatee", {})(
										<Select
											placeholder="Select Employee"
											size="large"
											style={{ width: "100%" }}
										>
											{this.props.employees.map(employee => (
												<Select.Option
													key={employee.username}
													value={employee.employeeId}
												>
													{employee.name}
												</Select.Option>
											))}
										</Select>
									)}
								</Form.Item>
							</Col>
							<Col sm={12} xs={24} style={{ textAlign: "center", fontSize: "24px" }}>
								<Form.Item
									validateStatus={this.props.errors.surveyFormId ? "error" : ""}
									help={this.props.errors.surveyFormId}
									hasFeedback={true}
									label="Select an evaluation form:"
								>
									{getFieldDecorator("surveyForm", {})(
										<Select
											placeholder="Select Form"
											size="large"
											style={{ width: "100%" }}
										>
											{this.props.surveyForms.map((surveyForm: SurveyForm) => (
												<Select.Option
													key={surveyForm.surveyFormName}
													value={surveyForm.surveyFormId}
												>
													{surveyForm.surveyFormName}
												</Select.Option>
											))}
										</Select>
									)}
								</Form.Item>
							</Col>
							<Col span={24} style={{ textAlign: "center" }}>
								<Form.Item
									validateStatus={this.props.errors.remarks ? "error" : ""}
									help={this.props.errors.remarks}
									hasFeedback={true}
									label="Remarks:"
								>
									{getFieldDecorator("remarks", {})(
										<Input.TextArea autosize={{ minRows: 2 }} />
									)}
								</Form.Item>
							</Col>
						</Row>
					}
				>
					{surveyFormId !== undefined ? (
						<SurveyFormTemplate
							surveyFormName={surveyFormName}
							toolProcessName={toolProcessName}
							skillLevel={skillLevel}
							categories={categories}
							form={this.props.form}
						/>
					) : (
						""
					)}
					<Form.Item style={{ textAlign: "right", marginTop: "10px" }}>
						<Row type="flex" justify="end" gutter={8}>
							<Col md={6} sm={8} xs={10}>
								<Affix offsetBottom={10}>
									<Button type="primary" size="large" block>
										<Icon type="eye" />
										Save as Draft
									</Button>
								</Affix>
							</Col>
							<Col md={6} sm={8} xs={10}>
								<Affix offsetBottom={10}>
									<Button
										type="primary"
										htmlType="submit"
										size="large"
										block
										onSubmit={this.handleSubmit}
									>
										<Icon type="save" />
										Submit
									</Button>
								</Affix>
							</Col>
						</Row>
					</Form.Item>
				</Card>
			</Form>
		);
	}
}

const wrappedCreateEval = Form.create({ name: "create_evaluation" })(CreateEvaluation);

const mapStateToProps = (state: any) => ({
	errors: state.errors,
	employees: state.employee.employeesForManager,
	surveyForms: state.surveyForm.surveyForms
});

const mapDispatchToProps = {
	getEmployeesForManager,
	getAllSurveyForms,
	createEvaluation
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(wrappedCreateEval);

/* Example JSON format of request
{
	"evaluation": {
		"status": "NEW",
		"remarks": "TEST",
		"answers":[
			{
				"numericAnswer": 3,
				"question": {
					"type": "numericChoice",
                    "questionId": 1
				}
			}
		]
	},
	"evaluatorEmployeeId": 1,
	"evaluateeEmployeeId": 1,
	"creatorEmployeeId": 1,
	"surveyFormId": 1
}
*/
