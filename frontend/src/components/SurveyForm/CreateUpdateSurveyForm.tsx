import { Alert, Button, Col, Form, Icon, Input, Row, Select, Spin, Typography, Card, Affix } from "antd";
import { FormComponentProps } from "antd/lib/form";
import * as React from "react";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import {
	clearStateErrors,
	clearUpdatingForm,
	createSurveyForm,
	getSurveyForm,
	updateSurveyForm
} from "../../actions/surveyFormActions";
import { getAllToolProcess } from "../../actions/toolProcessActions";
import CategoryModel from "../../models/Category";
import NumericChoiceQuestion from "../../models/NumericChoiceQuestion";
import SurveyFormModel from "../../models/SurveyForm";
import ToolProcess from "../../models/ToolProcess";
import {
	getExistingCategoryByCategoryId,
	getExistingQuestionByQuestionId,
	sortCategoriesByCategorySequence,
	sortQuestionsByQuestionSequence,
	COL_FOUR_SIZE,
	COL_THREE_SIZE,
	COL_TWO_SIZE,
	COL_ONE_SIZE
} from "../../utils/SurveyFormUtils";
import Category from "./Category/Category";
import "./CreateUpdateSurveyForm.css";

export interface ICreateSurveyFormProps extends FormComponentProps, RouteComponentProps<any> {
	errors: any;
	createSurveyForm: typeof createSurveyForm;
	clearStateErrors: typeof clearStateErrors;
	getAllToolProcess: typeof getAllToolProcess;
	getSurveyForm: typeof getSurveyForm;
	updateSurveyForm: typeof updateSurveyForm;
	clearUpdatingForm: typeof clearUpdatingForm;
	toolProcessList: Array<ToolProcess>;
	surveyFormToViewOrUpdate?: SurveyFormModel;
}

export interface ICreateSurveyFormState {
	categories: Array<ICategory>;
	categoryId: number;
	updating: boolean;
}

interface ICategory {
	categoryId: number;
	questions: Array<number>;
	//each category object contains a list of questionIds
	//non-persisted/new questions will have temporary Ids (to be generated by db in backend once submitted)
	//to uniquely identify a question, use category ID and question ID combination
}

interface IRouteParams {
	formId?: number;
}

class CreateUpdateSurveyForm extends React.Component<ICreateSurveyFormProps, ICreateSurveyFormState> {
	constructor(props: ICreateSurveyFormProps) {
		super(props);

		this.state = {
			categories: [], //array of category objects (new/non-persisted categories will have temp IDs)
			categoryId: 0,
			updating: false
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.addCategory = this.addCategory.bind(this);
		this.removeCategory = this.removeCategory.bind(this);
		this.onDragEnd = this.onDragEnd.bind(this);
		this.addQuestion = this.addQuestion.bind(this);
		this.removeQuestion = this.removeQuestion.bind(this);
		this.reorderQuestions = this.reorderQuestions.bind(this);
		this.generateSurveyModel = this.generateSurveyModel.bind(this);
	}

	componentWillMount() {
		this.props.getAllToolProcess();
		let params: IRouteParams = this.props.match.params;
		if (params.formId) {
			//viewing or updating
			this.props.getSurveyForm(params.formId);
		}
	}

	componentWillUnmount() {
		//clear errors
		//remove the currently updating surveyform
		this.props.clearStateErrors();
		this.props.clearUpdatingForm();
		this.setState({
			categories: [],
			categoryId: 0
		});
	}

	componentDidUpdate() {
		if (
			(this.props.match.params as IRouteParams).formId &&
			this.props.surveyFormToViewOrUpdate &&
			this.state.categories.length === 0 &&
			!this.state.updating
		) {
			//initial load only for updating form
			let existingCategories = sortCategoriesByCategorySequence(
				this.props.surveyFormToViewOrUpdate.categories
			);
			let categoriesToPutIntoState: Array<ICategory> = [];
			existingCategories.forEach(currCategory => {
				let existingQuestions = sortQuestionsByQuestionSequence(currCategory.questions);

				let questionsToPutIntoCategoryState: Array<number> = [];
				existingQuestions.forEach(currQuestion => {
					if (currQuestion.questionId) {
						questionsToPutIntoCategoryState.push(currQuestion.questionId);
					}
				});
				if (currCategory.categoryId) {
					categoriesToPutIntoState.push({
						categoryId: currCategory.categoryId,
						questions: questionsToPutIntoCategoryState
					});
				}
			});
			this.setState({
				categories: categoriesToPutIntoState,
				updating: true
			});
		}
	}

	componentWillUpdate() {
		if (Object.keys(this.props.errors).length !== 0) this.props.clearStateErrors();
	}

	reorder(list: Iterable<any>, startIndex: number, endIndex: number) {
		const result = Array.from(list);
		const [removed] = result.splice(startIndex, 1);
		result.splice(endIndex, 0, removed);
		this.props.clearStateErrors();
		return result;
	}

	addCategory() {
		let newCategory: ICategory = {
			categoryId: this.state.categoryId,
			questions: []
		};
		const categoryIdExists = (categoryId: number) => {
			let existingCategoryIds = this.state.categories.filter(
				category => category.categoryId === categoryId
			);
			if (existingCategoryIds.length > 0) {
				return true;
			} else {
				return false;
			}
		};
		let nextCategoryId = this.state.categoryId + 1;
		while (categoryIdExists(nextCategoryId)) {
			nextCategoryId++;
		}
		this.setState((prevState, props) => ({
			categories: prevState.categories.concat(newCategory),
			categoryId: nextCategoryId
		}));
	}

	removeCategory(categoryId: number) {
		this.setState((prevState, props) => ({
			categories: prevState.categories.filter(category => category.categoryId !== categoryId)
		}));
	}

	addQuestion(categoryId: number, questionId: number) {
		let categories: Array<ICategory> = JSON.parse(JSON.stringify(this.state.categories)); //deep copy
		let category = categories.find(category => category.categoryId === categoryId);
		if (category != null) {
			category.questions.push(questionId);
		}
		this.setState({
			categories: categories
		});
	}

	removeQuestion(categoryId: number, questionId: number) {
		let categories: Array<ICategory> = JSON.parse(JSON.stringify(this.state.categories)); //deep copy
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
		let categories: Array<ICategory> = JSON.parse(JSON.stringify(this.state.categories)); //deep copy
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
		let surveyFormModel = this.generateSurveyModel();
		let employeeId = 1;

		if (this.props.surveyFormToViewOrUpdate) {
			//update
			surveyFormModel.surveyFormId = this.props.surveyFormToViewOrUpdate.surveyFormId;
			this.props.updateSurveyForm(surveyFormModel);
		} else {
			//create
			this.props.createSurveyForm(surveyFormModel, employeeId);
		}
	}

	generateSurveyModel() {
		let categoryModelList = [];
		let stateCategories = this.state.categories;
		for (let i = 0; i < stateCategories.length; i++) {
			let categoryName = this.props.form.getFieldValue(`categoryName-${stateCategories[i].categoryId}`);
			let categorySequence = i + 1;
			let categoryQuestions = stateCategories[i].questions; //array of front-end IDs
			let questionModelList: Array<NumericChoiceQuestion> = [];

			//------FOR UPDATING------
			let originalCategoryModel = getExistingCategoryByCategoryId(
				this.props.surveyFormToViewOrUpdate,
				stateCategories[i].categoryId
			);
			//------------------------

			for (let j = 0; j < categoryQuestions.length; j++) {
				let qnSequence = j + 1;
				let qnText = this.props.form.getFieldValue(
					`questionText-${stateCategories[i].categoryId}-${categoryQuestions[j]}`
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

				//-----------FOR UPDATING----------
				let originalQuestionModel = getExistingQuestionByQuestionId(
					originalCategoryModel,
					categoryQuestions[j]
				);
				if (originalQuestionModel) {
					//if updating a question that already exists in db
					questionModel.questionId = originalQuestionModel.questionId;
				}
				//---------------------------------

				questionModelList.push(questionModel);
			}
			let categoryModel: CategoryModel = new CategoryModel(
				categoryName,
				categorySequence,
				questionModelList
			);

			//---------FOR UPDATING---------
			if (originalCategoryModel) {
				//if updating a category that already existed in db
				categoryModel.categoryId = originalCategoryModel.categoryId;
			}
			//------------------------------

			categoryModelList.push(categoryModel);
		}

		let surveyFormName = this.props.form.getFieldValue("surveyFormName");
		let skillLevel = this.props.form.getFieldValue("skillLevel");

		let toolProcess = this.props.toolProcessList.filter(
			toolProcess => toolProcess.toolProcessId === this.props.form.getFieldValue("toolProcess")
		);

		let surveyFormModel = new SurveyFormModel(
			surveyFormName,
			skillLevel,
			categoryModelList,
			toolProcess[0]
		);

		return surveyFormModel;
	}

	public render() {
		const { getFieldDecorator } = this.props.form;
		let surveyFormToViewOrUpdate = this.props.surveyFormToViewOrUpdate;
		return (
			<Spin
				spinning={
					((this.props.match.params as IRouteParams).formId ? true : false) &&
					!this.props.surveyFormToViewOrUpdate
				}
			>
				<Form onSubmit={this.handleSubmit} style={{ padding: "2vw 5vw 0 5vw" }}>
					<Row>
						<Col span={24}>
							<Typography.Title style={{ textAlign: "center" }}>
								{this.props.surveyFormToViewOrUpdate
									? "Updating Evaluation Form"
									: "New Evaluation Form"}
							</Typography.Title>
							<hr />
						</Col>
					</Row>
					<Card
						title={
							<Row gutter={24} type="flex" justify="center">
								<Col span={24} style={{ fontSize: "48px", textAlign: "center" }}>
									<Form.Item
										validateStatus={this.props.errors.surveyFormName ? "error" : ""}
										help={this.props.errors.surveyFormName}
										hasFeedback={true}
										style={{ marginBottom: "0" }}
									>
										{getFieldDecorator("surveyFormName", {
											initialValue: surveyFormToViewOrUpdate
												? surveyFormToViewOrUpdate.surveyFormName
												: ""
										})(
											<Input
												placeholder="Form title"
												size="large"
												style={{
													textAlign: "center",
													width: "90%",
													height: "64px",
													fontSize: "48px"
												}}
											/>
										)}
									</Form.Item>
								</Col>
								<Col sm={6} xs={10} style={{ textAlign: "center" }}>
									<Form.Item
										validateStatus={this.props.errors.toolProcess ? "error" : ""}
										help={this.props.errors.toolProcess}
										hasFeedback={true}
										label="Tool / Process"
									>
										{getFieldDecorator("toolProcess", {
											initialValue: surveyFormToViewOrUpdate
												? surveyFormToViewOrUpdate.toolProcess.toolProcessId
												: ""
										})(
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
								<Col sm={6} xs={10} style={{ textAlign: "center" }}>
									<Form.Item
										validateStatus={this.props.errors.skillLevel ? "error" : ""}
										help={this.props.errors.skillLevel}
										hasFeedback={true}
										label="Skill Level"
									>
										{getFieldDecorator("skillLevel", {
											initialValue: surveyFormToViewOrUpdate
												? surveyFormToViewOrUpdate.skillLevel
												: ""
										})(
											<Select placeholder="Select Skill Level" size="large">
												<Select.Option value="L1">L1</Select.Option>
												<Select.Option value="L2">L2</Select.Option>
												<Select.Option value="L3">L3</Select.Option>
											</Select>
										)}
									</Form.Item>
								</Col>
							</Row>
						}
					>
						{this.props.errors.categories && this.state.categories.length === 0 ? (
							<Alert message={this.props.errors.categories} type="error" showIcon />
						) : (
							""
						)}
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
																	removeCategory={this.removeCategory}
																	isDragging={snapshot.isDragging}
																	questions={categoryObj.questions}
																	addQuestion={this.addQuestion}
																	removeQuestion={this.removeQuestion}
																	reorderQuestions={this.reorderQuestions}
																	index={index}
																	existingCategoryObj={getExistingCategoryByCategoryId(
																		this.props.surveyFormToViewOrUpdate,
																		categoryId
																	)}
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
						<Form.Item style={{ textAlign: "right" }}>
							<Affix offsetBottom={10}>
								<Button
									type="primary"
									htmlType="submit"
									size="large"
									onSubmit={this.handleSubmit}
								>
									<Icon type="save" />
									Submit
								</Button>
							</Affix>
						</Form.Item>
					</Card>
				</Form>
			</Spin>
		);
	}
}

const wrappedCreateSurveyForm = Form.create({ name: "create_survey_form" })(CreateUpdateSurveyForm);
const mapStateToProps = (state: any) => {
	return {
		errors: state.errors,
		toolProcessList: state.toolProcess.toolProcessList,
		surveyFormToViewOrUpdate: state.surveyForm.surveyFormToViewOrUpdate
	};
};
//action creators
const mapDispatchToProps = {
	createSurveyForm,
	clearStateErrors,
	getAllToolProcess,
	getSurveyForm,
	updateSurveyForm,
	clearUpdatingForm
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(wrappedCreateSurveyForm);
