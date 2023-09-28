import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Icon,
  Input,
  Select,
  InputGroup,
  InputLeftElement
} from "@chakra-ui/react";
import Flag from "react-world-flags";
import { AsYouType } from "libphonenumber-js";
import { getCountryTelCode } from "./countries";
import { PhoneIcon } from "@chakra-ui/icons";
import CCIcon from "../../../assets/phone-line.svg"

export default function PhoneNumberInput({
  size,
  value,
  country,
  options,
  onChange,
  placeholder,
  ...rest
}) {
  let [number, setNumber] = useState(value || "");
  let [selectedCountry, setSelectedCountry] = useState(country || "");
  let [countryCode, setCountryCode] = useState(
    getCountryTelCode(country) || ""
  );

  useEffect(() => {
    setSelectedCountry(country);
    setCountryCode(getCountryTelCode(country));
  }, [country]);

  const onCountryChange = e => {
    let value = e.target.value;
    let code = getCountryTelCode(value);
    let parsedNumber = new AsYouType().input(`${code}${number}`);

    setCountryCode(code);
    setSelectedCountry(value);
    onChange(parsedNumber);
  };

  const onPhoneNumberChange = e => {
    let value = e.target.value;
    let parsedNumber = new AsYouType().input(`${countryCode}${value}`);

    setNumber(value);
    onChange(parsedNumber);
  };

  return (
    <InputGroup size={size} {...rest}>
      <InputLeftElement width="5rem">
        <Select
          top="0"
          left="0"
          zIndex={1}
          bottom={0}
          opacity={0}
          height="100%"
          position="absolute"
          value={selectedCountry}
          onChange={onCountryChange}
        >
          <option value="" />
          {options.map(option => (
            <option value={option.value}>{option.label}</option>
          ))}
        </Select>
        <Flex p={3} pr={8}  width="100%" alignItems="center">
          {selectedCountry ? (
            <Box m="2px" width="50%" flex={2}>
              <Flag height="35px" width="35px"  code={selectedCountry || ""} />
            </Box>
          ) : (
           <img src={CCIcon} alt="" width={30} />
          )}
          
        </Flex>
      </InputLeftElement>
      <Input

        pl="5rem"
        type="tel"
        value={number}
        pattern="[0-9]"
        placeholder={placeholder}
        onChange={onPhoneNumberChange}
      />
    </InputGroup>
  );
}

PhoneNumberInput.defaultProps = {
  options: [],
  size: "md"
};
