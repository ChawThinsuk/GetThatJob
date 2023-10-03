import { Text } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";

function Footer() {
  return (
    <>
      <Box
        display="flex"
        padding="0rem 7.5rem"
        flexDirection="column"
        alignItems="center"
        backgroundColor="#E1E2E1"
        textAlign="center"
      >
        <Text
          display="flex"
          width="75rem"
          padding="1rem 1.9375rem"
          justifyContent="center"
          alignItems="center"
          fontSize="0.875rem"
          fontStyle="normal"
          fontFamily="Montserrat"        >
          © 2021 - Get That Job
        </Text>
      </Box>
    </>
  );
}
export default Footer;
