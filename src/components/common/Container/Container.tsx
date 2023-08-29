import { FC, PropsWithChildren } from "react";

import clsx from "clsx";

import styles from "./Container.module.scss";

type ContainerSize = "default" | "small" | "expanded";

const sizeClassNameBySize: Record<ContainerSize, string> = {
  default: "",
  small: styles.isSmallSize,
  expanded: styles.isExpandedSize,
};

type ContainerProps = {
  classes?: Classes<"root" | "inner">;
  size?: ContainerSize;
};
export const Container: FC<PropsWithChildren<ContainerProps>> = (props) => {
  const { classes, children, size = "default" } = props;

  return (
    <div
      className={clsx(styles.root, sizeClassNameBySize[size], classes?.root)}
    >
      <div className={clsx(styles.inner, classes?.inner)}>{children}</div>
    </div>
  );
};
