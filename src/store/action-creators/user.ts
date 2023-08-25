import { Dispatch } from "redux";
import axios from "axios";

import { FetchUsersTypes, UserAction } from "../../types/user";

export const fetchUsers = () => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            dispatch({ type: FetchUsersTypes.Action })

            const response = await axios.get('https://jsonplaceholder.typicode.com/users')

            setTimeout(() => {
                dispatch({
                    type: FetchUsersTypes.Success,
                    payload: response.data,
                })
            }, 500)
        } catch (error) {
            dispatch({
                type: FetchUsersTypes.Error,
                payload: 'Ошибка загрузки пользователей'
            })
        }
    }
}