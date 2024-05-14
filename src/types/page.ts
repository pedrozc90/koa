export interface IPage<T> {
    page: number;
    rpp?: number;
    count?: number;
    list: T[];
}

export class Page<T> implements IPage<T> {

    constructor(
        public readonly list: T[],
        public readonly page: number,
        public readonly rpp?: number,
        public readonly count?: number
    ) {}

    public static of<R>(list: R[], page: number, rpp?: number, count?: number) {
        return new Page<R>(list, page, rpp, count);
    }

}
