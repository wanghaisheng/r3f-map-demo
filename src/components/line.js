import React, { useRef, useEffect } from "react";

const Line = ({ lineGroup }) => {
  const lineRef = useRef(null);

  useEffect(() => {
    if (lineRef.current) {
      lineRef.current.add(lineGroup);
    }
  }, [lineGroup]);
  return (
    <group
      rotation={[-Math.PI * 0.5, 0, Math.PI * 0.09]}
      position-y={0.22 + 1.2 + 0.01}
      position-x={4}
      ref={lineRef}
    ></group>
  );
};

export default Line;
