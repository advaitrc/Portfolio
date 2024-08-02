

import React from 'react';
import AboutPage from './AboutPage';

const App = () => {
  return (
    <div className="app">
      <header>
        <h1>Welcome to My React App</h1>
      </header>
      <main>
        <AboutPage />
      </main>
      <footer>
        <p>Copyright © 2024 Lorem Ipsum Inc. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
