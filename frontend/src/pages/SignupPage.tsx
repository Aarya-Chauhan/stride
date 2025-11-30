import { useState } from "react";
import type { FormEvent } from "react";
import { Box, Button, Input, Heading, Text, VStack } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { useToast } from "@chakra-ui/toast";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link as RouterLink } from "react-router-dom";

const SignupPage = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profession, setProfession] = useState("");
  const [timezone, setTimezone] = useState("Asia/Kolkata");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await signup(name, email, password, timezone, profession);
      toast({
        title: "Account created",
        description: "Welcome to Study Planner!",
        status: "success",
        isClosable: true,
      });
      navigate("/dashboard");
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Signup failed",
        description:
          error?.response?.data?.message || "Please check your details",
        status: "error",
        isClosable: true,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.50"
      px={4}
    >
      <Box maxW="md" w="100%" p={8} bg="white" boxShadow="lg" borderRadius="lg">
        <VStack gap={6} align="stretch">
          <Heading size="lg" textAlign="center">
            Create your Study Planner account
          </Heading>
          <form onSubmit={handleSubmit}>
            <VStack gap={4} align="stretch">
              <FormControl id="name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />
              </FormControl>
              <FormControl id="profession">
                <FormLabel>Profession</FormLabel>
                <Input
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                  placeholder="Student, Developer, etc."
                />
              </FormControl>
              <FormControl id="timezone">
                <FormLabel>Timezone</FormLabel>
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  style={{
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid #CBD5E0",
                  }} // optional styling
                >
                  <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                  {/* later: add more timezones */}
                </select>
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </FormControl>
              <Button
                type="submit"
                colorScheme="teal"
                w="full"
                loading={submitting}
                loadingText="Creating account..."
              >
                Sign up
              </Button>
            </VStack>
          </form>
          <Text fontSize="sm" textAlign="center">
            Already have an account?{" "}
            <RouterLink to="/login" style={{ color: "#319795" }}>
              Log In
            </RouterLink>
          </Text>
        </VStack>
      </Box>
    </Box>
  );
};

export default SignupPage;
