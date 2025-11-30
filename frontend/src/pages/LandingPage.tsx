import { Box, Button, Heading, Text, Flex, Badge } from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // same behavior: logged-in users go straight to dashboard
  if (user) return <Navigate to="/dashboard" />;

  return (
    <Flex
      minH="100vh"
      bg="white"
      direction={{ base: "row", md: "column" }}
      gap={5}
      px={{ base: 4, md: 10 }}
      py={5}
    >
      {/* Top nav */}
      <Flex as="header" h="64px" align="center" justify="space-between">
        {/* Logo */}
        <Flex align="center" gap={2}>
          <Box
            w="9"
            h="9"
            borderRadius="xl"
            bg="white"
            boxShadow="md"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box
              w="5"
              h="5"
              borderRadius="md"
              bg="gray.900"
              display="flex"
              alignItems="center"
              justifyContent="center"
              position="relative"
              _before={{
                content: '""',
                position: "absolute",
                w: "1.5",
                h: "1.5",
                borderRadius: "full",
                bg: "teal.400",
                top: "1",
                left: "1",
              }}
            />
          </Box>
          <Heading size="md">Stride</Heading>
        </Flex>

        {/* Fake nav links */}
        <Flex
          as="nav"
          align="center"
          gap={6}
          fontSize="sm"
          display={{ base: "none", md: "flex" }}
        >
          <Text color="gray.600">Features</Text>
          <Text color="gray.600">Planner</Text>
          <Text color="gray.600">Resources</Text>
          <Text color="gray.600">Pricing</Text>
        </Flex>

        {/* Auth buttons */}
        <Flex align="center" gap={3}>
          <Button variant="ghost" size="sm" onClick={() => navigate("/login")}>
            Sign in
          </Button>
          <Button
            size="sm"
            colorScheme="teal"
            onClick={() => navigate("/signup")}
          >
            Get started
          </Button>
        </Flex>
      </Flex>

      {/* HERO SECTION */}
      <Flex
        as="main"
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="center"
        gap={{ base: 12, md: 16 }}
        textAlign="center"
        minH={"100%"}
        minW={"100%"}
      >
        {/* Left side: big hero text & CTA */}
        <Flex
          direction="column"
          gap={5}
          align="center"
          minW="70%"
          minH={"90%"}
          borderRadius="3xl"
          bgGradient="linear(to-b, gray.50, gray.100)"
          boxShadow="lg"
          mt={{ base: 10, md: 10 }}
          mb={{ base: 10, md: 10 }}
          px={{ base: 4, md: 200 }}
          py={{ base: 4, md: 75 }}
        >
          <Badge
            colorScheme="teal"
            borderRadius="full"
            px={4}
            py={1}
            fontSize="xs"
            mb={4}
          >
            Study smarter, not harder
          </Badge>
          <Box>
            <Heading
              fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
              lineHeight="1.1"
              mb={2}
            >
              Think, plan, and track
            </Heading>

            <Heading
              fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
              fontWeight="semibold"
              color="gray.500"
              mb={4}
            >
              all in one place
            </Heading>
          </Box>
          <Text
            fontSize={{ base: "md", md: "lg" }}
            color="gray.600"
            mb={6}
            maxW="520px"
          >
            Efficiently manage your study tasks, revision sessions, and exams
            with a planner built for focus and consistency.
          </Text>

          <Button
            colorScheme="teal"
            size="lg"
            px={10}
            onClick={() => navigate("/signup")}
          >
            Get Started
          </Button>

          <Flex mt={6} gap={2} align="center" justify="center" color="gray.500">
            <Box w="2" h="2" borderRadius="full" bg="teal.400" />
            <Text fontSize="sm">
              Stay ahead of deadlines with a clear plan.
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
