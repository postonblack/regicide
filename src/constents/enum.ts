export enum CURRENT_PAGE {
    Login,
    Register,
    Lobby,
    Regicide,
}

export enum LOADING_STATUS {
    NONE = "NONE",
    CONNECTION = "CONNECTION",
    LOGIN = "LOGIN",
    REGISTER = "REGISTER",
    JOIN_ROOM = "JOIN_ROOM",
}

export enum DATA_TYPE {
    ASK = "ASK",
    ANSWER = "ANSWER",
    UPDATE = "UPDATE",
    ACTION = "ACTION",
}

export enum DATA_NAME {
    CONNECTION = "CONNECTION",
    LOGIN = "LOGIN",
    REGISTER = "REGISTER",
    JOIN_ROOM = "JOIN_ROOM",
    ROOM_STATUS = "ROOM_STATUS",
    CREATE_ROOM = "CREATE_ROOM",
    CHANGE_PREPARE = "CHANGE_PREPARE",
    LEAVE_ROOM = "LEAVE_ROOM",
    LOGOUT = "LOGOUT",
    REGICIDE = "REGICIDE",
}