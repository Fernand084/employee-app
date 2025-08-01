// src/components/Message.tsx
import React from 'react';

type MessageProp = {
  msg: string;
};

const Message: React.FC<MessageProp> = ({ msg }) => {
  return <p>{msg}</p>;
};

export default Message;
