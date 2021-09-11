declare module '@splinterlands/hive-interface' {
    type Payload = { id: string, required_posting_auths: string[] };

    type Operation = ['custom_json', Payload];

    interface IStreamOptions {
        on_op: (op: Operation, block_num: number, block_id: string, previous: string, transaction_id: string, block_time: Date) => void,
        save_state: () => null,
        load_state: () => null,
    }

    class Hive {
        constructor()
        stream(options: IStreamOptions);
    }
}