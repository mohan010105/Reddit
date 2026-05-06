import { useState } from "react";
import { useListAdminUsers, useUpdateUserRole, useBanUser, getListAdminUsersQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Ban, ChevronLeft } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

export default function AdminUsers() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const { data, isLoading } = useListAdminUsers({ page, limit: 20 });
  const updateRole = useUpdateUserRole();
  const banUser = useBanUser();

  const invalidate = () => queryClient.invalidateQueries({ queryKey: getListAdminUsersQueryKey() });

  const handleRoleChange = (username: string, role: "user" | "moderator" | "admin") => {
    updateRole.mutate({ username, data: { role } }, {
      onSuccess: () => { toast.success("Role updated"); invalidate(); },
      onError: () => toast.error("Failed to update role"),
    });
  };

  const handleBan = (username: string, isBanned: boolean) => {
    banUser.mutate({ username, data: { banned: !isBanned } }, {
      onSuccess: () => { toast.success(isBanned ? "User unbanned" : "User banned"); invalidate(); },
      onError: () => toast.error("Action failed"),
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Link href="/admin"><Button variant="ghost" size="icon"><ChevronLeft className="w-4 h-4" /></Button></Link>
        <h1 className="text-xl font-bold flex items-center gap-2"><Shield className="w-5 h-5 text-primary" /> Manage Users</h1>
      </div>

      <div className="bg-card border border-card-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted/40">
              <tr>
                <th className="text-left p-3 font-medium text-muted-foreground">User</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Role</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Karma</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Joined</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
                <th className="text-right p-3 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-border">
                    <td className="p-3"><Skeleton className="h-8 w-40" /></td>
                    <td className="p-3"><Skeleton className="h-8 w-24" /></td>
                    <td className="p-3"><Skeleton className="h-6 w-16" /></td>
                    <td className="p-3"><Skeleton className="h-6 w-20" /></td>
                    <td className="p-3"><Skeleton className="h-6 w-16" /></td>
                    <td className="p-3"><Skeleton className="h-8 w-20 ml-auto" /></td>
                  </tr>
                ))
              ) : data?.data.map(user => (
                <tr key={user.id} className="border-b border-border last:border-b-0 hover:bg-muted/20 transition-colors" data-testid={`row-user-${user.id}`}>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-7 h-7">
                        <AvatarImage src={user.avatarUrl ?? undefined} />
                        <AvatarFallback className="text-xs">{user.username[0].toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.username}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <Select defaultValue={user.role} onValueChange={v => handleRoleChange(user.username, v as any)}>
                      <SelectTrigger className="w-32 h-7 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="moderator">Moderator</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="p-3 text-muted-foreground">{user.karma.toLocaleString()}</td>
                  <td className="p-3 text-muted-foreground text-xs">{formatDistanceToNow(new Date(user.createdAt), { addSuffix: true })}</td>
                  <td className="p-3">
                    <Badge variant={user.isBanned ? "destructive" : "secondary"}>
                      {user.isBanned ? "Banned" : "Active"}
                    </Badge>
                  </td>
                  <td className="p-3 text-right">
                    <Button
                      size="sm" variant="outline"
                      className={`h-7 text-xs gap-1 ${user.isBanned ? "" : "text-destructive hover:text-destructive"}`}
                      onClick={() => handleBan(user.username, user.isBanned)}
                      data-testid={`button-ban-${user.id}`}
                    >
                      <Ban className="w-3 h-3" /> {user.isBanned ? "Unban" : "Ban"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {data?.hasMore && (
          <div className="p-3 border-t border-border flex justify-center">
            <Button variant="outline" size="sm" onClick={() => setPage(p => p + 1)}>Load More</Button>
          </div>
        )}
      </div>
    </div>
  );
}
