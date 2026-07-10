"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  Badge,
  Button,
  EmptyState,
  Input,
  Label,
  Modal,
  Select,
  SkeletonList,
} from "@/components/ui";
import {
  AdminRowActions,
  AdminEditButton,
  AdminDeleteButton,
  AdminToggleActiveButton,
} from "@/components/admin/AdminRowActions";
import { useAuth } from "@/hooks/useAuth";
import { useUsers } from "@/hooks/useUsers";
import { getApiErrorMessage } from "@/lib/api";
import { queryKeys } from "@/lib/query-keys";
import {
  userCreateFormSchema,
  userEditFormSchema,
  type UserCreateFormValues,
  type UserEditFormValues,
} from "@/lib/user-form-schema";
import { createUser, deleteUser, updateUser } from "@/services/users.service";
import type { AdminUserListItem } from "@/types/api";

const ROLE_LABELS = {
  admin: "Admin",
  superadmin: "Super Admin",
} as const;

export function AdminPenggunaList() {
  const queryClient = useQueryClient();
  const { user: currentUser } = useAuth();
  const { data, isLoading, isError, error, refetch } = useUsers();
  const [deleteTarget, setDeleteTarget] = useState<AdminUserListItem | null>(null);
  const [editTarget, setEditTarget] = useState<AdminUserListItem | null>(null);
  const [createOpen, setCreateOpen] = useState(false);

  const createForm = useForm<UserCreateFormValues>({
    resolver: zodResolver(userCreateFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "admin",
      isActive: true,
    },
  });

  const editForm = useForm<UserEditFormValues>({
    resolver: zodResolver(userEditFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "admin",
      isActive: true,
    },
  });

  useEffect(() => {
    if (!editTarget) return;
    editForm.reset({
      name: editTarget.name,
      email: editTarget.email,
      password: "",
      role: editTarget.role,
      isActive: editTarget.isActive,
    });
  }, [editTarget, editForm]);

  const invalidate = () => {
    void queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
  };

  const createMutation = useMutation({
    mutationFn: (values: UserCreateFormValues) =>
      createUser({
        name: values.name,
        email: values.email,
        password: values.password,
        role: values.role,
        isActive: values.isActive,
      }),
    onSuccess: (response) => {
      toast.success(response.message ?? "Pengguna berhasil dibuat");
      setCreateOpen(false);
      createForm.reset({
        name: "",
        email: "",
        password: "",
        role: "admin",
        isActive: true,
      });
      invalidate();
    },
    onError: (err) => toast.error(getApiErrorMessage(err)),
  });

  const updateMutation = useMutation({
    mutationFn: (values: UserEditFormValues) => {
      if (!editTarget) throw new Error("Tidak ada pengguna");
      return updateUser(editTarget.id, {
        name: values.name,
        email: values.email,
        role: values.role,
        isActive: values.isActive,
        ...(values.password ? { password: values.password } : {}),
      });
    },
    onSuccess: (response) => {
      toast.success(response.message ?? "Pengguna berhasil diperbarui");
      setEditTarget(null);
      invalidate();
    },
    onError: (err) => toast.error(getApiErrorMessage(err)),
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      updateUser(id, { isActive }),
    onSuccess: (_res, variables) => {
      toast.success(variables.isActive ? "Pengguna diaktifkan" : "Pengguna dinonaktifkan");
      invalidate();
    },
    onError: (err) => toast.error(getApiErrorMessage(err)),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => {
      toast.success("Pengguna berhasil dihapus");
      setDeleteTarget(null);
      invalidate();
    },
    onError: (err) => toast.error(getApiErrorMessage(err)),
  });

  const items = data ?? [];

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button
          onClick={() => {
            createForm.reset({
              name: "",
              email: "",
              password: "",
              role: "admin",
              isActive: true,
            });
            setCreateOpen(true);
          }}
        >
          Tambah Pengguna
        </Button>
      </div>

      {isLoading ? (
        <SkeletonList count={4} />
      ) : isError ? (
        <EmptyState
          title="Gagal memuat pengguna"
          description={getApiErrorMessage(error)}
          actionLabel="Coba lagi"
          onAction={() => refetch()}
        />
      ) : items.length === 0 ? (
        <EmptyState
          title="Belum ada pengguna"
          description="Buat akun admin baru untuk mengelola CMS."
          actionLabel="Tambah Pengguna"
          onAction={() => setCreateOpen(true)}
        />
      ) : (
        <div className="overflow-x-auto rounded-rmi border border-foreground/10 bg-background">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-foreground/10 bg-surface/80 text-[11px] font-medium uppercase tracking-wide text-foreground/55">
              <tr>
                <th className="px-3.5 py-2.5 font-medium">Nama</th>
                <th className="px-3.5 py-2.5 font-medium">Email</th>
                <th className="px-3.5 py-2.5 font-medium">Role</th>
                <th className="px-3.5 py-2.5 font-medium">Status</th>
                <th className="px-3.5 py-2.5 font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => {
                const isSelf = currentUser?.id === item.id;
                return (
                  <tr key={item.id} className="border-b border-foreground/5 transition-colors hover:bg-surface/70 last:border-0">
                    <td className="px-3.5 py-2.5">
                      <p className="font-medium text-heading">{item.name}</p>
                      {isSelf ? (
                        <p className="text-caption text-foreground/50">Anda</p>
                      ) : null}
                    </td>
                    <td className="px-3.5 py-2.5 text-foreground/70">{item.email}</td>
                    <td className="px-3.5 py-2.5">
                      <Badge variant={item.role === "superadmin" ? "success" : "default"}>
                        {ROLE_LABELS[item.role]}
                      </Badge>
                    </td>
                    <td className="px-3.5 py-2.5">
                      <Badge variant={item.isActive ? "success" : "warning"}>
                        {item.isActive ? "aktif" : "nonaktif"}
                      </Badge>
                    </td>
                    <td className="px-3.5 py-2.5">
                      <AdminRowActions>
                        <AdminEditButton onClick={() => setEditTarget(item)} />
                        <AdminToggleActiveButton
                          active={item.isActive}
                          disabled={toggleMutation.isPending || isSelf}
                          onClick={() =>
                            toggleMutation.mutate({
                              id: item.id,
                              isActive: !item.isActive,
                            })
                          }
                        />
                        <AdminDeleteButton
                          disabled={isSelf}
                          onClick={() => setDeleteTarget(item)}
                        />
                      </AdminRowActions>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={createOpen} onClose={() => setCreateOpen(false)} title="Tambah Pengguna">
        <form
          onSubmit={createForm.handleSubmit((values) => createMutation.mutate(values))}
          className="space-y-4"
          noValidate
        >
          <div className="space-y-2">
            <Label htmlFor="create-name" required>
              Nama
            </Label>
            <Input
              id="create-name"
              error={Boolean(createForm.formState.errors.name)}
              {...createForm.register("name")}
            />
            {createForm.formState.errors.name && (
              <p className="text-caption text-red-600">
                {createForm.formState.errors.name.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="create-email" required>
              Email
            </Label>
            <Input
              id="create-email"
              type="email"
              error={Boolean(createForm.formState.errors.email)}
              {...createForm.register("email")}
            />
            {createForm.formState.errors.email && (
              <p className="text-caption text-red-600">
                {createForm.formState.errors.email.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="create-password" required>
              Password
            </Label>
            <Input
              id="create-password"
              type="password"
              autoComplete="new-password"
              error={Boolean(createForm.formState.errors.password)}
              {...createForm.register("password")}
            />
            {createForm.formState.errors.password && (
              <p className="text-caption text-red-600">
                {createForm.formState.errors.password.message}
              </p>
            )}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="create-role" required>
                Role
              </Label>
              <Select id="create-role" {...createForm.register("role")}>
                <option value="admin">Admin</option>
                <option value="superadmin">Super Admin</option>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="create-active" required>
                Status
              </Label>
              <Select
                id="create-active"
                {...createForm.register("isActive", {
                  setValueAs: (value) => value === "true" || value === true,
                })}
              >
                <option value="true">Aktif</option>
                <option value="false">Nonaktif</option>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setCreateOpen(false)}>
              Batal
            </Button>
            <Button type="submit" disabled={createMutation.isPending}>
              {createMutation.isPending ? "Menyimpan..." : "Buat"}
            </Button>
          </div>
        </form>
      </Modal>

      <Modal open={Boolean(editTarget)} onClose={() => setEditTarget(null)} title="Edit Pengguna">
        <form
          onSubmit={editForm.handleSubmit((values) => updateMutation.mutate(values))}
          className="space-y-4"
          noValidate
        >
          <div className="space-y-2">
            <Label htmlFor="edit-name" required>
              Nama
            </Label>
            <Input
              id="edit-name"
              error={Boolean(editForm.formState.errors.name)}
              {...editForm.register("name")}
            />
            {editForm.formState.errors.name && (
              <p className="text-caption text-red-600">{editForm.formState.errors.name.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-email" required>
              Email
            </Label>
            <Input
              id="edit-email"
              type="email"
              error={Boolean(editForm.formState.errors.email)}
              {...editForm.register("email")}
            />
            {editForm.formState.errors.email && (
              <p className="text-caption text-red-600">{editForm.formState.errors.email.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-password">Password baru (opsional)</Label>
            <Input
              id="edit-password"
              type="password"
              autoComplete="new-password"
              placeholder="Kosongkan jika tidak diubah"
              error={Boolean(editForm.formState.errors.password)}
              {...editForm.register("password")}
            />
            {editForm.formState.errors.password && (
              <p className="text-caption text-red-600">
                {editForm.formState.errors.password.message}
              </p>
            )}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="edit-role" required>
                Role
              </Label>
              <Select
                id="edit-role"
                disabled={currentUser?.id === editTarget?.id}
                {...editForm.register("role")}
              >
                <option value="admin">Admin</option>
                <option value="superadmin">Super Admin</option>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-active" required>
                Status
              </Label>
              <Select
                id="edit-active"
                disabled={currentUser?.id === editTarget?.id}
                {...editForm.register("isActive", {
                  setValueAs: (value) => value === "true" || value === true,
                })}
              >
                <option value="true">Aktif</option>
                <option value="false">Nonaktif</option>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setEditTarget(null)}>
              Batal
            </Button>
            <Button type="submit" disabled={updateMutation.isPending}>
              {updateMutation.isPending ? "Menyimpan..." : "Simpan"}
            </Button>
          </div>
        </form>
      </Modal>

      <Modal open={Boolean(deleteTarget)} onClose={() => setDeleteTarget(null)} title="Hapus pengguna?">
        <p className="text-body text-foreground/80">
          Akun <strong>{deleteTarget?.name}</strong> ({deleteTarget?.email}) akan dihapus permanen.
        </p>
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="outline" onClick={() => setDeleteTarget(null)}>
            Batal
          </Button>
          <Button
            disabled={deleteMutation.isPending}
            onClick={() => {
              if (deleteTarget) deleteMutation.mutate(deleteTarget.id);
            }}
          >
            {deleteMutation.isPending ? "Menghapus..." : "Hapus"}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
