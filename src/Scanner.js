import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";


function Scanner() {
    const [scanResult, setScanResult] = useState(null);

    useEffect(() => {
        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 250,
                height: 250,
            },
            fps: 5,
        });
        scanner.render(success, error);

        function success(result) {
            scanner.clear();
            setScanResult(result);
        }

        function error(err) {
            console.log(err);
        }
    }, []);

    return (
        <div className="App">
            <h1>QR Code Scanning in react</h1>
            {
                scanResult
                    ? <div>Success:<a href={scanResult}>{scanResult}</a></div>
                    : <div id='reader'></div>
            }
        </div>
    )
}

export default Scanner