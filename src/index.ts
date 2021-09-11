import config from './config.json';
import Operations from './operations';
import Players from './players';
import { Hive, Operation } from '@splinterlands/hive-interface';

const hive = new Hive();
hive.stream({
	on_op: onOperation,
	save_state: () => null,
	load_state: () => null
});

const operations = new Operations();
const players = new Players();

let last_block_num = 0;

function onOperation(op: Operation, block_num: number, block_id: string, previous: string, transaction_id: string, block_time: Date) {
	// Filter out any operations not related to Splinterlands
	if (op[0] != 'custom_json' || !op[1].id.startsWith(config.operation_prefix))
		return;

	if (last_block_num < block_num) {
		// Send all values from last block.
		// Only update when we get a new block number, else we're spamming the frontend.
		web_socket_server.broadcast_operations(operations.values);
		web_socket_server.broadcast_players(players.values);
		last_block_num = block_num;
	}

	const op_id = op[1].id;
	operations.increment(op_id);

	// I'm guessing required_posting_auths contain player ids, I also saw required_auths which was usually empty.
	op[1].required_posting_auths?.forEach(player_id => {
		players.increment(player_id, { type: op_id, timestamp: block_time, block_num, transaction_id });
	});
}

import * as http from 'http';
import { create_web_server } from './web-server';
import { create_web_socket_server } from './socket-server';

const port = 3000;

const web_server = create_web_server(operations, players);
const server = http.createServer(web_server);
const web_socket_server = create_web_socket_server(server);

server.listen(port, () => {
	console.log('Running...');
});
