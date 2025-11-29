import { useEffect, useState } from "react";
import { Box, Heading, Text, Button, VStack } from "@chakra-ui/react";

function App() {
  const [apiStatus, setApiStatus] = useState<string>("Loading...");

  useEffect(() => {
    // Adjust URL if needed (we'll set env soon)
    fetch(import.meta.env.VITE_API_URL + "/api/health")
      .then((res) => res.json())
      .then((data) => setApiStatus(data.message))
      .catch(() => setApiStatus("Failed to reach backend"));
  }, []);

  return (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center" bg="gray.50">
      <VStack  p={8} borderRadius="lg" boxShadow="md" bg="white">
        <Heading size="lg">Study Planner v1</Heading>
        <Text fontSize="md">Backend status: {apiStatus}</Text>
        <Button colorScheme="teal">This will become Login later</Button>
      </VStack>
    </Box>
  );
}

export default App;
