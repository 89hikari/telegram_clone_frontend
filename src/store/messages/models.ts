export interface ISidebarMessage {
    id: number,
    message: number,
    senderId: number,
    receiverId: number,
    createdFormatDate: string,
    receiver: {
        id: number,
        name: string
    },
    sender: {
        id: number,
        name: string
    }
}

export interface ICurrentMessage {
    id: number,
    message: string,
    senderId: number,
    receiverId: number,
    createdFormatDate: string
}

export interface IMessages {
    sidebar: ISidebarMessage[],
    currentMessages: ICurrentMessage[],
    error: boolean,
    error_message: string
}