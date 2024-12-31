import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routers from './routers/Routers';
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/styles.css";

const App = () => {
  return (
      <Routers />  
  );
};

export default App;
