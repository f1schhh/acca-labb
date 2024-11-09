import Select, { SelectChangeEvent } from "@mui/material/Select";
import { SelectProps } from "@mui/material/Select";
import { useState } from "react";

const SelectInput: React.FC<SelectProps> = (props) => {
  const { children, defaultValue, ...rest } = props;
  const [selectedValue, setSelectedValue] = useState(defaultValue || "");

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    setSelectedValue(event.target.value as string);
  };

  return (
    <Select
      value={selectedValue}
      onChange={handleChange}
      {...rest}
      sx={{ width: "100%" }}
    >
      {children}
    </Select>
  );
};

export default SelectInput;
