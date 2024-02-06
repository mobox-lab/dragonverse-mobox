import React from 'react';

type MessageProps = {
  title?: React.JSX.Element | string;
  message?: React.JSX.Element | string;
};

export default function Message({ title, message }: MessageProps) {
  return (
    <div className="py-2">
      {title && <h5 className="mb-4 text-lg font-medium">{title}</h5>}
      <div className="text-sm font-normal">{message}</div>
    </div>
  );
}
