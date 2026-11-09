import React, { ReactNode, useEffect, useId, useRef } from 'react';
import { GRADIENTS, RADIUS, SPACING, ANIMATION, tabPalette } from '../design/tokens';

let modalLockCount = 0;
let previousBodyOverflow = '';

/** Color stop of the tri-color brand system */
export type TabKey = 'learn' | 'work' | 'earn';

/** Reusable badge keyed to the tri-color system */
export function Badge({
  children,
  tab,
  tone = 'soft',
  className = '',
  style,
}: {
  children: ReactNode;
  tab?: TabKey;
  tone?: 'soft' | 'solid' | 'outline';
  className?: string;
  style?: React.CSSProperties;
}) {
  const key = tab ?? 'learn';
  const c = tabPalette[key];
  return (
    <span
      className={`badge badge-${tone} ${className}`}
      style={{ '--accent': c, ...style } as React.CSSProperties}
    >
      {children}
    </span>
  );
}

/** Difficulty / level indication */
export function LevelMeter({ level }: { level: number }) {
  return (
    <span className="level-meter" aria-label={`difficulty ${level}/3`}>
      {[1, 2, 3].map((i) => (
        <i key={i} className={i <= level ? 'on' : ''} />
      ))}
    </span>
  );
}

/** Star rating display */
export function Stars({ rating = 0, count, size = 14 }: { rating?: number; count?: number; size?: number }) {
  return (
    <span className="stars">
      <span className="stars-fill" style={{ width: `${(rating / 5) * 100}%` }}>
        {'★★★★★'.split('').map((s, i) => (
          <span key={i} style={{ fontSize: size }}>{s}</span>
        ))}
      </span>
      <span className="stars-ghost">
        {'★★★★★'.split('').map((s, i) => (
          <span key={i} style={{ fontSize: size }}>{s}</span>
        ))}
      </span>
      {count !== undefined && <em className="stars-count">({count.toLocaleString()})</em>}
    </span>
  );
}

/** Progress bar, keyed to a tab color */
export function ProgressBar({
  value,
  tab = 'learn',
  height = 8,
  label,
}: {
  value: number;
  tab?: TabKey;
  height?: number;
  label?: string;
}) {
  const c = tabPalette[tab] ?? tabPalette.learn;
  return (
    <div
      className="progress"
      style={{ height }}
      role="progressbar"
      aria-label={label ?? 'Progress'}
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuetext={`${Math.round(value)}%`}
    >
      <div className="progress-fill" style={{ width: `${Math.min(100, Math.max(0, value))}%`, background: c }}>
        {label && <span className="progress-label">{label}</span>}
      </div>
    </div>
  );
}

/** Circular progress ring */
export function ProgressRing({ value, size = 56, stroke = 6, tab = 'learn', children }: {
  value: number;
  size?: number;
  stroke?: number;
  tab?: TabKey;
  children?: ReactNode;
}) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const off = circ - (Math.min(100, Math.max(0, value)) / 100) * circ;
  const c = tabPalette[tab] ?? tabPalette.learn;
  return (
    <div
      className="ring"
      style={{ width: size, height: size }}
      role="img"
      aria-label={`${Math.round(value)}% complete`}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(7,9,15,0.08)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={c}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={off}
          style={{ transition: `stroke-dashoffset ${ANIMATION.slow} ${ANIMATION.ease}` }}
        />
      </svg>
      <div className="ring-center">{children ?? `${Math.round(value)}%`}</div>
    </div>
  );
}

/** Versatile card wrapper */
export function Card({
  children,
  className = '',
  hover = true,
  pad = 'md',
  style,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  pad?: 'none' | 'sm' | 'md' | 'lg';
  style?: React.CSSProperties;
}) {
  return (
    <div className={`card card-${pad} ${hover ? 'card-hover' : ''} ${className}`} style={style}>
      {children}
    </div>
  );
}

/** Section header with optional action */
export function SectionHead({
  title,
  sub,
  action,
  tab = 'learn',
}: {
  title: string;
  sub?: string;
  action?: ReactNode;
  tab?: TabKey;
}) {
  const c = tabPalette[tab] ?? tabPalette.learn;
  return (
    <div className="section-head">
      <div>
        <h2 className="section-title" style={{ borderColor: c }}>{title}</h2>
        {sub && <p className="section-sub">{sub}</p>}
      </div>
      {action && <div className="section-action">{action}</div>}
    </div>
  );
}

/** Large stat block */
export function Stat({ label, value, icon, tab = 'learn' }: {
  label: string;
  value: ReactNode;
  icon?: ReactNode;
  tab?: TabKey;
}) {
  const c = tabPalette[tab] ?? tabPalette.learn;
  return (
    <Card className="stat" pad="md" hover={false} style={{ borderTop: `3px solid ${c}` }}>
      {icon && <span className="stat-icon" style={{ '--accent': c } as React.CSSProperties}>{icon}</span>}
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </Card>
  );
}

/** Avatar with initials, colored per tab */
export function Avatar({
  name,
  tab = 'learn',
  size = 36,
  src,
}: {
  name: string;
  tab?: TabKey;
  size?: number;
  src?: string;
}) {
  const c = tabPalette[tab] ?? tabPalette.learn;
  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();
  return src ? (
    <img className="avatar" src={src} alt={name} style={{ width: size, height: size }} />
  ) : (
    <span
      className="avatar avatar-initials"
      style={{ width: size, height: size, '--accent': c, fontSize: size * 0.4 } as React.CSSProperties}
    >
      {initials}
    </span>
  );
}

/** Empty state for lists with no content */
export function EmptyState({ icon, title, sub, action }: {
  icon?: ReactNode;
  title: string;
  sub?: string;
  action?: ReactNode;
}) {
  return (
    <div className="empty-state">
      {icon && <div className="empty-icon">{icon}</div>}
      <h3>{title}</h3>
      {sub && <p>{sub}</p>}
      {action && <div className="empty-action">{action}</div>}
    </div>
  );
}

/** Simple button with tone */
export function Button({
  children,
  tab = 'learn',
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  disabled,
  type = 'button',
  style,
}: {
  children: ReactNode;
  tab?: TabKey;
  variant?: 'primary' | 'ghost' | 'outline' | 'soft';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: 'button' | 'submit';
  style?: React.CSSProperties;
}) {
  const c = tabPalette[tab] ?? tabPalette.learn;
  return (
    <button
      type={type}
      className={`btn btn-${variant} btn-${size} ${className}`}
      style={{ '--accent': c, ...style } as React.CSSProperties}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

/** Modal shell with overlay */
export function Modal({
  open,
  onClose,
  title,
  children,
  width = 520,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  width?: number;
}) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const focusableSelector =
      'input:not([disabled]), textarea:not([disabled]), button:not([disabled]), [href], select:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const initial =
      panel?.querySelector<HTMLElement>(
        '[data-autofocus], input:not([disabled]), textarea:not([disabled]), select:not([disabled])',
      ) ?? panel?.querySelector<HTMLElement>(focusableSelector);
    (initial ?? panel)?.focus();

    if (modalLockCount === 0) previousBodyOverflow = document.body.style.overflow;
    modalLockCount += 1;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onCloseRef.current();
        return;
      }
      if (event.key !== 'Tab' || !panel) return;
      const items = Array.from(panel.querySelectorAll<HTMLElement>(focusableSelector)).filter(
        (element) => element.offsetParent !== null,
      );
      if (items.length === 0) {
        event.preventDefault();
        panel.focus();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      modalLockCount = Math.max(0, modalLockCount - 1);
      if (modalLockCount === 0) document.body.style.overflow = previousBodyOverflow;
      previous?.focus();
    };
  }, [open]);

  if (!open) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        ref={panelRef}
        tabIndex={-1}
        className="modal"
        style={{ maxWidth: width }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
      >
        <div className="modal-head">
          {title && <h3 id={titleId}>{title}</h3>}
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close dialog">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

/** Toast notification */
export function Toast({ kind = 'success', children }: { kind?: 'success' | 'error' | 'info'; children: ReactNode }) {
  const colors = { success: '#2fd4a3', error: '#f4522d', info: '#7c8cff' };
  const c = colors[kind];
  return (
    <div className="toast" role="status" aria-live="polite" style={{ borderLeftColor: c }}>
      <span className="toast-dot" style={{ background: c }} />
      <div className="toast-body">{children}</div>
    </div>
  );
}

/** Inline list of chips / tags */
export function Chips({ items, active, onSelect, tab = 'learn' }: {
  items: string[];
  active?: string | null;
  onSelect?: (v: string) => void;
  tab?: TabKey;
}) {
  const c = tabPalette[tab] ?? tabPalette.learn;
  return (
    <div className="chips">
      {items.map((it) => (
        <button
          key={it}
          type="button"
          className={`chip ${active === it ? 'active' : ''}`}
          style={active === it ? { background: c, color: '#fff' } : undefined}
          onClick={() => onSelect?.(it)}
        >
          {it}
        </button>
      ))}
    </div>
  );
}

/** Meta row with dot separators */
export function Meta({ items, color }: { items: ReactNode[]; color?: string }) {
  return (
    <div className="meta" style={color ? { color } : undefined}>
      {items.filter(Boolean).map((it, i) => (
        <React.Fragment key={i}>
          {i > 0 && <i className="meta-dot" />}
          <span>{it}</span>
        </React.Fragment>
      ))}
    </div>
  );
}

export { GRADIENTS, RADIUS, SPACING };