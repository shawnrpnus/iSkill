import React from "react";
import logo from "./logo.svg";
import "./App.css";
import store from "./store";
import { Layout } from "antd";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Header from "./components/Layout/Header";
import CreateSurveyForm from "./components/SurveyForm/CreateSurveyForm";

const App: React.FC = () => {
	return (
		<Provider store={store}>
			<Router>
				<div>
					<Layout>
						<Layout.Header>
							<Header />
						</Layout.Header>
						<Layout.Content>
							<Switch>
								<Route
									exact
									path="/createForm"
									component={CreateSurveyForm}
								/>
							</Switch>
						</Layout.Content>
					</Layout>
				</div>
			</Router>
		</Provider>
	);
};

export default App;
