import * as THREE from "three";
import { Line2 } from "three/examples/jsm/lines/Line2.js";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry.js";

const useCountryLine = () => {
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

  return { createLine };
};

export default useCountryLine;
