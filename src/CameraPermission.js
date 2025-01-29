import React, { useState, useRef, useEffect } from 'react';

const CameraPermission = () => {
    const videoRef = useRef(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const requestCameraAccess = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (err) {
                setError('Camera access denied or not available.');
                console.error('Error accessing camera:', err);
            }
        };

        requestCameraAccess();

        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject;
                const tracks = stream.getTracks();
                tracks.forEach(track => track.stop());
            }
        };
    }, []);

    return (
        <div>
            <h1>Camera Permission Example</h1>
            {error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : (
                <video ref={videoRef} autoPlay playsInline muted />
            )}
        </div>
    );
};

export default CameraPermission;
