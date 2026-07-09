"use client";

import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button, Input, Label, Textarea } from "@/components/ui";
import { getApiErrorMessage } from "@/lib/api";
import { contactFormSchema, type ContactFormValues } from "@/lib/contact-schema";
import { submitContact } from "@/services/contact.service";

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: submitContact,
    onSuccess: (response) => {
      toast.success(response.message ?? "Pesan berhasil dikirim");
      reset();
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Gagal mengirim pesan"));
    },
  });

  const onSubmit = (values: ContactFormValues) => {
    mutation.mutate(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="space-y-2">
        <Label htmlFor="name" required>
          Nama
        </Label>
        <Input id="name" placeholder="Nama lengkap" error={Boolean(errors.name)} {...register("name")} />
        {errors.name && <p className="text-caption text-red-600">{errors.name.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" required>
          Email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="nama@email.com"
          error={Boolean(errors.email)}
          {...register("email")}
        />
        {errors.email && <p className="text-caption text-red-600">{errors.email.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject" required>
          Subjek
        </Label>
        <Input
          id="subject"
          placeholder="Perihal pesan"
          error={Boolean(errors.subject)}
          {...register("subject")}
        />
        {errors.subject && <p className="text-caption text-red-600">{errors.subject.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" required>
          Pesan
        </Label>
        <Textarea
          id="message"
          rows={5}
          placeholder="Tulis pesan Anda di sini..."
          error={Boolean(errors.message)}
          {...register("message")}
        />
        {errors.message && <p className="text-caption text-red-600">{errors.message.message}</p>}
      </div>

      <Button type="submit" className="w-full sm:w-auto" disabled={mutation.isPending}>
        {mutation.isPending ? "Mengirim..." : "Kirim Pesan"}
      </Button>
    </form>
  );
}
