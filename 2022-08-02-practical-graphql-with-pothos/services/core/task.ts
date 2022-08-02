export * as Task from "./task"

export interface Info {
  taskID: string;
  name: string;
  assignee?: string; // Pointing to user
  completed: boolean;
}

const DATABASE = [
  {
    taskID: "task:1",
    name: "Task 1",
    completed: true,
    assignee: "user:1"
  },
  {
    taskID: "task:2",
    name: "Task 2",
    completed: true,
    assignee: "user:1"
  },
  {
    taskID: "task:1",
    name: "Task 1",
    completed: false
  }
];

export async function list(): Promise<Info[]> {
  return DATABASE;
}

export async function fromID(taskID: string): Promise<Info | undefined> {
  return DATABASE.find(task => task.taskID === taskID);
}
