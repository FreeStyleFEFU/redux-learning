import { CSSProperties, FC, useState } from 'react';

import styles from './HistorySpinningCircle.module.scss';

let lastRotateAngle = 0;

type HistorySpinningCircleProps = {
    items: string[];
}
export const HistorySpinningCircle: FC<HistorySpinningCircleProps> = (props) => {
    const { items } = props;

    const [rotateAngle, setRotateAngle] = useState<number>(0);

    const defaultAngle = 360 / items.length;

    const differentWithLastAngle = rotateAngle - lastRotateAngle;

    let formattedRotateAngle = rotateAngle;

    if (Math.abs(differentWithLastAngle) > 180) {
        if (differentWithLastAngle > 0) {
            formattedRotateAngle = rotateAngle - 360;
        } else {
            formattedRotateAngle = rotateAngle + 360;
        }
    }

    return (
        <div className={styles.root}>
            <div
                className={styles.bigRound}
                style={{'--round-rotate-angle': `${formattedRotateAngle * -1}deg`} as CSSProperties}
            >
                {items.map((item, index) => {
                    const defaultItemAngle = defaultAngle * (index + 1) - defaultAngle;

                    const differentWithCurrentRoundRotateAngle = defaultItemAngle - formattedRotateAngle;

                    let nextAngle = defaultItemAngle;

                    if (Math.abs(differentWithCurrentRoundRotateAngle) > 180) {
                        if (differentWithCurrentRoundRotateAngle > 0) {
                            nextAngle = defaultItemAngle - 360;
                        } else {
                            nextAngle = defaultItemAngle + 360;
                        }
                    }

                    return (
                        <div
                            key={index}
                            className={styles.item}
                            style={{'--item-rotate-angle': `${defaultItemAngle}deg`} as CSSProperties}
                        >
                            <button
                                type="button"
                                onClick={() => {
                                    setRotateAngle((prevAngle) => {
                                        lastRotateAngle = prevAngle;

                                        return nextAngle
                                    });
                                }}
                                className={styles.miniRound}
                                style={{'--mini-round-rotate-angle': `${formattedRotateAngle - defaultItemAngle}deg`} as CSSProperties}
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
