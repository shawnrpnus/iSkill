import React from "react";
import "./App.css";
import store from "./store";
import { Layout, Menu, Icon } from "antd";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Header from "./components/Layout/Header";
import CreateUpdateSurveyForm from "./components/SurveyForm/CreateUpdateSurveyForm";
import ViewSurveyForm from "./components/SurveyForm/ViewSurveyForm";
import ViewAllSurveyForm from "./components/SurveyForm/ViewAllSurveyForm";
import SubMenu from "antd/lib/menu/SubMenu";
import LoginEmployee from "./components/Employee/LoginEmployee";
import RegisterEmployee from "./components/Employee/RegisterEmployee";
import CreateUpdateEvaluation from "./components/Evaluation/CreateUpdateEvaluation";
import AssignEvaluation from "./components/Evaluation/AssignEvaluation";
import SecuredRoute from "./components/Layout/SecuredRoute";

const App: React.FC = () => {
	let viewportWidth = window.innerWidth || document.documentElement.clientWidth;
	let siderProps = {};
	if (viewportWidth <= 768) {
		siderProps = {
			collapsedWidth: "0"
		};
	}
	console.log(viewportWidth);
	return (
		<Provider store={store}>
			<Router>
				<div>
				{localStorage.getItem('jwtToken') ? (
							<Layout>
							<Layout.Header style={{ padding: "0 1.5vw" }}>
								<Header />
							</Layout.Header>
							<Layout style={{ minHeight: "100vh" }}>
								<Layout.Sider collapsible breakpoint="md" {...siderProps} theme="dark">
									<Menu theme="dark" mode="inline" defaultOpenKeys={["Forms", "Eval"]}>
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
												<Link to="/">Assigned Evaluations</Link>
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
										<SecuredRoute
											exact
											key="create" //key is to force a rerender
											path="/createForm"
											component={CreateUpdateSurveyForm}
										/>
										<SecuredRoute
											exact
											key="update"
											path="/updateForm/:formId"
											component={CreateUpdateSurveyForm}
										/>
										<SecuredRoute
											exact
											key="viewOne"
											path="/viewForm/:formId"
											component={ViewSurveyForm}
										/>
										<SecuredRoute
											exact
											key="view"
											path="/viewAllForms"
											component={ViewAllSurveyForm}
										/>
										<Route
											exact
											key="createEval"
											path="/createEvaluation"
											component={CreateUpdateEvaluation}
										/>
										<SecuredRoute
											exact
											key="createEval"
											path="/updateEvaluation/:evaluationId"
											component={CreateUpdateEvaluation}
										/>
										<SecuredRoute
											exact
											key="assignEvaluations"
											path="/assignEvaluations"
											component={AssignEvaluation}
										/>
										<Route exact key="view" path="/login" component={LoginEmployee} />
										<Route exact key="view" path="/register" component={RegisterEmployee} />
									</Switch>
								</Layout.Content>
							</Layout>
						</Layout>
						) : (
							<LoginEmployee/>
						)}
					
				</div>
			</Router>
		</Provider>
	);
};

export default App;
