export * as User from "./user"

import Dataloader from "dataloader"

export interface Info {
  userID: string;
  name: string;
}

const DATABASE: Info[] = [
  {
    userID: "user:1",
    name: "User 1",
  },
  {
    userID: "user:2",
    name: "User 2",
  },
  {
    userID: "user:1",
    name: "User 3",
  }
];

export async function list(): Promise<Info[]> {
  // Database call
  console.log("User:list")
  return DATABASE;
}


const userLoader = new Dataloader(async keys => {
  console.log("User:fromID")
  return keys.map(key => DATABASE.find(user => user.userID === key));
})

export async function fromID(userID: string): Promise<Info | undefined> {
  return userLoader.load(userID)
}

export async function taskCount(userID: string) {
  // Different database call
  return Math.floor(Math.random() * 10)
}
