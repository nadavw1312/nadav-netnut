import { Box, Typography, useTheme } from '@mui/material';
import Image from 'next/image';

const ThankYou = () => {
  const theme = useTheme();

  return (
    <Box height={"100%"} display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"} textAlign="center">
      <Image
                    src="/icons/icon-thank-you.svg"
                    alt={`thank-you`}
                    width={80}
                    height={80}
                  />
      <Typography variant="h5" gutterBottom>
        Thank You!
      </Typography>
      <Typography variant="body2" color= {theme.palette.text.secondary}>Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com.</Typography>
    </Box>
  );
};

export default ThankYou;
