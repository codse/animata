import { useState } from "react";

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

interface ToggleSwitchProps {
  onChange: (value: boolean) => void;
  defaultChecked?: boolean;
}
function FormControlSwitch({ onChange, defaultChecked }: ToggleSwitchProps) {
  const [isOn, setIsOn] = useState(defaultChecked ?? false);
  const handleToggleSwitch = () => {
    const newCheckedState = !isOn;
    setIsOn(newCheckedState);
    onChange?.(newCheckedState);
  };
  return (
    <button onClick={handleToggleSwitch} style={{ backgroundColor: isOn ? "green" : "white" }}>
      <div key="switch" style={{ ...styles.switch, backgroundColor: isOn ? "green" : "grey" }}>
        {isOn ? "✔️" : "❌"}
      </div>
    </button>
  );
}

export { FormControlSwitch };
