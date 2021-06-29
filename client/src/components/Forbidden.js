import React, { useEffect } from 'react';

const Forbidden = () => {
  useEffect(() => {
    document.title = `Forbidden`;
  });
  return (
    <main>
      <div className='wrap'>
        <h2>Forbidden</h2>
        <p>Oh oh! You can't access this page.</p>
      </div>
    </main>
  );
};

export default Forbidden;
