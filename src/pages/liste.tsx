import React, { useState } from "react";
import ListCard from "../components/ListCard";
import { Button } from "@/components/ui/button";
import Layout from "./layout";
import Navbar from "@/components/navbar";
import * as Dialog from "@radix-ui/react-dialog";

interface Task {
  id: number;
  title: string;
  description: string;
  notifications: boolean;
  assignee: string;
  deadline: string;
  attachments: (string | File)[];
}

interface Card {
  id: number;
  title: string;
  tasks: Task[];
}

const Liste: React.FC = () => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [lists, setLists] = useState<Card[]>([
    {
      id: 1,
      title: "To Do",
      tasks: [
        {
          id: 1,
          title: "Task 1",
          description: "Description for Task 1",
          notifications: false,
          assignee: "User 1",
          deadline: "2024-12-15",
          attachments: [],
        },
      ],
    },
    {
      id: 2,
      title: "Doing",
      tasks: [],
    },
    {
      id: 3,
      title: "Done",
      tasks: [],
    },
  ]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!selectedTask) return;
    const { name, value } = event.target;
    setSelectedTask({ ...selectedTask, [name]: value });
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedTask) return;
    const { name, checked } = event.target;
    setSelectedTask({ ...selectedTask, [name]: checked });
  };

  const saveTask = () => {
    if (!selectedTask) return;

    const updatedLists = lists.map((list) => {
      return {
        ...list,
        tasks: list.tasks.map((task) =>
          task.id === selectedTask.id ? selectedTask : task
        ),
      };
    });
    setLists(updatedLists);
    setSelectedTask(null);
  };

  return (
    <Layout>
      <Navbar />
      <div className="flex flex-col h-full p-12">
        <div className="flex flex-grow gap-4 overflow-auto">
          {lists.map((list) => (
            <div
              key={list.id}
              className="flex flex-col w-1/3 bg-gray-100 rounded-lg shadow-md p-4"
            >
              <h2 className="text-lg font-semibold mb-4">{list.title}</h2>
              <div className="flex flex-col gap-2">
                {list.tasks.map((task) => (
                  <ListCard
                    key={task.id}
                    text={task.title}
                    onClick={() => setSelectedTask(task)}
                  />
                ))}
                <Button className="mt-2">+ Add a card</Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog.Root open={!!selectedTask} onOpenChange={() => setSelectedTask(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          <Dialog.Content className="fixed inset-0 flex items-center justify-center">
            {selectedTask && (
              <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <h2 className="text-xl font-bold mb-4">{selectedTask.title}</h2>
                <textarea
                  name="description"
                  value={selectedTask.description}
                  onChange={handleInputChange}
                  placeholder="Enter description"
                  className="w-full mb-2 border rounded p-2"
                />
                <input
                  type="text"
                  name="assignee"
                  value={selectedTask.assignee}
                  onChange={handleInputChange}
                  placeholder="Assign to"
                  className="w-full mb-2 border rounded p-2"
                />
                <input
                  type="date"
                  name="deadline"
                  value={selectedTask.deadline}
                  onChange={handleInputChange}
                  className="w-full mb-2 border rounded p-2"
                />
                <label className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    name="notifications"
                    checked={selectedTask.notifications}
                    onChange={handleCheckboxChange}
                    className="mr-2"
                  />
                  Notifications
                </label>
                <Button onClick={saveTask} className="w-full">
                  Save
                </Button>
              </div>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </Layout>
  );
};

export default Liste;