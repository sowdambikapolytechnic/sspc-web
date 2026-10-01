"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { deleteGalleryItem } from "../actions";

export function DeleteGalleryItemButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => {
        if (confirm("Are you sure you want to delete this image?")) {
          startTransition(() => {
            deleteGalleryItem(id);
          });
        }
      }}
      disabled={isPending}
      style={{ 
        color: "#fff", 
        background: "rgba(239, 68, 68, 0.8)", 
        border: "none", 
        cursor: "pointer", 
        opacity: isPending ? 0.5 : 1,
        position: "absolute",
        top: 8,
        right: 8,
        width: 28,
        height: 28,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10
      }}
      title="Delete Image"
    >
      <Trash2 size={14} />
    </button>
  );
}
