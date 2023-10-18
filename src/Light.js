import React, { useRef } from "react";
import { useControls } from "leva";
import * as THREE from "three";

const Light = () => {
  const ambientCtl = useControls("Ambient Light", {
    visible: false,
    color: new THREE.Color(0xffffff),
    intensity: {
      value: 0.5,
      min: 0,
      max: 1.0,
      step: 0.1,
    },
  });

  const directionalCtl = useControls("Directional Light", {
    visible: true,
    position: {
      x: 3.3,
      y: 1.0,
      z: 4.4,
    },
    color: new THREE.Color(0xffffff),
  });

  return (
    <>
      <ambientLight
        visible={ambientCtl.visible}
        intensity={ambientCtl.intensity}
        color={ambientCtl.color}
      />
      <directionalLight
        visible={directionalCtl.visible}
        position={[
          directionalCtl.position.x,
          directionalCtl.position.y,
          directionalCtl.position.z,
        ]}
        color={directionalCtl.color}
      />
    </>
  );
};

export default Light;
