import * as React from "react";
import { connect } from "react-redux";
import { Form, Input, Select, Row, Col, Button, Icon, Typography } from "antd";
import { FormComponentProps } from "antd/lib/form";
import "./CreateSurveyForm.css";
import CategoryModel from "../../models/Category";
import SurveyFormModel from "../../models/SurveyForm";
import Category from "./Category/Category";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import NumericChoiceQuestion from "../../models/NumericChoiceQuestion";
import {
	createSurveyForm,
	clearStateErrors
} from "../../actions/createSurveyFormActions";
import { getAllToolProcess } from "../../actions/toolProcessActions";
import ToolProcess from "../../models/ToolProcess";

export interface ICreateSurveyFormProps extends FormComponentProps {
	errors: any;
	createSurveyForm: typeof createSurveyForm;
	clearStateErrors: typeof clearStateErrors;
	getAllToolProcess: typeof getAllToolProcess;
	toolProcessList: Array<ToolProcess>;
}

export interface ICreateSurveyFormState {
	categories: Array<ICategory>;
	categoryId: number;
}

interface ICategory {
	categoryId: number;
	questions: Array<number>;
}

class CreateSurveyForm extends React.Component<
	ICreateSurveyFormProps,
	ICreateSurveyFormState
> {
	constructor(props: ICreateSurveyFormProps) {
		super(props);

		this.state = {
			categories: [],
			categoryId: 0
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.addCategory = this.addCategory.bind(this);
		this.removeCategory = this.removeCategory.bind(this);
		this.onDragEnd = this.onDragEnd.bind(this);
		this.addQuestion = this.addQuestion.bind(this);
		this.removeQuestion = this.removeQuestion.bind(this);
		this.reorderQuestions = this.reorderQuestions.bind(this);
	}

	componentWillMount() {
		this.props.getAllToolProcess();
		console.log(this.props.toolProcessList);
	}

	reorder(list: Iterable<any>, startIndex: number, endIndex: number) {
		const result = Array.from(list);
		const [removed] = result.splice(startIndex, 1);
		result.splice(endIndex, 0, removed);
		this.props.clearStateErrors();
		return result;
	}

	getFormFieldsValue() {
		console.log(this.props.form.getFieldsValue());
	}

	addCategory() {
		let newCategory: ICategory = {
			categoryId: this.state.categoryId,
			questions: []
		};
		this.setState((prevState, props) => ({
			categories: prevState.categories.concat(newCategory),
			categoryId: prevState.categoryId + 1
		}));
	}

	removeCategory(categoryId: number) {
		this.setState((prevState, props) => ({
			categories: prevState.categories.filter(
				category => category.categoryId !== categoryId
			)
		}));
	}

	addQuestion(categoryId: number, questionId: number) {
		let categories: Array<ICategory> = JSON.parse(
			JSON.stringify(this.state.categories)
		); //deep copy
		let category = categories.find(category => category.categoryId === categoryId);
		if (category != null) {
			category.questions.push(questionId);
		}
		this.setState({
			categories: categories
		});
	}

	removeQuestion(categoryId: number, questionId: number) {
		let categories: Array<ICategory> = JSON.parse(
			JSON.stringify(this.state.categories)
		); //deep copy
		let category = categories.find(category => category.categoryId === categoryId);
		if (category != null) {
			category.questions = category.questions.filter(
				questionIdElement => questionIdElement !== questionId
			);
		}
		this.setState({
			categories: categories
		});
	}

	reorderQuestions(categoryId: number, result: DropResult) {
		if (!result.destination) {
			return;
		}
		let categories: Array<ICategory> = JSON.parse(
			JSON.stringify(this.state.categories)
		); //deep copy
		let category = categories.find(category => category.categoryId === categoryId);
		if (category != null) {
			category.questions = this.reorder(
				category.questions,
				result.source.index,
				result.destination.index
			);
		}
		this.setState({
			categories: categories
		});
	}

	onDragEnd(result: DropResult) {
		if (!result.destination) {
			return;
		}

		const updatedCategories = this.reorder(
			this.state.categories,
			result.source.index,
			result.destination.index
		);

		this.setState({
			categories: updatedCategories
		});
	}

	handleSubmit(e: React.FormEvent<EventTarget>) {
		e.preventDefault();
		let categoryModelList = [];
		let stateCategories = this.state.categories;
		for (let i = 0; i < stateCategories.length; i++) {
			let categoryName = this.props.form.getFieldValue(
				`categoryName-${stateCategories[i].categoryId}`
			);
			let categorySequence = i + 1;
			let categoryQuestions = stateCategories[i].questions;
			let questionModelList: Array<NumericChoiceQuestion> = [];
			for (let j = 0; j < categoryQuestions.length; j++) {
				let qnSequence = j + 1;
				let qnText = this.props.form.getFieldValue(
					`questionText-${stateCategories[i].categoryId}-${
						categoryQuestions[j]
					}`
				);
				let lowerBound = this.props.form.getFieldValue(
					`lowerBound-${stateCategories[i].categoryId}-${categoryQuestions[j]}`
				);
				let upperBound = this.props.form.getFieldValue(
					`upperBound-${stateCategories[i].categoryId}-${categoryQuestions[j]}`
				);
				let questionModel: NumericChoiceQuestion = new NumericChoiceQuestion(
					qnSequence,
					qnText,
					lowerBound,
					upperBound
				);
				questionModelList.push(questionModel);
			}
			let categoryModel: CategoryModel = new CategoryModel(
				categoryName,
				categorySequence,
				questionModelList
			);
			categoryModelList.push(categoryModel);
		}

		let surveyFormName = this.props.form.getFieldValue("surveyFormName");
		let skillLevel = this.props.form.getFieldValue("skillLevel");

		let toolProcess = this.props.toolProcessList.find(
			toolProcess =>
				toolProcess.toolProcessId === this.props.form.getFieldValue("toolProcess")
		);

		let surveyFormModel = new SurveyFormModel(
			surveyFormName,
			skillLevel,
			categoryModelList,
			toolProcess
		);

		let employeeId = 1;

		this.props.createSurveyForm(surveyFormModel, employeeId);
	}

	public render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<Form onSubmit={this.handleSubmit} style={{ padding: "2vw 5vw 0 5vw" }}>
				<Button
					onClick={() =>
						console.log(this.props.toolProcessList[0].toolProcessId)
					}
				>
					toolprocess
				</Button>
				<Row>
					<Col span={24}>
						<Typography.Title style={{ textAlign: "center" }}>
							New Evaluation Form
						</Typography.Title>
						<hr />
					</Col>
				</Row>
				<Row gutter={16}>
					<Col sm={8} xs={24}>
						<Form.Item
							validateStatus={
								this.props.errors.surveyFormName ? "error" : ""
							}
							help={this.props.errors.surveyFormName}
							hasFeedback={true}
							label="Form Name"
						>
							{getFieldDecorator("surveyFormName")(
								<Input placeholder="Enter form name" size="large" />
							)}
						</Form.Item>
					</Col>
					<Col sm={8} xs={24}>
						<Form.Item
							validateStatus={this.props.errors.toolProcess ? "error" : ""}
							help={this.props.errors.toolProcess}
							hasFeedback={true}
							label="Tool / Process"
						>
							{getFieldDecorator("toolProcess", {})(
								<Select placeholder="Select Tool / Process" size="large">
									{this.props.toolProcessList.map(
										(toolProcess: ToolProcess) => (
											<Select.Option
												key={toolProcess.toolProcessId}
												value={toolProcess.toolProcessId}
											>
												{toolProcess.toolProcessName}
											</Select.Option>
										)
									)}
								</Select>
							)}
						</Form.Item>
					</Col>
					<Col sm={8} xs={24}>
						<Form.Item
							validateStatus={this.props.errors.skillLevel ? "error" : ""}
							help={this.props.errors.skillLevel}
							hasFeedback={true}
							label="Skill Level"
						>
							{getFieldDecorator("skillLevel", {})(
								<Select placeholder="Select Skill Level" size="large">
									<Select.Option value="L1">L1</Select.Option>
									<Select.Option value="L2">L2</Select.Option>
									<Select.Option value="L3">L3</Select.Option>
								</Select>
							)}
						</Form.Item>
					</Col>
				</Row>
				<DragDropContext onDragEnd={this.onDragEnd}>
					<Droppable droppableId="droppableCategories">
						{(provided, snapshot) => (
							<div ref={provided.innerRef} {...provided.droppableProps}>
								{this.state.categories.map((categoryObj, index) => {
									let categoryId = categoryObj.categoryId;
									return (
										<Draggable
											key={categoryId}
											draggableId={categoryId.toString()}
											index={index}
										>
											{(provided, snapshot) => {
												return (
													<div
														ref={provided.innerRef}
														{...provided.draggableProps}
														{...provided.dragHandleProps}
													>
														<Category
															categoryId={categoryId}
															key={categoryId}
															form={this.props.form}
															removeCategory={
																this.removeCategory
															}
															isDragging={
																snapshot.isDragging
															}
															questions={
																categoryObj.questions
															}
															addQuestion={this.addQuestion}
															removeQuestion={
																this.removeQuestion
															}
															reorderQuestions={
																this.reorderQuestions
															}
															index={index}
														/>
													</div>
												);
											}}
										</Draggable>
									);
								})}
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</DragDropContext>
				<Button type="primary" onClick={this.addCategory}>
					<Icon type="plus-circle" />
					Add Category
				</Button>
				<Form.Item>
					<Button type="primary" htmlType="submit" onSubmit={this.handleSubmit}>
						Submit
					</Button>
				</Form.Item>
			</Form>
		);
	}
}

const wrappedCreateSurveyForm = Form.create({ name: "create_survey_form" })(
	CreateSurveyForm
);
const mapStateToProps = (state: any) => {
	return {
		errors: state.errors,
		toolProcessList: state.toolProcess.toolProcessList
	};
};
const mapDispatchToProps = {
	createSurveyForm,
	clearStateErrors,
	getAllToolProcess
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(wrappedCreateSurveyForm);
