import { Message, AnswerJoinRoomData, RoomMessageData, LOADING_STATUS, DATA_TYPE, DATA_NAME } from "../constents";
import { userStore, roomStore, sendMessage } from "./websocket";

export function joinRoom(joinRoomID: number) {
    userStore.loadingStatus = LOADING_STATUS.JOIN_ROOM;
    const joinRoomMessage: Message = {
        dataType: DATA_TYPE.ASK,
        dataName: DATA_NAME.JOIN_ROOM,
        data: {
            joinRoomID: joinRoomID,
        },
    };
    sendMessage(joinRoomMessage);
}
export function answerJoinRoom(data: AnswerJoinRoomData) {
    switch (data.success) {
        case true:
            break;

        case false:
            roomStore.roomNotFound = true;
            break;

        default:
            console.log(`错误！ANSWER_JOIN_ROOM格式错误：`);
            console.log(data);
            break;
    }
}

export function createRoom(createMaxPlayer: number) {
    const createRoomMessage: Message = {
        dataType: DATA_TYPE.ACTION,
        dataName: DATA_NAME.CREATE_ROOM,
        data: {
            maxPlayer: createMaxPlayer,
        },
    };
    sendMessage(createRoomMessage);
}

export function changePrepare() {
    const changePrepareMessage: Message = {
        dataType: DATA_TYPE.ACTION,
        dataName: DATA_NAME.CHANGE_PREPARE,
        data: {},
    };
    sendMessage(changePrepareMessage);
}

export function leaveRoom() {
    const leaveRoomMessage: Message = {
        dataType: DATA_TYPE.ACTION,
        dataName: DATA_NAME.LEAVE_ROOM,
        data: {},
    };
    sendMessage(leaveRoomMessage);
}

export function updateRoomStaus(data: RoomMessageData) {
    roomStore.roomStatus = data;
}