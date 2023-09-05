import { CSSProperties, FC, useState } from 'react';

import styles from './HistorySpinningCircle.module.scss';

type HistorySpinningCircleProps = {
    items: string[];
}
export const HistorySpinningCircle: FC<HistorySpinningCircleProps> = (props) => {
    const { items } = props;

    const [lastRotateAngle, setLastRotateAngle] = useState<number>(0);
    const [rotateAngle, setRotateAngle] = useState<number>(0);

    const defaultAngle = 360 / items.length;

    const differentWithLastAngle = rotateAngle - lastRotateAngle;

    let formattedRotateAngle = rotateAngle

    console.log(formattedRotateAngle, lastRotateAngle, differentWithLastAngle)

    if (Math.abs(differentWithLastAngle) > 180) {
        formattedRotateAngle = lastRotateAngle + differentWithLastAngle - 360
    }

    console.log(rotateAngle)

    return (
        <div className={styles.root}>
            <div
                className={styles.bigRound}
                style={{'--round-rotate-angle': `${formattedRotateAngle * -1}deg`} as CSSProperties}
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
                                    setLastRotateAngle(formattedRotateAngle);
                                    setRotateAngle(angle)
                                }}
                                className={styles.miniRound}
                                style={{'--mini-round-rotate-angle': `${formattedRotateAngle - angle}deg`} as CSSProperties}
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
