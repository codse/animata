"use client";
import React, { useRef, useState } from "react";

type Task = {
  id: number;
  name: string;
  completed: boolean;
};

interface ChecklistCompletionProps {
  tasks?: Task[];
  onTaskToggle?: (taskId: number) => void;
}

const initialTasks: Task[] = [
  { id: 1, name: "How it all started", completed: true },
  { id: 2, name: "Our values and approach", completed: true },
  { id: 3, name: "Working together", completed: false },
  { id: 4, name: "Union rules and integration", completed: false },
  { id: 5, name: "Security policy", completed: false },
  { id: 6, name: "Performance reviews", completed: false },
  { id: 7, name: "Employee benefits", completed: false },
  { id: 8, name: "Final assessment", completed: false },
];

// ProgressBar Component
const ProgressBar: React.FC<{ completedTasks: number; totalTasks: number }> = ({
  completedTasks,
  totalTasks,
}) => (
  <div className="sticky z-10 mb-12 rounded-lg bg-white p-4 shadow-lg">
    <div className="mb-4 flex items-center justify-between">
      <div className="relative mr-4 h-3 w-full rounded-full bg-gray-300">
        <div
          className="h-3 rounded-full bg-black transition-all duration-300"
          style={{ width: `${(completedTasks / totalTasks) * 100}%` }}
        ></div>
      </div>
      <span className="whitespace-nowrap text-gray-600">
        {completedTasks} / {totalTasks} Completed
      </span>
    </div>
  </div>
);

// TaskList Component
const TaskList: React.FC<{
  tasks: Task[];
  onTaskToggle: (taskId: number) => void;
  taskRefs: React.MutableRefObject<(HTMLLIElement | null)[]>;
  scrollableContainerRef: React.RefObject<HTMLUListElement>;
}> = ({ tasks, onTaskToggle, taskRefs, scrollableContainerRef }) => (
  <ul
    ref={scrollableContainerRef}
    className="space-y-6 overflow-y-auto"
    style={{ height: "160px", scrollbarWidth: "none", msOverflowStyle: "none" }}
  >
    {tasks.map((task, index) => (
      <li
        key={task.id}
        className="flex cursor-pointer items-center space-x-2 text-lg"
        onClick={() => onTaskToggle(task.id)}
        ref={(el) => {
          taskRefs.current[index] = el;
        }}
      >
        {task.completed ? (
          <div className="flex items-center">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500">
              <span className="text-black">&#10003;</span>
            </span>
            <span className="ml-2">{task.name}</span>
          </div>
        ) : (
          <div className="flex items-center">
            <span className="inline-block h-4 w-4 rounded-full border border-gray-400"></span>
            <span className="ml-2 text-gray-400">{task.name}</span>
          </div>
        )}
      </li>
    ))}
    <style>{`
      ul::-webkit-scrollbar {
        display: none;
      }
    `}</style>
  </ul>
);

const ChecklistCompletion: React.FC<ChecklistCompletionProps> = ({
  tasks = initialTasks,
  onTaskToggle,
}) => {
  const [taskState, setTaskState] = useState<Task[]>(tasks);
  const taskRefs = useRef<(HTMLLIElement | null)[]>([]);
  const scrollableContainerRef = useRef<HTMLUListElement>(null);

  const toggleTaskCompletion = (taskId: number): void => {
    const updatedTasks = taskState.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task,
    );
    setTaskState(updatedTasks);
    onTaskToggle?.(taskId);

    const taskIndex = taskState.findIndex((task) => task.id === taskId);
    if (taskRefs.current[taskIndex]) {
      taskRefs.current[taskIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }

    if (scrollableContainerRef.current) {
      const currentScroll = scrollableContainerRef.current.scrollTop;
      const scrollHeight = scrollableContainerRef.current.scrollHeight;
      const containerHeight = scrollableContainerRef.current.clientHeight;

      if (currentScroll + containerHeight < scrollHeight) {
        scrollableContainerRef.current.scrollTo({
          top: currentScroll + 50,
          behavior: "smooth",
        });
      }
    }
  };

  const completedTasks = taskState.filter((task) => task.completed).length;
  const totalTasks = taskState.length;

  return (
    <div className="mx-auto flex h-auto min-h-screen w-full max-w-lg flex-col overflow-hidden bg-gray-50 p-16">
      <ProgressBar completedTasks={completedTasks} totalTasks={totalTasks} />
      <TaskList
        tasks={taskState}
        onTaskToggle={toggleTaskCompletion}
        taskRefs={taskRefs}
        scrollableContainerRef={scrollableContainerRef}
      />
    </div>
  );
};

export default ChecklistCompletion;
