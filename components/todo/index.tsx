"use client";

import React, { useEffect, useState } from "react";
import {
  Heading,
  VStack,
  useToast,
  Link,
  IconButton,
  Flex,
} from "@chakra-ui/react";
import AddTask from "./addTask";
import TaskList from "./tasks";
import { task } from "types/todo";
import { FaGithub, FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";

const Todo = () => {
  const toast = useToast();
  const [tasks, setTasks] = useState<task[]>(
    () => JSON.parse(localStorage.getItem("tasks") as string) || []
  );

  useEffect(() => {
    console.log("Called tasks Effect");
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: task) => {
    setTasks([...tasks, task]);
  };

  const deleteTask = (id: string) => {
    const newTasks = tasks.filter((task) => {
      return task.id !== id;
    });
    setTasks(newTasks);
  };

  const deleteTaskAll = () => {
    console.log("Called");
    setTasks([]);
  };

  const checkTask = (id: string) => {
    const newTasksCheck: task[] = tasks.map((task) => {
      if (task.id === id) {
        task.check = !task.check;
      }
      return task;
    });
    setTasks(newTasksCheck);
  };

  const updateTask = (id: string, body: string, onClose: () => void) => {
    const info = body.trim();
    if (!info) {
      toast({
        title: "Enter your task",
        position: "top",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    const newTasksUpdate: task[] = tasks.map((task) => {
      if (task.id === id) {
        task.body = body;
        task.check = false;
      }
      return task;
    });
    setTasks(newTasksUpdate);
    onClose();
  };

  return (
    <VStack p={4} minH="100vh" pb={20}>
      <Heading
        p="5"
        fontWeight="extrabold"
        size="xl"
        bgGradient="linear(to-r, blue.500, yellow.500)"
        bgClip="text"
      >
        Todo list
      </Heading>
      <AddTask addTask={addTask} />
      <TaskList
        tasks={tasks}
        updateTask={updateTask}
        deleteTask={deleteTask}
        deleteTaskAll={deleteTaskAll}
        checkTask={checkTask}
      />
      <Flex position="absolute" bottom="5">
        <Link href="https://github.com/JahanzaibTayyab" target="_blank">
          <IconButton
            icon={<FaGithub />}
            isRound
            size="md"
            m="1"
            aria-label="github"
          />
        </Link>
        <Link
          href="https://www.linkedin.com/in/jahanzaib-tayyab-0b752913a/"
          target="_blank"
        >
          <IconButton
            icon={<FaLinkedin />}
            isRound
            size="md"
            m="1"
            aria-label="linkedin"
          />
        </Link>
        <Link
          href="https://www.instagram.com/jahanzaib_tayyab/"
          target="_blank"
        >
          <IconButton
            icon={<FaInstagram />}
            isRound
            size="md"
            m="1"
            aria-label="instagram"
          />
        </Link>
        <Link
          href="https://www.facebook.com/jahanzaib.tayyab.5"
          target="_blank"
        >
          <IconButton
            icon={<FaFacebook />}
            isRound
            size="md"
            m="1"
            aria-label="facebook"
          />
        </Link>
      </Flex>
    </VStack>
  );
};
export default Todo;
