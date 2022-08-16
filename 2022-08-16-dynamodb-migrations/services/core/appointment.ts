import { Entity } from "electrodb";
import { Dynamo } from "./dynamo";

export const AppointmentEntity2 = new Entity(
  {
    model: {
      version: "2",
      entity: "Appointment",
      service: "scratch"
    },
    attributes: {
      appointmentID: {
        type: "string",
        required: true,
        readOnly: true
      },
      name: {
        type: "string",
        required: true
      },
      cancelled: {
        type: ["cancelled", "not-cancelled", "rescheduled"],
        default: "not-cancelled"
      }
    },
    indexes: {
      primary: {
        pk: {
          field: "pk",
          composite: ["appointmentID"]
        },
        sk: {
          field: "sk",
          composite: []
        }
      },
      list: {
        index: "gsi1",
        pk: {
          field: "gsi1pk",
          composite: []
        },
        sk: {
          field: "gsi1sk",
          composite: ["appointmentID"]
        }
      }
    }
  },
  Dynamo.Configuration
);

export const AppointmentEntity = new Entity(
  {
    model: {
      version: "3",
      entity: "Appointment",
      service: "scratch"
    },
    attributes: {
      appointmentID: {
        type: "string",
        required: true,
        readOnly: true
      },
      name: {
        type: "string",
        required: true
      },
      cancelled: {
        type: ["cancelled", "not-cancelled", "rescheduled"],
        default: "not-cancelled"
      },
      shardID: {
        type: "string",
        required: true
      }
    },
    indexes: {
      primary: {
        pk: {
          field: "pk",
          composite: ["appointmentID"]
        },
        sk: {
          field: "sk",
          composite: []
        }
      },
      list: {
        index: "gsi1",
        pk: {
          field: "gsi1pk",
          composite: ["shardID"]
        },
        sk: {
          field: "gsi1sk",
          composite: ["appointmentID"]
        }
      }
    }
  },
  Dynamo.Configuration
);

async function createAppointment() {
  //write to 2
  //write to 3
}
