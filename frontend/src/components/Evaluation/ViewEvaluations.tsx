import * as React from "react";
import PageTitle from "../Layout/PageTitle";
import { RouteComponentProps } from "react-router";
import { connect } from "react-redux";
import Employee from "../../models/Employee";
import Evaluation from "../../models/Evaluation";
import { Card, Table, Button } from "antd";
import Column from "antd/lib/table/Column";
import { Link } from "react-router-dom";

export interface IViewEvaluationsProps extends RouteComponentProps {
	user: Employee;
	evaluationsAssignedToMe: Array<Evaluation>;
	evaluationsAssignedByMe: Array<Evaluation>;
	evaluationsDoneByMe: Array<Evaluation>;
}

export interface IViewEvaluationsState {}

class ViewEvaluations extends React.Component<IViewEvaluationsProps, IViewEvaluationsState> {
	constructor(props: IViewEvaluationsProps) {
		super(props);

		this.state = {};
	}

	public render() {
		const dataSource = undefined;
		return (
			<div style={{ padding: "2vw 5vw 0 5vw" }}>
				<PageTitle>Score Summary (Highest score shown)</PageTitle>
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
	evaluationsAssignedToMe: state.evaluation.evaluationsAssignedToMe,
	evaluationsAssignedByMe: state.evaluation.evaluationsAssignedByMe,
	evaluationsDoneByMe: state.evaluation.evaluationsDoneByMe
});

const mapDispatchToProps = {};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ViewEvaluations);
