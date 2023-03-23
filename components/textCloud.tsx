// @ts-nocheck
import React, { useEffect } from 'react';
import TagCloud from 'TagCloud';

const TextCloud = () => {
  useEffect(() => {
    return () => {
      const container = '.tagcloud';
      const text = [
        'HTML',
        'CSS',
        'Java-Script',
        'Hooks',
        'Mongoose',
        'React JS',
        'Redux',
        'SCSS',
        'Type-Script',
        'Context',
        'Node-js',
        'Mongo DB',
        'Express',
        'Git',
        'Bootstrap',
        'Git-hub',
        'BEM',
        'Material-UI',
        'Figma',
        'JSON',
        'Postman',
        'Zeplin',
        'OOP',
        'Ajax',
        'API',
        'Next.js',
        'MUI',
      ];

      const options = {
        radius: 420,
        keep: true,
        maxSpeed: 'normal',
        initSpeed: 'fast',
        direction: 135,
      };

      TagCloud(container, text, options);
    };
  }, []);

  return (
    <div>
      <div
        style={{
          color: '#ffcc00',
          fontSize: '1.6rem',
          letterSpacing: '3px',
        }}
        className='tagcloud'
      >
        <span
          className='tagcloud--item'
          style={{ ':hover': { color: '#fff' } }}
        ></span>
      </div>
    </div>
  );
};

export default TextCloud;
