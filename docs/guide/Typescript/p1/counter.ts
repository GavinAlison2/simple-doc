export class Counter {
    private current: number = 0;
    constructor() {
        this.current = 0;
    }
    count(): number;
    count(target: number): number[];
    count(target?: number): number | number[] {
        if (target) {
            let values: number[] = [];
            for (let start = this.current; start <= target; start++) {
                values.push(start);
            }
            // set current to target
            this.current = target;
            return values;
        }
        return ++this.current;
    }
}