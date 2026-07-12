"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Button, Input, Label, Select } from "@/components/ui";
import { getApiErrorMessage } from "@/lib/api";
import { donasiFormSchema, type DonasiFormValues } from "@/lib/cms-support-form-schema";
import { queryKeys } from "@/lib/query-keys";
import { createDonasi, updateDonasi } from "@/services/donasi.service";
import type { DonasiListItem } from "@/types/api";

interface AdminDonasiFormProps {
  mode: "create" | "edit";
  initial?: DonasiListItem;
}

export function AdminDonasiForm({ mode, initial }: AdminDonasiFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DonasiFormValues>({
    resolver: zodResolver(donasiFormSchema),
    defaultValues: {
      bank: initial?.bank ?? "",
      accountNumber: initial?.accountNumber ?? "",
      accountName: initial?.accountName ?? "",
      order: initial?.order ?? 0,
      isActive: initial?.isActive ?? true,
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (values: DonasiFormValues) => {
      const payload = {
        bank: values.bank,
        accountNumber: values.accountNumber,
        accountName: values.accountName,
        order: values.order,
        isActive: values.isActive,
      };

      if (mode === "edit" && initial) {
        return updateDonasi(initial.id, payload);
      }

      return createDonasi(payload);
    },
    onSuccess: (response) => {
      toast.success(response.message ?? "Rekening donasi berhasil disimpan");
      void queryClient.invalidateQueries({ queryKey: queryKeys.donasi.all });
      router.push("/admin/donasi");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });

  return (
    <form
      onSubmit={handleSubmit((values) => saveMutation.mutate(values))}
      className="mx-auto max-w-2xl space-y-5 rounded-rmi border border-foreground/10 bg-background p-4 shadow-[0_1px_2px_rgba(20,32,10,0.04)] sm:p-5"
      noValidate
    >
      <div className="space-y-2">
        <Label htmlFor="bank" required>
          Nama Bank
        </Label>
        <Input
          id="bank"
          placeholder="Bank Syariah Indonesia (BSI)"
          error={Boolean(errors.bank)}
          {...register("bank")}
        />
        {errors.bank && <p className="text-caption text-red-600">{errors.bank.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="accountNumber" required>
          Nomor Rekening
        </Label>
        <Input
          id="accountNumber"
          placeholder="7123456789"
          error={Boolean(errors.accountNumber)}
          {...register("accountNumber")}
        />
        {errors.accountNumber && (
          <p className="text-caption text-red-600">{errors.accountNumber.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="accountName" required>
          Nama Akun Bank
        </Label>
        <Input
          id="accountName"
          placeholder="Remaja Masjid Istiqomah"
          error={Boolean(errors.accountName)}
          {...register("accountName")}
        />
        {errors.accountName && (
          <p className="text-caption text-red-600">{errors.accountName.message}</p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="order" required>
            Urutan
          </Label>
          <Input
            id="order"
            type="number"
            min={0}
            {...register("order", { valueAsNumber: true })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="isActive" required>
            Status
          </Label>
          <Select
            id="isActive"
            {...register("isActive", {
              setValueAs: (value) => value === "true" || value === true,
            })}
          >
            <option value="true">Aktif</option>
            <option value="false">Nonaktif</option>
          </Select>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 border-t border-foreground/10 pt-4">
        <Button type="submit" disabled={isSubmitting || saveMutation.isPending}>
          {saveMutation.isPending
            ? "Menyimpan..."
            : mode === "create"
              ? "Tambah Rekening"
              : "Simpan Perubahan"}
        </Button>
        <Button type="button" variant="outline" href="/admin/donasi">
          Batal
        </Button>
      </div>
    </form>
  );
}
