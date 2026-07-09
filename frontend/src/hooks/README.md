# Hooks — pola fetch data API

Infrastruktur integrasi backend (Sprint 29+).

## Struktur

```
src/
├── lib/api.ts              # Axios instance + error helper
├── lib/query-keys.ts       # Query key factory (TanStack Query)
├── services/               # Fungsi fetch per modul (tanpa React)
│   ├── health.service.ts
│   └── artikel.service.ts
└── hooks/                  # React Query hooks untuk komponen client
    ├── useHealth.ts
    ├── useArticles.ts
    └── useArticle.ts
```

## Menambah modul baru

1. **Types** — tambah response types di `src/types/api.ts`
2. **Service** — `src/services/<modul>.service.ts` memanggil `apiGet` / `api.post`
3. **Query keys** — daftarkan di `src/lib/query-keys.ts`
4. **Hook** — `src/hooks/use<Modul>.ts` membungkus `useQuery` / `useMutation`

## Contoh hook list + detail

```tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { fetchArtikelList } from "@/services/artikel.service";

export function useArticles(params?: { page?: number; limit?: number }) {
  return useQuery({
    queryKey: queryKeys.artikel.list(params),
    queryFn: () => fetchArtikelList(params),
  });
}
```

```tsx
const { data, isLoading, isError, error } = useArticles({ page: 1, limit: 10 });

if (isLoading) return <Spinner />;
if (isError) return <p>{getApiErrorMessage(error)}</p>;

return data?.items.map((item) => <ArticleCard key={item.id} article={item} />);
```

## Environment

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Verifikasi koneksi API

```tsx
import { useHealth } from "@/hooks";

function ApiStatus() {
  const { data } = useHealth();
  return <span>{data?.status}</span>; // "ok"
}
```

Backend harus berjalan di URL yang sama dengan `NEXT_PUBLIC_API_URL`.
