export interface IPlayerOperation {
    type: string,
    timestamp: Date,
    block_num: number,
    transaction_id: string,
}

export interface IPlayer {
    id: string,
    count: number,
    operations: IPlayerOperation[],
}

export interface IIndexPlayer {
    id: string,
    count: number,
}

export default class Players {
    private map: Map<string, IPlayer> = new Map();

    public increment(id: string, operation: IPlayerOperation): void {
        const current = this.map.get(id) || { id, count: 0, operations: [] };

        current.count += 1;
        current.operations.push(operation);

        this.map.set(id, current);
    }

    public get values(): IIndexPlayer[] {
        return [...this.map].map(([id, player]) => ({ id, count: player.count }));
    }

    public find(id: string): IPlayer | undefined {
        return this.map.get(id);
    }
}
