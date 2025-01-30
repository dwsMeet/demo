// import BarcodeScanner from "./BarcodeScanner";
// import 'react-barcode-scanner/polyfill';
import React, { useState, useEffect } from "react";
// import BarcodeReaders from "./BarcodeReader";
// import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { QrReader } from 'react-qr-reader';
// import BarcodeReader from "react-barcode-reader";
// import { BarcodeScanner } from 'react-barcode-scanner';
// import 'react-barcode-scanner/polyfill';
// import CameraPermission from './CameraPermission';
// import Scanner from './Scanner';



function App() {
  const [barcode, setBarcode] = useState("");
  const [hasPermission, setHasPermission] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [result, setResult] = useState('');
  const [data, setData] = React.useState("Not Found");

  useEffect(() => {
    // if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // navigator
    //   .getUserMedia({ video: true })
    //   .then(() => {
    //     setHasPermission(true); // Permission granted
    //   })
    //   .catch((error) => {
    //     setErrorMessage("Camera access denied. Please grant permission.");
    //     setHasPermission(false); // Permission denied
    //   });
    // } else {
    //   setErrorMessage("Camera not supported in this environment.");
    // }
    permission()
  }, []);

  const permission = async () => {
    await navigator.mediaDevices.getUserMedia({ video: true }).then(() => {
      setHasPermission(true);
    }).catch((error) => {
      console.log(error);
    })
  }

  const handleBarcodeScan = (data) => {
    setBarcode(data);
  };

  const handleError = (err) => {
    console.error("Camera error:", err);
    setErrorMessage("Error accessing camera.");
  };

  return (
    // <div>
    //   <BarcodeScanner onResult={(code) => setResult(code)} />
    //   <p>Scanned Result: {result}</p>
    // </div>
    // <BarcodeScanner />
    // <BarcodeReaders />
    <>
      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
          }

          if (!!error) {
            console.info(error);
          }
        }}
        style={{ width: '100%' }}
      />
      <p>{data}</p>
    </>
  );
};



export default App;
