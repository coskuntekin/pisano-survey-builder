import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { useEffect, useState } from "react";

const Dashboard: React.FC = () => {
  const [questions, setQuestions] = useState<Array<{ id: string; text: string; type: string }>>([]);

  const handleDownload = (question: { id: string; text: string; type: string }) => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(question, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `question-${question.id}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleRemove = (id: string) => {
    setQuestions(prev => prev.filter(q => q.id !== id));
    const stored = localStorage.getItem("survey-builder-state");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed?.questions)) {
          parsed.questions = parsed.questions.filter((q: { id: string }) => q.id !== id);
          localStorage.setItem("survey-builder-state", JSON.stringify(parsed));
        }
      } catch {
        console.log("Something went wrong")
      }
    }
  };

  // DnD-kit setup
  const sensors = useSensors(useSensor(PointerSensor));

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setQuestions((items) => {
        const oldIndex = items.findIndex((q) => q.id === active.id);
        const newIndex = items.findIndex((q) => q.id === over?.id);
        const newItems = arrayMove(items, oldIndex, newIndex);
        // Update localStorage as well
        const stored = localStorage.getItem("survey-builder-state");
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed?.questions)) {
              parsed.questions = newItems;
              localStorage.setItem("survey-builder-state", JSON.stringify(parsed));
            }
          } catch {
            // Ignore JSON parse errors
          }
        }
        return newItems;
      });
    }
  }

  useEffect(() => {
    const stored = localStorage.getItem("survey-builder-state");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setQuestions(Array.isArray(parsed?.questions) ? parsed.questions : []);
      } catch {
        setQuestions([]);
      }
    }
  }, []);

  const handleDownloadAll = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(questions, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `questions.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  function SortableRow({ q }: { q: { id: string; text: string; type: string } }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: q.id });
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.5 : 1,
      zIndex: isDragging ? 100 : "auto",
    };
    return (
      <tr ref={setNodeRef} style={style} {...attributes} className={isDragging ? "bg-slate-100" : undefined}>
        <td {...listeners} className="h-12 px-6 text-sm border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 cursor-grab">::</td>
        <td className="h-12 px-6 text-sm border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500">{q.id}</td>
        <td className="h-12 px-6 text-sm border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500">{q.text}</td>
        <td className="h-12 px-6 text-sm border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500">{q.type}</td>
        <td className="h-12 px-6 text-sm border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 flex gap-2">
          <button
            className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 border border-slate-300 text-xs font-medium transition"
            onClick={() => handleDownload(q)}
          >
            Download JSON
          </button>
          <button
            className="px-3 py-1 bg-red-100 hover:bg-red-200 rounded text-red-700 border border-red-300 text-xs font-medium transition"
            onClick={() => handleRemove(q.id)}
          >
            Remove
          </button>
        </td>
      </tr>
    );
  }

  return (
    <section className="min-h-screen flex flex-col items-center justify-start py-10 bg-gray-50">
      <div className="w-full max-w-4xl">
        <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center justify-between">
          Dashboard
          {questions.length > 0 && (
            <button
              className="ml-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 border border-slate-300 text-sm font-medium transition"
              onClick={handleDownloadAll}
            >
              Download All JSON
            </button>
          )}
        </h3>
        <div className="bg-white rounded-lg shadow p-8 flex flex-col items-center justify-center min-h-[200px] w-full">
          <div className="w-full overflow-x-auto">
            {questions.length === 0 ? (
              <span className="text-gray-400">
                Select a section from the navigation above to get started.
              </span>
            ) : (
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <table className="w-full text-left border border-collapse rounded sm:border-separate border-slate-200" cellSpacing="0">
                  <thead>
                    <tr>
                      <th className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100 w-8"> </th>
                      <th className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">ID</th>
                      <th className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Question</th>
                      <th className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Type</th>
                      <th className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Actions</th>
                    </tr>
                  </thead>
                  <SortableContext items={questions.map(q => q.id)} strategy={verticalListSortingStrategy}>
                    <tbody>
                      {questions.map((q) => (
                        <SortableRow key={q.id} q={q} />
                      ))}
                    </tbody>
                  </SortableContext>
                </table>
              </DndContext>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
