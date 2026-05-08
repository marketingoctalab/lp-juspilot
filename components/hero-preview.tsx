'use client';

import * as React from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import {
  Briefcase, FileSignature, Scale, PenLine, FolderLock,
  Search, Bot, Home, ChevronDown, AlertTriangle, Plus,
  Sparkles, MousePointer2, type LucideIcon,
} from 'lucide-react';
import { useAutoplay } from '@/hooks/use-autoplay';

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ');
}

const COLUMNS = [
  { id: 'triagem',   label: 'Triagem',     accent: 'rgba(0,0,0,0.45)' },
  { id: 'analise',   label: 'Análise',     accent: 'hsl(var(--accent-orange))' },
  { id: 'execucao',  label: 'Em execução', accent: 'hsl(var(--accent-teal))' },
  { id: 'concluido', label: 'Concluído',   accent: 'hsl(var(--accent-green))' },
] as const;
type ColId = (typeof COLUMNS)[number]['id'];

interface CaseCard {
  id: string; title: string; area: string;
  areaTone: 'blue' | 'neutral' | 'warn' | 'teal' | 'purple';
  value?: string; people: number; daysLeft?: number;
}

const CASES: CaseCard[] = [
  { id: 'trab-1',     title: 'Ação trabalhista — Vara 5ª SP',        area: 'Trabalhista', areaTone: 'blue',    value: 'R$ 142.000', people: 2, daysLeft: 3 },
  { id: 'saas',       title: 'Revisão de contrato SaaS B2B',         area: 'Contratual',  areaTone: 'neutral', people: 1 },
  { id: 'tributario', title: 'Defesa tributária — ICMS-ST',           area: 'Tributário',  areaTone: 'purple',  value: 'R$ 1,2 M', people: 2 },
  { id: 'mna',        title: 'Due diligence M&A — Setor logístico',   area: 'Societário',  areaTone: 'teal',    value: 'R$ 8,4 M', people: 3, daysLeft: 12 },
  { id: 'consumidor', title: 'Ação consumerista — Class action',      area: 'Cível',       areaTone: 'neutral', value: 'R$ 480.000', people: 2 },
  { id: 'acordo',     title: 'Acordo extrajudicial — Cliente Varejo', area: 'Cível',       areaTone: 'warn',    value: 'R$ 320.000', people: 2, daysLeft: 1 },
  { id: 'previdencia',title: 'Revisão previdenciária INSS',           area: 'Previdência', areaTone: 'teal',    people: 1 },
];

const INITIAL_COLUMN: Record<string, ColId> = {
  'trab-1': 'triagem', 'saas': 'triagem', 'tributario': 'analise',
  'mna': 'analise', 'consumidor': 'execucao', 'acordo': 'execucao', 'previdencia': 'concluido',
};

const MOVEMENTS = [
  { cardId: 'saas',   to: 'analise'  as ColId, toast: 'Contrato SaaS · IA finalizou análise de riscos' },
  { cardId: 'mna',    to: 'execucao' as ColId, toast: 'Due diligence M&A · em execução' },
  { cardId: 'trab-1', to: 'analise'  as ColId, toast: 'Ação trabalhista · jurisprudência anexada' },
  { cardId: 'acordo', to: 'concluido'as ColId, toast: 'Acordo extrajudicial · contrato assinado' },
];

const SIDEBAR: { icon: LucideIcon; label: string; count?: number; active?: boolean; badge?: string }[] = [
  { icon: Home,          label: 'Início' },
  { icon: Briefcase,     label: 'Casos',         count: 42, active: true },
  { icon: FileSignature, label: 'Contratos',     count: 18 },
  { icon: PenLine,       label: 'Minutas' },
  { icon: Scale,         label: 'Jurisprudência' },
  { icon: FolderLock,    label: 'Data Room' },
  { icon: Bot,           label: 'Agentes IA',    badge: 'Novo' },
];

const ACTIVE_MATTERS = [
  { name: 'Ação trabalhista',  dot: 'hsl(var(--accent-teal))' },
  { name: 'Due diligence M&A', dot: 'hsl(var(--accent-orange))' },
  { name: 'Acordo Varejo',     dot: 'hsl(var(--accent-green))' },
];

const toneMap: Record<CaseCard['areaTone'], string> = {
  blue:    'bg-brand-badge-bg text-brand-badge-fg',
  neutral: 'bg-black/[0.05] text-ink',
  warn:    'bg-amber-50 text-amber-700',
  teal:    'bg-teal-50 text-teal-700',
  purple:  'bg-[hsl(var(--accent-purple)/0.08)] text-[hsl(var(--accent-purple))]',
};

function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

function useKanbanLoop(active: boolean, reduced: boolean) {
  const [positions, setPositions] = React.useState<Record<string, ColId>>(INITIAL_COLUMN);
  const [movingId, setMovingId] = React.useState<string | null>(null);
  const [toast, setToast] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!active || reduced) return;
    let cancelled = false;
    let step = 0;
    async function tick() {
      while (!cancelled) {
        await wait(2800);
        if (cancelled) return;
        const move = MOVEMENTS[step % MOVEMENTS.length];
        setMovingId(move.cardId);
        await wait(420);
        if (cancelled) return;
        setPositions((prev) => ({ ...prev, [move.cardId]: move.to }));
        setToast(move.toast);
        await wait(950);
        if (cancelled) return;
        setMovingId(null);
        await wait(2200);
        if (cancelled) return;
        setToast(null);
        step += 1;
        if (step % MOVEMENTS.length === 0) {
          await wait(1200);
          if (cancelled) return;
          setPositions(INITIAL_COLUMN);
        }
      }
    }
    tick();
    return () => { cancelled = true; };
  }, [active, reduced]);

  return { positions, movingId, toast };
}

function AppSidebar() {
  return (
    <aside className="hidden md:flex w-[208px] shrink-0 flex-col border-r border-[hsl(40_10%_90%)] bg-[hsl(40_20%_98%)] p-3">
      <div className="mb-3 flex items-center gap-2 px-2 py-1.5">
        <div className="grid h-6 w-6 place-items-center rounded-md bg-black text-[11px] font-bold text-white">J</div>
        <span className="text-[12.5px] font-semibold text-ink">Amaral Advocacia</span>
        <ChevronDown className="ml-auto h-3.5 w-3.5 text-warm-500" />
      </div>
      <div className="mb-3 flex items-center gap-2 rounded-md border border-[hsl(40_10%_90%)] bg-white px-2 py-1.5 text-[11.5px] text-warm-500">
        <Search className="h-3.5 w-3.5" />
        Buscar
        <span className="ml-auto rounded border border-[hsl(40_10%_88%)] px-1 font-mono text-[9px]">⌘K</span>
      </div>
      <nav className="flex flex-col gap-0.5">
        {SIDEBAR.map((item) => (
          <button key={item.label} type="button" className={cn(
            'flex items-center gap-2 rounded-md px-2 py-1.5 text-left text-[12px] transition-colors',
            item.active ? 'bg-[hsl(40_10%_94%)] text-ink' : 'text-warm-500 hover:bg-[hsl(40_10%_94%)] hover:text-ink',
          )}>
            <item.icon className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
            <span className="flex-1 truncate font-medium">{item.label}</span>
            {item.count !== undefined && <span className="text-[10px] tabular-nums text-ink-muted">{item.count}</span>}
            {item.badge && <span className="rounded-full bg-brand-badge-bg px-1.5 py-[1px] text-[9px] font-semibold text-brand-badge-fg">{item.badge}</span>}
          </button>
        ))}
      </nav>
      <div className="mt-4 border-t border-[hsl(40_10%_90%)] pt-3">
        <div className="mb-1.5 px-2 text-[9.5px] font-semibold uppercase tracking-[0.18em] text-ink-muted">Casos ativos</div>
        {ACTIVE_MATTERS.map((m) => (
          <button key={m.name} type="button" className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-[11.5px] text-warm-500 hover:bg-[hsl(40_10%_94%)] hover:text-ink">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: m.dot }} />
            <span className="truncate">{m.name}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}

function CardChip({ caseItem, isMoving }: { caseItem: CaseCard; isMoving: boolean }) {
  return (
    <motion.div
      layoutId={caseItem.id}
      layout
      initial={false}
      animate={isMoving
        ? { scale: 1.04, rotate: -1.2, boxShadow: '0 18px 38px rgba(15,23,42,0.18),0 6px 14px rgba(15,23,42,0.10)', zIndex: 20 }
        : { scale: 1, rotate: 0, boxShadow: '0 0 0 rgba(0,0,0,0)', zIndex: 1 }
      }
      transition={{
        layout: { type: 'spring', stiffness: 220, damping: 26, mass: 0.9 },
        scale: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
        rotate: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
        boxShadow: { duration: 0.3 },
      }}
      className={cn(
        'relative cursor-grab rounded-[8px] border border-[hsl(40_10%_88%)] bg-white p-2.5',
        isMoving && 'cursor-grabbing border-black/30',
      )}
    >
      <div className="mb-1.5 flex items-center gap-1.5">
        <span className={cn('rounded-[3px] px-1 py-[1px] text-[9.5px] font-semibold', toneMap[caseItem.areaTone])}>
          {caseItem.area}
        </span>
        {caseItem.daysLeft !== undefined && caseItem.daysLeft <= 3 && (
          <span className="inline-flex items-center gap-1 text-[9.5px] font-medium text-amber-600">
            <AlertTriangle className="h-2.5 w-2.5" />{caseItem.daysLeft}d
          </span>
        )}
      </div>
      <p className="line-clamp-2 text-[11.5px] font-medium leading-[1.35] text-ink">{caseItem.title}</p>
      {caseItem.value && <p className="mt-1.5 text-[10.5px] tabular-nums text-warm-500">{caseItem.value}</p>}
      <div className="mt-2 flex items-center gap-0.5">
        {Array.from({ length: caseItem.people }).map((_, p) => (
          <span key={p} className="-ml-1 h-4 w-4 rounded-full border border-white bg-gradient-to-br from-[hsl(var(--warm-300))] to-[hsl(var(--warm-500))] first:ml-0" />
        ))}
      </div>
    </motion.div>
  );
}

function KanbanBoard({ positions, movingId }: { positions: Record<string, ColId>; movingId: string | null }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col bg-white">
      <div className="flex shrink-0 items-center justify-between border-b border-[hsl(40_10%_90%)] bg-white px-5 py-3">
        <div>
          <div className="flex items-center gap-2 text-[10.5px] text-ink-muted"><span>Casos</span><span>·</span><span>Quadro</span></div>
          <div className="mt-0.5 flex items-center gap-2">
            <span className="text-[13px] font-semibold tracking-[-0.01em] text-ink">Pipeline jurídico</span>
            <span className="rounded bg-brand-badge-bg px-1.5 py-0.5 text-[10px] font-semibold text-brand-badge-fg">{CASES.length} casos</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <button type="button" className="rounded-md border border-[hsl(40_10%_90%)] bg-white px-2 py-1 text-[10.5px] font-medium text-ink hover:bg-[hsl(40_10%_96%)]">Filtrar</button>
          <button type="button" className="inline-flex items-center gap-1 rounded-md bg-black px-2 py-1 text-[10.5px] font-semibold text-white hover:bg-black/85">
            <Plus className="h-3 w-3" />Novo caso
          </button>
        </div>
      </div>
      <div className="grid flex-1 grid-cols-2 gap-2 p-3 lg:grid-cols-4">
        <LayoutGroup>
          {COLUMNS.map((col) => {
            const items = CASES.filter((c) => positions[c.id] === col.id);
            return (
              <div key={col.id} className="flex flex-col rounded-lg bg-[hsl(40_20%_98%)] p-2">
                <div className="mb-2 flex items-center justify-between px-1">
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: col.accent }} />
                    <span className="text-[10.5px] font-semibold text-ink">{col.label}</span>
                  </div>
                  <span className="text-[10px] tabular-nums text-ink-muted">{items.length}</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  {items.map((caseItem) => (
                    <CardChip key={caseItem.id} caseItem={caseItem} isMoving={movingId === caseItem.id} />
                  ))}
                  <button type="button" className="mt-0.5 flex items-center gap-1 rounded-md border border-dashed border-[hsl(40_10%_85%)] px-2 py-1 text-[10px] text-ink-muted hover:border-black/25 hover:text-warm-500">
                    <Plus className="h-3 w-3" />Novo
                  </button>
                </div>
              </div>
            );
          })}
        </LayoutGroup>
      </div>
    </div>
  );
}

function ToastNotification({ message }: { message: string | null }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.96 }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          className="absolute right-4 top-4 z-30 inline-flex items-center gap-2 rounded-lg border border-[hsl(40_10%_88%)] bg-white px-3 py-2 shadow-deep"
        >
          <span className="grid h-5 w-5 place-items-center rounded-full bg-brand-badge-bg text-brand">
            <Sparkles className="h-3 w-3" />
          </span>
          <span className="text-[11.5px] font-medium text-ink">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function MovingCursor({ movingId }: { movingId: string | null }) {
  return (
    <AnimatePresence>
      {movingId && (
        <motion.div
          key={movingId}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.18 }}
          aria-hidden
          className="pointer-events-none absolute z-30"
          style={{ left: '52%', top: '52%' }}
        >
          <div className="relative">
            <MousePointer2 className="h-4 w-4 fill-black text-black" />
            <span className="absolute left-4 top-3 whitespace-nowrap rounded-md bg-black px-1.5 py-0.5 text-[9.5px] font-semibold text-white shadow-card">
              você
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function HeroPreview() {
  const reduced = usePrefersReducedMotion();
  const [ref, active] = useAutoplay<HTMLDivElement>();
  const { positions, movingId, toast } = useKanbanLoop(active, reduced);

  return (
    <div ref={ref} className="relative">
      <div className="relative z-10 overflow-hidden rounded-[16px] border border-[hsl(40_10%_88%)] bg-white shadow-deep">
        <div className="flex" style={{ minHeight: 520 }}>
          <AppSidebar />
          <KanbanBoard positions={positions} movingId={movingId} />
        </div>
        <ToastNotification message={toast} />
        <MovingCursor movingId={movingId} />
      </div>
    </div>
  );
}
