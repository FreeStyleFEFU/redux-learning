import { FC, ReactElement, useState } from "react";

import clsx from "clsx";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperProps } from "swiper/react";
import SwiperClass from "swiper/types/swiper-class";

import { SliderNavigation, SliderNavigationClasses } from "./SliderNavigation";

import styles from "./Slider.module.scss";

SwiperCore.use([Navigation, Pagination]);

type ClassKey =
  | "root"
  | "swiper"
  | "navigationWrapper"
  | "dotPaginationWrapper";

type SliderProps = {
  items: ReactElement[];
  swiperProps?: Omit<SwiperProps, "className">;
  onSlideChange?(index: number): void;
  hasNavigation?: boolean;
  hasDotPagination?: boolean;
  // This flag hides navigation if items fit container.
  // Also hides one of buttons when start/end is reached.
  hasSmartNavigation?: boolean;
  classes?: Classes<ClassKey> & {
    navigation?: SliderNavigationClasses;
  };
};

export const Slider: FC<SliderProps> = (props) => {
  const {
    items,
    swiperProps,
    onSlideChange,
    classes,
    hasDotPagination = false,
    hasNavigation = false,
    hasSmartNavigation = false,
  } = props;

  const [controlledSwiper, setControlledSwiper] = useState<SwiperClass | null>(
    null
  );

  // ! Need to add modules={[..., Autoplay]} to the component to access this feature !
  const toggleAutoplay = (activate: boolean): void => {
    if (
      swiperProps !== undefined &&
      swiperProps.autoplay !== undefined &&
      controlledSwiper !== null
    ) {
      if (activate) controlledSwiper.autoplay.start();
      else controlledSwiper.autoplay.stop();
    }
  };

  return (
    <div
      onMouseOver={() => toggleAutoplay(false)}
      onFocus={() => toggleAutoplay(false)}
      onMouseOut={() => toggleAutoplay(true)}
      onBlur={() => toggleAutoplay(true)}
      className={clsx(styles.root, classes?.root)}
    >
      <Swiper
        onSwiper={(swiper) => {
          setControlledSwiper(swiper);
          // В некоторых случаях при загрузке swiper выставляет начальное состояние некорректно
          setTimeout(() => swiper.update(), 1000);
          if (swiperProps?.onInit !== undefined) swiperProps.onInit(swiper);
        }}
        onSlideChange={(swiper) => {
          if (onSlideChange !== undefined) onSlideChange(swiper.realIndex);
        }}
        pagination={{
          enabled: hasDotPagination,
          clickable: hasDotPagination,
          dynamicBullets: hasDotPagination,
        }}
        className={clsx(styles.swiper, hasDotPagination && styles.hasPagination, classes?.swiper)}
        watchOverflow={hasNavigation && hasSmartNavigation}
        {...swiperProps}
      >
        {items}
      </Swiper>

      {controlledSwiper !== null && items.length > 1 && hasNavigation && (
        <div
          className={clsx(styles.navigationWrapper, classes?.navigationWrapper)}
        >
          <SliderNavigation
            swiper={controlledSwiper}
            classes={classes?.navigation}
            isSmart={hasSmartNavigation}
          />
        </div>
      )}
    </div>
  );
};
