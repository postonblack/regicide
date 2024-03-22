# Regicide

一个卡牌游戏，配合[后端](https://github.com/DarkPaper2022/regicideGame)使用。

## JSON格式说明

+ 客户端发送

```javascript
{
    dataType: "ASK_LOGIN",
    data: {
        username: <username: string>,
        password: <password: string>,
    }
}
```

```javascript
{
    dataType: "ASK_REGISTER",
    data: {
        username: <username: string>,
        password: <password: string>,
    }
}
```

```javascript
{
    dataType: "ASK_JOIN_ROOM",
    data: {
        joinRoomID: <joinRoomID: number>,//int
    },
}
```

```javascript
{
    dataType: "ACTION_CREATE_ROOM",
    data: {
        maxPlayer: <maxPlayer: number>,//2,3,4
    },
}
```

```javascript
{
    dataType: "ACTION_CHANGE_PREPARE",
    data: {},
}
```

```javascript
{
    dataType: "ACTION_LEAVE_ROOM",
    data: {},
}
```

```javascript
{
    dataTpye: "ACTION_LOGOUT",
    data: {},
}
```

+ 客户端接收

```javascript
{
    dataType: "ANSWER_CONNECTION",
    data: {},
}
```

```javascript
{
    dataType: "ANSWER_LOGIN",
    data: {
        success: <successOrNot: Boolean>,
    },
}
```

```javascript
{
    dataType: "ANSWER_REGISTER",
    data: {
        success: <successOrNot: Boolean>,
    },
}
```

```javascript
{
    dataType: "ANSWER_JOIN_ROOM",
    data: {
        success: <successOrNot: Boolean>,
    },
}
```

```javascript
{
    dataType: "UPDATE_ROOM_STATUS",
    data: {
        roomID: <roomID: number>,//int
        maxPlayer: <maxPlayer: number>,//2,3,4
        playerList: [
            {
                playerName: <playerName: string>,
                playerPrepared: <preparedOrNot: Boolean>,
            },
            ...
        ],
    },
}