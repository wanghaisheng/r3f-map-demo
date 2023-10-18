import React, { Suspense } from "react";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Stats, OrbitControls } from "@react-three/drei";
import Map from "./Map";
import Loading from "./Loading";

function App() {
  return (
    <div className="App">
      <Suspense fallback={<Loading />}>
        <Canvas camera={{ position: [0, 40, 45], fov: 50 }}>
          <Map />
          <ambientLight intensity={2} color={0x7af4ff} />
          <directionalLight
            intensity={8}
            position={[0, 10, 1]}
            color={0x7af4ff}
          />
          <Stats />
          <OrbitControls />
          {/* <axesHelper args={[80]} /> */}
          {/* <gridHelper args={[30, 30]} /> */}
        </Canvas>
      </Suspense>
    </div>
  );
}

export default App;
