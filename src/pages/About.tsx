import React from 'react';
import { aboutContent } from '../content/AboutSectionContent';
import { Container } from 'react-bootstrap';

const About: React.FC = () => {
  return (
    <>
    <br />
      <Container className='auto'>
        <h1>{aboutContent.title}</h1>
        <p style={{ whiteSpace: "pre-line" }}>{aboutContent.text}</p>
      </Container>
    </>
  );
    
};

export default About;
