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
    width: 40,
    height: 40,
    borderRadius: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "background-color 0.3s ease",
    cursor: "pointer",
    border: "none",
    outline: "none",
    padding: 8,
    margin: 4,
  },
};
