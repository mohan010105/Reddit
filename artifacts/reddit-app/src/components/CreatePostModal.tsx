import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useCreatePost, useListCommunities, getListPostsQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { ImageUpload } from "@/components/ImageUpload";
import { FileText, Image, Link as LinkIcon, Loader2 } from "lucide-react";

const schema = z.object({
  title: z.string().min(1, "Title required").max(300),
  content: z.string().optional(),
  imageUrl: z.string().url().optional().or(z.literal("")).optional(),
  type: z.enum(["text", "image", "link"]),
  communityId: z.string().min(1, "Select a community"),
});

type FormData = z.infer<typeof schema>;

interface CreatePostModalProps {
  open: boolean;
  onClose: () => void;
  communityId?: number;
}

const postTypes = [
  { value: "text", label: "Text", icon: FileText },
  { value: "image", label: "Image", icon: Image },
  { value: "link", label: "Link", icon: LinkIcon },
] as const;

export function CreatePostModal({ open, onClose, communityId }: CreatePostModalProps) {
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();
  const createPost = useCreatePost();
  const { data: communities } = useListCommunities();
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

  const { register, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { type: "text", communityId: communityId?.toString() ?? "" },
  });

  const postType = watch("type");

  const handleClose = () => {
    reset();
    setUploadedImageUrl(null);
    onClose();
  };

  const onSubmit = (data: FormData) => {
    const imageUrl = postType === "image" ? (uploadedImageUrl ?? data.imageUrl ?? null) : null;
    const linkUrl = postType === "link" ? (data.imageUrl ?? null) : null;

    createPost.mutate({
      data: {
        title: data.title,
        content: data.content || null,
        imageUrl: imageUrl ?? linkUrl,
        type: data.type,
        communityId: parseInt(data.communityId),
      }
    }, {
      onSuccess: (post) => {
        toast.success("Post created!");
        queryClient.invalidateQueries({ queryKey: getListPostsQueryKey() });
        handleClose();
        setLocation(`/post/${post.id}`);
      },
      onError: () => toast.error("Failed to create post"),
    });
  };

  return (
    <Dialog open={open} onOpenChange={v => !v && handleClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Create a Post</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="space-y-1.5">
            <Label>Community</Label>
            <input type="hidden" {...register("communityId")} />
            <Select onValueChange={v => setValue("communityId", v, { shouldValidate: true })} defaultValue={communityId?.toString() || ""}>
              <SelectTrigger data-testid="select-community">
                <SelectValue placeholder="Choose a community" />
              </SelectTrigger>
              <SelectContent>
                {communities?.data.map(c => (
                  <SelectItem key={c.id} value={c.id.toString()}>r/{c.slug}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.communityId && <p className="text-destructive text-xs">{errors.communityId.message}</p>}
          </div>

          {/* Post type tabs */}
          <div className="space-y-1.5">
            <Label>Post Type</Label>
            <Tabs value={postType} onValueChange={v => { setValue("type", v as any); setUploadedImageUrl(null); }}>
              <TabsList className="w-full">
                {postTypes.map(({ value, label, icon: Icon }) => (
                  <TabsTrigger key={value} value={value} className="flex-1 gap-1.5">
                    <Icon className="w-3.5 h-3.5" /> {label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          <div className="space-y-1.5">
            <Label>Title</Label>
            <Input {...register("title")} placeholder="An interesting title..." data-testid="input-post-title" />
            {errors.title && <p className="text-destructive text-xs">{errors.title.message}</p>}
          </div>

          {postType === "text" && (
            <div className="space-y-1.5">
              <Label>Content <span className="text-muted-foreground font-normal">(optional)</span></Label>
              <Textarea
                {...register("content")}
                placeholder="Share your thoughts..."
                className="min-h-[120px] resize-none"
                data-testid="input-post-content"
              />
            </div>
          )}

          {postType === "image" && (
            <div className="space-y-1.5">
              <Label>Image</Label>
              <ImageUpload
                bucket="post-images"
                value={uploadedImageUrl}
                onChange={url => setUploadedImageUrl(url)}
                label="Drop an image or click to upload"
              />
              <p className="text-xs text-muted-foreground">Or paste an image URL instead:</p>
              <Input
                {...register("imageUrl")}
                placeholder="https://example.com/image.jpg"
                data-testid="input-post-image-url"
                onChange={e => {
                  register("imageUrl").onChange(e);
                  if (e.target.value) setUploadedImageUrl(null);
                }}
              />
            </div>
          )}

          {postType === "link" && (
            <div className="space-y-1.5">
              <Label>Link URL</Label>
              <Input {...register("imageUrl")} placeholder="https://example.com" data-testid="input-post-link-url" />
              {errors.imageUrl && <p className="text-destructive text-xs">Enter a valid URL</p>}
            </div>
          )}

          <div className="flex gap-2 justify-end pt-1">
            <Button type="button" variant="outline" onClick={handleClose} disabled={createPost.isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={createPost.isPending} data-testid="button-submit-post" className="gap-1.5">
              {createPost.isPending ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Posting...</> : "Post"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
