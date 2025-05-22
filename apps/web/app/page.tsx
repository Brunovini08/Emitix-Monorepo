import { Box } from "@mui/material";
import { ResourcesSection } from "../components/ResourcesSection/ResourcesSection";
import { Section } from "../components/Section/Section";

export default function Home() {
  return (
    <Box
      sx={{
        width: "100%",
        alignItems: "center"
      }}
    >
      <Section />
      <ResourcesSection />
    </Box>
  );
}
