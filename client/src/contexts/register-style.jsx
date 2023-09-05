import React, { createContext, useContext } from "react";

const CustomTextStyleContext = createContext();

const customTextStyle = {
  fontFamily: "Inter",
  fontSize: "10px",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "normal",
  letterSpacing: "1.5px",
  textTransform: "uppercase",
};

function CustomTextComponent() {
  const textStyle = useContext(CustomTextStyleContext);

  return <Box sx={textStyle}>This text will have the specified styles.</Box>;
}

export default MyComponent;
