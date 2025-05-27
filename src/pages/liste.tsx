import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "./layout";
import Navbar from "@/components/navbar";
import ListHeader from "@/components/ListHeader";
import ListCard from "@/components/ListCard";
import AddTask from "@/components/AddTask";
import TaskModal from "@/components/TaskModal";
import {
  fetchTachesByProject,
  updateTacheStatus,
  createTache,
  updateTacheTitre,
  deleteTache,
} from "@/api/APIServices";
import { Task as TaskType } from "@/types/task";
import { mapStatutToColumn, mapColumnToStatut } from "@/helpers/statusMapping";
import {
  DndContext,
  pointerWithin,
  DragEndEvent,
  useDroppable,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import { GripVertical } from "lucide-react";

// --- Interfaces ---
interface Task {
  id: number;
  title: string;
  description?: string;
  deadline?: string;
}

interface List {
  id: number;
  title: string;
  tasks: Task[];
}

// --- Sortable Task ---
const SortableTask: React.FC<{
  id: string;
  task: Task;
  onEdit: (taskId: number) => void;
  onDelete: (taskId: number) => void;
  onClick: () => void;
}> = ({ id, task, onEdit, onDelete, onClick }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div ref={setNodeRef} style={style} className="flex items-center">
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab p-2"
        title="Glisser pour déplacer"
      >
        <GripVertical className="w-5 h-5 text-gray-500" />
      </div>
      <ListCard
        text={task.title}
        onEdit={() => onEdit(task.id)}
        onDelete={() => onDelete(task.id)}
        onClick={onClick}
      />
    </div>
  );
};

// --- Droppable Column ---
const DroppableColumn: React.FC<{ id: string; children: React.ReactNode }> = ({ id, children }) => {
  const { setNodeRef } = useDroppable({ id });
  return <div ref={setNodeRef} className="flex flex-col gap-2 min-h-[100px]">{children}</div>;
};

// --- Main Component ---
const Liste: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [lists, setLists] = useState<List[]>([
    { id: 1, title: "To Do", tasks: [] },
    { id: 2, title: "Doing", tasks: [] },
    { id: 3, title: "Done", tasks: [] },
  ]);
  const [error, setError] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState<string>("");

  const loadTasks = async () => {
    if (!projectId) {
      setError("Aucun ID de projet fourni.");
      return;
    }
    try {
      const taches: TaskType[] = await fetchTachesByProject(Number(projectId));
      const uniqueTaches = Array.from(new Map(taches.map(task => [task.id, task])).values());
      console.log("Tâches récupérées :", uniqueTaches);

      const categorized = {
        "to do": [] as Task[],
        doing: [] as Task[],
        done: [] as Task[],
      };

      uniqueTaches.forEach((t) => {
        const col = mapStatutToColumn(t.statut).toLowerCase();
        if (categorized[col]) {
          categorized[col].push({
            id: t.id,
            title: t.titre,
            description: t.description,
            deadline: t.deadline,
          });
        }
      });

      setLists([
        { id: 1, title: "To Do", tasks: categorized["to do"] },
        { id: 2, title: "Doing", tasks: categorized["doing"] },
        { id: 3, title: "Done", tasks: categorized["done"] },
      ]);
      setError(null);
    } catch (error) {
      console.error("Erreur lors du chargement des tâches :", error);
      setError("Échec du chargement des tâches.");
    }
  };

  useEffect(() => {
    loadTasks();
  }, [projectId]);

  // --- Drag & Drop ---
  async function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    console.log("Drag end - Active:", active.id, "Over:", over?.id);

    if (!over || active.id === over.id) {
      console.log("Aucun déplacement détecté, clic ignoré.");
      return;
    }

    const activeId = active.id.toString();
    const overId = over.id.toString();

    const [fromListIdStr, taskIdStr] = activeId.includes("-") ? activeId.split("-") : [activeId, null];
    const [toListIdStr] = overId.includes("-") ? overId.split("-") : [overId];

    console.log("From List ID:", fromListIdStr, "To List ID:", toListIdStr, "Task ID:", taskIdStr);

    const fromListId = parseInt(fromListIdStr, 10);
    const toListId = parseInt(toListIdStr, 10);
    const taskId = taskIdStr ? parseInt(taskIdStr, 10) : null;

    if (!taskId) {
      console.error("Task ID invalide");
      return;
    }

    const newLists = [...lists];
    const fromList = newLists.find((l) => l.id === fromListId);
    const toList = newLists.find((l) => l.id === toListId);

    if (!fromList || !toList) {
      console.error("Liste source ou destination introuvable.");
      return;
    }

    const taskIndex = fromList.tasks.findIndex((t) => t.id === taskId);
    if (taskIndex === -1) {
      console.error("Tâche non trouvée dans la liste source.");
      return;
    }

    const [task] = fromList.tasks.splice(taskIndex, 1);
    toList.tasks.push(task);
    setLists(newLists);

    try {
      await updateTacheStatus(taskId, mapColumnToStatut(toList.title.toLowerCase()));
      console.log("Statut mis à jour avec succès");
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut :", error);
      setError("Échec de la mise à jour du statut de la tâche.");
      loadTasks();
    }
  }

  // --- Ajouter une tâche ---
  const addTask = async (listId: number, title: string, description?: string, deadline?: string) => {
    const list = lists.find((l) => l.id === listId);
    if (!list || !projectId) return;

    try {
      const newTask = await createTache(
        {
          titre: title,
          description: "",
          deadline: "",
          statut: mapColumnToStatut(list.title.toLowerCase()),
        },
        Number(projectId)
      );

      const taskObj: Task = {
        id: newTask.id,
        title: newTask.titre,
        description: newTask.description,
        deadline: newTask.deadline,
      };
      setLists((prev) =>
        prev.map((l) => (l.id === listId ? { ...l, tasks: [...l.tasks, taskObj] } : l))
      );
      setError(null);
    } catch (error) {
      console.error("Erreur lors de l'ajout de la tâche :", error);
      setError("Échec de l'ajout de la tâche.");
    }
  };

  // --- Modifier une tâche ---
  const handleEditTask = (taskId: number) => {
    console.log("Lancement de l'édition pour la tâche ID :", taskId);
    const task = lists.flatMap((l) => l.tasks).find((t) => t.id === taskId);
    if (task) {
      setEditTaskId(taskId);
      setEditTitle(task.title);
    }
  };

  const handleSaveEdit = async () => {
    if (!editTaskId || !editTitle.trim()) {
      setError("Le titre ne peut pas être vide.");
      return;
    }
    try {
      console.log("Modification de la tâche ID :", editTaskId, "Nouveau titre :", editTitle);
      await updateTacheTitre(editTaskId, editTitle);
      setLists((prevLists) =>
        prevLists.map((list) => ({
          ...list,
          tasks: list.tasks.map((task) =>
            task.id === editTaskId ? { ...task, title: editTitle } : task
          ),
        }))
      );
      setEditTaskId(null);
      setEditTitle("");
      setError(null);
    } catch (error) {
      console.error("Erreur lors de la modification :", error);
      setError("Échec de la modification de la tâche.");
    }
  };

  // --- Supprimer une tâche ---
  const handleDeleteTask = async (taskId: number) => {
    console.log("Demande de suppression pour la tâche ID :", taskId);
    if (!window.confirm("Voulez-vous vraiment supprimer cette tâche ?")) return;
    try {
      console.log("Suppression de la tâche ID :", taskId);
      await deleteTache(taskId);
      setLists((prevLists) =>
        prevLists.map((list) => ({
          ...list,
          tasks: list.tasks.filter((task) => task.id !== taskId),
        }))
      );
      setError(null);
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      setError("Échec de la suppression de la tâche.");
    }
  };

  return (
    <Layout>
      <Navbar />
      <div className="flex gap-4 overflow-x-auto p-12 h-full">
        <DndContext
          collisionDetection={pointerWithin}
          onDragEnd={onDragEnd}
        >
          {lists.map((list) => (
            <div
              key={list.id}
              className="bg-gray-100 rounded-lg shadow-md p-4 w-80 flex-shrink-0 flex flex-col"
            >
              <ListHeader title={list.title} />
              <SortableContext
                id={list.id.toString()}
                items={list.tasks.map((task) => `${list.id}-${task.id}`)}
                strategy={verticalListSortingStrategy}
              >
                <DroppableColumn id={list.id.toString()}>
                  {list.tasks.map((task) => (
                    <SortableTask
                      key={`${list.id}-${task.id}`}
                      id={`${list.id}-${task.id}`}
                      task={task}
                      onEdit={handleEditTask}
                      onDelete={handleDeleteTask}
                      onClick={() => setSelectedTask(task)}
                    />
                  ))}
                </DroppableColumn>
              </SortableContext>
              <AddTask onAdd={(title, description, deadline) => addTask(list.id, title, description, deadline)} />
            </div>
          ))}
        </DndContext>
      </div>
      {error && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded">
          {error}
        </div>
      )}
      {selectedTask && (
        <TaskModal task={selectedTask} onClose={() => setSelectedTask(null)} />
      )}
      {editTaskId !== null && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black/40 z-[9999]"
          onClick={() => setEditTaskId(null)}
        >
          <div
            className="bg-white p-6 rounded shadow-lg w-[90%] max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Modifier la tâche</h2>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSaveEdit();
                if (e.key === "Escape") setEditTaskId(null);
              }}
              className="w-full border px-3 py-2 rounded mb-4"
              autoFocus
            />
            <div className="flex justify-end gap-3">
              <Button
                onClick={() => setEditTaskId(null)}
                className="bg-gray-500 hover:bg-gray-600 text-white"
              >
                Annuler
              </Button>
              <Button
                onClick={handleSaveEdit}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                Enregistrer
              </Button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Liste;