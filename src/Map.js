import React, { useRef, useMemo } from "react";
import * as d3 from "d3";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js";
import useConversionStandardData from "./hooks/useConversionStandardData";
import useCountry from "./hooks/useCountry";
import Circle from "./components/Circle";
import CircleOut from "./components/CircleOut";
import Base from "./components/Base";
import Bottom from "./components/Bottom";
import BottomBg from "./components/BottomBg";
import Mid from "./components/Mid";
import Top from "./components/Top";
import Line from "./components/line";

const Map = () => {
  const mapGroup = useRef(null);
  const { transfromGeoJSON } = useConversionStandardData();
  const { createLine } = useCountry();
  let center = [104.071216, 30.673238];
  const projection = d3.geoMercator().center(center).translate([0, 0]);

  // 加载地图JSON数据
  const provinceData = useLoader(THREE.FileLoader, "./data/map/sichuan.json");
  const data = transfromGeoJSON(JSON.parse(provinceData));

  const maps = useMemo(() => {
    const map = new THREE.Object3D();
    const lineGroup = new THREE.Group();
    let materialOpt = {
      color: 0xffffff,
      linewidth: 0.0015,
      transparent: true,
      depthTest: false,
    };
    let lineMaterial = new LineMaterial(materialOpt);

    data.features.forEach((element) => {
      const province = new THREE.Object3D();
      const coordinates = element.geometry.coordinates;

      coordinates.forEach((multiPolygon) => {
        multiPolygon.forEach((polygon) => {
          const shape = new THREE.Shape();

          const vertices = [];
          // 绘制shape
          for (let i = 0; i < polygon.length; i++) {
            let [x, y] = projection(polygon[i]);
            if (i === 0) {
              shape.moveTo(x, -y);
            }
            shape.lineTo(x, -y);
            vertices.push(x, -y, 0);
          }
          // 根据每一块的点数据创建线条
          let line = createLine(vertices, lineMaterial, "Line2");
          lineGroup.add(line);

          const extrudeSettings = {
            depth: 0.06,
            bevelEnabled: true,
            // bevelSegments: 1,
            // bevelThickness: 0.1,
          };
          const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
          const material = new THREE.MeshBasicMaterial();
          const material1 = new THREE.MeshBasicMaterial();
          const mesh = new THREE.Mesh(geometry, [material, material1]);
          province.add(mesh);
        });
      });

      province.properties = element.properties;
      if (element.properties.contorid) {
        const [x, y] = projection(element.properties.contorid);
        province.properties._centroid = [x, y];
      }

      map.add(province);
    });
    return {
      map,
      lineGroup,
    };
  }, []);

  return (
    <group ref={mapGroup}>
      <Line lineGroup={maps.lineGroup} />
      <Base blocks={maps.map.children} />
      <Mid blocks={maps.map.children} />
      <Top blocks={maps.map.children} mapCenter={center} />
      <Circle />
      <CircleOut />
      <Bottom />
      <BottomBg />
    </group>
  );
};

export default Map;
