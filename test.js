import http from 'k6/http';
import { check, sleep } from 'k6';
// const fs = require("fs");

// const file = open("read.txt");
// const lines = file.read("utf-8").split("\n");
// const commands = lines.map(line => line.trim());
// console.log("Commands:");
// console.log(commands);

// const file = fs.readFileSync('read.txt', 'utf-8');
// const commands = file.split("\n");


export default function () {

    const url = 'https://webhook.site/2da82454-ed6f-4120-8502-bd2c77a68fde';
    const command = getRandomCommand()
    const payload = JSON.stringify({
        command: command,
    });
    const headers = { 'Content-Type': 'application/json' };
    const response = http.post(url, payload, { headers: headers });

    check(response, {
        'status is 200': (r) => r.status === 200,
    });

};

function getRandomCommand() {
    const commands = [
        'ASSOC RGET 459 LIKES [213, 248, 366, 286, 462, 321] 293 774;',
        'OBJ GET 281;',
        'OBJ GET 326;',
        'OBJ GET 135;',
        'ASSOC COUNT 230 LIKES;',
        'ASSOC RGET 128 LIKES [453, 69, 233, 436, 226, 365, 189, 32, 211, 42] 396 791;',
        'ASSOC RGET 189 AUTHORED [331, 457, 497, 328, 349, 366, 397, 372] 249 883;',
        'OBJ GET 375;',
        'OBJ GET 33;',
        'OBJ GET 385;',
    ];
    const index = Math.floor(Math.random() * commands.length);
    return commands[index];
};
