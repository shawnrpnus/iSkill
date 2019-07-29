import { Affix, Button, Card, Col, Form, Icon, Input, Row, Select, Typography } from "antd";
import { FormComponentProps } from "antd/lib/form";
import * as React from "react";
import { connect } from "react-redux";
import { getEmployeesForManager } from "../../actions/employeeAction";
import { createEvaluation, getEvaluation, updateEvaluation } from "../../actions/evaluationActions";
import { getAllSurveyForms, clearStateErrors } from "../../actions/surveyFormActions";
import Category from "../../models/Category";
import {
	CreateEvaluationRequest,
	EvaluationReqObject,
	NumericChoiceAnswerReqObject,
	NumericChoiceQuestionReqObject,
	UpdateEvaluationRequest
} from "../../models/CreateUpdateEvaluationRequest";
import Employee from "../../models/Employee";
import SurveyForm from "../../models/SurveyForm";
import { sortCategoriesByCategorySequence } from "../../utils/SurveyFormUtils";
import SurveyFormTemplate from "../SurveyForm/SurveyFormTemplate";
import { RouteComponentProps } from "react-router-dom";
import Evaluation from "../../models/Evaluation";

export interface ICreateEvaluationProps extends FormComponentProps, RouteComponentProps {
	errors: any;
	employees: Array<Employee>;
	surveyForms: Array<SurveyForm>;
	evaluationToUpdate?: Evaluation;
	getEmployeesForManager: typeof getEmployeesForManager;
	getAllSurveyForms: typeof getAllSurveyForms;
	createEvaluation: typeof createEvaluation;
	clearStateErrors: typeof clearStateErrors;
	getEvaluation: typeof getEvaluation;
	updateEvaluation: typeof updateEvaluation;
}

export interface ICreateEvaluationState {}

interface IRouteParams {
	evaluationId?: number;
}

class CreateEvaluation extends React.Component<ICreateEvaluationProps, ICreateEvaluationState> {
	constructor(props: ICreateEvaluationProps) {
		super(props);

		this.state = {};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.getCategoriesFromSurveyForm = this.getCategoriesFromSurveyForm.bind(this);
		this.generateCreateEvaluationRequest = this.generateCreateEvaluationRequest.bind(this);
		this.generateUpdateEvaluationRequest = this.generateUpdateEvaluationRequest.bind(this);
		this.handleSaveAsDraft = this.handleSaveAsDraft.bind(this);
		this.generateAnswerArray = this.generateAnswerArray.bind(this);
	}

	componentWillMount() {
		this.props.getEmployeesForManager(1); // TODO: Use dynamic id based on who is logged in
		this.props.getAllSurveyForms();
		let params: IRouteParams = this.props.match.params;
		if (params.evaluationId) {
			//viewing or updating
			this.props.getEvaluation(params.evaluationId); //sets this.props.evaluationToUpdate
		}
	}

	getSurveyFormIdForEvaluation(evaluationId: number) {
		for (let i = 0; i < this.props.surveyForms.length; i++) {
			let surveyForm = this.props.surveyForms[i];
			if (surveyForm.evaluations) {
				for (let j = 0; j < surveyForm.evaluations.length; j++) {
					if (surveyForm.evaluations[j].evaluationId === evaluationId) {
						return surveyForm.surveyFormId;
					}
				}
			}
		}
	}

	componentWillUnmount() {
		//clear errors
		this.props.clearStateErrors();
	}

	componentWillUpdate() {
		if (Object.keys(this.props.errors).length !== 0) this.props.clearStateErrors();
	}

	handleSaveAsDraft() {
		if (this.props.evaluationToUpdate && this.props.evaluationToUpdate.evaluationId) {
			let updateEvaluationRequest = this.generateUpdateEvaluationRequest();
			updateEvaluationRequest.evaluation.evaluationId = this.props.evaluationToUpdate.evaluationId;
			console.log(updateEvaluationRequest);
			this.props.updateEvaluation(updateEvaluationRequest);
		} else {
			let createEvaluationRequest = this.generateCreateEvaluationRequest();
			createEvaluationRequest.evaluation.status = "ONGOING";
			this.props.createEvaluation(createEvaluationRequest);
		}
	}

	handleSubmit(e: React.FormEvent<EventTarget>) {
		console.log("submit");
		e.preventDefault();
		if (!this.props.evaluationToUpdate) {
			this.props.createEvaluation(this.generateCreateEvaluationRequest());
		} else if (this.props.evaluationToUpdate && this.props.evaluationToUpdate.evaluationId) {
			let updateEvaluationRequest = this.generateUpdateEvaluationRequest();
			updateEvaluationRequest.evaluation.evaluationId = this.props.evaluationToUpdate.evaluationId;
			updateEvaluationRequest.evaluation.status = "COMPLETED";
			this.props.updateEvaluation(updateEvaluationRequest);
		}
	}

	generateCreateEvaluationRequest() {
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

		createEvaluationRequest.evaluation.answers = this.generateAnswerArray();
		return createEvaluationRequest;
	}

	generateUpdateEvaluationRequest() {
		let evaluatorEmployeeId = 1;
		let evaluateeEmployeeId = this.props.form.getFieldValue("evaluatee");
		let surveyFormId = this.props.form.getFieldValue("surveyForm");
		let status = "ONGOING";
		let remarks = this.props.form.getFieldValue("remarks");
		let evaluationReqObject = new EvaluationReqObject(status, remarks);
		let updateEvaluationRequest = new UpdateEvaluationRequest(
			evaluatorEmployeeId,
			evaluateeEmployeeId,
			surveyFormId,
			evaluationReqObject
		);

		updateEvaluationRequest.evaluation.answers = this.generateAnswerArray();
		return updateEvaluationRequest;
	}

	generateAnswerArray() {
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
		return answerArray;
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
		console.log(this.props.evaluationToUpdate);
		const { getFieldDecorator } = this.props.form;
		let surveyFormId = this.props.form.getFieldValue("surveyForm");
		if (!surveyFormId && this.props.evaluationToUpdate && this.props.evaluationToUpdate.evaluationId) {
			surveyFormId = this.getSurveyFormIdForEvaluation(this.props.evaluationToUpdate.evaluationId);
		}
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
							{this.props.evaluationToUpdate ? "Updating Evaluation" : "Creating Evaluation"}
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
									{getFieldDecorator("evaluatee", {
										initialValue: this.props.evaluationToUpdate
											? this.props.evaluationToUpdate.evaluatee.employeeId
											: undefined
									})(
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
									{getFieldDecorator("surveyForm", {
										initialValue:
											this.props.evaluationToUpdate &&
											this.props.evaluationToUpdate.evaluationId
												? this.getSurveyFormIdForEvaluation(
														this.props.evaluationToUpdate.evaluationId
												  )
												: undefined
									})(
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
									{getFieldDecorator("remarks", {
										initialValue: this.props.evaluationToUpdate
											? this.props.evaluationToUpdate.remarks
											: undefined
									})(<Input.TextArea autosize={{ minRows: 2 }} />)}
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
							answers={
								this.props.evaluationToUpdate
									? this.props.evaluationToUpdate.answers
									: undefined
							}
						/>
					) : (
						""
					)}
					<Form.Item style={{ textAlign: "right", marginTop: "10px" }}>
						<Row type="flex" justify="end" gutter={8}>
							<Col md={6} sm={8} xs={10}>
								<Affix offsetBottom={10}>
									<Button
										type="primary"
										size="large"
										htmlType="button"
										block
										onClick={this.handleSaveAsDraft}
									>
										<Icon type="save" />
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
	surveyForms: state.surveyForm.surveyForms,
	evaluationToUpdate: state.evaluation.evaluationToViewOrUpdate
});

const mapDispatchToProps = {
	getEmployeesForManager,
	getAllSurveyForms,
	createEvaluation,
	clearStateErrors,
	getEvaluation,
	updateEvaluation
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
