import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import LoginEmployee from "./components/Employee/LoginEmployee";
import MainPages from "./components/MainPages";
import store from "./store";
import RegisterEmployee from "./components/Employee/RegisterEmployee";

const App: React.FC = () => {
	return (
		<Provider store={store}>
			<Router>
				<Switch>
					<Route exact key="login" path="/login" component={LoginEmployee} />
					<Route exact key="register" path="/register" component={RegisterEmployee} />
					<Route component={MainPages} />
				</Switch>
			</Router>
		</Provider>
	);
};

export default App;
