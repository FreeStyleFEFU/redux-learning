import { FC } from 'react';

import { Container } from '../../components/common/Container/Container';
import { BrandsSection } from '../../components/home/BrandsSection/BrandsSection';

import { mockPopularBrands } from '../../mock/brands';

export const Home: FC = () => (
    <div>
        <Container>
            <BrandsSection brands={mockPopularBrands} />
        </Container>
    </div>
);
