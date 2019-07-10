import React from "react";
import "./App.css";
import store from "./store";
import { Layout, Menu } from "antd";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Header from "./components/Layout/Header";
import CreateSurveyForm from "./components/SurveyForm/CreateSurveyForm";

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
										path="/createForm"
										component={CreateSurveyForm}
									/>
									<Route
										exact
										path="/viewUpdateForm/:formId"
										component={CreateSurveyForm}
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
