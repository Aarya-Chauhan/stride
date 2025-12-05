// import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
// import { useAuth } from "../context/AuthContext";

// const DashboardPage = () => {
//   const { user, logout } = useAuth();

//   return (
//     <Box
//       minH="100vh"
//       bg="gray.50"
//       p={4}
//       data-testid="dashboard-page"
//     >
//       <Box maxW="4xl" mx="auto" mt={8}>
//         <VStack align="stretch" gap={6}>
//           <Box
//             bg="white"
//             p={6}
//             borderRadius="lg"
//             boxShadow="sm"
//             display="flex"
//             justifyContent="space-between"
//             alignItems="center"
//             data-testid="dashboard-header-card"
//           >
//             <Box>
//               <Heading size="md" data-testid="dashboard-welcome-heading">
//                 Welcome, {user?.name}
//               </Heading>
//               <Text fontSize="sm" color="gray.600">
//                 {user?.email} · {user?.profession || "Learner"} ·{" "}
//                 {user?.timezone || "Timezone not set"}
//               </Text>
//             </Box>
//             <Button
//               variant="outline"
//               colorScheme="red"
//               onClick={logout}
//               data-testid="dashboard-logout-btn"
//             >
//               Logout
//             </Button>
//           </Box>

//           <Box
//             bg="white"
//             p={6}
//             borderRadius="lg"
//             boxShadow="sm"
//             data-testid="dashboard-today-tasks-card"
//           >
//             <Heading size="sm" mb={2}>
//               Today&apos;s Tasks
//             </Heading>
//             <Text fontSize="sm" color="gray.600">
//               This is where your study routines and tasks will appear. We&apos;ll
//               build this next.
//             </Text>
//           </Box>
//         </VStack>
//       </Box>
//     </Box>
//   );
// };

// export default DashboardPage;

import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  HStack,
  Input,
  Checkbox,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import type { Task } from "../types/task";
import {
  fetchTasksRequest,
  createTaskRequest,
  updateTaskRequest,
  deleteTaskRequest,
} from "../api/task";

const DashboardPage = () => {
  const { user, logout } = useAuth();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [addingTask, setAddingTask] = useState(false);

  // Fetch tasks on mount
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const fetched = await fetchTasksRequest();
        setTasks(fetched);
      } catch (error) {
        console.error("Failed to load tasks:", error);
      } finally {
        setLoadingTasks(false);
      }
    };

    loadTasks();
  }, []);

  const handleAddTask = async () => {
    if (!newTaskTitle.trim()) return;
    setAddingTask(true);
    try {
      const created = await createTaskRequest(newTaskTitle.trim());
      setTasks((prev) => [created, ...prev]);
      setNewTaskTitle("");
    } catch (error) {
      console.error("Failed to create task:", error);
    } finally {
      setAddingTask(false);
    }
  };

  const handleToggleTask = async (task: Task) => {
    try {
      const updated = await updateTaskRequest(task._id, {
        isCompleted: !task.isCompleted,
      });
      setTasks((prev) =>
        prev.map((t) => (t._id === task._id ? updated : t))
      );
    } catch (error) {
      console.error("Failed to toggle task:", error);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTaskRequest(taskId);
      setTasks((prev) => prev.filter((t) => t._id !== taskId));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  return (
    <Box
      minH="100vh"
      bg="gray.50"
      p={4}
      data-testid="dashboard-page"
    >
      <Box maxW="4xl" mx="auto" mt={8}>
        <VStack align="stretch" gap={6}>
          {/* HEADER CARD - keep testids used in auth tests */}
          <Box
            bg="white"
            p={6}
            borderRadius="lg"
            boxShadow="sm"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            data-testid="dashboard-header-card"
          >
            <Box>
              <Heading
                size="md"
                data-testid="dashboard-welcome-heading"
              >
                Welcome, {user?.name}
              </Heading>
              <Text fontSize="sm" color="gray.600">
                {user?.email} · {user?.profession || "Learner"} ·{" "}
                {user?.timezone || "Timezone not set"}
              </Text>
            </Box>
            <Button
              variant="outline"
              colorScheme="red"
              onClick={logout}
              data-testid="dashboard-logout-btn"
            >
              Logout
            </Button>
          </Box>

          {/* TASKS CARD */}
          <Box
            bg="white"
            p={6}
            borderRadius="lg"
            boxShadow="sm"
            data-testid="dashboard-today-tasks-card"
          >
            <Heading size="sm" mb={4}>
              Today&apos;s Tasks
            </Heading>

            {/* Add Task Input */}
            <HStack mb={4}>
              <Input
                placeholder="Add a new task..."
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                data-testid="dashboard-task-input"
              />
              <Button
              colorScheme="teal"
              onClick={handleAddTask}
              loading={addingTask}
              data-testid="dashboard-task-add-btn"
            >
              Add
            </Button>

            </HStack>

            {/* Tasks List */}
            {loadingTasks ? (
              <HStack gap={2}>
                <Spinner size="sm" />
                <Text fontSize="sm" color="gray.600">
                  Loading tasks...
                </Text>
              </HStack>
            ) : tasks.length === 0 ? (
              <Text
                fontSize="sm"
                color="gray.600"
                data-testid="dashboard-tasks-empty"
              >
                You don&apos;t have any tasks yet. Add one to get started.
              </Text>
            ) : (
              <VStack
                align="stretch"
                gap={2}
                data-testid="dashboard-task-list"
              >
                {tasks.map((task) => (
                  <HStack
                    key={task._id}
                    justify="space-between"
                    align="center"
                    py={2}
                    data-testid="dashboard-task-item"
                  >
                    <HStack>
                      <Checkbox.Root
                    checked={task.isCompleted}
                    onCheckedChange={() => handleToggleTask(task)}
                    data-testid={`dashboard-task-toggle-${task._id}`}
                  >
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                    <Checkbox.Label>
                      <Text
                        fontSize="sm"
                        textDecoration={task.isCompleted ? "line-through" : "none"}
                        color={task.isCompleted ? "gray.500" : "gray.900"}
                      >
                        {task.title}
                      </Text>
                    </Checkbox.Label>
                  </Checkbox.Root>

                    </HStack>
                    <Button
                      size="xs"
                      variant="ghost"
                      colorScheme="red"
                      onClick={() => handleDeleteTask(task._id)}
                      data-testid={`dashboard-task-delete-${task._id}`}
                    >
                      Delete
                    </Button>
                  </HStack>
                ))}
              </VStack>
            )}
          </Box>
        </VStack>
      </Box>
    </Box>
  );
};

export default DashboardPage;
