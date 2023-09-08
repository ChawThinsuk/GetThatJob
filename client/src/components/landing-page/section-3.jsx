import githubIcon from "./landing-page-items/GithubIcn.svg";
import linkedInIcon from "./landing-page-items/LinkedIcn.svg";
import { Box, Flex } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import Paoo from "./landing-page-items/PAoo.jpg";
import Ta from "./landing-page-items/Taaa.jpg";
import Phun from "./landing-page-items/Phunn.jpg";
import Chaw from "./landing-page-items/Chaww.jpg";
import Bigg from "./landing-page-items/Bigg.jpg";

const teamMember = [
  {
    name: "Akkapol Aoo",
    github: "https://github.com/mrakkapol",
    linkedin: "https://www.linkedin.com/in/akkapol-l-057a5a287/",
    imgUrl: Paoo,
  },
  {
    name: "Benjakul Ta",
    github: "https://github.com/NeonTas06",
    linkedin: "https://www.linkedin.com/in/benjakul-kaeoseekhao-55a099145/",
    imgUrl: Ta,
  },
  {
    name: "Siripoom Phun",
    github: "https://github.com/Sealproton?tab=repositories",
    linkedin: "https://www.linkedin.com/in/siripoom-luengsrisakul-05b64b276/",
    imgUrl: Phun,
  },
  {
    name: "Mueangcho Chaw",
    github: "https://github.com/ChawThinsuk",
    linkedin: "https://www.linkedin.com/in/mueangcho-thinsuk/",
    imgUrl: Chaw,
  },
  {
    name: "Pakorn Big",
    github: "https://github.com/PakornBig",
    linkedin: "https://www.linkedin.com/in/pakorn-semapongpun-4095ba288/",
    imgUrl: Bigg,
  },
];

function Section3() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      padding="4rem 12rem"
      gap="2.5rem"
      backgroundColor="#E1E2E1"
    >
      <Text
        textAlign="center"
        fontSize="3rem"
        fontStyle="normal"
        fontWeight="400"
        lineHeight="normal"
        color="#BF5F82"
      >
        Meet the team
      </Text>
      <Flex display="flex" alignItems="flex-start">
        {teamMember.map((item) => (
          <Box
            key={item.name}
            display="flex"
            flexDirection="column"
            width="14rem"
            alignItems="center"
            gap="1rem"
          >
            <Image
              width="10rem"
              height="10rem"
              flexShrink="0"
              src={item.imgUrl}
              borderRadius="11.25rem"
            />
            <Text
              textAlign="center"
              fontSize="1.5rem"
              fontStyle="normal"
              fontWeight="400"
              lineHeight="normal"
            >
              {item.name}
            </Text>
            <Flex gap="2rem">
              <a href={item.github}>
                <Image src={githubIcon} />
              </a>
              <a href={item.linkedin}>
                <Image src={linkedInIcon} />
              </a>
            </Flex>
          </Box>
        ))}
      </Flex>
    </Box>
  );
}

export default Section3;
