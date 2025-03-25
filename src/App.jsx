// src/App.jsx
import React from 'react';
import QRCodeGenerator from './Qrcode';
import Form from "./components/form";

function App() {
  return (
    <div>
      <QRCodeGenerator />
      <Form/>
    </div>
  );
}

export default App;
