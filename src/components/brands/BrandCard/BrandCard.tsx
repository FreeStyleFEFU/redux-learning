import { FC } from "react";

import { Brand } from "../../../types/brand";

import styles from "./BrandCard.module.scss";

type BrandCardProps = Brand;
export const BrandCard: FC<BrandCardProps> = (props) => {
  const { name } = props;

  return (
    <div className={styles.root}>
      <p className={styles.name}>{name}</p>
    </div>
  );
};
