import { FC, useEffect } from "react";

import { User } from "../../../types/user";

import { useTypedSelector } from "../../../hooks/use-typed-selector";
import { useActions } from "../../../hooks/use-actions";

import { Spinner } from "../../common/Spinner/Spinner";

import styles from "./UserList.module.scss";

export const UserList: FC = () => {
  const {
    user: { users, isLoading, error },
  } = useTypedSelector((state) => state);
  const { fetchUsers } = useActions();

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className={styles.root}>
      {(isLoading as boolean) ? (
        <Spinner size="xLarge" />
      ) : (
        <>
          {error !== null ? (
            <h1>{error}</h1>
          ) : (
            <div>
              {(users as User[]).map(({ name, id }) => (
                <div key={id}>{name}</div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};
