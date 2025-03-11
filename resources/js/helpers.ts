import { User } from "./types";

export function hasRole(user: User, role: string): boolean {
    return user.roles.includes(role);
}