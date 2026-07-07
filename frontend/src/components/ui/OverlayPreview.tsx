"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Button, Drawer, Modal } from "@/components/ui";

export function OverlayPreview() {
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="space-y-6 rounded-rmi bg-surface p-6 shadow-soft">
      <div className="flex flex-wrap gap-3">
        <Button variant="outline" onClick={() => setModalOpen(true)}>
          Buka Modal
        </Button>
        <Button variant="outline" onClick={() => setDrawerOpen(true)}>
          Buka Drawer
        </Button>
        <Button onClick={() => toast.success("Berhasil disimpan!")}>Toast Success</Button>
        <Button variant="secondary" onClick={() => toast.error("Terjadi kesalahan.")}>
          Toast Error
        </Button>
      </div>

      <p className="text-caption text-foreground/60">
        Modal &amp; Drawer bisa ditutup dengan tombol X, klik backdrop, atau tombol ESC.
      </p>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Konfirmasi">
        <p className="text-body text-foreground/80">
          Apakah Anda yakin ingin menghapus artikel ini? Tindakan ini tidak dapat dibatalkan.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setModalOpen(false)}>
            Batal
          </Button>
          <Button onClick={() => setModalOpen(false)}>Hapus</Button>
        </div>
      </Modal>

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="Menu">
        <nav className="flex flex-col gap-2">
          {["Beranda", "Tentang Kami", "Program", "Artikel", "Kontak"].map((item) => (
            <button
              key={item}
              type="button"
              className="rounded-rmi px-3 py-2 text-left text-body text-foreground transition-colors hover:bg-primary/10 hover:text-primary"
              onClick={() => setDrawerOpen(false)}
            >
              {item}
            </button>
          ))}
        </nav>
      </Drawer>
    </div>
  );
}
