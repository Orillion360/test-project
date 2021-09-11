const player_id = document.getElementById("player-id");
const refresh_button = document.getElementById("refresh");
const loading_container = document.getElementById("loading");
const player_container = document.getElementById("info");
const error_container = document.getElementById("error");
const error_text = document.getElementById("error-text");
const operations_list = document.getElementById("operations-list");

const CONTAINER = {
    LOADING: 0,
    PLAYER: 1,
    ERROR: 2,
}

function set_active_container(container) {
    if (container == CONTAINER.LOADING) {
        loading_container.classList.remove("hidden");
    } else {
        loading_container.classList.add("hidden");
    }

    if (container == CONTAINER.PLAYER) {
        player_container.classList.remove("hidden");
    } else {
        player_container.classList.add("hidden");
    }

    if (container == CONTAINER.ERROR) {
        error_container.classList.remove("hidden");
    } else {
        error_container.classList.add("hidden");
    }
}

function construct_operation_box(operation) {
    const container = document.createElement("div");

    const transaction_id = document.createElement("span");
    transaction_id.innerText = `Transaction Id: ${operation.transaction_id}`;

    const block_num = document.createElement("span");
    block_num.innerText = `Block Number: ${Number(operation.block_num)}`;

    const operation_type = document.createElement("span");
    operation_type.innerText = `Type: ${String(operation.type)}`;

    const operation_timestamp = document.createElement("span");
    operation_timestamp.innerText = `Timestamp: ${new Date(operation.timestamp).toLocaleString()}`

    container.appendChild(transaction_id);
    container.appendChild(block_num);
    container.appendChild(operation_type);
    container.appendChild(operation_timestamp);

    return container;
}

async function refresh_player_info() {
    set_active_container(CONTAINER.LOADING);

    const result = await fetch(`player?q=${current_player_id}`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
        },
        mode: "cors",
    });

    if (result.status === 400) {
        error_text.innerText = "Invalid request.";
        set_active_container(CONTAINER.ERROR);
        return;
    }

    if (result.status === 404) {
        error_text.innerText = "Player not found.";
        set_active_container(CONTAINER.ERROR);
        return;
    }

    const player = await result.json();

    player_id.innerText = player.id;

    while (operations_list.firstChild) {
        operations_list.removeChild(operations_list.firstChild);
    }

    for (const operation of player.operations) {
        operations_list.appendChild(construct_operation_box(operation));
    }

    set_active_container(CONTAINER.PLAYER);
}

let current_player_id = undefined;

(function () {
    const search_params = new URLSearchParams(window.location.search);
    const requested_player_id = search_params.get("q");

    current_player_id = requested_player_id;
    refresh_player_info().finally(() => { });

    refresh_button.onclick = () => {
        refresh_player_info().finally(() => { });
    }

    console.assert(!loading_container.classList.contains("hidden"), "Initial state of loading container is wrong");
    console.assert(player_container.classList.contains("hidden"), "Initial state of player container is wrong");
    console.assert(error_container.classList.contains("hidden"), "Initial state of error container is wrong");
})();
