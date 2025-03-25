// src/QRCodeGenerator.jsx
import React, { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const QRCodeGenerator = () => {
  const [input, setInput] = useState('');
  const [fileName, setFileName] = useState('');
  const [showFileNameInput, setShowFileNameInput] = useState(false);
  const [qrColor, setQrColor] = useState('#000000'); // Default black
  const [bgColor, setBgColor] = useState('#ffffff'); // Default white
  const canvasRef = useRef(null);

  const downloadQRCode = () => {
    if (!showFileNameInput) {
      setShowFileNameInput(true);
      return;
    }

    const canvas = canvasRef.current;
    if (canvas) {
      const imageURL = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = fileName.trim() !== '' ? fileName.trim() : 'qr_code.png';
      link.href = imageURL;
      link.click();
    }
  };

  return (
    <div style={styles.container}>
      <h1>QR Code Generator</h1>
      <input
        style={styles.input}
        type="text"
        placeholder="Enter text or URL"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      {input && (
        <>
          <div style={styles.colorPickers}>
            <div>
              <label>QR Color: </label>
              <input
                type="color"
                value={qrColor}
                onChange={(e) => setQrColor(e.target.value)}
              />
            </div>
            <div>
              <label>Background Color: </label>
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
              />
            </div>
          </div>

          <div style={styles.qrContainer}>
            <QRCodeCanvas
              ref={canvasRef}
              value={input}
              size={256}
              level="H"
              includeMargin={true}
              fgColor={qrColor} // Apply custom QR color
              bgColor={bgColor} // Apply custom background color
            />
          </div>

          <button style={styles.button} onClick={downloadQRCode}>
            Download QR Code
          </button>

          {showFileNameInput && (
            <input
              style={{ ...styles.input, marginTop: '10px' }}
              type="text"
              placeholder="Enter file name (optional)"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
            />
          )}
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  input: {
    padding: '10px',
    width: '80%',
    maxWidth: '400px',
    fontSize: '16px',
    margin: '20px 0',
    textAlign: 'center',
  },
  qrContainer: {
    marginTop: '20px',
  },
  colorPickers: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginBottom: '20px',
  },
  button: {
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default QRCodeGenerator;
