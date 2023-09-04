import { FC } from "react";

import { DefaultLayout } from "../../layouts/DefaultLayout/DefaultLayout";

import { Container } from "../../components/common/Container/Container";
import { BrandsSection } from "../../components/home/BrandsSection/BrandsSection";
import { HistorySpinningCircle } from "../../components/home/HistorySpinningCircle/HistorySpinningCircle";

import { mockPopularBrands } from "../../mock/brands";
import { mockHistoryItems } from "../../mock/history";

export const Home: FC = () => (
    <DefaultLayout>
        <Container>
            <BrandsSection brands={mockPopularBrands}/>

            <HistorySpinningCircle items={mockHistoryItems}/>
        </Container>
    </DefaultLayout>
);
