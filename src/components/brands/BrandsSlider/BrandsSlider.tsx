import { FC } from 'react';

import { SwiperSlide } from 'swiper/react';

import { Brand } from '../../../types/brand';

import { BrandCard } from '../BrandCard/BrandCard';
import { Slider } from '../../common/Slider/Slider';

import styles from './BrandsSlider.module.scss';

type BrandsSliderProps = {
    brands: Brand[];
};
export const BrandsSlider: FC<BrandsSliderProps> = (props) => {
    const { brands } = props;

    const foldItems = brands.map((brand) => {
        return (
            <SwiperSlide className={styles.slide} key={brand.id}>
                <BrandCard {...brand} />
            </SwiperSlide>
        );
    });

    return (
        <Slider
            items={foldItems}
            swiperProps={{
                slidesPerView: 'auto',
            }}
            isWithDotPagination
            hasSmartNavigation
        />
    );
};
