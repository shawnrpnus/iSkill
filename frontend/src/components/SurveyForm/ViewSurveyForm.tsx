import { Alert, Button, Col, Form, Icon, Popconfirm, Row, Typography } from "antd";
import { FormComponentProps } from "antd/lib/form/Form";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import {
	clearStateErrors,
	clearUpdatingForm,
	deleteSurveyForm,
	getSurveyForm
} from "../../actions/surveyFormActions";
import CategoryModel from "../../models/Category";
import NumericChoiceQuestion from "../../models/NumericChoiceQuestion";
import QuestionModel from "../../models/Question";
import SurveyFormModel from "../../models/SurveyForm";
import { sortCategoriesByCategorySequence } from "../../utils/SurveyFormUtils";
import SurveyFormTemplate from "./SurveyFormTemplate";
import "./ViewSurveyForm.css";

export interface IViewSurveyFormProps extends FormComponentProps, RouteComponentProps {
	getSurveyForm: typeof getSurveyForm;
	surveyFormToViewOrUpdate?: SurveyFormModel;
	surveyFormToPreview?: SurveyFormModel;
	clearUpdatingForm: typeof clearUpdatingForm;
	deleteSurveyForm: typeof deleteSurveyForm;
	clearStateErrors: typeof clearStateErrors;
	errors: any;
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

	componentWillUnmount() {
		this.props.clearUpdatingForm();
		this.props.clearStateErrors();
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

	deleteSelf() {
		if (this.props.surveyFormToViewOrUpdate && this.props.match) {
			let surveyFormId = this.props.surveyFormToViewOrUpdate.surveyFormId;
			let params: IRouteParams = this.props.match.params;
			if (surveyFormId && params.formId && surveyFormId === +params.formId) {
				this.props.deleteSurveyForm(surveyFormId, this.props.history);
			} else {
				alert(
					`ERROR: route id does not match survey form id. SurveyFormId: ${surveyFormId}, ParamFormId: ${
						params.formId
					}`
				);
			}
		} else {
			alert("ERROR: Survey form or route not defined");
		}
	}

	public render() {
		let surveyFormName = "";
		let toolProcessName = "";
		let skillLevel = "";
		let categories: Array<CategoryModel> = [];
		let surveyFormId = null;
		if (this.props.surveyFormToPreview) {
			surveyFormName = this.props.surveyFormToPreview.surveyFormName;
			toolProcessName = this.props.surveyFormToPreview.toolProcess
				? this.props.surveyFormToPreview.toolProcess.toolProcessName
				: "";
			skillLevel = this.props.surveyFormToPreview.skillLevel;
			categories = this.props.surveyFormToPreview.categories;
		} else if (this.props.surveyFormToViewOrUpdate && this.props.match) {
			surveyFormName = this.props.surveyFormToViewOrUpdate.surveyFormName;
			toolProcessName = this.props.surveyFormToViewOrUpdate.toolProcess.toolProcessName;
			skillLevel = this.props.surveyFormToViewOrUpdate.skillLevel;
			categories = this.props.surveyFormToViewOrUpdate.categories;
			surveyFormId = this.props.surveyFormToViewOrUpdate.surveyFormId;
		}
		categories = sortCategoriesByCategorySequence(categories);
		return (
			<div style={this.props.surveyFormToPreview ? {} : { padding: "2vw 5vw 0 5vw" }}>
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
						<Col span={24}>
							<Link to={`/updateForm/${surveyFormId}`}>
								<Button type="primary" size="large">
									<Icon type="edit" />
									Edit Form
								</Button>
							</Link>
							<Popconfirm
								title="Are you sure you want to delete this form?"
								onConfirm={() => this.deleteSelf()}
								okText="Yes"
								cancelText="No"
								placement="topRight"
							>
								<Button type="danger" size="large">
									<Icon type="delete" />
									Delete Form
								</Button>
							</Popconfirm>
						</Col>
						<Col span={24}>
							{this.props.errors.surveyFormCannotDelete ? (
								<Alert
									type="error"
									message="An Error Occurred While Deleting"
									description={this.props.errors.surveyFormCannotDelete}
									showIcon
								/>
							) : (
								""
							)}
						</Col>
					</Row>
				)}
				<SurveyFormTemplate
					surveyFormName={surveyFormName}
					toolProcessName={toolProcessName}
					skillLevel={skillLevel}
					categories={categories}
					form={this.props.form}
				/>
			</div>
		);
	}
}

const wrappedViewSurveyForm = Form.create({ name: "view_survey_form" })(ViewSurveyForm);

const mapStateToProps = (state: any) => ({
	surveyFormToViewOrUpdate: state.surveyForm.surveyFormToViewOrUpdate,
	surveyFormToPreview: state.surveyForm.surveyFormToPreview,
	errors: state.errors
});

const mapDispatchToProps = {
	getSurveyForm,
	clearUpdatingForm,
	deleteSurveyForm,
	clearStateErrors
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(wrappedViewSurveyForm);

// interface IRadioButtonsProps {
// 	lowerBound: number;
// 	upperBound: number;
// 	questionId: number;
// 	categoryId?: number;
// 	form: WrappedFormUtils<any>;
// }

// const RadioButtons: React.FunctionComponent<IRadioButtonsProps> = props => {
// 	let radioOptions: Array<number> = [];
// 	for (let i = props.lowerBound; i <= props.upperBound; i++) {
// 		radioOptions.push(i);
// 	}
// 	const { getFieldDecorator } = props.form;
// 	return (
// 		<React.Fragment>
// 			{getFieldDecorator(`radio-${props.categoryId}-${props.questionId}`, {
// 				initialValue: props.lowerBound
// 			})(
// 				<Radio.Group>
// 					{radioOptions.map((option, index) => (
// 						<React.Fragment key={`radio-${option}-${props.categoryId}-${props.questionId}`}>
// 							<Radio value={option}>{option}</Radio>
// 							{index === 4 ? <br /> : ""}
// 						</React.Fragment>
// 					))}
// 				</Radio.Group>
// 			)}
// 		</React.Fragment>
// 	);
// };
