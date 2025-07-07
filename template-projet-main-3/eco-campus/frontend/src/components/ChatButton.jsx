import React from 'react';
import styles from './ChatButton.module.css';

const ChatButton = () => {
  return (
    <div className={styles.chat}>
      <img src="/images/chat.svg" alt="Support" />
    </div>
  );
};

export default ChatButton;
