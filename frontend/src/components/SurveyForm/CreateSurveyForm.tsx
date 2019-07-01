import * as React from "react";
import { connect } from "react-redux";

export interface ICreateSurveyFormProps {}

export interface ICreateSurveyFormState {}

class CreateSurveyForm extends React.Component<
	ICreateSurveyFormProps,
	ICreateSurveyFormState
> {
	constructor(props: ICreateSurveyFormProps) {
		super(props);

		this.state = {};
	}

	public render() {
		return <div />;
	}
}

const mapStateToProps = (state: any) => ({});
const mapDispatchToProps = {};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateSurveyForm);
