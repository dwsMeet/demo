import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { BrowserMultiFormatReader } from "@zxing/browser";

const BarcodeScanner = () => {
    const webcamRef = useRef(null);
    const [barcodeResult, setBarcodeResult] = useState("");

    const handleScan = async () => {
        if (webcamRef.current) {
            const webcam = webcamRef.current.video;

            if (webcam.readyState === 4) {
                const barcodeReader = new BrowserMultiFormatReader();

                try {
                    const barcode = await barcodeReader.decodeOnceFromVideoElement(webcam);
                    setBarcodeResult(barcode.text);
                } catch (err) {
                    console.log("No barcode detected:", err.message);
                    alert("No barcode detected");
                }
            }
        }
    };

    useEffect(() => {
        const interval = setInterval(handleScan, 500); // Scan every 500ms
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <h1>Barcode Scanner</h1>
            <Webcam
                audio={false}
                ref={webcamRef}
                style={{ width: "100%", maxWidth: 600 }}
                screenshotFormat="image/jpeg"
            />
            <p>Barcode Result: {barcodeResult || "No barcode detected"}</p>
        </div>
    );
};

export default BarcodeScanner;