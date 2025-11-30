import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";

const DashboardPage = () => {
  const { user, logout } = useAuth();

  return (
    <Box minH="100vh" bg="gray.50" p={4}>
      <Box maxW="4xl" mx="auto" mt={8}>
        <VStack align="stretch" gap={6}>
          <Box
            bg="white"
            p={6}
            borderRadius="lg"
            boxShadow="sm"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Heading size="md">Welcome, {user?.name}</Heading>
              <Text fontSize="sm" color="gray.600">
                {user?.email} · {user?.profession || "Learner"} ·{" "}
                {user?.timezone || "Timezone not set"}
              </Text>
            </Box>
            <Button variant="outline" colorScheme="red" onClick={logout}>
              Logout
            </Button>
          </Box>

          <Box bg="white" p={6} borderRadius="lg" boxShadow="sm">
            <Heading size="sm" mb={2}>
              Today&apos;s Tasks
            </Heading>
            <Text fontSize="sm" color="gray.600">
              This is where your study routines and tasks will appear. We&apos;ll
              build this next.
            </Text>
          </Box>
        </VStack>
      </Box>
    </Box>
  );
};

export default DashboardPage;
