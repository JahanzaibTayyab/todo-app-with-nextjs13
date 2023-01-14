"use client";

import React from "react";
import Image from "next/image";
import UpdateTask from "./updateTask";
import { DeleteTask, DeleteAllTask } from "./deleteTask";
import {
  HStack,
  Box,
  VStack,
  Flex,
  Text,
  StackDivider,
} from "@chakra-ui/react";
import taskIcon from "public/icons/task.svg";
import { tasks } from "types/todo";

const TaskList = ({
  tasks,
  updateTask,
  deleteTask,
  deleteTaskAll,
  checkTask,
}: tasks) => {
  if (!tasks.length) {
    return (
      <>
        <Box maxW="80%">
          <Image
            src={taskIcon}
            alt="Your list is empty"
            width={300}
            height={300}
          />
        </Box>
      </>
    );
  }
  return (
    <>
      <VStack
        divider={<StackDivider />}
        borderColor="gray.100"
        borderWidth="2px"
        p="5"
        borderRadius="lg"
        w="100%"
        maxW={{ base: "90vw", sm: "80vw", lg: "50vw", xl: "30vw" }}
        alignItems="stretch"
      >
        {tasks.map((task) => (
          <HStack key={task.id} opacity={task.check === true ? "0.2" : "1"}>
            <Text
              w="100%"
              p="8px"
              borderRadius="lg"
              as={task.check === true ? "s" : ("" as any)}
              cursor="pointer"
              onClick={() => checkTask(task.id)}
            >
              {task.body}
            </Text>
            <DeleteTask task={task} deleteTask={deleteTask} />
            <UpdateTask task={task} updateTask={updateTask} />
          </HStack>
        ))}
      </VStack>

      <Flex>
        <DeleteAllTask deleteTaskAll={deleteTaskAll} />
      </Flex>
    </>
  );
};

export default TaskList;
