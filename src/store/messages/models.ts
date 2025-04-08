export interface ISidebarMessage {
  id: number;
  date: string;
  message: string;
  personId: number;
  personName: string;
}

export interface ICurrentMessage {
  id: number;
  message: string;
  senderId: number;
  receiverId: number;
  createdFormatDate: string;
}

export interface IPeerInfo {
  id: number;
  name: string;
  email: string;
}

export interface IMessages {
  sidebar: ISidebarMessage[];
  currentMessages: ICurrentMessage[];
  peerInfo: IPeerInfo;
  error: boolean;
  error_message: string;
}
