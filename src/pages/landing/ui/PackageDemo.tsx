// pages/landing/ui/PackageDemo.tsx
// Tanlangan paket uchun jonli demo (bosganda qanday ishlashini ko'rsatadi).

import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { Button } from '@/shared/ui/Button';
import type { PackageDemo as DemoType } from '@/pages/landing/lib/packageCatalog';

const emailSchema = z.object({
  email: z.string().email('Email noto\'g\'ri formatda'),
});

async function fetchDemoData(): Promise<{ message: string; at: string }> {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  const json = (await res.json()) as { id: number; title: string; completed: boolean };
  await new Promise((r) => setTimeout(r, 400));
  return {
    message: `GET /todos/1 → "${json.title.slice(0, 40)}..."`,
    at: new Date().toLocaleTimeString('uz-UZ'),
  };
}

type Props = { demo: DemoType };

export function PackageDemo({ demo }: Props) {
  if (!demo) return null;

  return (
    <div className="mt-4 rounded-lg border border-dashed border-blue-200 bg-blue-50/50 p-4">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-blue-700">
        Jonli demo
      </p>
      {demo === 'button' && <ButtonDemo />}
      {demo === 'zod' && <ZodDemo />}
      {demo === 'query' && <QueryDemo />}
      {demo === 'router' && <RouterDemo />}
    </div>
  );
}

function ButtonDemo() {
  const [log, setLog] = useState<string[]>([]);

  const handleClick = (variant: 'primary' | 'secondary') => {
    setLog((prev) => [
      `${new Date().toLocaleTimeString('uz-UZ')} — "${variant}" bosildi: onClick handler ishladi, sahifa qayta yuklanmadi.`,
      ...prev.slice(0, 2),
    ]);
  };

  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-600">
        Tugma bosilganda <code className="rounded bg-white px-1">onClick</code> chaqiriladi.
        Variant faqat className ni o&apos;zgartiradi — biznes logikasi tashqarida.
      </p>
      <div className="flex flex-wrap gap-2">
        <Button type="button" onClick={() => handleClick('primary')}>
          Primary
        </Button>
        <Button type="button" variant="secondary" onClick={() => handleClick('secondary')}>
          Secondary
        </Button>
      </div>
      {log.length > 0 && (
        <ul className="space-y-1 text-sm text-gray-700">
          {log.map((line, i) => (
            <li key={i} className="rounded bg-white px-2 py-1 font-mono text-xs">
              {line}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ZodDemo() {
  const [email, setEmail] = useState('');
  const [result, setResult] = useState<{ ok: true } | { ok: false; errors: string[] } | null>(
    null,
  );

  const validate = () => {
    const parsed = emailSchema.safeParse({ email });
    if (parsed.success) {
      setResult({ ok: true });
    } else {
      setResult({
        ok: false,
        errors: parsed.error.errors.map((e) => e.message),
      });
    }
  };

  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-600">
        <code className="rounded bg-white px-1">safeParse</code> — forma yuborilmasdan oldin
        runtime da tekshiradi. Noto&apos;g&apos;ri data API ga ketmaydi.
      </p>
      <div className="flex gap-2">
        <input
          className="flex-1 rounded border bg-white px-3 py-2 text-sm"
          placeholder="email@misol.uz"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setResult(null);
          }}
        />
        <Button type="button" onClick={validate}>
          Tekshirish
        </Button>
      </div>
      {result?.ok === true && (
        <p className="text-sm text-green-700">✓ Valid — bu email schema ga mos.</p>
      )}
      {result?.ok === false && (
        <ul className="text-sm text-red-600">
          {result.errors.map((err) => (
            <li key={err}>✗ {err}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

function QueryDemo() {
  const queryClient = useQueryClient();
  const { data, isLoading, isFetching, dataUpdatedAt } = useQuery({
    queryKey: ['landing-demo'],
    queryFn: fetchDemoData,
    staleTime: 30_000,
  });

  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-600">
        Birinchi bosish — <code className="rounded bg-white px-1">queryFn</code> ishlaydi (~800ms).
        Ikkinchi marta 30s ichida — cache dan, tezroq.
      </p>
      <Button
        type="button"
        disabled={isFetching}
        onClick={() => queryClient.invalidateQueries({ queryKey: ['landing-demo'] })}
      >
        {isFetching ? 'Yuklanmoqda...' : 'Qayta yuklash (invalidate)'}
      </Button>
      {isLoading && !data && <p className="text-sm text-gray-500">Birinchi yuklash...</p>}
      {data && (
        <p className="rounded bg-white px-2 py-1 text-sm">
          {data.message} — <span className="text-gray-500">{data.at}</span>
          {dataUpdatedAt > 0 && (
            <span className="ml-2 text-xs text-gray-400">
              (cache: {new Date(dataUpdatedAt).toLocaleTimeString('uz-UZ')})
            </span>
          )}
        </p>
      )}
    </div>
  );
}

function RouterDemo() {
  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-600">
        <code className="rounded bg-white px-1">Link</code> — URL o&apos;zgaradi, lekin brauzer
        butun sahifani qayta yuklamaydi. Faqat kerakli Page komponenti almashtiriladi.
      </p>
      <div className="flex flex-wrap gap-2">
        <Link to="/dashboard">
          <Button type="button">/dashboard</Button>
        </Link>
        <Link to="/login">
          <Button type="button" variant="secondary">
            /login
          </Button>
        </Link>
        <Link to="/">
          <Button type="button" variant="secondary">
            / (landing)
          </Button>
        </Link>
      </div>
    </div>
  );
}
