import { Icon, Layout, Menu } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import * as React from "react";
import { connect } from "react-redux";
import { Link, Redirect, Route, RouteComponentProps, Switch } from "react-router-dom";
import { logout, setCurrentUser } from "../actions/employeeAction";
import AssignEvaluation from "../components/Evaluation/AssignEvaluation";
import CreateUpdateEvaluation from "../components/Evaluation/CreateUpdateEvaluation";
import ViewAllAssignedEvaluations from "../components/Evaluation/ViewAllAssignedEvaluations";
import Header from "../components/Layout/Header";
import SecuredRoute from "../components/Layout/SecuredRoute";
import CreateUpdateSurveyForm from "../components/SurveyForm/CreateUpdateSurveyForm";
import ViewAllSurveyForm from "../components/SurveyForm/ViewAllSurveyForm";
import ViewSurveyForm from "../components/SurveyForm/ViewSurveyForm";
import setAuthorizationToken from "../utils/setAuthorizationToken";
import Employee from "../models/Employee";
import ViewAllToolProcessScore from "./ToolProcess/ViewAllToolProcessScore";
let jwt = require("jsonwebtoken");

export interface IMainPagesProps extends RouteComponentProps {
	setCurrentUser: typeof setCurrentUser;
	logout: typeof logout;
	user: Employee;
}

export interface IMainPagesState { }

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
										<Menu.Item>
											<Link to="/viewToolProcessScores">View All Tool Process Scores</Link>
										</Menu.Item>
									</SubMenu>
								) : (
										""
									)}
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
										<Link to="/">Evaluations To Do</Link>
									</Menu.Item>
									<Menu.Item>
										<Link to="/getReceivedEvaluations">Assigned Evaluations</Link>
									</Menu.Item>
									<Menu.Item>
										<Link to="/assignEvaluations">Assign Evaluation</Link>
									</Menu.Item>
									<Menu.Item>
										<Link to="/createEvaluation">Do Evaluation</Link>
									</Menu.Item>
									<Menu.Item>
										<Link to="/login">Login</Link>
									</Menu.Item>
								</SubMenu>
							</Menu>
						</Layout.Sider>
						<Layout.Content>
							<Switch>
								<Route exact path="/" render={() => <Redirect to={this.props.user ? "/viewAllForms" : "/login"} />} />
								<SecuredRoute
									exact
									key="create" //key is to force a rerender
									path="/createForm"
									component={CreateUpdateSurveyForm}
								/>
								<SecuredRoute exact key="update" path="/updateForm/:formId" component={CreateUpdateSurveyForm} />
								<SecuredRoute exact key="viewOne" path="/viewForm/:formId" component={ViewSurveyForm} />
								<SecuredRoute exact key="view" path="/viewAllForms" component={ViewAllSurveyForm} />
								<SecuredRoute exact key="createEval" path="/createEvaluation" component={CreateUpdateEvaluation} />
								<SecuredRoute exact key="updateEval" path="/updateEvaluation/:evaluationId" component={CreateUpdateEvaluation} />
								<SecuredRoute
									exact
									key="doAssignedEval"
									path="/doAssignedEvaluation/:evaluationId"
									component={CreateUpdateEvaluation}
								/>
								<SecuredRoute exact key="assignEvaluations" path="/assignEvaluations" component={AssignEvaluation} />
								<SecuredRoute
									exact
									key="getReceivedEvaluations"
									path="/getReceivedEvaluations"
									component={ViewAllAssignedEvaluations}
								/>
								<SecuredRoute
									exact
									key="viewToolProcessScores"
									path="/viewToolProcessScores"
									component={ViewAllToolProcessScore}
								/>
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
