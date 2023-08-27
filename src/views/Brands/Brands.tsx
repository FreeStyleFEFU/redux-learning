import { FC } from 'react';

import { Container } from '../../components/common/Container/Container';
import { BrandsListWithLetter } from '../../components/brands/BrandsListWithLetter/BrandsListWithLetter';

import { mockBrands } from '../../mock/brands';

export const Brands: FC = () => (
    <div>
        <Container>
            <BrandsListWithLetter items={mockBrands} />
        </Container>
    </div>
);
