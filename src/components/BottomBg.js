import React, { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import useCoord from "../hooks/useCoord";
import { useLoader } from "@react-three/fiber";

const ButtonBg = () => {
  const meshRef = useRef(null);
  const [mapBoxWidth, setMapBoxWidth] = useState(0);
  const [mapBoxCenter, setMapBoxCenter] = useState([0, 0]);
  const textureMap = useLoader(THREE.TextureLoader, "./data/map/scene-bg2.png");
  const { getBoundingBox } = useCoord();

  useEffect(() => {
    let earthGroupBound = getBoundingBox(meshRef.current.parent);
    let { size, center } = earthGroupBound;
    let width = size.x < size.y ? size.y + 1 : size.x + 1;
    setMapBoxWidth(width * 100);
    setMapBoxCenter([center.x, -center.y - 0.1]);
  }, []);

  return (
    <mesh
      position={[...mapBoxCenter, 0]}
      ref={meshRef}
      scale={[75, 75, 75]}
      rotation={[-Math.PI * 0.5, 0, 0]}
    >
      <planeGeometry width={mapBoxWidth} height={mapBoxWidth} />
      <meshPhongMaterial
        map={textureMap}
        color={0xffffff}
        transparent
        opacity={1}
        depthst
      />
    </mesh>
  );
};

export default ButtonBg;
