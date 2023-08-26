export enum FetchUsersTypes {
    Action = 'FETCH_USERS',
    Success = 'FETCH_USERS_SUCCESS',
    Error = 'FETCH_USERS_ERROR',
}

type FetchUsersAction = {
    type: FetchUsersTypes.Action;
};

type FetchUsersSuccess = {
    type: FetchUsersTypes.Success;
    payload: User[];
};

type FetchUsersError = {
    type: FetchUsersTypes.Error;
    payload: string;
};

export type UserAction = FetchUsersAction | FetchUsersSuccess | FetchUsersError;

export type User = {
    id: number;
    name: string;
};

export type UserState = {
    users: User[];
    isLoading: boolean;
    error: string | null;
};
