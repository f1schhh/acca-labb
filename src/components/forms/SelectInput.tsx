import Select from "@mui/material/Select";
import { SelectProps } from "@mui/material/Select";

const SelectInput: React.FC<SelectProps> = (props) => {
  const { children, ...rest } = props;

  return (
    <Select
      {...rest}
      sx={{
        width: "100%",
      }}
    >
      {children}
    </Select>
  );
};

export default SelectInput;
