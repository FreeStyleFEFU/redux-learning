import { FC } from "react";

import { Brand } from "../../../types/brand";

import { RoutePath } from "../../../router/routes";

import { BrandsSlider } from "../../brands/BrandsSlider/BrandsSlider";
import { SliderSectionLayout } from "../../common/SliderSectionLayout/SliderSectionLayout";

import styles from "./BrandsSection.module.scss";

type BrandsSectionProps = {
  brands: Brand[];
};
export const BrandsSection: FC<BrandsSectionProps> = (props) => {
  const { brands } = props;

  return (
    <SliderSectionLayout
      title="Популярные бренды"
      allTitle="Все бренды"
      linkToAll={RoutePath.Brands}
      classes={{ root: styles.root }}
    >
      <BrandsSlider brands={brands} />
    </SliderSectionLayout>
  );
};
