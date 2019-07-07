import * as React from "react";
import { Card, Form, Input, Button, Icon, Row, Col, Tooltip } from "antd";
import Question from "../Question/Question";
import NumericChoiceQuestion from "../../../models/NumericChoiceQuestion";
import CategoryModel from "../../../models/Category";
import { WrappedFormUtils } from "antd/lib/form/Form";
import "./Category.css";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";

const reorder = (list: Iterable<number>, startIndex: number, endIndex: number) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);
	return result;
};
export interface ICategoryProps {
	form: WrappedFormUtils<any>;
	categoryId: number;
	removeCategory: Function;
	isDragging: boolean;
	questions: Array<number>;
	addQuestion: Function;
	removeQuestion: Function;
	reorderQuestions: Function;
}

export interface ICategoryState {
	questionId: number;
}

export default class Category extends React.Component<ICategoryProps, ICategoryState> {
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
		return (
			<Card
				bordered={true}
				style={{
					backgroundColor: this.props.isDragging ? "#fdffe3" : "white"
				}}
				title={
					<Row>
						<Col span={1}>
							<Form.Item style={{ marginBottom: 0 }}>
								<Icon type="menu" />
							</Form.Item>
						</Col>
						<Col span={21}>
							<Form.Item
								// validateStatus={
								// 	this.props.errors.surveyFormName ? "error" : ""
								// }
								// help={this.props.errors.surveyFormName}
								hasFeedback={true}
								style={{ marginBottom: "0" }}
							>
								{getFieldDecorator(
									`categoryName-${this.props.categoryId}`
								)(
									<Input
										placeholder="Enter category name"
										size="large"
									/>
								)}
							</Form.Item>
						</Col>
						<Col span={2} style={{ textAlign: "center" }}>
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
														/>
														<Col
															span={2}
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
