import { useState } from "react";

const _switchStyles = {
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
interface FormControlSwitchProps {
  onChange: (value: boolean) => void;
  defaultChecked?: boolean;
}

function FormControlSwitch({ onChange, defaultChecked }: FormControlSwitchProps) {
  const [isOn, setIsOn] = useState(defaultChecked ?? false);

  const toggleSwitch = () => {
    const newCheckedState = !isOn;
    setIsOn(newCheckedState);
    onChange?.(newCheckedState);
  };

  return (
    <label>
      <button onClick={toggleSwitch} style={{ backgroundColor: isOn ? "green" : "white" }}>
        <div
          key="switch"
          style={{ ..._switchStyles.switch, backgroundColor: isOn ? "green" : "grey" }}
        >
          {isOn ? "✔️" : "❌"}
        </div>
      </button>
    </label>
  );
}
export { FormControlSwitch };
