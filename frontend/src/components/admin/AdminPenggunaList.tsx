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
  AdminIconButton,
  AdminToggleActiveButton,
} from "@/components/admin/AdminRowActions";
import { AdminUserAvatar } from "@/components/admin/AdminUserAvatar";
import {
  AdminDataTable,
  AdminPanel,
  AdminTableHead,
  AdminToolbar,
} from "@/components/admin/AdminChrome";
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
import { createUser, deleteUser, resendUserInvitation, updateUser } from "@/services/users.service";
import { normalizeRole, roleLabel } from "@/lib/roles";
import type { AdminUserListItem } from "@/types/api";

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
      role: "anggota",
    },
  });

  const editForm = useForm<UserEditFormValues>({
    resolver: zodResolver(userEditFormSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "anggota",
      isActive: true,
    },
  });

  useEffect(() => {
    if (!editTarget) return;
    editForm.reset({
      name: editTarget.name,
      email: editTarget.email,
      role: normalizeRole(editTarget.role),
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
        role: values.role,
      }),
    onSuccess: (response) => {
      toast.success(response.message ?? "Pengguna berhasil dibuat");
      setCreateOpen(false);
      createForm.reset({
        name: "",
        email: "",
        role: "anggota",
      });
      invalidate();
    },
    onError: (err) => {
      toast.error(getApiErrorMessage(err));
      invalidate();
    },
  });

  const updateMutation = useMutation({
    mutationFn: (values: UserEditFormValues) => {
      if (!editTarget) throw new Error("Tidak ada pengguna");
      return updateUser(editTarget.id, {
        name: values.name,
        email: values.email,
        role: values.role,
        isActive: values.isActive,
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

  const resendMutation = useMutation({
    mutationFn: (id: string) => resendUserInvitation(id),
    onSuccess: (response) => {
      toast.success(response.message ?? "Email undangan berhasil dikirim ulang");
      invalidate();
    },
    onError: (err) => toast.error(getApiErrorMessage(err)),
  });

  const items = data ?? [];

  return (
    <div className="space-y-5">
      <AdminToolbar className="sm:justify-end">
        <Button
          onClick={() => {
            createForm.reset({
              name: "",
              email: "",
              role: "anggota",
            });
            setCreateOpen(true);
          }}
        >
          Tambah Pengguna
        </Button>
      </AdminToolbar>

      {isLoading ? (
        <AdminPanel padding="sm">
          <SkeletonList count={4} />
        </AdminPanel>
      ) : isError ? (
        <AdminPanel>
          <EmptyState
            title="Gagal memuat pengguna"
            description={getApiErrorMessage(error)}
            actionLabel="Coba lagi"
            onAction={() => refetch()}
          />
        </AdminPanel>
      ) : items.length === 0 ? (
        <AdminPanel>
          <EmptyState
            title="Belum ada pengguna"
            description="Buat akun admin baru untuk mengelola CMS."
            actionLabel="Tambah Pengguna"
            onAction={() => setCreateOpen(true)}
          />
        </AdminPanel>
      ) : (
        <AdminDataTable>
          <AdminTableHead>
            <tr>
              <th className="px-3.5 py-2.5 font-medium">Nama</th>
              <th className="px-3.5 py-2.5 font-medium">Email</th>
              <th className="px-3.5 py-2.5 font-medium">Role</th>
              <th className="px-3.5 py-2.5 font-medium">Status</th>
              <th className="px-3.5 py-2.5 font-medium">Aksi</th>
            </tr>
          </AdminTableHead>
          <tbody>
            {items.map((item) => {
              const isSelf = currentUser?.id === item.id;
              return (
                <tr
                  key={item.id}
                  className="border-b border-foreground/5 transition-colors hover:bg-surface/70 last:border-0"
                >
                  <td className="px-3.5 py-2.5">
                    <div className="flex items-center gap-2.5">
                      <AdminUserAvatar name={item.name} avatar={item.avatar} size={32} />
                      <div>
                        <p className="font-medium text-heading">{item.name}</p>
                        {isSelf ? <p className="text-caption text-foreground/50">Anda</p> : null}
                      </div>
                    </div>
                  </td>
                  <td className="px-3.5 py-2.5 text-foreground/70">{item.email}</td>
                  <td className="px-3.5 py-2.5">
                    <Badge variant={item.role === "superadmin" ? "success" : "default"}>
                      {roleLabel(item.role)}
                    </Badge>
                  </td>
                  <td className="px-3.5 py-2.5">
                    <Badge
                      variant={
                        item.invitationStatus === "pending"
                          ? "warning"
                          : item.isActive
                            ? "success"
                            : "warning"
                      }
                    >
                      {item.invitationStatus === "pending"
                        ? "menunggu aktivasi"
                        : item.isActive
                          ? "aktif"
                          : "nonaktif"}
                    </Badge>
                  </td>
                  <td className="px-3.5 py-2.5">
                    <AdminRowActions>
                      {item.invitationStatus === "pending" ? (
                        <AdminIconButton
                          label="Kirim ulang undangan"
                          disabled={resendMutation.isPending}
                          onClick={() => resendMutation.mutate(item.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <path d="m22 2-7 20-4-9-9-4Z" />
                            <path d="M22 2 11 13" />
                          </svg>
                        </AdminIconButton>
                      ) : null}
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
                      <AdminDeleteButton disabled={isSelf} onClick={() => setDeleteTarget(item)} />
                    </AdminRowActions>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </AdminDataTable>
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
            <Label htmlFor="create-role" required>
              Role
            </Label>
            <Select id="create-role" {...createForm.register("role")}>
              <option value="anggota">Anggota</option>
              <option value="pengurus">Pengurus</option>
              <option value="superadmin">Super Admin</option>
            </Select>
          </div>
          <p className="text-caption leading-relaxed text-foreground/60">
            Pengguna akan menerima email berisi tautan untuk membuat password dan mengaktifkan akun.
          </p>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setCreateOpen(false)}>
              Batal
            </Button>
            <Button type="submit" disabled={createMutation.isPending}>
              {createMutation.isPending ? "Mengirim..." : "Kirim Undangan"}
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
                <option value="anggota">Anggota</option>
                <option value="pengurus">Pengurus</option>
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

      <Modal
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        title="Hapus pengguna?"
      >
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
