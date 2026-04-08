export interface Client {
  id: string;
  email: string;
  name: string;
  company?: string;
  phone?: string;
}

export interface Project {
  id: string;
  clientId: string;
  name: string;
  description?: string;
  status: "PENDING" | "IN_PROGRESS" | "REVIEW" | "COMPLETED";
  progress: number;
  startDate?: string;
  endDate?: string;
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  priority: "LOW" | "MEDIUM" | "HIGH";
  dueDate?: string;
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  senderType: "CLIENT" | "USER" | "AI";
  content: string;
  attachments?: { name: string; url: string }[];
  createdAt: string;
}

export interface Chat {
  id: string;
  clientId: string;
  projectId?: string;
  type: "GENERAL" | "SUPPORT" | "INCIDENT";
  lastMessageAt: string;
  messages?: Message[];
}

export interface Incident {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: "OPEN" | "ANALYZING" | "PROPOSED" | "RESOLVED" | "CLOSED";
  priority: "LOW" | "MEDIUM" | "HIGH";
  aiAnalysis?: Record<string, unknown>;
  proposedSolution?: Record<string, unknown>;
  createdAt: string;
}

export interface Service {
  id: string;
  projectId: string;
  name: string;
  description?: string;
  cost: number;
  frequency: "MONTHLY" | "ONE_TIME";
}

export interface AIAction {
  id: string;
  incidentId: string;
  action: string;
  input: Record<string, unknown>;
  output?: Record<string, unknown>;
  validated: boolean;
  createdAt: string;
}

export type UserRole = "ADMIN" | "AGENT";
export type ProjectStatus = "PENDING" | "IN_PROGRESS" | "REVIEW" | "COMPLETED";
export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";
export type Priority = "LOW" | "MEDIUM" | "HIGH";
export type IncidentStatus = "OPEN" | "ANALYZING" | "PROPOSED" | "RESOLVED" | "CLOSED";
