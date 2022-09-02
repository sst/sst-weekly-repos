import { User } from "@auth/core/user";
import { useSession } from "@serverless-stack/node/auth";
import { builder } from "../builder";

const UserType = builder.objectRef<User.Info>("User").implement({
  fields: t => ({
    id: t.exposeString("userID"),
    email: t.exposeString("email")
  })
});

builder.queryFields(t => ({
  session: t.field({
    type: UserType,
    nullable: true,
    resolve: () => {
      const session = requireUser();
      return User.fromID(session.properties.userID);
    }
  })
}));

function requireUser() {
  const session = useSession();
  if (session.type !== "user") {
    throw new Error("Expected user session");
  }
  return session;
}
