import { FC } from "react";

import { DefaultLayout } from "../../layouts/DefaultLayout/DefaultLayout";

import { Container } from "../../components/common/Container/Container";
import { BrandsSection } from "../../components/home/BrandsSection/BrandsSection";

import { mockPopularBrands } from "../../mock/brands";

export const Home: FC = () => (
  <DefaultLayout>
    <Container>
      <BrandsSection brands={mockPopularBrands} />
    </Container>
  </DefaultLayout>
);
