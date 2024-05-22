"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setBotState = exports.getBotState = void 0;
let botStates;
function getBotState() {
    return botStates;
}
exports.getBotState = getBotState;
function setBotState(isActive) {
    botStates = isActive;
}
exports.setBotState = setBotState;
