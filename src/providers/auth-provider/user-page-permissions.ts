import UserIdentifyer from "services/user-identifyer";

const admin = [
  "/",
  "/customers",
  "/jobs",
  "/appointments",
  "/employees",
  "/settings",
];

const manager = [
  "/",
  "/customers",
  "/jobs",
  "/appointments",
  "/employees",
  "/settings",
];

const teamLeader = [
  "/",
  "/customers",
  "/jobs",
  "/appointments",
  "/employees",
  "/settings",
];

const auditor = ["/", "/appointments", "/settings"];

const agent = ["/", "/jobs", "/appointments", "/settings"];

const snippitAuditor = ["/", "/appointments", "/settings"];

const superAdmin = [
  "/",
  "/customers",
  "/jobs",
  "/appointments",
  "/employees",
  "/company",
  "/settings",
];

export function userAccessRouter(): string[] {
  const userRole = UserIdentifyer();
  switch (userRole) {
    case "superadmin":
      return superAdmin;
    case "admin":
      return admin;
    case "team leader":
      return teamLeader;
    case "manager":
      return manager;
    case "auditor":
      return auditor;
    case "agent":
      return agent;
    case "snippit auditor":
      return snippitAuditor;
    default:
      return [];
  }
}
