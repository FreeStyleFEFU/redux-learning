import { FC, useEffect } from "react";

import { useTypedSelector } from "../../hooks/use-typed-selector";
import { useActions } from "../../hooks/use-actions";

import { fetchUsers } from "../../store/action-creators/user";

import { Spinner } from "../Spinner/Spinner";

import styles from "./UserList.module.scss";

export const UserList: FC = () => {
    const { user: { users, isLoading, error } } = useTypedSelector((state) => state);
    const { fetchUsers } = useActions();

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className={styles.root}>
            {isLoading ?
                <Spinner size="xLarge" /> :
                <>
                    {error !== null ?
                        <h1>{error}</h1> :
                        <div>
                            {users.map(({name, id}) => <div key={id}>{name}</div>)}
                        </div>
                    }
                </>
            }
        </div>
    );
};