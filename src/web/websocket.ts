/* eslint-disable @typescript-eslint/no-explicit-any */
import { computed } from "vue";
import { Message, AnswerLoginData, AnswerRegisterData, AnswerJoinRoomData, RoomMessageData, LOADING_STATUS, DATA_TYPE, DATA_NAME } from "../constents";
import { URL, SLEEP_TIME } from "../constents";
import { useUserStore, useRoomStore } from "../stores";
import { answerLogin, answerRegister } from "./user";
import { answerJoinRoom, updateRoomStaus } from "./room";

export let userStore: any;
export let roomStore: any;

function getPinia() {
    userStore = useUserStore();
    roomStore = useRoomStore();
}

const loadingStatus = computed(() => userStore.loadingStatus);

const websocket = new WebSocket(URL);

export function setupWebSocket() {
    websocket.onopen = onWebSocketOpen;
    websocket.onmessage = onWebSocketMessage;
    websocket.onerror = onWebSocketError;
    websocket.onclose = onWebSocketClose;

    getPinia();
}

function onWebSocketOpen() {
    console.log("链接成功");

    userStore.loadingStatus = LOADING_STATUS.CONNECTION;
    const initMessage: Message = {
        dataType: DATA_TYPE.ASK,
        dataName: DATA_NAME.CONNECTION,
        data: {
            gameName: "regicide",
            version: 0.1,
        }
    };
    sendMessage(initMessage);
}

function onWebSocketMessage(event: MessageEvent<string>) {
    const message: Message = JSON.parse(event.data);
    console.log(message);

    switch (message.dataType) {
        case DATA_TYPE.ANSWER:
            checkAnswer(message);
            switch (message.dataName) {
                case DATA_NAME.CONNECTION:
                    console.log("接受连接");
                    break;

                case DATA_NAME.LOGIN:
                    answerLogin(message.data as AnswerLoginData);
                    break;

                case DATA_NAME.REGISTER:
                    answerRegister(message.data as AnswerRegisterData);
                    break;

                case DATA_NAME.JOIN_ROOM:
                    answerJoinRoom(message.data as AnswerJoinRoomData);
                    break;

                default:
                    console.log(`错误！服务器消息dataName格式错误：`);
                    console.log(message);
                    break;
            }
            break;

        case DATA_TYPE.UPDATE:
            switch (message.dataName) {
                case DATA_NAME.ROOM_STATUS:
                    updateRoomStaus(message.data as RoomMessageData);
                    break;

                case DATA_NAME.REGICIDE:
                    console.log(`REGICIDE消息：`);
                    console.log(message);
                    break;

                default:
                    console.log(`错误！服务器消息dataName格式错误：`);
                    console.log(message);
                    break;
            }
            break;

        default:
            console.log(`错误！服务器消息dataType格式错误：`);
            console.log(message);
            break;
    }
}

export function sendMessage(message: Message) {
    console.log(message);
    if (websocket.readyState === WebSocket.OPEN) {
        if (message.dataType === DATA_TYPE.ASK) {
            setTimeout(() => websocket.send(JSON.stringify(message)), SLEEP_TIME);
        } else {
            websocket.send(JSON.stringify(message));
        }
    } else {
        console.log("发送消息时链接错误！");
    }
}

function checkAnswer(message: Message) {
    if (message.dataName === loadingStatus.value) {
        userStore.loadingStatus = LOADING_STATUS.NONE;
    } else {
        console.log(`错误！未ASK的ANSWER：`);
        console.log(message);
    }
}

function onWebSocketError() {
    console.log("链接错误！");
}
function onWebSocketClose() {
    console.log("链接被关闭。");
}

export function closeWebSocket() {
    websocket.close();
}