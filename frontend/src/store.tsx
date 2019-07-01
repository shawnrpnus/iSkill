import { applyMiddleware, compose, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers/RootReducer";

const initialState = {};
const middleware = [thunk];

let store = createStore(
	rootReducer,
	initialState,
	compose(applyMiddleware(...middleware))
);

if (window.navigator.userAgent.includes("Chrome")) {
	store = createStore(
		rootReducer,
		initialState,
		composeWithDevTools(applyMiddleware(...middleware))
	);
}

export default store;
