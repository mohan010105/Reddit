import { useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useCreateCommunity, getListCommunitiesQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";

const schema = z.object({
  name: z.string().min(3, "Min 3 characters").max(50),
  slug: z.string().min(3).max(30).regex(/^[a-z0-9_]+$/, "Lowercase letters, numbers and underscores only"),
  description: z.string().max(500).optional(),
});

type FormData = z.infer<typeof schema>;

export function CreateCommunityModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();
  const createCommunity = useCreateCommunity();

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const communityName = watch("name");

  useEffect(() => {
    if (communityName) {
      const generatedSlug = communityName
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "_")
        .replace(/_{2,}/g, "_")
        .replace(/^_|_$/g, "");
      setValue("slug", generatedSlug, { shouldValidate: true });
    }
  }, [communityName, setValue]);

  const onSubmit = (data: FormData) => {
    createCommunity.mutate({ data: { name: data.name, slug: data.slug, description: data.description || null } }, {
      onSuccess: (community) => {
        toast.success(`r/${community.slug} created!`);
        queryClient.invalidateQueries({ queryKey: getListCommunitiesQueryKey() });
        onClose();
        setLocation(`/r/${community.slug}`);
      },
      onError: () => toast.error("Failed to create community"),
    });
  };

  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create a Community</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <Label>Community Name</Label>
            <Input {...register("name")} placeholder="e.g. Technology" data-testid="input-community-name" />
            {errors.name && <p className="text-destructive text-xs mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <Label>Slug (URL)</Label>
            <div className="flex items-center gap-1">
              <span className="text-muted-foreground text-sm">r/</span>
              <Input {...register("slug")} placeholder="technology" data-testid="input-community-slug" />
            </div>
            {errors.slug && <p className="text-destructive text-xs mt-1">{errors.slug.message}</p>}
          </div>
          <div>
            <Label>Description</Label>
            <Textarea {...register("description")} placeholder="What is your community about?" data-testid="input-community-description" />
          </div>
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={createCommunity.isPending} data-testid="button-submit-community">
              {createCommunity.isPending ? "Creating..." : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
