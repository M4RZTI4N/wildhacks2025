import { useState } from 'react';
import '../css/input.css'; // Import input specific styles

function Input({ onSend }) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage(''); // Clear input after sending
    }
  };

  return (
    <div className="input-container">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask me anything..."
        className="input-field"
      />
      <button onClick={handleSend} className="send-button">
        Send
      </button>
    </div>
  );
}

export default Input;
