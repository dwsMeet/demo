import React, { useState, useEffect } from "react";
import BarcodeReader from "react-barcode-reader";

const BarcodeReaders = () => {
    const [barcode, setBarcode] = useState("");
    const [hasPermission, setHasPermission] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices
                .getUserMedia({ video: true })
                .then(() => {
                    setHasPermission(true); // Permission granted
                })
                .catch((error) => {
                    setErrorMessage("Camera access denied. Please grant permission.");
                    setHasPermission(false); // Permission denied
                });
        } else {
            setErrorMessage("Camera not supported in this environment.");
        }
    }, []);

    const handleBarcodeScan = (data) => {
        setBarcode(data);
    };

    const handleError = (err) => {
        console.error("Camera error:", err);
        setErrorMessage("Error accessing camera.");
    };

    return (
        <div>
            <h2>React Barcode Scanner with Camera Access</h2>
            {errorMessage && <p>{errorMessage}</p>}
            {!hasPermission && <p>Waiting for camera permission...</p>}
            {hasPermission && (
                <div>
                    <p>Scanned Barcode: {barcode}</p>
                    <BarcodeReader
                        onError={handleError}
                        onScan={handleBarcodeScan}
                        facingMode="environment"
                    />
                </div>
            )}
        </div>
    );
};

export default BarcodeReaders;
