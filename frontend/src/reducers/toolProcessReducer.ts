import ToolProcess from "../models/ToolProcess";
import { GET_ALL_TOOL_PROCESS, GET_TOOL_PROCESS_SCORES} from "../actions/types";

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

        case GET_TOOL_PROCESS_SCORES:
            return {
                ...state,
                toolProcessScoreList: action.toolProcessScoreList
            }
        default:
            return state;
    }
}