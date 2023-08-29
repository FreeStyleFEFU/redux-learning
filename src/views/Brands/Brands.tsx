import { FC } from "react";

import { DefaultLayout } from "../../layouts/DefaultLayout/DefaultLayout";

import { Container } from "../../components/common/Container/Container";
import { BrandsListWithLetter } from "../../components/brands/BrandsListWithLetter/BrandsListWithLetter";

import { mockBrands } from "../../mock/brands";

export const Brands: FC = () => (
  <DefaultLayout>
    <Container>
      <BrandsListWithLetter items={mockBrands} />
    </Container>
  </DefaultLayout>
);
