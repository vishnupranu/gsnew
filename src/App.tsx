import { useEffect, useRef, useState } from 'react';
import type { ComponentType, CSSProperties } from 'react';
import type { Difficulty, TabKey } from './types';
import { APPS, COURSES } from './data';
import { useStore } from './store/useStore';
import { Icon } from './design/icons';
import { Avatar, Badge, Modal, Toast } from './components/ui';
import ErrorBoundary from './components/ErrorBoundary';

import Learn from './apps/Learn';
import Events from './apps/Events';
import Profile from './apps/Profile';
import Work from './apps/Work';
import Workspace from './apps/Workspace';
import Workflows from './apps/Workflows';
import Earn from './apps/Earn';
import Extras from './apps/Extras';
import Onboarding from './apps/Onboarding';

const VIEWS: Record<string, ComponentType> = {
  learn: Learn,
  events: Events,
  profile: Profile,
  work: Work,
  workspace: Workspace,
  workflows: Workflows,
  earn: Earn,
  extras: Extras,
  onboarding: Onboarding,
};

const TABS: { key: TabKey; label: string }[] = [
  { key: 'learn', label: 'Learn' },
  { key: 'work', label: 'Work' },
  { key: 'earn', label: 'Earn' },
];

export default function App() {
  const activeApp = useStore(s => s.activeApp);
  const openApp = useStore(s => s.openApp);
  const user = useStore(s => s.user);
  const settings = useStore(s => s.settings);
  const updateSettings = useStore(s => s.updateSettings);
  const searchOpen = useStore(s => s.searchOpen);
  const setSearchOpen = useStore(s => s.setSearchOpen);
  const settingsOpen = useStore(s => s.settingsOpen);
  const setSettingsOpen = useStore(s => s.setSettingsOpen);
  const toast = useStore(s => s.toast);
  const clearToast = useStore(s => s.clearToast);
  const notifications = useStore(s => s.notifications);

  const [query, setQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);

  const app = APPS.find(a => a.id === activeApp) ?? APPS[0];
  const ActiveView = VIEWS[app.id] ?? Learn;
  const unread = notifications.filter(n => !n.read).length;

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(clearToast, 2800);
    return () => window.clearTimeout(t);
  }, [toast, clearToast]);

  useEffect(() => {
    if (!searchOpen) return;
    setQuery('');
    const raf = window.requestAnimationFrame(() => searchRef.current?.focus());
    return () => window.cancelAnimationFrame(raf);
  }, [searchOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target;
      const typing =
        target instanceof HTMLElement &&
        (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable);
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setSettingsOpen(false);
        setSearchOpen(true);
        return;
      }
      if (!typing && event.key === '/') {
        event.preventDefault();
        setSettingsOpen(false);
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [setSearchOpen, setSettingsOpen]);

  const q = query.trim().toLowerCase();
  const appHits = q ? APPS.filter(a => `${a.name} ${a.desc}`.toLowerCase().includes(q)) : [];
  const courseHits = q ? COURSES.filter(c => `${c.title} ${c.author}`.toLowerCase().includes(q)) : [];

  return (
    <div className="app-shell" data-theme={settings.theme}>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <aside className="sidebar">
        <div className="sidebar-brand">
          <span className="brand-mark" />
          <span className="brand-name">GuideSoft</span>
        </div>

        <nav className="sidebar-nav" aria-label="Apps">
          {TABS.map(t => (
            <div className="sidebar-group" key={t.key}>
              <button
                type="button"
                className="sidebar-group-label"
                onClick={() => {
                  const first = APPS.find(a => a.tab === t.key);
                  if (first) openApp(first.id);
                }}
              >
                {t.label}
              </button>
              <div className="sidebar-group-links">
                {APPS.filter(a => a.tab === t.key).map(a => (
                  <button
                    key={a.id}
                    type="button"
                    className={`sidebar-link${a.id === app.id ? ' active' : ''}`}
                    style={{ '--accent': a.color } as CSSProperties}
                    aria-label={a.name}
                    aria-current={a.id === app.id ? 'page' : undefined}
                    onClick={() => openApp(a.id)}
                  >
                    <Icon name={a.icon} size={18} />
                    <span>{a.name}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="sidebar-user">
          <Avatar name={user.name} size={40} />
          <div className="sidebar-user-info">
            <strong>{user.name}</strong>
            <span>{user.role}</span>
          </div>
          <Badge>Lv {user.level}</Badge>
        </div>
      </aside>

      <div className="app-frame">
        <header className="topbar">
          <div className="topbar-title">
            <h2>{app.name}</h2>
            <p>{app.desc}</p>
          </div>
          <div className="topbar-actions">
            <button
              type="button"
              className="icon-btn notif-btn"
              aria-label={unread > 0 ? `Notifications, ${unread} unread` : 'Notifications'}
              onClick={() => {
                setSearchOpen(false);
                setSettingsOpen(false);
                openApp('profile');
              }}
            >
              <Icon name="bell" size={18} />
              {unread > 0 && <span className="notif-badge">{unread}</span>}
            </button>
            <button
              type="button"
              className="icon-btn"
              aria-label="Search"
              onClick={() => {
                setSettingsOpen(false);
                setSearchOpen(true);
              }}
            >
              <Icon name="search" size={18} />
            </button>
            <button
              type="button"
              className="icon-btn"
              aria-label="Settings"
              onClick={() => {
                setSearchOpen(false);
                setSettingsOpen(true);
              }}
            >
              <Icon name="settings" size={18} />
            </button>
          </div>
        </header>

        <main className="app-main" id="main-content" tabIndex={-1}>
          <ErrorBoundary key={app.id}>
            <ActiveView />
          </ErrorBoundary>
        </main>
      </div>

      <Modal open={searchOpen} onClose={() => setSearchOpen(false)} title="Search" width={560}>
        <div className="search-box">
          <Icon name="search" size={16} />
          <input
            ref={searchRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search apps and courses…"
            aria-label="Search apps and courses"
            autoComplete="off"
          />
        </div>
        {q === '' ? (
          <p className="search-hint">Type to search across apps and the course catalog.</p>
        ) : (
          <div className="search-results">
            {appHits.length > 0 && (
              <div className="search-group">
                <h4>Apps</h4>
                {appHits.map(a => (
                  <button
                    key={a.id}
                    type="button"
                    className="search-item"
                    onClick={() => {
                      openApp(a.id);
                      setSearchOpen(false);
                    }}
                  >
                    <span className="search-item-icon" style={{ background: `${a.color}1a`, color: a.color }}>
                      <Icon name={a.icon} size={16} />
                    </span>
                    <span className="search-item-text">
                      <strong>{a.name}</strong>
                      <small>{a.desc}</small>
                    </span>
                  </button>
                ))}
              </div>
            )}
            {courseHits.length > 0 && (
              <div className="search-group">
                <h4>Courses</h4>
                {courseHits.map(c => (
                  <button
                    key={c.id}
                    type="button"
                    className="search-item"
                    onClick={() => {
                      openApp('learn');
                      setSearchOpen(false);
                    }}
                  >
                    <span className="search-item-icon" style={{ background: `${c.color}1a`, color: c.color }}>
                      <Icon name="book" size={16} />
                    </span>
                    <span className="search-item-text">
                      <strong>{c.title}</strong>
                      <small>{c.author}</small>
                    </span>
                  </button>
                ))}
              </div>
            )}
            {appHits.length === 0 && courseHits.length === 0 && (
              <p className="search-empty">No results for “{query}”.</p>
            )}
          </div>
        )}
      </Modal>

      <Modal open={settingsOpen} onClose={() => setSettingsOpen(false)} title="Settings">
        <div className="settings-body">
          <div className="settings-field">
            <span className="settings-label">Appearance</span>
            <div className="settings-seg">
              {(['light', 'dark'] as const).map(mode => (
                <button
                  key={mode}
                  type="button"
                  className={settings.theme === mode ? 'active' : ''}
                  onClick={() => updateSettings({ theme: mode })}
                >
                  {mode === 'light' ? 'Light' : 'Dark'}
                </button>
              ))}
            </div>
          </div>

          <div className="settings-field">
            <span className="settings-label">Focus tab</span>
            <div className="settings-seg">
              {TABS.map(t => (
                <button
                  key={t.key}
                  type="button"
                  className={settings.focus === t.key ? 'active' : ''}
                  onClick={() => updateSettings({ focus: t.key })}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="settings-field">
            <span className="settings-label">Difficulty</span>
            <div className="settings-seg">
              {[1, 2, 3].map(n => (
                <button
                  key={n}
                  type="button"
                  className={settings.difficulty === n ? 'active' : ''}
                  onClick={() => updateSettings({ difficulty: n as Difficulty })}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          <ToggleRow
            label="Autoplay lessons"
            sub="Advance to the next lesson automatically"
            on={settings.autoplay}
            onChange={v => updateSettings({ autoplay: v })}
          />
          <ToggleRow
            label="Email reminders"
            sub="Notifications for due tasks and events"
            on={settings.email}
            onChange={v => updateSettings({ email: v })}
          />
          <ToggleRow
            label="Push notifications"
            sub="Instant alerts on new content"
            on={settings.push}
            onChange={v => updateSettings({ push: v })}
          />
          <ToggleRow
            label="Weekly digest"
            sub="A Sunday summary of your progress"
            on={settings.digest}
            onChange={v => updateSettings({ digest: v })}
          />
        </div>
      </Modal>

      {toast && (
        <div className="toast-wrap">
          <Toast kind={toast.tone}>{toast.message}</Toast>
        </div>
      )}
    </div>
  );
}

function ToggleRow({
  label,
  sub,
  on,
  onChange,
}: {
  label: string;
  sub: string;
  on: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button type="button" className="settings-row" onClick={() => onChange(!on)}>
      <span className="settings-row-text">
        <strong>{label}</strong>
        <small>{sub}</small>
      </span>
      <span className={`toggle${on ? ' on' : ''}`} aria-hidden="true">
        <i />
      </span>
    </button>
  );
}