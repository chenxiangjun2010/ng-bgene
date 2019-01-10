import { User } from "./user";

export interface Auth {
    currentUser?: User;
    userId?: string;
    roles?: string[];
    token?: string;
    username?: string;
    tokenStartTime?: Date;
}
