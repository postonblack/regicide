# Regicide

一个卡牌游戏，配合[后端](https://github.com/DarkPaper2022/regicideGame)使用。

## JSON格式说明

+ 客户端发送

```json
{
    dataType: "ASK_LOGIN",
    data: {
        username: <username: string>,
        password: <password: string>,
    }
}
```

```json
{
    dataType: "ASK_REGISTER",
    data: {
        username: <username: string>,
        password: <password: string>,
    }
}
```

```json
{
    dataType: "ASK_JOIN_ROOM",
    data: {
        joinRoomID: <joinRoomID: number>,//int
    },
}
```

```json
{
    dataType: "ACTION_CREATE_ROOM",
    data: {
        maxPlayer: <maxPlayer: number>,//2,3,4
    },
}
```

```json
{
    dataType: "ACTION_CHANGE_PREPARE",
    data: {},
}
```

```json
{
    dataType: "ACTION_LEAVE_ROOM",
    data: {},
}
```

```json
{
    dataTpye: "ACTION_LOGOUT",
    data: {},
}
```

+ 客户端接收

```json
{
    dataType: "ANSWER_CONNECTION",
    data: {},
}
```

```json
{
    dataType: "ANSWER_LOGIN",
    data: {
        success: <successOrNot: Boolean>,
    },
}
```

```json
{
    dataType: "ANSWER_REGISTER",
    data: {
        success: <successOrNot: Boolean>,
    },
}
```

```json
{
    dataType: "ANSWER_JOIN_ROOM",
    data: {
        success: <successOrNot: Boolean>,
    },
}
```