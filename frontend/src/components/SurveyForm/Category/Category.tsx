import * as React from "react";
import { Card, Form, Input, Button, Icon, Row, Col, Tooltip } from "antd";
import Question from "../Question/Question";
import { WrappedFormUtils } from "antd/lib/form/Form";
import "./Category.css";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { connect } from "react-redux";
import CategoryModel from "../../../models/Category";

export interface ICategoryProps {
	form: WrappedFormUtils<any>;
	categoryId: number;
	removeCategory: Function;
	isDragging: boolean;
	questions: Array<number>;
	addQuestion: Function;
	removeQuestion: Function;
	reorderQuestions: Function;
	index: any;
	errors: any;
	existingCategoryObj?: CategoryModel;
}

export interface ICategoryState {
	questionId: number;
}

class Category extends React.Component<ICategoryProps, ICategoryState> {
	constructor(props: ICategoryProps) {
		super(props);

		this.state = {
			questionId: 0
		};

		this.addQuestion = this.addQuestion.bind(this);
		this.removeSelf = this.removeSelf.bind(this);
		this.onDragEnd = this.onDragEnd.bind(this);
	}

	addQuestion() {
		this.props.addQuestion(this.props.categoryId, this.state.questionId);
		const questionIdExists = (questionId: number) => {
			return this.props.questions.includes(questionId);
		};
		let nextQuestionId = this.state.questionId + 1;
		while (questionIdExists(nextQuestionId)) {
			nextQuestionId++;
		}
		this.setState((prevState, props) => ({
			questionId: prevState.questionId + 1
		}));
	}

	removeSelf() {
		this.props.removeCategory(this.props.categoryId);
	}

	onDragEnd(result: DropResult) {
		this.props.reorderQuestions(this.props.categoryId, result);
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		let questions = this.props.questions;
		let existingCategoryObj = this.props.existingCategoryObj;
		return (
			<Card
				bordered={true}
				style={{
					backgroundColor: this.props.isDragging ? "#fdffe3" : "white"
				}}
				title={
					<Row type="flex" justify="space-between">
						<Col md={1} xs={2} style={{ textAlign: "center" }}>
							<Form.Item
								style={{ marginBottom: 0, verticalAlign: "middle" }}
							>
								<Icon className="menu-icon" type="menu" />
							</Form.Item>
						</Col>
						<Col md={22} xs={18}>
							<Form.Item
								validateStatus={
									this.props.errors[
										`categories[${this.props.index}].categoryName`
									]
										? "error"
										: ""
								}
								help={
									this.props.errors[
										`categories[${this.props.index}].categoryName`
									]
								}
								hasFeedback={true}
								style={{
									marginBottom: "0",
									fontWeight: "normal"
								}}
							>
								{getFieldDecorator(
									`categoryName-${this.props.categoryId}`,
									{
										initialValue: existingCategoryObj
											? existingCategoryObj.categoryName
											: ""
									}
								)(
									<Input
										placeholder="Enter category name"
										size="large"
										className="categoryName"
									/>
								)}
							</Form.Item>
						</Col>
						<Col md={1} xs={2} style={{ textAlign: "center" }}>
							<Form.Item style={{ marginBottom: "0" }}>
								<Tooltip title="Delete this category">
									<Icon
										className="dynamic-delete-button"
										type="minus-circle"
										onClick={() => this.removeSelf()}
									/>
								</Tooltip>
							</Form.Item>
						</Col>
					</Row>
				}
			>
				<DragDropContext onDragEnd={this.onDragEnd}>
					<Droppable droppableId="droppableQuestions">
						{(provided, snapshot) => (
							<div ref={provided.innerRef} {...provided.droppableProps}>
								{questions.map((questionId, index) => {
									return (
										<Draggable
											key={questionId}
											draggableId={questionId.toString()}
											index={index}
										>
											{(provided, snapshot) => (
												<div
													ref={provided.innerRef}
													{...provided.draggableProps}
													{...provided.dragHandleProps}
												>
													<Row
														key={`questionRow-${questionId}`}
														type="flex"
														justify="space-between"
														align="middle"
														style={{
															backgroundColor:
																snapshot.isDragging ||
																this.props.isDragging
																	? "#fdffe3"
																	: "white"
														}}
													>
														<Question
															key={questionId}
															form={this.props.form}
															categoryId={
																this.props.categoryId
															}
															questionId={questionId}
															index={index}
															parentCategoryIndex={
																this.props.index
															}
															existingQuestionObj={getExistingQuestionByQuestionId(
																this.props
																	.existingCategoryObj,
																questionId
															)}
														/>
														<Col
															sm={1}
															xs={2}
															style={{
																textAlign: "center"
															}}
														>
															<Form.Item>
																<Tooltip title="Delete this question">
																	<Icon
																		className="dynamic-delete-button"
																		type="minus-circle-o"
																		onClick={() =>
																			this.props.removeQuestion(
																				this.props
																					.categoryId,
																				questionId
																			)
																		}
																	/>
																</Tooltip>
															</Form.Item>
														</Col>
													</Row>
												</div>
											)}
										</Draggable>
									);
								})}
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</DragDropContext>
				<Button type="primary" onClick={this.addQuestion}>
					<Icon type="plus-circle" />
					Add task
				</Button>
			</Card>
		);
	}
}

const getExistingQuestionByQuestionId = (
	category: CategoryModel | undefined,
	questionId: number
) => {
	return category
		? category.questions.find(question => question.questionId === questionId)
		: undefined;
};

const mapStateToProps = (state: any) => ({
	errors: state.errors
});

export default connect(
	mapStateToProps,
	null
)(Category);
