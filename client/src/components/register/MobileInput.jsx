import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { Box, Heading, ChakraProvider, CSSReset, Text } from "@chakra-ui/react";
import { useGlobalContext } from "../../contexts/registerContext.jsx";
import PhoneNumberInput from "./mobileInput/PhoneNumInput";
import { COUNTRIES } from "./mobileInput/countries";

function MobileInput() {
  const countryOptions = COUNTRIES.map(({ name, iso }) => ({
    label: name,
    value: iso
  }));
  const {
    phone,
    setPhone
  } = useGlobalContext();

  return (
    <ChakraProvider>
      <Box>
        <Text pb="8px">Value: {phone}</Text>
        <PhoneNumberInput
        borderColor="#F48FB1"
        focusBorderColor="#F48FB1"
          mr={8}
          value={phone}
          options={countryOptions}
          placeholder="Enter phone number"
          onChange={phone => setPhone(phone)}
        />
      </Box>
    </ChakraProvider>
  );
}

export default MobileInput