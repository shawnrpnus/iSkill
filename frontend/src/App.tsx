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

const App: React.FC = () => {
	return (
		<Provider store={store}>
			<Router>
				<div>
					<Layout>
						<Layout.Header style={{ padding: "0 1.5vw" }}>
							<Header />
						</Layout.Header>
						<Layout style={{ minHeight: "100vh" }}>
							<Layout.Sider breakpoint="md" collapsedWidth="0" theme="dark">
								<Menu theme="dark" mode="inline" defaultOpenKeys={["Forms", "Eval"]}>
									<SubMenu
										title={
											<span>
												<Icon type="form" />
												Forms
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
												Evaluations
											</span>
										}
										key="Eval"
									>
										<Menu.Item>
											<Link to="/">My Evaluations</Link>
										</Menu.Item>
										<Menu.Item>
											<Link to="/viewAllForms">Assign Evaluation</Link>
										</Menu.Item>
										<Menu.Item>
											<Link to="/viewAllForms">Create Evaluation</Link>
										</Menu.Item>
									</SubMenu>
								</Menu>
							</Layout.Sider>
							<Layout.Content>
								<Switch>
									<Route
										exact
										key="create" //key is to force a rerender
										path="/createForm"
										component={CreateUpdateSurveyForm}
									/>
									<Route
										exact
										key="update"
										path="/updateForm/:formId"
										component={CreateUpdateSurveyForm}
									/>
									<Route
										exact
										key="view"
										path="/viewForm/:formId"
										component={ViewSurveyForm}
									/>
									<Route
										exact
										key="view"
										path="/viewAllForms"
										component={ViewAllSurveyForm}
									/>
								</Switch>
							</Layout.Content>
						</Layout>
					</Layout>
				</div>
			</Router>
		</Provider>
	);
};

export default App;
