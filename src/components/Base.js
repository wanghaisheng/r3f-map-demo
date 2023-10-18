import React, { useMemo } from "react";
import * as BufferGeometryUtils from "three/addons/utils/BufferGeometryUtils.js";
import { useLoader } from "@react-three/fiber";
import { Edges } from "@react-three/drei";
import * as THREE from "three";

const Base = ({ blocks }) => {
  const textureMap = useLoader(THREE.TextureLoader, "./data/map/baseBack.png");

  const geometries = blocks.map((item) => item.children[0].geometry);

  const merged = useMemo(
    () => BufferGeometryUtils.mergeGeometries(geometries),
    [geometries]
  );
  return (
    <group rotation={[-Math.PI * 0.5, 0, Math.PI * 0.09]} position-x={4}>
      <mesh geometry={merged}>
        <meshPhongMaterial
          map={textureMap}
          color={0xb4eeea}
          combine={THREE.MultiplyOperation}
          transparent={true}
          opacity={1}
        />
      </mesh>
    </group>
  );
};

export default Base;
