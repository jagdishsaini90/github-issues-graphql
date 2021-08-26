import React from "react";
import Chip from "@material-ui/core/Chip";

interface Props {
  name: string;
  color: string;
}

const Label: React.FC<Props> = ({ name, color }: Props) => {
  return (
    <Chip
      label={name}
      style={{
        backgroundColor: `#${color}`,
        borderColor: `#${color}`,
        borderRadius: "10px",
        padding: 0,
        fontSize: "10px",
        marginLeft: "2px",
        height: "22px",
        display: "flex",
      }}
    />
  );
};

export default Label;
