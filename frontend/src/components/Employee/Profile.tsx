import * as React from "react";
import { Form, Card, Typography, Input } from "antd";
import { connect } from "react-redux";
import PageTitle from "../Layout/PageTitle";
import Employee from "../../models/Employee";
import { FormComponentProps } from "antd/lib/form";
import { RouteComponentProps } from "react-router";

export interface IProfileProps extends FormComponentProps, RouteComponentProps {
	user: Employee;
}

export interface IProfileState {
	updating: boolean;
}

class Profile extends React.Component<IProfileProps, IProfileState> {
	constructor(props: IProfileProps) {
		super(props);

		this.state = {
			updating: false
		};
	}

	handleSubmit(e: React.FormEvent<EventTarget>) {
		e.preventDefault();
	}

	public render() {
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 24 },
				md: { span: 24 },
				lg: { span: 4 }
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 24 },
				md: { span: 24 },
				lg: { span: 20 }
			}
		};
		return (
			<Form {...formItemLayout} onSubmit={this.handleSubmit} style={{ padding: "2vw 5vw 0 5vw" }}>
				<PageTitle>My Profile</PageTitle>
				<Card
					title={
						<div style={{ display: "flex", justifyContent: "center", alignContent: "middle" }}>
							<Typography.Title style={{ marginBottom: 0 }}>{this.props.user.name}</Typography.Title>
						</div>
					}
				>
					<Form.Item
						// validateStatus={this.props.errors.username ? "error" : ""}
						// help={this.props.errors.username}
						// hasFeedback={true}
						label="Username"
					>
						{getFieldDecorator("username", { initialValue: this.props.user.username })(
							<Input readOnly={!this.state.updating} autoComplete="new-password" />
						)}
					</Form.Item>
					<Form.Item
						// validateStatus={this.props.errors.username ? "error" : ""}
						// help={this.props.errors.username}
						// hasFeedback={true}
						label="Cost Center"
					>
						{getFieldDecorator("costCenter", { initialValue: this.props.user.costCenter })(<Input readOnly={!this.state.updating} />)}
					</Form.Item>
					<Form.Item
						// validateStatus={this.props.errors.username ? "error" : ""}
						// help={this.props.errors.username}
						// hasFeedback={true}
						label="Shift"
					>
						{getFieldDecorator("shift", { initialValue: this.props.user.shift })(<Input readOnly={!this.state.updating} />)}
					</Form.Item>
				</Card>
			</Form>
		);
	}
}

const wrappedCreateEval = Form.create({ name: "profile" })(Profile);

const mapStateToProps = (state: any) => ({
	user: state.employee.user
});

const mapDispatchToProps = {};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(wrappedCreateEval);
