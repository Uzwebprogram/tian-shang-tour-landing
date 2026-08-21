// pages/landing/ui/PackageExplorer.tsx
// Paketlar ro'yxati + tanlanganda nima uchun / qanday ishlashi.

import { useState } from 'react';
import {
  categoryLabels,
  packages,
  type PackageCategory,
  type PackageInfo,
} from '@/pages/landing/lib/packageCatalog';
import { PackageDemo } from '@/pages/landing/ui/PackageDemo';

const categories: PackageCategory[] = ['runtime', 'data', 'routing', 'build', 'style', 'quality'];

export function PackageExplorer() {
  const [selectedId, setSelectedId] = useState(packages[0]?.id ?? '');
  const [filter, setFilter] = useState<PackageCategory | 'all'>('all');

  const filtered = filter === 'all' ? packages : packages.filter((p) => p.category === filter);
  const selected = packages.find((p) => p.id === selectedId) ?? packages[0];

  return (
    <section className="mb-16">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-semibold">Paketlar va tanlov sabablari</h2>
        <p className="mt-2 text-sm text-gray-600">
          Paketni bosing — nima uchun tanlangan, qanday ishlaydi va qayerda ishlatiladi.
        </p>
      </div>

      <div className="mb-4 flex flex-wrap justify-center gap-2">
        <FilterChip active={filter === 'all'} onClick={() => setFilter('all')}>
          Hammasi
        </FilterChip>
        {categories.map((cat) => (
          <FilterChip key={cat} active={filter === cat} onClick={() => setFilter(cat)}>
            {categoryLabels[cat]}
          </FilterChip>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <ul className="grid max-h-[420px] gap-2 overflow-y-auto sm:grid-cols-2 lg:grid-cols-1">
          {filtered.map((pkg) => (
            <li key={pkg.id}>
              <PackageListItem
                pkg={pkg}
                active={selected?.id === pkg.id}
                onSelect={() => setSelectedId(pkg.id)}
              />
            </li>
          ))}
        </ul>

        {selected && <PackageDetail pkg={selected} />}
      </div>
    </section>
  );
}

function FilterChip({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
        active
          ? 'bg-blue-600 text-white'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {children}
    </button>
  );
}

function PackageListItem({
  pkg,
  active,
  onSelect,
}: {
  pkg: PackageInfo;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full rounded-lg border p-3 text-left transition-shadow ${
        active
          ? 'border-blue-500 bg-blue-50 shadow-sm ring-1 ring-blue-500'
          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <code className="text-sm font-semibold text-gray-900">{pkg.name}</code>
        <span className="shrink-0 rounded bg-gray-100 px-1.5 py-0.5 text-[10px] uppercase text-gray-500">
          {categoryLabels[pkg.category]}
        </span>
      </div>
      <p className="mt-1 line-clamp-2 text-xs text-gray-600">{pkg.summary}</p>
      {pkg.demo && (
        <span className="mt-2 inline-block text-[10px] font-medium text-blue-600">
          ● Jonli demo bor
        </span>
      )}
    </button>
  );
}

function PackageDetail({ pkg }: { pkg: PackageInfo }) {
  return (
    <article className="rounded-xl border bg-white p-5 shadow-sm">
      <header className="mb-4 border-b pb-4">
        <code className="text-lg font-bold text-blue-700">{pkg.name}</code>
        <p className="mt-1 text-sm text-gray-600">{pkg.summary}</p>
        <p className="mt-2 text-xs text-gray-500">
          Loyihada: <span className="font-mono">{pkg.usedIn}</span>
        </p>
      </header>

      <DetailBlock title="Nima uchun tanlangan?">
        <ul className="list-inside list-disc space-y-1 text-sm text-gray-700">
          {pkg.whyChosen.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </DetailBlock>

      <DetailBlock title="Qanday ishlaydi?">
        <ol className="list-inside list-decimal space-y-1 text-sm text-gray-700">
          {pkg.howItWorks.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </DetailBlock>

      <PackageDemo demo={pkg.demo} />
    </article>
  );
}

function DetailBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <h3 className="mb-2 text-sm font-semibold text-gray-900">{title}</h3>
      {children}
    </div>
  );
}
