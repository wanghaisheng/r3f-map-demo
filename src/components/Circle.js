import React, { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import useCoord from "../hooks/useCoord";
import { useLoader, useFrame } from "@react-three/fiber";

const Circle = () => {
  const meshRef = useRef(null);
  const [mapBoxWidth, setMapBoxWidth] = useState(0);
  const [mapBoxCenter, setMapBoxCenter] = useState([0, 0]);
  const textureMap = useLoader(
    THREE.TextureLoader,
    "./data/map/rotatingAperture.png"
  );
  const { getBoundingBox } = useCoord();

  useFrame(() => {
    meshRef.current.rotation.z += 0.0005;
  });

  useEffect(() => {
    let earthGroupBound = getBoundingBox(meshRef.current.parent);
    let { size, center } = earthGroupBound;
    let width = size.x < size.y ? size.y + 1 : size.x + 1;
    setMapBoxWidth(width * 100);
    setMapBoxCenter([center.x, -center.y]);
  }, []);

  return (
    <mesh
      position={[...mapBoxCenter, 0]}
      ref={meshRef}
      scale={[40, 40, 40]}
      rotation={[-Math.PI * 0.5, 0, 0]}
    >
      <planeGeometry width={mapBoxWidth} height={mapBoxWidth} />
      <meshBasicMaterial map={textureMap} transparent opacity={1} depthTest />
    </mesh>
  );
};

export default Circle;
