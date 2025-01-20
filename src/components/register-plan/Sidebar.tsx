import { StepIndicator } from "./StepIndicator";
import { Box, useTheme } from "@mui/material";

interface SidebarProps {
    currentStep: number;
  }
  
export const Sidebar = ({ currentStep }: SidebarProps) => {
    const theme = useTheme();
    
    return (
      <Box
        sx={{
          width: { xs: "100%", sm: "35%" },
          bgcolor: theme.palette.primary.main,
          p: 4,
          backgroundImage: {
            xs: "url(/icons/bg-sidebar-mobile.svg)",
            sm: "url(/icons/bg-sidebar-desktop.svg)",
          },
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          position: { xs: "absolute", sm: "static" },
          height: { xs: "200px", sm: "100%" },
        }}
      >
        <StepIndicator currentStep={currentStep} />
      </Box>
    );
  };