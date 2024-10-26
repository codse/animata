import React, { useState } from "react";
export default function FormControlSwitch() {
  const [isOn, setIsOn] = useState(false);
  const toggleSwitch = () => {
    setIsOn(!isOn);
  };
  return (
    <button onClick={toggleSwitch} style={{ backgroundColor: isOn ? "green" : "red" }}>
      <div style={{ ...styles.switch, backgroundColor: isOn ? "green" : "grey" }}>
        {isOn ? "✔️" : "❌"}
      </div>
    </button>
  );
}
const styles = {
  switch: {
    width: 20,
    height: 20,
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};
