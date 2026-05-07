import { useGetMe, useUpdateMyProfile, getGetMeQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Settings as SettingsIcon, User, FileText, Trophy, Loader2, Save } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { ImageUpload } from "@/components/ImageUpload";
import { motion } from "framer-motion";

const schema = z.object({
  username: z.string().min(3).max(20).regex(/^[a-zA-Z0-9_]+$/).optional(),
  bio: z.string().max(500).optional(),
});
type FormData = z.infer<typeof schema>;

export default function Settings() {
  const { session } = useAuth();
  const queryClient = useQueryClient();
  const { data: me, isLoading } = useGetMe({ query: { enabled: !!session } });
  const updateProfile = useUpdateMyProfile();

  const { register, handleSubmit, reset, formState: { errors, isDirty } } = useForm<FormData>({ resolver: zodResolver(schema) });

  // Track avatar separately since it's managed by ImageUpload
  const [avatarUrl, setAvatarUrl] = [
    me?.avatarUrl ?? null,
    (url: string | null) => {
      updateProfile.mutate(
        { data: { avatarUrl: url } },
        {
          onSuccess: () => {
            toast.success("Avatar updated!");
            queryClient.invalidateQueries({ queryKey: getGetMeQueryKey() });
          },
          onError: () => toast.error("Failed to update avatar"),
        }
      );
    },
  ] as const;

  useEffect(() => {
    if (me) reset({ username: me.username, bio: me.bio ?? "" });
  }, [me, reset]);

  const onSubmit = (data: FormData) => {
    updateProfile.mutate(
      { data: { username: data.username, bio: data.bio || null } },
      {
        onSuccess: () => {
          toast.success("Profile updated!");
          queryClient.invalidateQueries({ queryKey: getGetMeQueryKey() });
          reset(data);
        },
        onError: () => toast.error("Failed to update profile"),
      }
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-4 max-w-lg"
    >
      <h1 className="text-xl font-bold flex items-center gap-2">
        <SettingsIcon className="w-5 h-5 text-primary" /> Settings
      </h1>

      {isLoading ? (
        <div className="bg-card border border-card-border rounded-xl p-6 space-y-5">
          <div className="flex items-center gap-4">
            <Skeleton className="w-20 h-20 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      ) : (
        <div className="bg-card border border-card-border rounded-xl overflow-hidden">
          {/* Banner */}
          <div className="h-20 bg-gradient-to-r from-primary/20 to-primary/5" />

          <div className="px-6 pb-6 -mt-10">
            {/* Avatar + info */}
            <div className="flex items-end gap-4 mb-6">
              <Avatar className="w-20 h-20 border-4 border-card ring-2 ring-primary/20 shrink-0">
                <AvatarImage src={me?.avatarUrl ?? undefined} />
                <AvatarFallback className="text-3xl font-bold bg-gradient-to-br from-primary to-orange-400 text-white">
                  {me?.username?.[0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="pb-1">
                <p className="font-bold text-lg">u/{me?.username}</p>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Trophy className="w-3.5 h-3.5 text-primary" />
                  {me?.karma.toLocaleString()} karma
                </p>
              </div>
            </div>

            {/* Avatar upload */}
            <div className="space-y-1.5 mb-5">
              <Label className="text-sm font-medium">Profile Photo</Label>
              <ImageUpload
                bucket="avatars"
                value={avatarUrl}
                onChange={url => {
                  updateProfile.mutate(
                    { data: { avatarUrl: url } },
                    {
                      onSuccess: () => {
                        toast.success(url ? "Avatar updated!" : "Avatar removed");
                        queryClient.invalidateQueries({ queryKey: getGetMeQueryKey() });
                      },
                      onError: () => toast.error("Failed to update avatar"),
                    }
                  );
                }}
                label="Upload a profile photo"
              />
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
              <div className="space-y-1.5">
                <Label className="flex items-center gap-1.5 text-sm font-medium">
                  <User className="w-3.5 h-3.5" /> Username
                </Label>
                <Input
                  {...register("username")}
                  data-testid="input-username"
                  className="h-10"
                  placeholder="your_username"
                />
                {errors.username && (
                  <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-destructive text-xs">
                    {errors.username.message}
                  </motion.p>
                )}
                <p className="text-xs text-muted-foreground">Letters, numbers, and underscores only. 3–20 characters.</p>
              </div>

              <div className="space-y-1.5">
                <Label className="flex items-center gap-1.5 text-sm font-medium">
                  <FileText className="w-3.5 h-3.5" /> Bio
                </Label>
                <Textarea
                  {...register("bio")}
                  placeholder="Tell the community about yourself..."
                  data-testid="input-bio"
                  className="min-h-[90px] resize-none"
                  maxLength={500}
                />
                <p className="text-xs text-muted-foreground">Max 500 characters.</p>
              </div>

              <div className="flex gap-3 pt-1">
                <Button
                  type="submit"
                  disabled={updateProfile.isPending || !isDirty}
                  data-testid="button-save-settings"
                  className="gap-1.5"
                >
                  {updateProfile.isPending
                    ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving...</>
                    : <><Save className="w-3.5 h-3.5" /> Save Changes</>}
                </Button>
                {isDirty && (
                  <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}>
                    <Button type="button" variant="outline" onClick={() => reset()} disabled={updateProfile.isPending}>
                      Discard
                    </Button>
                  </motion.div>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </motion.div>
  );
}
