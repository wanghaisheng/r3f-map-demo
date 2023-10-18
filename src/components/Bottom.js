import React, { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import useCoord from "../hooks/useCoord";
import { useLoader } from "@react-three/fiber";

const Button = () => {
  const meshRef = useRef(null);
  const [mapBoxWidth, setMapBoxWidth] = useState(0);
  const [mapBoxCenter, setMapBoxCenter] = useState([0, 0]);
  const textureMap = useLoader(
    THREE.TextureLoader,
    "./data/map/circle-point.png"
  );
  const { getBoundingBox } = useCoord();

  useEffect(() => {
    let earthGroupBound = getBoundingBox(meshRef.current.parent);
    let { size, center } = earthGroupBound;
    let width = size.x < size.y ? size.y + 1 : size.x + 1;
    setMapBoxWidth(width * 100);
    setMapBoxCenter([center.x, -center.y - 0.5]);
  }, []);

  return (
    <mesh
      position={[...mapBoxCenter, 0]}
      ref={meshRef}
      scale={[40, 40, 40]}
      rotation={[-Math.PI * 0.5, 0, 0]}
    >
      <planeGeometry width={mapBoxWidth} height={mapBoxWidth} />
      <meshPhongMaterial
        map={textureMap}
        color={0x00ffff}
        transparent
        opacity={0.5}
      />
    </mesh>
  );
};

export default Button;
