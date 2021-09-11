const operations_list = document.getElementById('operations-list');
const player_list = document.getElementById('player-list');

const player_live_update = document.getElementById('player-live-update');
const operation_live_update = document.getElementById('operation-live-update');

console.assert(operations_list, "No operations list found");
console.assert(player_list, "No player list found");

async function refresh_operations() {
    const result = await fetch("operations", {
        method: "GET",
        headers: {
            "Accept": "application/json",
        },
        mode: "cors",
    });

    if (result.status !== 200) {
        // TODO: Maybe warn user?
        return;
    }

    const operations = await result.json();

    update_operations(operations);
}

function update_operations(operations) {
    while (operations_list.firstChild) {
        operations_list.removeChild(operations_list.firstChild);
    }

    for (const operation of operations) {
        const li = document.createElement("li");
        li.innerText = `${operation.id}: ${operation.count}`;
        operations_list.appendChild(li);
    }
}

async function refresh_players() {
    const result = await fetch("players", {
        method: "GET",
        headers: {
            "Accept": "application/json",
        },
        mode: "cors",
    });

    if (result.status !== 200) {
        // TODO: Maybe warn user?
        return;
    }

    const players = await result.json();

    update_players(players);
}

function update_players(players) {
    while (player_list.firstChild) {
        player_list.removeChild(player_list.firstChild);
    }

    for (const player of players) {
        const li = document.createElement("li");
        li.innerText = `${player.id}: ${player.count}`;
        player_list.appendChild(li);
    }
}

const socket = new WebSocket(`ws://${window.location.host}`);

(function () {
    refresh_operations().then(() => { console.info("Loaded operations") });
    refresh_players().then(() => { console.info("Loaded players") });

    document.getElementById('operations-refresh').onclick = () => {
        console.debug("Operation list refresh requested by user");
        refresh_operations().then(() => { console.info("Reloaded operations") });
    };

    document.getElementById('players-refresh').onclick = () => {
        console.debug("Player list refresh requested by user");
        refresh_players().then(() => { console.info("Reloaded players") });
    };

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);

        switch (data.type) {
            case 'operations': {
                if (!operation_live_update.checked) {
                    break;
                }

                update_operations(data.data);

                break;
            }
            case 'players': {
                if (!player_live_update.checked) {
                    break;
                }

                update_players(data.data);

                break;
            }
            default: break;
        }
    }
})();
