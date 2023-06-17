import { Typography, Box } from "@mui/material";
import { tokens } from "../theme";

const Header = ({ title, subtitle,onClick,underline}) => {
  const colors = tokens();
  return (
    <Box mb="30px">
      <Typography
        variant="h2"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
        {title}
      </Typography>
      {/* Only cursor in the login page */}
      <Typography variant="h5" style={subtitle == "didn't sign up yet? " ? {cursor:"pointer"}: {}} onClick={onClick} color={colors.greenAccent[400]}>
        {subtitle}
        <u>{underline}</u>
      </Typography>
    </Box>
  );
};

export default Header;
