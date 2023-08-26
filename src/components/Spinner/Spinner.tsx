import { FC } from 'react';

import clsx from 'clsx';

import styles from './Spinner.module.scss';

type ClassKey = 'root';
type Size = 'xLarge' | 'large' | 'default' | 'xSmall';
type SpinnerProps = {
    classes?: Classes<ClassKey>;
    size?: Size;
};
export const Spinner: FC<SpinnerProps> = (props) => {
    const { classes, size = 'default' } = props;

    const SizeMap: Record<Size, number> = {
        xSmall: 8,
        default: 24,
        large: 40,
        xLarge: 54,
    };

    const iconSize = SizeMap[size];

    return (
        <div className={clsx(styles.root, classes?.root)}>
            <svg
                width={iconSize}
                height={iconSize}
                className={styles.svg}
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle className={styles.circle} cx="50" cy="50" r="45" />
            </svg>
        </div>
    );
};
