import item1Img from "./landing-page-items/item1.svg";
import item2Img from "./landing-page-items/item2.svg";
import item3Img from "./landing-page-items/item3.svg";
import item4Img from "./landing-page-items/item4.svg";
import item5Img from "./landing-page-items/item5.svg";
import item6Img from "./landing-page-items/item6.svg";
import item7Img from "./landing-page-items/item7.svg";
import item8Img from "./landing-page-items/item8.svg";
import { Button } from "@chakra-ui/react";
import { Box, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const section1Item = [
  {
    name: "item1",
    size: "w-[6.375rem] h-[17.375rem] shrink-0",
    imgUrl: item1Img,
  },
  {
    name: "item2",
    size: "w-[8.9375rem] h-[20.875rem] shrink-0",
    imgUrl: item2Img,
  },
  {
    name: "item3",
    size: "w-[8.4375rem] h-[18.4375rem] shrink-0",
    imgUrl: item3Img,
  },
  {
    name: "item4",
    size: "w-[5.5625rem] h-[19.6875rem] shrink-0",
    imgUrl: item4Img,
  },
  {
    name: "item5",
    size: "w-[5.5rem] h-[21.625rem] shrink-0",
    imgUrl: item5Img,
  },
  {
    name: "item6",
    size: "w-[8.0625rem] h-[20.375rem] shrink-0",
    imgUrl: item6Img,
  },
  {
    name: "item7",
    size: "w-[6.375rem] h-[17.9375rem] shrink-0",
    imgUrl: item7Img,
  },
  { name: "item8", size: "w-[7.875rem] h-[20rem] shrink-0", imgUrl: item8Img },
];

function Section1() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap="2rem"
      padding="2rem 11.625rem 4rem 11.625rem"
      backgroundColor="#F5F5F6"
    >
      <Box
        textAlign="center"
        fontSize="3.8125rem"
        fontStyle="normal"
        fontWeight="300"
        lineHeight="normal"
        letterSpacing="-0.02rem"
      >
        The place where <br /> you get{" "}
        <span className=" text-[#F48FB1] ">that</span> job{" "}
      </Box>
      <Box
        textAlign="center"
        fontSize="1.5rem"
        fontStyle="normal"
        fontWeight="400"
        lineHeight="normal"
      >
        With our Machine Learning algorithm you will get that job <br />
        in no time. We promise you! Just give us the money and we <br />
        will take care of it.
      </Box>
      <Link to="/register">
        <Button
          bg="#F48FB1"
          textAlign="center"
          textColor="white"
          fontSize="0.875rem"
          fontStyle="normal"
          fontWeight="500"
          lineHeight="1.5rem"
          letterSpacing="0.07813rem"
          padding="1rem 1.5rem"
          borderRadius="1rem"
        >
          CREATE AN ACCOUNT NOW
        </Button>
      </Link>
      <Flex align="flex-end" gap="1rem">
        {section1Item.map((item) => (
          <div key={item.name} className={item.size}>
            {" "}
            <img src={item.imgUrl} alt={item.name} />{" "}
          </div>
        ))}
      </Flex>
    </Box>
  );
}

export default Section1;
