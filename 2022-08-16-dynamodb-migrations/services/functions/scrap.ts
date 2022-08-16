import {
  AppointmentEntity,
  AppointmentEntity2
} from "@my-sst-app/core/appointment";
import { ulid } from "ulid";

async function truncate() {
  for (const appt of await AppointmentEntity.scan.go()) {
    await AppointmentEntity.delete(appt).go();
  }
}

export async function handler() {
  const tasks = Array(25)
    .fill(0)
    .map(async (_, index) => {
      return AppointmentEntity.query
        .list({
          shardID: index.toString()
        })
        .go();
    });
  console.log((await Promise.all(tasks)).flat().length);
}

export function hash(input: string) {
  let hash = 0;
  if (input.length === 0) return hash;
  for (let i = 0; i < input.length; i++) {
    hash = input.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }
  return Math.abs(hash);
}
