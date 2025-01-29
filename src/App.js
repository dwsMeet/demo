// import BarcodeScanner from "./BarcodeScanner";
import 'react-barcode-scanner/polyfill';
import React, { useState, useEffect } from "react";
import BarcodeReader from "react-barcode-reader";
import CameraPermission from './CameraPermission';
import Scanner from './Scanner';


function App() {
  const [barcode, setBarcode] = useState("");
  const [hasPermission, setHasPermission] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
    <Scanner />
  );
};



export default App;
