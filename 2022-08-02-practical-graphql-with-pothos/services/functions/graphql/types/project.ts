import { Task } from "@graphql/core/task";
import { User } from "@graphql/core/user";
import { builder } from "../builder";

export const UserType = builder.objectRef<string>("User").implement({
  fields: t => ({
    id: t.id({
      resolve: async user => user
    }),
    name: t.string({
      resolve: async user => User.fromID(user).then(user => user!.name)
    }),
    taskCount: t.int({
      resolve: async user => {
        return User.taskCount(user);
      }
    })
  })
});

export const TaskType = builder.objectRef<Task.Info>("Task").implement({
  fields: t => ({
    id: t.exposeID("taskID"),
    name: t.exposeString("name"),
    completed: t.exposeBoolean("completed"),
    assignee: t.field({
      type: UserType,
      nullable: true,
      resolve: async task => {
        if (!task.assignee) return;
        return task.assignee;
      }
    })
  })
});

builder.queryFields(t => ({
  tasks: t.field({
    type: [TaskType],
    resolve: async () => await Task.list()
  })
}));
