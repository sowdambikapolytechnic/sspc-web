"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { deleteNews } from "../actions";

export function DeleteButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => {
        if (confirm("Are you sure you want to delete this news item?")) {
          startTransition(() => {
            deleteNews(id);
          });
        }
      }}
      disabled={isPending}
      style={{ color: "#ef4444", background: "none", border: "none", cursor: "pointer", opacity: isPending ? 0.5 : 1 }}
    >
      <Trash2 size={18} />
    </button>
  );
}
