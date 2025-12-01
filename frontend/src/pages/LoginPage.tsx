import { useState } from "react";
import type { FormEvent } from "react";
import { Box, Button, Heading, Text, VStack, Input } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { useToast } from "@chakra-ui/toast";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link as RouterLink } from "react-router-dom";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await login(email, password);
      toast({
        title: "Logged in",
        description: "Welcome back!",
        status: "success",
        isClosable: true,
      });
      navigate("/dashboard");
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Login failed",
        description:
          error?.response?.data?.message || "Invalid email or password",
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
      data-testid="login-page"
    >
      <Box
        maxW="md"
        w="100%"
        p={8}
        bg="white"
        boxShadow="lg"
        borderRadius="lg"
        data-testid="login-card"
      >
        <VStack gap={6} align="stretch">
          <Heading size="lg" textAlign="center" data-testid="login-heading">
            Log in to your account
          </Heading>

          <form onSubmit={handleSubmit} data-testid="login-form">
            <VStack gap={4} align="stretch">
              <FormControl id="email" isRequired>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  data-testid="login-email-input"
                />
              </FormControl>

              <FormControl id="password" isRequired>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  data-testid="login-password-input"
                />
              </FormControl>

              <Button
                type="submit"
                colorScheme="teal"
                w="full"
                loading={submitting}          // keep same style as SignupPage
                loadingText="Logging in..."
                data-testid="login-submit-btn"
              >
                Log in
              </Button>
            </VStack>
          </form>

          <Text fontSize="sm" textAlign="center">
            Don&apos;t have an account?{" "}
            <RouterLink
              to="/signup"
              style={{ color: "#319795" }}
              data-testid="login-signup-link"
            >
              Sign up
            </RouterLink>
          </Text>
        </VStack>
      </Box>
    </Box>
  );
};

export default LoginPage;
