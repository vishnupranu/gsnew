import { useMemo } from 'react';
import type { Earning } from '../types';
import { useStore } from '../store/useStore';
import { Icon } from '../design/icons';
import { Card, EmptyState, SectionHead, Stat } from '../components/ui';

const KIND_META: Record<Earning['kind'], { icon: string; color: string; label: string }> = {
  course: { icon: 'book', color: '#2fd4a3', label: 'Course' },
  coach: { icon: 'users', color: '#a78bfa', label: 'Coaching' },
  product: { icon: 'package', color: '#38bdf8', label: 'Product' },
  referral: { icon: 'link', color: '#ffc861', label: 'Referral' },
};

export default function Earn() {
  const earnings = useStore((s) => s.earnings);
  const total = useMemo(
    () => earnings.reduce((sum, earning) => sum + earning.amount, 0),
    [earnings],
  );
  const latest = earnings[0];
  const sources = new Set(earnings.map((earning) => earning.kind)).size;

  return (
    <div className="app-page">
      <div className="app-hero">
        <h1>Earn</h1>
        <p>Track the small, repeatable offers that turn expertise into income.</p>
      </div>

      <div className="stat-grid">
        <Stat
          tab="earn"
          label="Total earned"
          value={`$${total.toLocaleString()}`}
          icon={<Icon name="dollar" size={18} />}
        />
        <Stat
          tab="earn"
          label="Revenue sources"
          value={sources}
          icon={<Icon name="grid" size={18} />}
        />
        <Stat
          tab="earn"
          label="Latest deposit"
          value={latest ? `$${latest.amount.toLocaleString()}` : '—'}
          icon={<Icon name="trendingUp" size={18} />}
        />
      </div>

      <SectionHead title="Recent activity" sub="A clear record of what is working." tab="earn" />

      {earnings.length === 0 ? (
        <EmptyState
          icon={<Icon name="wallet" size={24} />}
          title="No earnings yet"
          sub="Course sales, coaching, products, and referrals will show up here."
        />
      ) : (
        <div className="earnings-list">
          {earnings.map((earning) => {
            const meta = KIND_META[earning.kind];
            return (
              <Card key={earning.id} className="earning-row">
                <div
                  className="earning-icon"
                  style={{ color: meta.color, background: `${meta.color}1a` }}
                  aria-label={meta.label}
                >
                  <Icon name={meta.icon} size={17} />
                </div>
                <div className="earning-copy">
                  <h3>{earning.source}</h3>
                  <p>
                    {earning.detail} ·{' '}
                    {new Intl.DateTimeFormat('en-IN', { month: 'short', day: 'numeric' }).format(
                      new Date(`${earning.date}T00:00:00`),
                    )}
                  </p>
                </div>
                <span className="earning-kind">{meta.label}</span>
                <strong>${earning.amount.toLocaleString()}</strong>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
