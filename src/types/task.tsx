export interface Task {
    id: number;
    titre: string;
    description?: string;
    statut: "to do" | "doing" | "done";
    deadline?: string; // Date au format ISO 8601
  }
  