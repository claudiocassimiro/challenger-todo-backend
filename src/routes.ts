import { UserController } from "./controller/UserController";

export const Routes = [
  {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save",
  },
];
