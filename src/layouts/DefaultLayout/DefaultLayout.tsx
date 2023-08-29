import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";

import { RoutePath } from "../../router/routes";

import styles from "./DefaultLayout.module.scss";

type DefaultLayoutProps = {
  children?: ReactNode;
};
export const DefaultLayout: FC<DefaultLayoutProps> = (props) => {
  const { children } = props;

  return (
    <div>
      <header className={styles.header}>
        <Link className={styles.link} to={RoutePath.Home}>
          Home
        </Link>
        <Link className={styles.link} to={RoutePath.Brands}>
          Brands
        </Link>
        <Link className={styles.link} to={RoutePath.Users}>
          Users
        </Link>
      </header>

      <main>{children}</main>
    </div>
  );
};
