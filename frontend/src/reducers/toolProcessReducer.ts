import ToolProcess from "../models/ToolProcess";
import { GET_ALL_TOOL_PROCESS } from "../actions/types";

const initialState = {
    //initialState of the surveyForm attribute in the global redux store (defined in RootReducer.ts)
    toolProcessList: [],
};

interface Action {
    type: string;
    toolProcessList: Array<ToolProcess>
}

export default function (state = initialState, action: Action | any) {
    switch (action.type) {
        case GET_ALL_TOOL_PROCESS:
            return {
                ...state,
                toolProcessList: action.toolProcessList
            }
        default:
            return state;
    }
}