import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Plus, Edit, Search, User, Shield, Building2 } from "lucide-react";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { User as UserType } from "@shared/schema";

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [editingUser, setEditingUser] = useState<UserType | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const { data: users = [] } = useQuery<UserType[]>({
    queryKey: ['/api/admin/users'],
  });

  const saveUserMutation = useMutation({
    mutationFn: async (user: Partial<UserType>) => {
      const method = user.id ? 'PATCH' : 'POST';
      const url = user.id ? `/api/admin/users/${user.id}` : '/api/admin/users';
      return apiRequest(method, url, user);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/users'] });
      setEditingUser(null);
      setIsCreating(false);
    },
  });

  const mockUsers: UserType[] = [
    { id: '1', username: 'admin', password: '***', role: 'admin', name: 'System Admin', createdAt: new Date() },
    { id: '2', username: 'labadmin', password: '***', role: 'lab_admin', name: 'Lab Manager', createdAt: new Date() },
    { id: '3', username: 'ahmed', password: '***', role: 'user', name: 'Ahmed Al Maktoum', createdAt: new Date() },
    { id: '4', username: 'sarah', password: '***', role: 'user', name: 'Sarah Johnson', createdAt: new Date() },
    { id: '5', username: 'mohammed', password: '***', role: 'user', name: 'Mohammed Hassan', createdAt: new Date() },
  ];

  const displayUsers = users.length > 0 ? users : mockUsers;

  const filteredUsers = displayUsers.filter(user => {
    const matchesSearch = !searchTerm || 
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getRoleBadge = (role: string | null) => {
    const styles: Record<string, { bg: string; icon: React.ReactNode }> = {
      admin: { bg: 'bg-red-500/20 text-red-400', icon: <Shield className="w-3 h-3 mr-1" /> },
      lab_admin: { bg: 'bg-purple-500/20 text-purple-400', icon: <Building2 className="w-3 h-3 mr-1" /> },
      user: { bg: 'bg-blue-500/20 text-blue-400', icon: <User className="w-3 h-3 mr-1" /> },
    };
    const style = styles[role || 'user'] || styles.user;
    return (
      <Badge className={`${style.bg} flex items-center`}>
        {style.icon}
        {role === 'lab_admin' ? 'Lab Admin' : role}
      </Badge>
    );
  };

  return (
    <AdminLayout title="Users" subtitle="Manage platform users and roles">
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-800 border-slate-700 text-white"
                data-testid="input-search-users"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-40 bg-slate-800 border-slate-700 text-white" data-testid="select-role-filter">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="lab_admin">Lab Admin</SelectItem>
                <SelectItem value="user">User</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={() => setIsCreating(true)} className="bg-blue-600 hover:bg-blue-700" data-testid="button-add-user">
            <Plus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>

        <div className="bg-slate-800/50 rounded-2xl border border-slate-700 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-700/30">
                <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-6 py-4">User</th>
                <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-6 py-4">Username</th>
                <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-6 py-4">Role</th>
                <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-6 py-4">Created</th>
                <th className="text-right text-xs font-medium text-slate-400 uppercase tracking-wider px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-700/20" data-testid={`row-user-${user.id}`}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center text-white font-bold">
                        {user.name?.charAt(0) || user.username.charAt(0).toUpperCase()}
                      </div>
                      <p className="font-medium text-white">{user.name || user.username}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400">@{user.username}</td>
                  <td className="px-6 py-4">{getRoleBadge(user.role)}</td>
                  <td className="px-6 py-4 text-sm text-slate-400">
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button size="icon" variant="ghost" className="text-slate-400 hover:text-white" onClick={() => setEditingUser(user)} data-testid={`button-edit-user-${user.id}`}>
                      <Edit className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={!!editingUser || isCreating} onOpenChange={() => { setEditingUser(null); setIsCreating(false); }}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle>{editingUser ? 'Edit User' : 'Create User'}</DialogTitle>
          </DialogHeader>
          <UserForm 
            user={editingUser} 
            onSave={(data) => saveUserMutation.mutate(data)}
            isPending={saveUserMutation.isPending}
            isEditing={!!editingUser}
          />
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}

function UserForm({ user, onSave, isPending, isEditing }: { user: UserType | null; onSave: (data: Partial<UserType>) => void; isPending: boolean; isEditing: boolean }) {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    username: user?.username || '',
    password: '',
    role: user?.role || 'user',
  });

  return (
    <div className="space-y-4">
      <div>
        <Label>Full Name</Label>
        <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="bg-slate-700 border-slate-600" data-testid="input-user-name" />
      </div>
      <div>
        <Label>Username</Label>
        <Input value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} className="bg-slate-700 border-slate-600" disabled={isEditing} data-testid="input-user-username" />
      </div>
      {!isEditing && (
        <div>
          <Label>Password</Label>
          <Input type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="bg-slate-700 border-slate-600" data-testid="input-user-password" />
        </div>
      )}
      <div>
        <Label>Role</Label>
        <Select value={formData.role} onValueChange={(v) => setFormData({ ...formData, role: v })}>
          <SelectTrigger className="bg-slate-700 border-slate-600" data-testid="select-user-role">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="user">User</SelectItem>
            <SelectItem value="lab_admin">Lab Admin</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <DialogFooter>
        <Button onClick={() => onSave({ ...user, ...formData })} disabled={isPending} className="bg-blue-600 hover:bg-blue-700" data-testid="button-save-user">
          {isPending ? 'Saving...' : 'Save User'}
        </Button>
      </DialogFooter>
    </div>
  );
}
