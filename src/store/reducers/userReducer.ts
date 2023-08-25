import { FetchUsersTypes, UserAction, UserState } from "../../types/user";

const initialState: UserState = {
    users: [],
    isLoading: false,
    error: null,
}

export const userReducer = (state = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case FetchUsersTypes.Action:
            return { isLoading: true, error: null, users: [] }
        case FetchUsersTypes.Success:
            return { isLoading: false, error: null, users: action.payload }
        case FetchUsersTypes.Error:
            return { isLoading: false, error: action.payload, users: [] }
        default:
            return state
    }
}