import React, { useRef, useState } from "react";
import { Text3D } from "@react-three/drei";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import dataValue from "../assets/data.json";
import { gsap } from "gsap";
import Flylines from "./FlyLines";

const Top = ({ blocks, mapCenter }) => {
  const blocksRef = useRef([]);
  const namesRef = useRef([]);
  const [lines, setLines] = useState({ children: [] });

  const textureMap = useLoader(THREE.TextureLoader, "./data/map/gz-map.jpg");
  const texturefxMap = useLoader(
    THREE.TextureLoader,
    "./data/map/gz-map-fx.jpg"
  );

  textureMap.wrapS = texturefxMap.wrapS = THREE.RepeatWrapping;
  textureMap.wrapT = texturefxMap.wrapT = THREE.RepeatWrapping;
  textureMap.flipY = texturefxMap.flipY = false;
  textureMap.rotation = texturefxMap.rotation = THREE.MathUtils.degToRad(45);

  const scale = 0.1;
  const baseHeight = 0.2;
  const midHeightScale = 4;
  const topHeightScale = 0.01;

  textureMap.repeat.set(scale, scale);
  texturefxMap.repeat.set(scale, scale);
  const config = {
    color: 0x123024,
    clearcoat: 0,
    reflectivity: 0,
    ior: 1.3,
  };

  const textConfig = {
    curveSegments: 32,
    bevelEnabled: true,
    bevelSize: 0,
    bevelThickness: 0,
    height: 0.02,
    letterSpacing: 0,
    size: 0.25,
  };

  const handleFirstClick = (index) => {
    let tempArr = [];
    blocks.forEach((block, i) => {
      if (i !== index) {
        const startX =
          (blocks[index].properties.center[0] - mapCenter[0]) * 2.2;
        const startZ =
          -(blocks[index].properties.center[1] - mapCenter[1]) * 2.2;
        const endX = (block.properties.center[0] - mapCenter[0]) * 2.2;
        const endZ = -(block.properties.center[1] - mapCenter[1]) * 2.2;
        tempArr.push({
          start: [
            startX,
            baseHeight * (1 + midHeightScale + topHeightScale) + 1,
            startZ,
          ],
          end: [
            endX,
            baseHeight * (1 + midHeightScale + topHeightScale) + 0.3,
            endZ,
          ],
          mid: [
            startX + (endX - startX) / 5,
            baseHeight * (1 + midHeightScale + topHeightScale) + 5,
            startZ + (endZ - startZ) / 5,
          ],
        });
      }
    });
    setLines({ children: [...tempArr] });
  };

  const handleClick = (e, index) => {
    e.stopPropagation();
    if (blocksRef.current[index].scale.z == 1.8) {
      setLines({ children: [] });
      gsap.to(blocksRef.current[index].scale, { duration: 0.3, z: 0.01 });
      namesRef.current[index].material.opacity = 1;
      blocksRef.current[index].material.color = new THREE.Color(0xb4eeea);
    } else {
      handleFirstClick(index);
      gsap.to(blocksRef.current[index].scale, { duration: 0.3, z: 1.8 });
      blocksRef.current[index].material.color = new THREE.Color("#ffb47e");
      namesRef.current[index].material.opacity = 0;
    }
  };
  return (
    <>
      <Flylines lines={lines} />
      {/* 城市名称 */}
      {/* 点击后的城市maker */}
      <group
        rotation={[0, Math.PI * 1.1, Math.PI]}
        position-y={0.2 + 0.8 + 0.01}
        position-x={3.3}
      >
        {blocks.map((item, index) => {
          return (
            <group key={"city_" + index}>
              <Text3D
                ref={(el) => {
                  namesRef.current[index] = el;
                }}
                font={"./data/map/MFTianLiNoncommercial_Regular.json"}
                position={[
                  (item.properties.center[0] - mapCenter[0]) * 3.2,
                  -0.5,
                  (item.properties.center[1] - mapCenter[1]) * 3.2,
                ]}
                rotation={[-Math.PI * 0.5, Math.PI, Math.PI]}
                {...textConfig}
              >
                {item.properties.name}
                <meshBasicMaterial color={"#ef1c3c"} transparent />
              </Text3D>
            </group>
          );
        })}
      </group>
      <group
        rotation={[-Math.PI * 0.5, 0, Math.PI * 0.09]}
        position-y={0.2 + 1.2 + 0.01}
        position-x={4}
      >
        {blocks.map((item, index) => (
          <group key={"top_" + index}>
            <mesh
              scale={[1, 1, 0.01]}
              geometry={blocks[index].children[0].geometry}
              ref={(el) => {
                blocksRef.current[index] = el;
              }}
              onClick={(e) => handleClick(e, index)}
            >
              <meshPhongMaterial
                map={textureMap}
                color={0xb4eeea}
                combine={THREE.MultiplyOperation}
                transparent={true}
                opacity={1}
              />
            </mesh>
          </group>
        ))}
      </group>
    </>
  );
};

export default Top;
