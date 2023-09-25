import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  components: {
    Radio: {
      baseStyle: {
        control: {
          _checked: {
            borderColor: "#F48FB1",
            backgroundColor: "#F48FB1",
          },
        },
      },
    },
  },
});
// const theme = extendTheme({
//   components: {
//     Radio: {
//       defaultProps: {
//         colorScheme: "customRadio1",
//       },
//     },
//   },
//   colors: {
//     customRadio1: {
//       500: "#F48FB1",
//     },
//     customRadio2: {
//       500: "#FFC1E3",
//     },
//   },
// });

export default theme;
