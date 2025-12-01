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
      data-testid="signup-page"
    >
      <Box
        maxW="md"
        w="100%"
        p={8}
        bg="white"
        boxShadow="lg"
        borderRadius="lg"
        data-testid="signup-card"
      >
        <VStack gap={6} align="stretch">
          <Heading size="lg" textAlign="center" data-testid="signup-heading">
            Create your Study Planner account
          </Heading>
          <form onSubmit={handleSubmit} data-testid="signup-form">
            <VStack gap={4} align="stretch">
              <FormControl id="name" isRequired>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  data-testid="signup-name-input"
                />
              </FormControl>

              <FormControl id="email" isRequired>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  data-testid="signup-email-input"
                />
              </FormControl>

              <FormControl id="profession">
                <FormLabel htmlFor="profession">Profession</FormLabel>
                <Input
                  id="profession"
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                  placeholder="Student, Developer, etc."
                  data-testid="signup-profession-input"
                />
              </FormControl>

              <FormControl id="timezone">
                <FormLabel htmlFor="timezone">Timezone</FormLabel>
                <select
                  id="timezone"
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  style={{
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid #CBD5E0",
                  }}
                  data-testid="signup-timezone-select"
                >
                  <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                  {/* later: add more timezones */}
                </select>
              </FormControl>

              <FormControl id="password" isRequired>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  data-testid="signup-password-input"
                />
              </FormControl>

              <Button
                type="submit"
                colorScheme="teal"
                w="full"
                loading={submitting}
                loadingText="Creating account..."
                data-testid="signup-submit-btn"
              >
                Sign up
              </Button>
            </VStack>
          </form>
          <Text fontSize="sm" textAlign="center">
            Already have an account?{" "}
            <RouterLink
              to="/login"
              style={{ color: "#319795" }}
              data-testid="signup-login-link"
            >
              Log In
            </RouterLink>
          </Text>
        </VStack>
      </Box>
    </Box>
  );
};

export default SignupPage;
