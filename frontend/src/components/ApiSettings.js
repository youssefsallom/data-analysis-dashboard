import React, { useState } from 'react';
import axios from 'axios';

function ApiSettings() {
  const [apiKey, setApiKey] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    // Get userId from localStorage (assuming it's saved there after login)
    const userId = localStorage.getItem('userId');

    if (!userId) {
      setMessage('Error: User not logged in or userId not found.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/user/save-api-key', { userId, apiKey } );
      setMessage(response.data.message);
      // Optionally, you can also save the API key to localStorage for immediate use
      localStorage.setItem('userApiKey', apiKey);
    } catch (error) {
      setMessage('Failed to save API Key. Please check console for details.');
      console.error('Error saving API key:', error.response ? error.response.data : error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
      <h2>API Settings</h2>
      <p>Enter your external API key here. This key will be used to fetch data for your dashboard.</p>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="apiKey">Your API Key:</label>
          <input
            type="text"
            id="apiKey"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '10px',
              marginTop: '5px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {isLoading ? 'Saving...' : 'Save API Key'}
        </button>
      </form>
      {message && (
        <div style={{
          marginTop: '15px',
          padding: '10px',
          backgroundColor: message.includes('successful') ? '#d4edda' : '#f8d7da',
          color: message.includes('successful') ? '#155724' : '#721c24',
          borderRadius: '4px'
        }}>
          {message}
        </div>
      )}
    </div>
  );
}

export default ApiSettings;
