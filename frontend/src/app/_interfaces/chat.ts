interface IMessage {
  type: string;
  time: any;
  content: any;
}

export interface IMessages {
  id: string;
  data: {
    author: any;
    messages: IMessage[] | [];
  };
}
