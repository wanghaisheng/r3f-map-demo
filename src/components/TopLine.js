import { MeshTransmissionMaterial } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as BufferGeometryUtils from "three/addons/utils/BufferGeometryUtils.js";
import * as THREE from "three";
import { Line2 } from "three/examples/jsm/lines/Line2.js";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry.js";

const TopLine = ({ data }) => {
  const lineGroupRef = useRef(null);
  let features = data.features;

  /**
   * 根据点数据创建闭合的线条
   * @param {*} points 点数据
   * @param {*} material 材质
   * @param {*} lineType 生成的线条类型 Line 线 | LineLoop 环线 | LineSegments 线段 | Line2
   * @returns
   */
  const createLine = (points, material, lineType = "LineLoop") => {
    let line = null;
    if (lineType === "Line2") {
      const geometry = new LineGeometry();
      geometry.setPositions(points);
      line = new Line2(geometry, material);
      line.name = "countryLine2";
      line.computeLineDistances();
      // console.log(line, geometry, material)
    } else {
      const geometry = new THREE.BufferGeometry();
      geometry.setFromPoints(points);
      line = new THREE[lineType](geometry, material);
      line.name = "countryLine";
    }
    return line;
  };

  const line = useMemo(() => {
    let materialOpt = {
      color: 0xffffff,
      linewidth: 0.0015,
      transparent: true,
      depthTest: false,
    };
    let material = new LineMaterial(materialOpt);
    let lineGroup = new THREE.Group();

    for (let i = 0; i < features.length; i++) {
      const element = features[i];
      element.geometry.coordinates.forEach((coords, idx) => {
        // 每一块的点数据
        const points = [];
        coords[0].forEach((item) => {
          points.push(item[0], item[1], 0);
        });

        // 根据每一块的点数据创建线条
        let line = createLine(points, material, "Line2");

        // 将线条插入到组中
        // if (i === 0 && idx === 0) {
        // }
        lineGroup.add(line);
      });
    }

    console.log("lineGroup", lineGroup);

    // lineGroupRef.current.add(lineGroup);

    return lineGroup;
  }, []);

  useEffect(() => {
    if (lineGroupRef.current) {
      lineGroupRef.current.add(line);
    }
  }, [line]);

  return (
    <group
      rotation={[-Math.PI * 0.5, 0, Math.PI * 0.09]}
      position-y={0.2 + 1.2 + 0.01}
      position-x={4}
      ref={lineGroupRef}
    ></group>
  );
};

export default TopLine;
