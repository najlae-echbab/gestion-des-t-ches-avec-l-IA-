export const mapStatutToColumn = (statut: string): string => {
    switch (statut) {
      case "todo": return "to do";
      case "doing": return "doing";
      case "done": return "done";
      default: return "to do";
    }
  };
  
  export const mapColumnToStatut = (column: string): string => {
    switch (column) {
      case "to do": return "todo";
      case "doing": return "doing";
      case "done": return "done";
      default: return "todo";
    }
  };
  