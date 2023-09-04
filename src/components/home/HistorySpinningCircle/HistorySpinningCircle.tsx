import {CSSProperties, FC, useState} from 'react';

import styles from './HistorySpinningCircle.module.scss';

type HistorySpinningCircleProps = {
    items: string[];
}
export const HistorySpinningCircle: FC<HistorySpinningCircleProps> = (props) => {
    const {items} = props;

    const [selectedItemIndex, setSelectedItemIndex] = useState<number>(0);

    const defaultAngle = 360 / items.length;

    const differentWithSelectedItemAngle = defaultAngle * selectedItemIndex;

    return (
        <div className={styles.root}>
            <div
                className={styles.bigRound}
                style={{'--round-rotate': `-${differentWithSelectedItemAngle}deg`} as CSSProperties}
            >
                {items.map((item, index) => {
                    const angle = defaultAngle * (index + 1) - defaultAngle;

                    return (
                        <div
                            key={index}
                            className={styles.item}
                            style={{'--item-rotate-angle': `${angle}deg`} as CSSProperties}
                        >
                            <button
                                type="button"
                                onClick={() => setSelectedItemIndex(index)}
                                className={styles.miniRound}
                                style={{'--mini-round-rotate-angle': `${differentWithSelectedItemAngle - angle}deg`} as CSSProperties}
                            >
                                {item}
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};
