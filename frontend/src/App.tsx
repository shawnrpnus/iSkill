import React from "react";
import "./App.css";
import store from "./store";
import { Layout, Menu } from "antd";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Header from "./components/Layout/Header";
import CreateUpdateSurveyForm from "./components/SurveyForm/CreateUpdateSurveyForm";
import ViewSurveyForm from "./components/SurveyForm/ViewSurveyForm";
import ViewAllSurveyForm from "./components/SurveyForm/ViewAllSurveyForm";

const App: React.FC = () => {
	return (
		<Provider store={store}>
			<Router>
				<div>
					<Layout>
						<Layout.Header style={{ padding: "0 1.5vw" }}>
							<Header />
						</Layout.Header>
						<Layout>
							<Layout.Sider breakpoint="md" collapsedWidth="0">
								<Menu>
									<Menu.Item>
										<Link to="/createForm">Create New Form</Link>
									</Menu.Item>
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
