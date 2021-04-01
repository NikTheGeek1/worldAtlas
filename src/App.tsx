import { createRef, useEffect, useState } from 'react';
import './App.css';
import WebGLBoilerplate from './atlas/WebGLBoilerplate';
import visitorTracker from './visitor-tracker';
visitorTracker();

function App() {
  const [webGLBoilerplate, setWebGLBoilerplate] = useState<WebGLBoilerplate>();
  const canvasRef = createRef<HTMLCanvasElement>();

  useEffect(() => {
    if (canvasRef && canvasRef.current) {
      const webGLBoilerPlateInstance: WebGLBoilerplate = new WebGLBoilerplate(canvasRef.current);
      setWebGLBoilerplate(webGLBoilerPlateInstance);
      webGLBoilerPlateInstance.init();
    }

  }, []);

  return (
    <canvas ref={canvasRef}></canvas>
  );
}

export default App;
