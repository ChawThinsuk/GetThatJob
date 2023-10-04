import { Box } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import targetImg from "./landing-page-items/target.svg";
import { Text } from "@chakra-ui/react";

function Section2() {
  return (
    <Box display="flex" justifyContent="center">
      <Box
        display="flex"
        flexDirection="column"
        backgroundColor="#BF5F82"
        width="1173.39px"
        height="29.5rem"
        padding="4rem 7.5rem"
        justifyContent="center"
        flexShrink="0"
        gap="1.5rem"
        alignItems="flex-start"
        fontFamily="Montserrat"
        marginLeft="-16"
      >
        <Text
          color="white"
          fontSize="48px"
          fontStyle="normal"
          fontWeight="400"
          lineHeight="normal"
        >
          Find your next job
        </Text>
        <Text
          color="white"
          fontSize="24px"
          fontStyle="normal"
          fontWeight="400"
          lineHeight="normal"
        >
          Our Machine learning algorithm is so good that it’s even illegal in
          some countries. Join us to use our barelly legal algorithm that is
          actually a group of interns that work on our basement.
        </Text>
        <Text
          color="white"
          fontSize="1.5rem"
          fontStyle="normal"
          fontWeight="400"
          lineHeight="normal"
        >
          We have a job for you, no matter your background or previous
          experience. Is sending random memes through chat your only skill?
          That’s ok, we got you, our Rock Star Meme Curator role is here for
          you.
        </Text>
      </Box>
      <Image
        src={targetImg}
        width="684.7px"
        height="472px"
        padding=" 7.1875rem 7.0625rem 7.1875rem 7rem"
        justifyContent="center"
        alignItems="center"
        flexShrink="0"
        backgroundColor="white"
      ></Image>
    </Box>
  );
}

export default Section2;
