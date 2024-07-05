export interface Message {
    dataType: string,
    dataName: string,
    data: AnswerData | UpdateData | object,
}

export interface AnswerData {
    success: boolean,
}

export interface AnswerLoginData extends AnswerData { }

export interface AnswerRegisterData extends AnswerData { }

export interface AnswerJoinRoomData extends AnswerData { }

export interface UpdateData { }

export interface RoomMessageData extends UpdateData {
    roomID: number,
    maxPlayer: number,
    playerList: {
        playerName: string,
        playerPrepared: boolean,
    }[],
}