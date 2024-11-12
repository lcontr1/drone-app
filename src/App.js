import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/images');
        setImages(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/query',   
 { query });
      setResponse(response.data.answer);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <div>
      <h1>Drone Data</h1>
      <ul>
        {images.map(image => (
          <li key={image.id}>{image.image_id}: {image.file_name}</li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
        <button type="submit">Ask</button>
      </form>

      <p>{response}</p>
    </div>
  );


    </div>
  );
}

export default App;
