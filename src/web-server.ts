import express, { Express } from 'express';
import path from 'path';
import Operations from './operations';
import Players from './players';

export function create_web_server(
    operations: Operations,
    players: Players,
): Express {
    const app = express();

    app.use(express.static(path.join(__dirname, "..", "public")));

    app.get('/operations', (req, res) => {
        res.json(operations.values);
    });

    app.get('/players', (req, res) => {
        res.json(players.values)
    });

    app.get('/player', (req, res) => {
        const q = req.query.q;

        if (!q || typeof q !== 'string') {
            return res.status(400).send('Missing query parameter "q"');
        }

        const player = players.find(q);

        if (!player) {
            return res.status(404).send('Player not found');
        }

        return res.json(player);
    })

    return app;
}
