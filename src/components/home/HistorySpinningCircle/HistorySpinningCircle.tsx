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

    let optimalRotateAngle = rotateAngle;

    if (Math.abs(differentWithLastAngle) > 180) {
        if (differentWithLastAngle > 0) {
            optimalRotateAngle -= 360;
        } else {
            optimalRotateAngle += 360;
        }
    }

    return (
        <div className={styles.root}>
            <div
                className={styles.bigRound}
                style={{'--round-rotate-angle': `${optimalRotateAngle * -1}deg`} as CSSProperties}
            >
                {items.map((item, index) => {
                    const defaultItemAngle = defaultAngle * (index + 1) - defaultAngle;

                    const differentWithCurrentRoundRotateAngle = defaultItemAngle - optimalRotateAngle;

                    const fullRotationsCount = parseInt(String((optimalRotateAngle - defaultItemAngle) / 360));

                    let nextAngle = defaultItemAngle + fullRotationsCount * 360;

                    if (Math.abs(differentWithCurrentRoundRotateAngle) > 180) {
                        if (differentWithCurrentRoundRotateAngle > 0) {
                            nextAngle -= 360;
                        } else {
                            nextAngle += 360;
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
                                        console.log(optimalRotateAngle, lastRotateAngle, fullRotationsCount);
                                        lastRotateAngle = prevAngle;

                                        return nextAngle
                                    });
                                }}
                                className={styles.miniRound}
                                style={{'--mini-round-rotate-angle': `${optimalRotateAngle - defaultItemAngle}deg`} as CSSProperties}
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
