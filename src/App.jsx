// Importez React et les hooks nécessaires
import React, { useState } from 'react';
// Importez les composants de routage
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Importez Provider de react-redux
import { Provider } from 'react-redux';
// Importez votre store Redux
import { store } from './stores';
// Importez vos images et CSS
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import AnimatedRoutes from './components/AnimatedRoutes/AnimatedRoutes.jsx';
import NavBar from './components/NavBar/NavBar.jsx';


function AppRouter() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        {/* <NavBar /> */}
       <AnimatedRoutes />
       
      </Provider>
    </BrowserRouter>
  );
}

function App() {
  const [count, setCount] = useState(0);

  return (
    
      
      <AppRouter />
   
  );
}

export default App;
