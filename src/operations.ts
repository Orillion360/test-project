export interface IOperation {
    id: string,
    count: number,
}

export default class Operations {
    private readonly map: Map<string, number> = new Map();

    public increment(id: string): void {
        const current_count = this.map.get(id) || 0;
        this.map.set(id, current_count + 1);
    }

    public get values(): IOperation[] {
        return [...this.map].map(([id, count]) => ({ id, count }));
    }
}
