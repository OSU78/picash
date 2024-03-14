import { useEffect, useRef, useState } from "react";

// Styles
import "./QrStyles.css";
import { motion } from "framer-motion";
// Qr Scanner
import QrScanner from "qr-scanner";
import QrFrame from "../../assets/qr-frame.svg";
import InfoIcon from '@mui/icons-material/Info';
import {FormPartenaire} from "../FormPartenaire/FormPartenaire";
import { AnimatePresence } from "framer-motion";


export const QrReader = () => {
  // QR States
  const scanner = useRef();
  const videoEl = useRef(null);
  const qrBoxEl = useRef(null);
  const [isQrCodeFound, setIsQrCodeFound] = useState(false);
  const [qrOn, setQrOn] = useState(true);


    // Définir les variantes d'animation pour le motion.div
    const containerVariants = {
      hidden: { opacity: 0, scale: 0.95 }, // Légèrement réduit et transparent
      visible: { opacity: 1, scale: 1 }, // Pleine opacité et échelle normale
      exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } } // Transition d'exit
    };


  // Result
  const [scannedResult, setScannedResult] = useState("");

  // Success
  const onScanSuccess = (result) => {
    // 🖨 Print the "result" to browser console.
    //console.log(result);
    
    setIsQrCodeFound(true);
    // ✅ Handle success.
    // 😎 You can do whatever you want with the scanned result.
    try{
      setScannedResult(JSON.parse(result?.data));
      console.table(JSON.parse(result?.data));
    }
    catch(e){
      console.log("");
    }
   
  };

  // Fail
  const onScanFail = (err) => {
    // 🖨 Print the "err" to browser console.
    console.log(err);
  };

  useEffect(() => {
    if (videoEl?.current && !scanner.current) {
      // 👉 Instantiate the QR Scanner
      scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
        onDecodeError: onScanFail,
        // 📷 This is the camera facing mode. In mobile devices, "environment" means back camera and "user" means front camera.
        preferredCamera: "environment",
        // 🖼 This will help us position our "QrFrame.svg" so that user can only scan when qr code is put in between our QrFrame.svg.
        highlightScanRegion: true,
        // 🔥 This will produce a yellow (default color) outline around the qr code that we scan, showing a proof that our qr-scanner is scanning that qr code.
        highlightCodeOutline: true,
        // 📦 A custom div which will pair with "highlightScanRegion" option above 👆. This gives us full control over our scan region.
        overlay: qrBoxEl?.current || undefined,
      });

      // 🚀 Start QR Scanner
      scanner?.current
        ?.start()
        .then(() => setQrOn(true))
        .catch((err) => {
          if (err) setQrOn(false);
        });
    }

    // 🧹 Clean up on unmount.
    // 🚨 This removes the QR Scanner from rendering and using camera when it is closed or removed from the UI.
    return () => {
      if (!videoEl?.current) {
        scanner?.current?.stop();
      }
    };
  }, []);

  // ❌ If "camera" is not allowed in browser permissions, show an alert.
  useEffect(() => {
    if (!qrOn)
      alert(
        "Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload."
      );
  }, [qrOn]);




  
  return (
    <div className="qr-reader">
      {/* QR */}
     
      <video ref={videoEl}></video>
    
      <motion.div 
      
      
      initial={{
        opacity: 0,
        x: 0,
        scale: 0,
        y: 0,
        transition: { duration: 0.15, delay: 1.2 },
      }}
      animate={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        transition: { duration: 1, delay: 1.28 },
      }}
      exit={{
        opacity: 0,
        scale: 1,
        x: -100,
        y: 0,
        transition: { duration: 0.25 },
      }}
      className="qr-box" ref={qrBoxEl} >
        <img
          src={QrFrame}
          alt="Qr Frame"
          width={320}
          height={320}
          className="qr-frame"
        />
      
      </motion.div>
      
      <div className="mt-18 w-full fixed flex flex-col justify-start items-center top-20" style={{
        zIndex: 99999,
        color: "white",
        position: "fixed",
        miHeight: "40px",
        
        top: "10%"
      }}>
        <motion.div
        className="flex flex-row justify-center items-center w-full"
        initial={{
          opacity: 0,
          x: 0,
          scale: 0.9,
          y: 0,
          transition: { duration: 0.15, delay: 1.2 },
        }}
        animate={{
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          transition: { duration: 0.28, delay: 2.45} ,
        }}
        exit={{
          opacity: 0,
          scale: 1,
          x: -100,
          y: 0,
          transition: { duration: 0.25 },
        }}
        >

        <h1 className="text-lg text-slate-200 flex flex-row justify-between items-center " style={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          padding: "10px",
          borderRadius: "4px",
          backdropFilter: "blur(4px)",
          userSelect: "none",
          textAlign: "center",
          width: "81%",
          fontSize: "13px"
        }}>1 - Scanner le QR Code afficher sur le Nourrain <InfoIcon /> </h1>

        </motion.div>

        <AnimatePresence>
        {isQrCodeFound && (
          <motion.div
            className="flex flex-row justify-center items-center w-full"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
          >
            <FormPartenaire hideForm={setIsQrCodeFound} 
              entrepriseName={scannedResult?.name_compagny}
              entrepriseGroupName={scannedResult?.name_groupe}
            />
          </motion.div>
        )}
      </AnimatePresence>
      </div>


      {/* Show Data Result if scan is success */}
      {/* {scannedResult && (

        <p
          className="flex mt-20 justify-center items-center w-full"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 99999,
            color: "white",
          }}
        >
          Scanned Result: {scannedResult}
        </p>
      )} */}
    </div>
  );
};

export default QrReader;
