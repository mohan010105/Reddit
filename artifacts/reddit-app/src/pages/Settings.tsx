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
import { Settings as SettingsIcon } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const schema = z.object({
  username: z.string().min(3).max(20).regex(/^[a-zA-Z0-9_]+$/).optional(),
  bio: z.string().max(500).optional(),
  avatarUrl: z.string().url().optional().or(z.literal("")),
});
type FormData = z.infer<typeof schema>;

export default function Settings() {
  const { session } = useAuth();
  const queryClient = useQueryClient();
  const { data: me, isLoading } = useGetMe({ query: { enabled: !!session } });
  const updateProfile = useUpdateMyProfile();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (me) reset({ username: me.username, bio: me.bio ?? "", avatarUrl: me.avatarUrl ?? "" });
  }, [me, reset]);

  const onSubmit = (data: FormData) => {
    updateProfile.mutate({ data: { username: data.username, bio: data.bio || null, avatarUrl: data.avatarUrl || null } }, {
      onSuccess: () => {
        toast.success("Profile updated!");
        queryClient.invalidateQueries({ queryKey: getGetMeQueryKey() });
      },
      onError: () => toast.error("Failed to update profile"),
    });
  };

  return (
    <div className="flex flex-col gap-4 max-w-lg">
      <h1 className="text-xl font-bold flex items-center gap-2">
        <SettingsIcon className="w-5 h-5 text-primary" /> Settings
      </h1>

      <div className="bg-card border border-card-border rounded-xl p-6">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-16 w-16 rounded-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        ) : (
          <>
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="w-16 h-16">
                <AvatarImage src={me?.avatarUrl ?? undefined} />
                <AvatarFallback className="text-2xl font-bold bg-primary text-primary-foreground">
                  {me?.username?.[0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">u/{me?.username}</p>
                <p className="text-sm text-muted-foreground">{me?.karma.toLocaleString()} karma</p>
              </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <div>
                <Label>Username</Label>
                <Input {...register("username")} data-testid="input-username" />
                {errors.username && <p className="text-destructive text-xs mt-1">{errors.username.message}</p>}
              </div>
              <div>
                <Label>Bio</Label>
                <Textarea {...register("bio")} placeholder="Tell us about yourself..." data-testid="input-bio" />
              </div>
              <div>
                <Label>Avatar URL</Label>
                <Input {...register("avatarUrl")} placeholder="https://example.com/avatar.jpg" data-testid="input-avatar-url" />
              </div>
              <Button type="submit" disabled={updateProfile.isPending} data-testid="button-save-settings">
                {updateProfile.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
