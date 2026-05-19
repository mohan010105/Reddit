import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { FolderPlus, Folder, Loader2, Check } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface CollectionsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  postId?: number;
  currentCollectionId?: number | null;
}

export function CollectionsModal({ open, onOpenChange, postId, currentCollectionId }: CollectionsModalProps) {
  const { session } = useAuth();
  const queryClient = useQueryClient();
  const [newName, setNewName] = useState("");

  const { data: collections, isLoading } = useQuery({
    queryKey: ["collections"],
    queryFn: async () => {
      const res = await fetch("/api/saved/collections", {
        headers: { "Authorization": `Bearer ${session?.access_token}` }
      });
      return res.json() as Promise<any[]>;
    },
    enabled: open,
  });

  const createCollection = useMutation({
    mutationFn: async (name: string) => {
      const res = await fetch("/api/saved/collections", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session?.access_token}`
        },
        body: JSON.stringify({ name })
      });
      return res.json();
    },
    onSuccess: () => {
      setNewName("");
      queryClient.invalidateQueries({ queryKey: ["collections"] });
      toast.success("Collection created");
    }
  });

  const updateCollection = useMutation({
    mutationFn: async (collectionId: number | null) => {
      if (!postId) return;
      const res = await fetch(`/api/saved/${postId}/collection`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session?.access_token}`
        },
        body: JSON.stringify({ collectionId })
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["saved-posts"] });
      onOpenChange(false);
      toast.success("Updated collection");
    }
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Save to Collection</DialogTitle>
          <DialogDescription>Organize your saved posts into collections.</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label>New Collection</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Reading List, Memes, etc."
                value={newName}
                onChange={e => setNewName(e.target.value)}
              />
              <Button
                size="sm"
                onClick={() => createCollection.mutate(newName)}
                disabled={!newName.trim() || createCollection.isPending}
              >
                {createCollection.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <FolderPlus className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          <div className="border-t pt-4 space-y-2">
            <Label>All Collections</Label>
            <div className="flex flex-col gap-1 max-h-[200px] overflow-y-auto pr-1">
              <Button
                variant={currentCollectionId === null ? "secondary" : "ghost"}
                className="justify-start gap-2 h-9 text-sm"
                onClick={() => updateCollection.mutate(null)}
              >
                <Folder className="w-4 h-4 opacity-50" />
                Unsorted
                {currentCollectionId === null && <Check className="w-3.5 h-3.5 ml-auto text-primary" />}
              </Button>
              {collections?.map(c => (
                <Button
                  key={c.id}
                  variant={currentCollectionId === c.id ? "secondary" : "ghost"}
                  className="justify-start gap-2 h-9 text-sm"
                  onClick={() => updateCollection.mutate(c.id)}
                >
                  <Folder className="w-4 h-4 text-primary" />
                  {c.name}
                  {currentCollectionId === c.id && <Check className="w-3.5 h-3.5 ml-auto text-primary" />}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
