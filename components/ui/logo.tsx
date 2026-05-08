import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  textClassName?: string;
  iconOnly?: boolean;
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
}

const MARK_COLOR = '#D97757';

function JusMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
      <rect x="4.5" y="3.5" width="23" height="25" rx="3.5" stroke={MARK_COLOR} strokeWidth="2.8" fill="none" />
      <path d="M11 10.5H21" stroke={MARK_COLOR} strokeWidth="2.8" strokeLinecap="round" />
      <path d="M16 10.5V19C16 20.933 14.433 22.5 12.5 22.5" stroke={MARK_COLOR} strokeWidth="2.8" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ className, textClassName, iconOnly = false, variant = 'dark', size = 'md' }: LogoProps) {
  const textColor = variant === 'dark' ? 'text-ink' : 'text-white';
  const sizeMap = {
    sm: { icon: 'h-[22px] w-[22px]', text: 'text-[20px]', gap: 'gap-1' },
    md: { icon: 'h-[26px] w-[26px]', text: 'text-[23px]', gap: 'gap-1' },
    lg: { icon: 'h-[32px] w-[32px]', text: 'text-[28px]', gap: 'gap-1.5' },
  };
  const s = sizeMap[size];

  if (iconOnly) {
    return (
      <div className={cn('flex items-center justify-center', className)}>
        <JusMark className={s.icon} />
      </div>
    );
  }

  return (
    <div className={cn('flex items-center', s.gap, className)}>
      <JusMark className={s.icon} />
      <span
        className={cn('tracking-[-0.028em] font-semibold leading-none', s.text, textColor, textClassName)}
        style={{ fontFeatureSettings: '"locl", "ss01", "cv11"' }}
      >
        Juspilot
      </span>
    </div>
  );
}
