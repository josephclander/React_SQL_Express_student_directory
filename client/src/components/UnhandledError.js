import React, { useEffect } from 'react';

const UnhandledError = () => {
  useEffect(() => {
    document.title = `Unexpected Error`;
  });
  return (
    <main>
      <div className='wrap'>
        <h2>Error</h2>
        <p>Sorry! We just encountered an unexpected error.</p>
      </div>
    </main>
  );
};

export default UnhandledError;
