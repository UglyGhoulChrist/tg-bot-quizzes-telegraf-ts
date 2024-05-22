"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetUserState = exports.setUserState = exports.getUserState = void 0;
const userStates = {};
function getUserState(userId) {
    return userStates[userId];
}
exports.getUserState = getUserState;
function setUserState(userId, userState) {
    userStates[userId] = userState;
}
exports.setUserState = setUserState;
function resetUserState(userId) {
    delete userStates[userId];
}
exports.resetUserState = resetUserState;
exports.default = userStates;
