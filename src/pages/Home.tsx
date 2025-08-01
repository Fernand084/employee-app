// src/pages/Home.tsx
import React from 'react';
import Message from '../components/Message';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Home</h1>
      <Message msg="Hola desde la página Home" />
    </div>
  );
};

export default Home;
