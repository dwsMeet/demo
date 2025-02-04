import React, { useEffect, useRef, useState } from "react";
import jsQR from "jsqr"

const CustomBarcodeScanner = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [scannedData, setScannedData] = useState("");

    useEffect(() => {
        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: "environment" },
                });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.play();
                }
            } catch (error) {
                console.error("Error accessing the camera:", error);
            }
        };

        startCamera();

        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
            }
        };
    }, []);

    useEffect(() => {
        const scanBarcode = () => {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            const context = canvas.getContext("2d");

            if (video && video.readyState === video.HAVE_ENOUGH_DATA) {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                context.drawImage(video, 0, 0, canvas.width, canvas.height);

                const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

                const code = jsQR(imageData.data, imageData.width, imageData.height, {
                    inversionAttempts: "dontInvert",
                });

                if (code) {
                    setScannedData(code.data);
                }
            }

            requestAnimationFrame(scanBarcode);
        };

        const scanInterval = requestAnimationFrame(scanBarcode);

        return () => {
            cancelAnimationFrame(scanInterval);
        };
    }, []);

    return (
        <div style={{ textAlign: "center" }}>
            <h1>Custom Barcode Scanner</h1>
            <video ref={videoRef} style={{ width: "100%", maxWidth: "500px" }} />
            <canvas ref={canvasRef} style={{ display: "none" }} />
            <p>Scanned Data: {scannedData}</p>
        </div>
    );
};

export default CustomBarcodeScanner;
