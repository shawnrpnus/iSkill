import { Icon, Layout, Menu } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import * as React from "react";
import { connect } from "react-redux";
import { Link, Redirect, Route, RouteComponentProps, Switch } from "react-router-dom";
import { logout, setCurrentUser } from "../actions/employeeAction";
import AssignEvaluation from "../components/Evaluation/AssignEvaluation";
import CreateUpdateEvaluation from "../components/Evaluation/CreateUpdateEvaluation";
import Header from "../components/Layout/Header";
import SecuredRoute from "../components/Layout/SecuredRoute";
import CreateUpdateSurveyForm from "../components/SurveyForm/CreateUpdateSurveyForm";
import ViewAllSurveyForm from "../components/SurveyForm/ViewAllSurveyForm";
import ViewSurveyForm from "../components/SurveyForm/ViewSurveyForm";
import Employee from "../models/Employee";
import setAuthorizationToken from "../utils/setAuthorizationToken";
import ViewEvaluations from "./Evaluation/ViewEvaluations";
import ManagerSecuredRoute from "./Layout/ManagerSecuredRoute";
import { Unauthorised } from "./Layout/Unauthorised";
import ViewAllToolProcessScore from "./ToolProcess/ViewAllToolProcessScore";
let jwt = require("jsonwebtoken");

export interface IMainPagesProps extends RouteComponentProps {
	setCurrentUser: typeof setCurrentUser;
	logout: typeof logout;
	user: Employee;
}

export interface IMainPagesState {}

class MainPages extends React.Component<IMainPagesProps, IMainPagesState> {
	constructor(props: IMainPagesProps) {
		super(props);

		this.state = {};
		this.checkJWT = this.checkJWT.bind(this);
		this.resetUser = this.resetUser.bind(this);
	}

	componentWillMount() {
		this.resetUser();
		this.checkJWT();
	}

	componentDidUpdate() {
		this.checkJWT();
	}

	resetUser() {
		if (localStorage.getItem("jwtToken")) {
			setAuthorizationToken(localStorage.jwtToken);
			this.props.setCurrentUser(jwt.decode(localStorage.jwtToken));
		}
	}

	checkJWT() {
		const currentTime = Date.now() / 1000;

		//expired
		if (localStorage.getItem("jwtToken") && jwt.decode(localStorage.jwtToken).exp < currentTime) {
			this.props.logout();
			this.props.history.push("/login");
		}
	}

	public render() {
		let viewportWidth = window.innerWidth || document.documentElement.clientWidth;
		let siderProps = {};
		if (viewportWidth <= 768) {
			siderProps = {
				collapsedWidth: "0"
			};
		}

		let managerEvaluationItems = [
			<Menu.Item key="assignedByMe">
				<Link to="/evaluationsAssignedByMe">Assigned By Me</Link>
			</Menu.Item>,
			<Menu.Item key="doneByMe">
				<Link to="/evaluationsDoneByMe">Done By Me</Link>
			</Menu.Item>,
			<Menu.Item key="assignEval">
				<Link to="/assignEvaluations">Assign Evaluation</Link>
			</Menu.Item>,
			<Menu.Item key="createEval">
				<Link to="/createEvaluation">Do Evaluation</Link>
			</Menu.Item>
		];
		return (
			<React.Fragment>
				<Layout>
					<Layout.Header style={{ padding: "0 1.5vw" }}>
						<Header />
					</Layout.Header>

					<Layout style={{ minHeight: "100vh" }}>
						<Layout.Sider collapsible breakpoint="md" {...siderProps} theme="dark">
							<Menu theme="dark" mode="inline" defaultOpenKeys={["Forms", "Eval"]}>
								{this.props.user && this.props.user.name ? (
									<SubMenu
										title={
											<span>
												<Icon type="user" />
												<span>Account</span>
											</span>
										}
									>
										<Menu.Item>
											<span>{`Welcome, ${this.props.user.name}`}</span>
										</Menu.Item>
										<Menu.Item onClick={() => this.props.logout()}>Logout</Menu.Item>
									</SubMenu>
								) : (
									""
								)}
								{this.props.user.role && this.props.user.role.name === "ROLE_MANAGER" ? (
									<SubMenu
										title={
											<span>
												<Icon type="form" />
												<span>Overview</span>
											</span>
										}
										key="Overview"
									>
										<Menu.Item>
											<Link to="/viewToolProcessScores">Score Summary</Link>
										</Menu.Item>
									</SubMenu>
								) : (
									""
								)}
								{this.props.user.role && this.props.user.role.name === "ROLE_MANAGER" ? (
									<SubMenu
										title={
											<span>
												<Icon type="form" />
												<span>Forms</span>
											</span>
										}
										key="Forms"
									>
										<Menu.Item>
											<Link to="/createForm">Create New Form</Link>
										</Menu.Item>
										<Menu.Item>
											<Link to="/viewAllForms">My Forms</Link>
										</Menu.Item>
									</SubMenu>
								) : (
									""
								)}
								<SubMenu
									title={
										<span>
											<Icon type="solution" />
											<span>Evaluations</span>
										</span>
									}
									key="Eval"
								>
									<Menu.Item>
										<Link to="/evaluationsAssignedToMe">Assigned To Me</Link>
									</Menu.Item>
									{this.props.user.role && this.props.user.role.name === "ROLE_MANAGER" ? managerEvaluationItems : ""}
								</SubMenu>
							</Menu>
						</Layout.Sider>
						<Layout.Content>
							<Switch>
								<Route exact path="/" render={() => <Redirect to={this.props.user ? "/evaluationsAssignedToMe" : "/login"} />} />
								<ManagerSecuredRoute
									exact
									key="create" //key is to force a rerender
									path="/createForm"
									component={CreateUpdateSurveyForm}
								/>
								<ManagerSecuredRoute exact key="update" path="/updateForm/:formId" component={CreateUpdateSurveyForm} />
								<ManagerSecuredRoute exact key="viewOne" path="/viewForm/:formId" component={ViewSurveyForm} />
								<ManagerSecuredRoute exact key="view" path="/viewAllForms" component={ViewAllSurveyForm} />
								<SecuredRoute exact key="createEval" path="/createEvaluation" component={CreateUpdateEvaluation} />
								<SecuredRoute exact key="updateEval" path="/updateEvaluation/:evaluationId" component={CreateUpdateEvaluation} />
								<SecuredRoute
									exact
									key="doAssignedEval"
									path="/doAssignedEvaluation/:evaluationId"
									component={CreateUpdateEvaluation}
								/>
								<ManagerSecuredRoute exact key="assignEvaluations" path="/assignEvaluations" component={AssignEvaluation} />
								<SecuredRoute exact key="evaluationsAssignedToMe" path="/evaluationsAssignedToMe" component={ViewEvaluations} />
								<ManagerSecuredRoute
									exact
									key="evaluationsAssignedByMe"
									path="/evaluationsAssignedByMe"
									component={ViewEvaluations}
								/>
								<ManagerSecuredRoute exact key="evaluationsDoneByMe" path="/evaluationsDoneByMe" component={ViewEvaluations} />
								<ManagerSecuredRoute
									exact
									key="viewToolProcessScores"
									path="/viewToolProcessScores"
									component={ViewAllToolProcessScore}
								/>
								<SecuredRoute exact key="unauth" path="/unauthorised" component={Unauthorised} />
							</Switch>
						</Layout.Content>
					</Layout>
				</Layout>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state: any) => ({
	user: state.employee.user
});

const mapDispatchToProps = {
	setCurrentUser,
	logout
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MainPages);
