import { Text } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";

function Footer() {
  return (
    <Box
      display="flex"
      padding="0rem 7.5rem"
      flexDirection="column"
      alignItems="flex-start"
      backgroundColor="#E1E2E1"
    >
      <Text
        display="flex"
        width="75rem"
        padding="1rem 1.9375rem"
        justifyContent="space-between"
        alignItems="flex-start"
        fontSize="0.875rem"
        fontStyle="normal"
        fontWeight="500"
        lineHeight="1.125rem"
        letterSpacing="0.00625rem"
        color="#373737"
      >
        © 2021 - Get That Job
      </Text>
    </Box>
  );
}
export default Footer;
