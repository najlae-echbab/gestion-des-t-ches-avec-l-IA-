import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchMembers, deleteMember } from "../api/memberService";
import { User } from "../types/user";
import { Button } from "./ui/button";
import DeleteConfirmation from "./DeleteConfirmation"; // Assurez-vous que ce composant est bien importé

const MemberList = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Utilisation de useQuery pour récupérer les membres
  const { data: members, error, isLoading } = useQuery<User[], Error>({
    queryKey: ["members"],
    queryFn: fetchMembers,
  });

  // Utilisation de useMutation pour supprimer un membre
  const { mutate: removeMember } = useMutation({
    mutationFn: deleteMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] }); // Recharger les données des membres après suppression
    },
  });

  // État pour afficher/masquer la popup
  const [openDialog, setOpenDialog] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<number | null>(null);

  // Fonction pour afficher la popup de confirmation
  const handleShowDeleteConfirmation = (id: number) => {
    setMemberToDelete(id);
    setOpenDialog(true);
  };

  // Fonction pour fermer la popup
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setMemberToDelete(null);
  };

  // Fonction pour confirmer la suppression
  const handleConfirmDelete = () => {
    if (memberToDelete) {
      removeMember(memberToDelete);
    }
    handleCloseDialog();
  };

  // Affichage du statut de la requête
  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Une erreur est survenue : {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="text-right mb-4">
        <Button onClick={() => navigate("/AddMember")}>Ajouter un membre</Button>
      </div>
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 text-left border-b">ID</th>
            <th className="px-4 py-2 text-left border-b">Nom d'utilisateur</th>
            <th className="px-4 py-2 text-left border-b">Rôles</th>
            <th className="px-4 py-2 text-left border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {members?.map((member) => (
            <tr key={member.id} className="hover:bg-gray-100">
              <td className="px-4 py-2 border-b">{member.id}</td>
              <td className="px-4 py-2 border-b">{member.username}</td>
              <td className="px-4 py-2 border-b">{member.roles}</td>
              <td className="px-4 py-2 border-b">
                <Button
                  onClick={() => handleShowDeleteConfirmation(member.id)}
                  className="bg-secondary text-primary-foreground hover:bg-primary/90 font-bold py-2 px-6 rounded"
                >
                  Supprimer
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Popup de confirmation */}
      {openDialog && (
        <DeleteConfirmation
          onClose={handleCloseDialog}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
};

export default MemberList;
