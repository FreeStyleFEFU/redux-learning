export type ClassNameMap<ClassKey extends string = string> = Record<ClassKey, string>;

declare global {
    type Classes<T extends string> = Partial<ClassNameMap<T>>;
}
export {};
