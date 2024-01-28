import UserIdentifyer from "services/user-identifyer";

const admin = [
  "/",
  "/customers",
  "/jobs",
  "/appointments",
  "/employees",
  "/settings",
  "/transactions",
  "/eft-orders",
  "/publish",
];

const manager = [
  "/",
  "/customers",
  "/jobs",
  "/appointments",
  "/employees",
  "/settings",
];

const teamLead = [
  "/",
  "/customers",
  "/jobs",
  "/appointments",
  "/employees",
  "/settings",
];

const auditor = ["/", "/appointments", "/settings"];

const agent = ["/", "/jobs", "/appointments", "/settings", "/customers"];

const snippitAuditor = ["/", "/appointments", "/settings"];

const superAdmin = [
  "/",
  "/customers",
  "/jobs",
  "/appointments",
  "/employees",
  "/company",
  "/settings",
  "/publish",
  "/transactions",
  "/eft-orders",
];

export function userAccessRouter(): string[] {
  const userRole = UserIdentifyer();
  switch (userRole) {
    case "superadmin":
      return superAdmin;
    case "admin":
    case "owner":
      return admin;
    case "team lead":
      return teamLead;
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
