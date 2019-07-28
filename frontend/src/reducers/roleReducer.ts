import { GET_ALL_ROLES } from "../actions/types";
import Role from "../models/Role";

const initialState = {
	//initialState of the role attribute in the global redux store (defined in RootReducer.ts)
	roles: []
};

interface Action {
    type: string;
    roles : Role[];
}

export default function (state = initialState, action: Action | any) {
	switch (action.type) {
        case GET_ALL_ROLES:
            return {
                ...state,
                roles: action.roles
            }
		default:
			return state;
	}
}
