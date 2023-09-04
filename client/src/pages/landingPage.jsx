import Navbar from "../components/navbar";
import item1Img from "../assets/landing-page-items/item1.svg";
import item2Img from "../assets/landing-page-items/item2.svg";
import item3Img from "../assets/landing-page-items/item3.svg";
import item4Img from "../assets/landing-page-items/item4.svg";
import item5Img from "../assets/landing-page-items/item5.svg";
import item6Img from "../assets/landing-page-items/item6.svg";
import item7Img from "../assets/landing-page-items/item7.svg";
import item8Img from "../assets/landing-page-items/item8.svg";
import githubIcon from "../assets/GithubIcn.svg";
import linkedInIcon from "../assets/LinkedIcn.svg";

const section2Item = [
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
const teamMember = [
  {
    name: "Akkapol Aoo",
    github: "https://github.com/mrakkapol",
    linkedin: "https://www.linkedin.com/in/akkapol-l-057a5a287/",
  },
  {
    name: "Benjakul Ta",
    github: "https://github.com/NeonTas06",
    linkedin: "https://www.linkedin.com/in/benjakul-kaeoseekhao-55a099145/",
  },
  {
    name: "Siripoom Phun",
    github: "https://github.com/Sealproton?tab=repositories",
    linkedin: "https://www.linkedin.com/in/siripoom-luengsrisakul-05b64b276/",
  },
  {
    name: "Mueangcho Chaw",
    github: "https://github.com/ChawThinsuk",
    linkedin: "https://www.linkedin.com/in/mueangcho-thinsuk/",
  },
  {
    name: "Pakorn Big",
    github: "https://github.com/PakornBig",
    linkedin: "https://www.linkedin.com/in/pakorn-semapongpun-4095ba288/",
  },
];

function LandingPage() {
  return <Navbar />;
}
// test
export default LandingPage;
