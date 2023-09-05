import { CSSProperties, FC, useState } from 'react';

import styles from './HistorySpinningCircle.module.scss';

type HistorySpinningCircleProps = {
    items: string[];
}
export const HistorySpinningCircle: FC<HistorySpinningCircleProps> = (props) => {
    const { items } = props;

    const [lastRotateAngle, setLastRotateAngle] = useState<number>(0);
    const [selectedItemIndex, setSelectedItemIndex] = useState<number>(0);

    const defaultAngle = 360 / items.length;

    let roundRotateAngle = defaultAngle * selectedItemIndex;

    const differentWithLastAngle = roundRotateAngle - lastRotateAngle;

    if (Math.abs(differentWithLastAngle) > 180) {
        roundRotateAngle = lastRotateAngle + differentWithLastAngle - 360
    }

    return (
        <div className={styles.root}>
            <div
                className={styles.bigRound}
                style={{'--round-rotate-angle': `${roundRotateAngle * -1}deg`} as CSSProperties}
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
                                onClick={() => {
                                    setLastRotateAngle(roundRotateAngle);
                                    setSelectedItemIndex(index)
                                }}
                                className={styles.miniRound}
                                style={{'--mini-round-rotate-angle': `${roundRotateAngle - angle}deg`} as CSSProperties}
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
