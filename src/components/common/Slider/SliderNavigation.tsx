import { FC, useCallback, useEffect, useMemo, useState } from "react";

import clsx from "clsx";
import SwiperClass from "swiper/types/swiper-class";

import styles from "./Slider.module.scss";

import { ArrowRightIcon } from "../../../assets/icons";

type ClassKey = "root" | "icon" | "button" | "prevButton" | "nextButton";
type ButtonDirection = "prev" | "next";
type NavigationButton = {
  direction: ButtonDirection;
  action(): void;
  dataId: string;
  isVisible: boolean;
};

export type SliderNavigationClasses = Classes<ClassKey>;

type SliderNavigationProps = {
  swiper: SwiperClass;
  dataID?: string;
  classes?: SliderNavigationClasses;
  isSmart?: boolean;
};

enum ReachedEdge {
  Start,
  End,
}

export const SliderNavigation: FC<SliderNavigationProps> = (props) => {
  const { swiper, classes, dataID, isSmart = false } = props;

  const [isContentFitting, setContentFitting] = useState(
    swiper.wrapperEl.clientWidth >= swiper.wrapperEl.scrollWidth
  );
  const [reachedEdge, setReachedEdge] = useState<ReachedEdge | null>(() => {
    if (swiper.isBeginning) {
      return ReachedEdge.Start;
    } else if (swiper.isEnd) {
      return ReachedEdge.End;
    } else {
      return null;
    }
  });

  const goToNext = useCallback((): void => {
    swiper.slideNext();
  }, [swiper]);

  const goToPrev = useCallback((): void => {
    swiper.slidePrev();
  }, [swiper]);

  const buttons = useMemo<NavigationButton[]>(
    () => [
      {
        direction: "prev",
        action: goToPrev,
        dataId: `${dataID}-prev`,
        isVisible:
          !isSmart || (!isContentFitting && reachedEdge !== ReachedEdge.Start),
      },
      {
        direction: "next",
        action: goToNext,
        dataId: `${dataID}-next`,
        isVisible:
          !isSmart || (!isContentFitting && reachedEdge !== ReachedEdge.End),
      },
    ],
    [dataID, goToPrev, goToNext, isSmart, reachedEdge, isContentFitting]
  );

  useEffect(() => {
    if (!isSmart) return undefined;

    const handleProgress = (swiper1: SwiperClass) => {
      setContentFitting(
        swiper1.wrapperEl.clientWidth >= swiper1.wrapperEl.scrollWidth
      );

      if (swiper1.isBeginning) {
        setReachedEdge(ReachedEdge.Start);
      } else if (swiper1.isEnd) {
        setReachedEdge(ReachedEdge.End);
      } else {
        setReachedEdge(null);
      }
    };

    swiper.on("progress", handleProgress);
    swiper.on("resize", handleProgress);

    return () => {
      swiper.off("progress", handleProgress);
      swiper.off("resize", handleProgress);
    };
  }, [swiper, isSmart]);

  return (
    <div className={clsx(styles.navigation, classes?.root)}>
      {buttons.map((button) => {
        const isPrev = button.direction === "prev";
        const isNext = button.direction === "next";
        return (
          <button
            type="button"
            data-navigation-button-id={button.dataId}
            className={clsx(
              styles.navigationButton,
              {
                [styles.isPrev]: isPrev,
                [styles.isNext]: isNext,
              },
              isPrev && classes?.prevButton,
              isNext && classes?.nextButton,
              button.isVisible && styles.isVisible,
              classes?.button
            )}
            key={button.direction}
            onClick={button.action}
          >
            <ArrowRightIcon
              className={clsx(styles.navigationIcon, classes?.icon)}
            />
          </button>
        );
      })}
    </div>
  );
};
