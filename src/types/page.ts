export interface IPage<T> {
    page: number;
    rpp?: number;
    total?: number;
    list: T[];
}

export class Page<T> implements IPage<T> {

    constructor(
        public readonly list: T[],
        public readonly page: number,
        public readonly rpp?: number,
        public readonly total?: number
    ) {}

    public static of<R>(list: R[], page: number, rpp?: number, total?: number) {
        return new Page<R>(list, page, rpp, total);
    }

}
