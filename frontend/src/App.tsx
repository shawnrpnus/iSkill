import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import LoginEmployee from "./components/Employee/LoginEmployee";
import RegisterEmployee from "./components/Employee/RegisterEmployee";
import MainPages from "./components/MainPages";
import store from "./store";
import SecuredRoute from "./components/Layout/SecuredRoute";

const App: React.FC = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Switch>
					<Route exact key="login" path="/login" component={LoginEmployee} />
					<Route exact key="register" path="/register" component={RegisterEmployee} />
					<SecuredRoute component={MainPages} />
				</Switch>
			</BrowserRouter>
		</Provider>
	);
};

export default App;
