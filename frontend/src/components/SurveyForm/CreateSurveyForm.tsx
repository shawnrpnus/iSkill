import * as React from "react";
import { connect } from "react-redux";
import { Form, Input, Select, Row, Col, Button, Icon } from "antd";
import { FormComponentProps } from "antd/lib/form";
import "./CreateSurveyForm.css";
import CategoryModel from "../../models/Category";
import Category from "./Category/Category";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";

const reorder = (list: Iterable<number>, startIndex: number, endIndex: number) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);
	return result;
};

export interface ICreateSurveyFormProps extends FormComponentProps {
	errors: any;
}

export interface ICreateSurveyFormState {
	categories: Array<number>;
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
	}

	getFormFieldsValue() {
		console.log(this.props.form.getFieldsValue());
	}

	addCategory() {
		this.setState((prevState, props) => ({
			categories: prevState.categories.concat(prevState.categoryId),
			categoryId: prevState.categoryId + 1
		}));
	}

	removeCategory(categoryId: number) {
		this.setState((prevState, props) => ({
			categories: prevState.categories.filter(element => element !== categoryId)
		}));
	}

	onDragEnd(result: DropResult) {
		if (!result.destination) {
			return;
		}

		const updatedCategories = reorder(
			this.state.categories,
			result.source.index,
			result.destination.index
		);

		this.setState((prevState, props) => ({
			categories: updatedCategories
		}));
	}

	handleSubmit() {
		let categoryModelList = [];
		for (let i = 0; i < this.state.categories.length; i++) {
			let categoryName = this.props.form.getFieldValue(
				`categoryName-${this.state.categories[i]}`
			);
			let categorySequence = i;
			let questionModelList = this.props.form.getFieldValue(
				`questionModelList-${this.state.categories[i]}`
			);
			let categoryModel: CategoryModel = new CategoryModel(
				categoryName,
				categorySequence,
				questionModelList
			);
			categoryModelList.push(categoryModel);
		}

		console.log(JSON.stringify(categoryModelList));
	}

	public render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<Form onSubmit={this.handleSubmit} style={{ padding: "2vw 10vw 0 10vw" }}>
				<Button onClick={() => this.handleSubmit()}>Fields Value</Button>
				<Row gutter={16}>
					<Col span={8}>
						<Form.Item
							// validateStatus={
							// 	this.props.errors.surveyFormName ? "error" : ""
							// }
							// help={this.props.errors.surveyFormName}
							hasFeedback={true}
						>
							{getFieldDecorator("surveyFormName")(
								<Input placeholder="Enter form name" size="large" />
							)}
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item
							// validateStatus={this.props.errors.toolProcess ? "error" : ""}
							// help={this.props.errors.toolProcess}
							hasFeedback={true}
						>
							{getFieldDecorator("toolProcess")(
								<Select
									placeholder="Select Tool / Process"
									size="large"
								/>
							)}
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item
							// validateStatus={this.props.errors.skillLevel ? "error" : ""}
							// help={this.props.errors.SkillLevel}
							hasFeedback={true}
						>
							{getFieldDecorator("skillLevel")(
								<Select placeholder="Select Skill Level" size="large" />
							)}
						</Form.Item>
					</Col>
				</Row>
				<hr />
				<DragDropContext onDragEnd={this.onDragEnd}>
					<Droppable droppableId="droppableCategories">
						{(provided, snapshot) => (
							<div ref={provided.innerRef} {...provided.droppableProps}>
								{this.state.categories.map((categoryId, index) => {
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
			</Form>
		);
	}
}

const wrappedCreateSurveyForm = Form.create({ name: "create_survey_form" })(
	CreateSurveyForm
);
const mapStateToProps = (state: any) => ({});
const mapDispatchToProps = {};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(wrappedCreateSurveyForm);
