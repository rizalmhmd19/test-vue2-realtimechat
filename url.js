let hostname = "http://localhost:3020/api"
export const HOST = hostname

// API LIST
export const ADD_CHAT = hostname + "/chat"
export const GET_ALL_CHATS = (room) => hostname + `/chat/${room}`
export const ADD_TO_ROOM = hostname + "/room"
export const GET_USER_ROOM = (username,room) => hostname + `/room?username=${username}&room=${room}`
export const DELETE_FROM_ROOM = (room_id) => hostname + `/room/${room_id}`