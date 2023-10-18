import { MeshTransmissionMaterial } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as BufferGeometryUtils from "three/addons/utils/BufferGeometryUtils.js";

const Mid = ({ blocks }) => {
  const geometries = blocks.map((item) => item.children[0].geometry);
  const merged = useMemo(
    () => BufferGeometryUtils.mergeBufferGeometries(geometries),
    [geometries]
  );

  return (
    <group
      rotation={[-Math.PI * 0.5, 0, Math.PI * 0.09]}
      position-y={0.2 + 0.1}
      scale={[1, 1, 4]}
      position-x={4}
    >
      <mesh geometry={merged}>
        <meshPhysicalMaterial color="#77daaa" transparent opacity={0.8} />
      </mesh>
    </group>
  );
};

export default Mid;
