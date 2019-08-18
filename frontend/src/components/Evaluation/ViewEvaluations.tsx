import * as React from "react";
import PageTitle from "../Layout/PageTitle";
import { RouteComponentProps } from "react-router";
import { connect } from "react-redux";
import Employee from "../../models/Employee";
import Evaluation from "../../models/Evaluation";
import { Card, Table, Button } from "antd";
import Column from "antd/lib/table/Column";
import { Link } from "react-router-dom";
import { getEvaluationsAssignedToEmployee, getEvaluationsAssignedByManager, getEvaluationsDoneByManager } from "../../actions/evaluationActions";

export interface IViewEvaluationsProps extends RouteComponentProps {
	user: Employee;
	evaluationsToView: Array<Evaluation>;
	getEvaluationsAssignedToEmployee: typeof getEvaluationsAssignedToEmployee;
	getEvaluationsAssignedByManager: typeof getEvaluationsAssignedByManager;
	getEvaluationsDoneByManager: typeof getEvaluationsDoneByManager;
}

export interface IViewEvaluationsState {
	mode: string;
}

class ViewEvaluations extends React.Component<IViewEvaluationsProps, IViewEvaluationsState> {
	constructor(props: IViewEvaluationsProps) {
		super(props);

		this.state = {
			mode: ""
		};
	}

	componentWillMount() {
		const { pathname } = this.props.location;
		if (this.props.user.employeeId !== undefined) {
			const { employeeId } = this.props.user;
			if (pathname === "/evaluationsAssignedToMe") {
				this.props.getEvaluationsAssignedToEmployee(employeeId);
			} else if (pathname === "/evaluationsAssignedByMe") {
				this.props.getEvaluationsAssignedByManager(employeeId);
			} else if (pathname === "/evaluationsDoneByMe") {
				this.props.getEvaluationsDoneByManager(employeeId);
			}
		}
	}

	componentDidMount() {
		const { pathname } = this.props.location;
		this.setState({ mode: pathname });
	}

	public render() {
		const dataSource: Array<Evaluation> | undefined = this.props.evaluationsToView || undefined;
		const title =
			this.state.mode === "/evaluationsAssignedToMe"
				? "Evaluations Assigned To Me"
				: this.state.mode === "/evaluationsAssignedByMe"
				? "Evaluations Assigned By Me"
				: "Evaluations Done By Me";
		return (
			<div style={{ padding: "2vw 5vw 0 5vw" }}>
				<PageTitle>{title}</PageTitle>
				<Card>
					<Table dataSource={dataSource}>
						<Column title={"Name"} dataIndex="surveyForm.surveyFormName" />
						<Column
							title={"Status"}
							dataIndex="status"
							filters={[
								{ text: "New", value: "NEW" },
								{ text: "Ongoing", value: "ONGOING" },
								{ text: "Completed", value: "COMPLETED" }
							]}
							onFilter={(value: any, record: any) => record.status.includes(value)}
						/>
						{this.state.mode === "/evaluationsAssignedToMe" ? <Column title={"Assigned By"} dataIndex="creator.name" /> : ""}
						{this.state.mode === "/evaluationsAssignedByMe" ? <Column title={"Assigned To"} dataIndex="evaluator.name" /> : ""}
						{this.state.mode === "/evaluationsDoneByMe" ? <Column title={"Done For"} dataIndex="evaluatee.name" /> : ""}
						<Column
							title={"Actions"}
							dataIndex="evaluationId"
							render={(evaluationId: any) => (
								<Link to={"doAssignedEvaluation/" + evaluationId}>
									<Button type="primary" shape="circle" icon="search" />
								</Link>
							)}
						/>
					</Table>
				</Card>
			</div>
		);
	}
}

const mapStateToProps = (state: any) => ({
	user: state.employee.user,
	evaluationsToView: state.evaluation.evaluationsToView
});

const mapDispatchToProps = {
	getEvaluationsAssignedToEmployee,
	getEvaluationsAssignedByManager,
	getEvaluationsDoneByManager
};

export default connect<{}, {}, IViewEvaluationsProps>(
	mapStateToProps,
	mapDispatchToProps
)(ViewEvaluations);
