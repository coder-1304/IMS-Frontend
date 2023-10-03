import React, { useState, useEffect } from "react";
import './MessageComponent.css'

function MessageComponent({ message }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000); // Hide the message after 3 seconds

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={`message-component ${isVisible ? "visible" : "hidden"}`}>
      {message}
    </div>
  );
}

export default MessageComponent;
