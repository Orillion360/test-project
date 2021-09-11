import * as WebSocket from 'ws';
import { Server } from 'http';
import { IOperation } from './operations';
import { IIndexPlayer } from './players';

export class WebSocketServer {
    constructor(private readonly wss: WebSocket.Server) { }

    public broadcast_operations(operations: IOperation[]) {
        const data = JSON.stringify({ type: 'operations', data: operations });

        this.wss.clients.forEach(client => {
            client.send(data);
        });
    }

    public broadcast_players(players: IIndexPlayer[]) {
        const data = JSON.stringify({ type: 'players', data: players });

        this.wss.clients.forEach(client => {
            client.send(data);
        });
    }
}

export function create_web_socket_server(server: Server): WebSocketServer {
    const wss = new WebSocket.Server({ server });

    return new WebSocketServer(wss);
}
