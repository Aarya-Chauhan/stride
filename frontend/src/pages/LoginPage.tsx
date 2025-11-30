import {  useState } from "react";
import type { FormEvent } from "react";
import {
  Box,
  Button,
  Input,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
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
        title: "Logged in successfully",
        status: "success",
        isClosable: true,
      });
      navigate("/dashboard");
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Login failed",
        description:
          error?.response?.data?.message || "Please check your credentials",
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
      <Box
        maxW="md"
        w="100%"
        p={8}
        bg="white"
        boxShadow="lg"
        borderRadius="lg"
      >
        <VStack gap={6} align="stretch">
          <Heading size="lg" textAlign="center">
            Study Planner Login
          </Heading>
          <form onSubmit={handleSubmit}>
            <VStack gap={4} align="stretch">
              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />
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
                Login
              </Button>
            </VStack>
          </form>
          <Text fontSize="sm" textAlign="center">
            Don&apos;t have an account?{" "}
           <RouterLink to="/signup" style={{ color: "#319795" }}>
                Sign Up
            </RouterLink>
          </Text>
        </VStack>
      </Box>
    </Box>
  );
};

export default LoginPage;
