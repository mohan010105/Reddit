import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useCreatePost, useListCommunities, getListPostsQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";

const schema = z.object({
  title: z.string().min(1, "Title required").max(300),
  content: z.string().optional(),
  imageUrl: z.string().url().optional().or(z.literal("")),
  type: z.enum(["text", "image", "link"]),
  communityId: z.string().min(1, "Select a community"),
});

type FormData = z.infer<typeof schema>;

interface CreatePostModalProps {
  open: boolean;
  onClose: () => void;
  communityId?: number;
}

export function CreatePostModal({ open, onClose, communityId }: CreatePostModalProps) {
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();
  const createPost = useCreatePost();
  const { data: communities } = useListCommunities();

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { type: "text", communityId: communityId?.toString() ?? "" },
  });

  const postType = watch("type");

  const onSubmit = (data: FormData) => {
    createPost.mutate({
      data: {
        title: data.title,
        content: data.content || null,
        imageUrl: data.imageUrl || null,
        type: data.type,
        communityId: parseInt(data.communityId),
      }
    }, {
      onSuccess: (post) => {
        toast.success("Post created!");
        queryClient.invalidateQueries({ queryKey: getListPostsQueryKey() });
        onClose();
        setLocation(`/post/${post.id}`);
      },
      onError: () => toast.error("Failed to create post"),
    });
  };

  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Create a Post</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <Label>Community</Label>
            <Select onValueChange={v => setValue("communityId", v)} defaultValue={communityId?.toString()}>
              <SelectTrigger data-testid="select-community">
                <SelectValue placeholder="Choose a community" />
              </SelectTrigger>
              <SelectContent>
                {communities?.data.map(c => (
                  <SelectItem key={c.id} value={c.id.toString()}>r/{c.slug}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.communityId && <p className="text-destructive text-xs mt-1">{errors.communityId.message}</p>}
          </div>

          <div>
            <Label>Post Type</Label>
            <Select onValueChange={v => setValue("type", v as any)} defaultValue="text">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Text</SelectItem>
                <SelectItem value="image">Image</SelectItem>
                <SelectItem value="link">Link</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Title</Label>
            <Input {...register("title")} placeholder="An interesting title" data-testid="input-post-title" />
            {errors.title && <p className="text-destructive text-xs mt-1">{errors.title.message}</p>}
          </div>

          {postType === "text" && (
            <div>
              <Label>Content</Label>
              <Textarea {...register("content")} placeholder="Share your thoughts..." className="min-h-[100px]" data-testid="input-post-content" />
            </div>
          )}

          {postType === "image" && (
            <div>
              <Label>Image URL</Label>
              <Input {...register("imageUrl")} placeholder="https://example.com/image.jpg" data-testid="input-post-image-url" />
            </div>
          )}

          {postType === "link" && (
            <div>
              <Label>Link URL</Label>
              <Input {...register("imageUrl")} placeholder="https://example.com" data-testid="input-post-link-url" />
            </div>
          )}

          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={createPost.isPending} data-testid="button-submit-post">
              {createPost.isPending ? "Posting..." : "Post"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
