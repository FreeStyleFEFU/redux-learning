import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";

import clsx from "clsx";

import styles from "./SliderSectionLayout.module.scss";

type ClassKey = "root" | "title" | "button";

type SliderSectionLayoutProps = {
  title: string;
  children: ReactNode;
  allTitle?: string;
  linkToAll?: string;
  classes?: Classes<ClassKey>;
};

export const SliderSectionLayout: FC<SliderSectionLayoutProps> = (props) => {
  const { title, children, allTitle, linkToAll, classes } = props;
  return (
    <section className={classes?.root}>
      <div className={styles.heading}>
        <h2 className={clsx(styles.title, classes?.title)}>{title}</h2>
        {linkToAll !== undefined && allTitle !== undefined && (
          <Link className={clsx(styles.button, classes?.button)} to={linkToAll}>
            {allTitle}
          </Link>
        )}
      </div>

      {children}
    </section>
  );
};
