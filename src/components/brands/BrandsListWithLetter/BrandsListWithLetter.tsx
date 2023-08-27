import { FC, UIEvent, useEffect, useMemo, useRef, useState } from 'react';

import clsx from 'clsx';

import { Brand } from '../../../types/brand';

import styles from './BrandsListWithLetter.module.scss';

import { SearchIcon } from '../../../assets/icons';

export type BrandsWithLetters = Record<string, Brand[]>;

type NavigationFades = {
    isBottomVisible: boolean;
    isTopVisible: boolean;
};

// need variable without rerender after set value
let isScrollInProgress = false;

type AllBrandsBlockProps = {
    items: Brand[];
};
export const BrandsListWithLetter: FC<AllBrandsBlockProps> = (props) => {
    const { items } = props;

    const uniqueFirstLettersInNames = useMemo(
        () =>
            Array.from(
                new Set(
                    items
                        .map((item) => (item.name.length > 0 ? item.name[0].toUpperCase() : null))
                        .filter((item) => item !== null),
                ),
            ).sort() as string[],
        [items],
    );

    const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null);
    const [inputValue, setInputValue] = useState<string>('');

    const [activeNavLetter, setActiveNavLetter] = useState<string | undefined>(
        uniqueFirstLettersInNames.at(0),
    );
    const [navigationFades, setNavigationFades] = useState<NavigationFades>({
        isBottomVisible: true,
        isTopVisible: false,
    });

    const navListRef = useRef<HTMLUListElement | null>(null);

    const filteredItems = items.filter((item) =>
        item.name.toLowerCase().includes(inputValue.toLowerCase()),
    );

    const sortedByLettersBrands: BrandsWithLetters = Object.fromEntries(
        uniqueFirstLettersInNames.map((letter) => [
            letter,
            filteredItems.filter(
                (item) =>
                    item.name.length > 0 && item.name[0].toLowerCase() === letter.toLowerCase(),
            ),
        ]),
    );

    const navigationAutoScroll = (letter: string) => {
        const activeNavLetterElement = document.querySelector(`[data-nav-letter="${letter}"]`);

        if (activeNavLetterElement === null || navListRef === null || navListRef.current === null) {
            return;
        }

        const targetScrollTop =
            (activeNavLetterElement as HTMLElement).offsetTop -
            (navListRef.current.offsetHeight -
                (activeNavLetterElement as HTMLElement).offsetHeight) /
                2;

        navListRef.current.scrollTo({ top: targetScrollTop, behavior: 'smooth' });
    };

    const onChangeActiveNavLetter = (letter: string) => {
        if (scrollTimeout !== null) clearTimeout(scrollTimeout);

        const brandLetter = document.querySelector(`[data-brand-letter="${letter}"]`);

        if (
            letter === activeNavLetter ||
            brandLetter === null ||
            navListRef === null ||
            navListRef.current === null
        ) {
            return;
        }

        setActiveNavLetter(letter);

        isScrollInProgress = true;
        setScrollTimeout(
            setTimeout(() => {
                isScrollInProgress = false;

                // this scroll cant be in the same time with window scroll(scroll into view)
                navigationAutoScroll(letter);
            }, 1000),
        );

        brandLetter.scrollIntoView({ behavior: 'smooth' });
    };

    const windowScrollHandler = () => {
        if (isScrollInProgress) return;

        const brandLettersElements = document.querySelectorAll('[data-brand-letter]');

        brandLettersElements.forEach((brandLetterElement) => {
            const elementPositionTop = brandLetterElement.getBoundingClientRect().top;

            if (elementPositionTop > 0) return;

            const brandLetter = brandLetterElement.getAttribute('data-brand-letter');

            if (brandLetter === null) return;

            setActiveNavLetter(brandLetter);
            navigationAutoScroll(brandLetter);
        });
    };

    const setNavListFades = (event: UIEvent<HTMLUListElement>) => {
        const target = event.target as HTMLElement;

        setNavigationFades(() => ({
            isTopVisible: Math.floor(target.scrollTop) !== 0,
            isBottomVisible:
                target.scrollHeight - Math.round(target.scrollTop) !== target.clientHeight,
        }));
    };

    useEffect(() => {
        window.addEventListener('scroll', windowScrollHandler);

        return () => window.removeEventListener('scroll', windowScrollHandler);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <div className={styles.inputContainer}>
                <SearchIcon className={styles.searchIcon} />
                <input
                    className={styles.input}
                    placeholder="Введите название бренда"
                    value={inputValue}
                    onChange={(event) => setInputValue(event.target.value)}
                />
            </div>

            <div className={styles.brandsContainer}>
                <div>
                    {Object.entries(sortedByLettersBrands).map(
                        ([letter, brands]) =>
                            brands.length > 0 && (
                                <div
                                    data-brand-letter={letter}
                                    key={letter}
                                    className={styles.brandsRow}
                                >
                                    <div>
                                        <p className={styles.letter}>{letter}</p>
                                    </div>
                                    <div className={styles.brandsGridContainer}>
                                        <ul className={styles.brandsGrid}>
                                            {brands.map((brand) => (
                                                <li key={brand.id}>
                                                    <p className={styles.name}>{brand.name}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ),
                    )}
                </div>

                <div className={styles.navigationContainer}>
                    <div
                        className={clsx(
                            styles.navigation,
                            navigationFades.isTopVisible && styles.hasTopFade,
                            navigationFades.isBottomVisible && styles.hasBottomFade,
                        )}
                    >
                        <ul
                            ref={navListRef}
                            onScroll={setNavListFades}
                            className={styles.navigationList}
                        >
                            {uniqueFirstLettersInNames.map((letter) => (
                                <li data-nav-letter={letter} key={letter}>
                                    <button
                                        type="button"
                                        className={clsx(
                                            styles.navigationButton,
                                            activeNavLetter === letter && styles.isActive,
                                        )}
                                        onClick={() => onChangeActiveNavLetter(letter)}
                                    >
                                        {letter}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
