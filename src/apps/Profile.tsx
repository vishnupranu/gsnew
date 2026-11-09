import type { CSSProperties } from 'react';
import type { NotificationKind } from '../types';
import { useStore } from '../store/useStore';
import { Icon } from '../design/icons';
import { Avatar, Badge, Button, Card, LevelMeter, ProgressBar, SectionHead } from '../components/ui';

const XP_PER_LEVEL = 1500;

const NOTIFICATION_ICON: Record<NotificationKind, string> = {
  info: 'info',
  success: 'checkCircle',
  alert: 'alertTriangle',
};

const NOTIFICATION_COLOR: Record<NotificationKind, string> = {
  info: '#7c8cff',
  success: '#2fd4a3',
  alert: '#fb923c',
};

export default function Profile() {
  const user = useStore((s) => s.user);
  const achievements = useStore((s) => s.achievements);
  const notifications = useStore((s) => s.notifications);
  const markNotificationsRead = useStore((s) => s.markNotificationsRead);
  const showToast = useStore((s) => s.showToast);

  const xpProgress = Math.min(100, (user.xp / XP_PER_LEVEL) * 100);
  const unread = notifications.filter((item) => !item.read).length;

  const stats = [
    { label: 'Day streak', value: user.streak, icon: 'flame', color: '#fb923c' },
    { label: 'Learning coins', value: user.coins, icon: 'coins', color: '#ffc861' },
    { label: 'Focus hearts', value: user.hearts, icon: 'heart', color: '#f472b6' },
    { label: 'Achievements', value: `${achievements.filter((item) => item.earned).length}/${achievements.length}`, icon: 'award', color: '#2fd4a3' },
  ];

  return (
    <div className="app-page">
      <div className="profile-hero">
        <Avatar name={user.name} size={72} tab="learn" />
        <div className="profile-identity">
          <p className="eyebrow">Your learning profile</p>
          <h1>{user.name}</h1>
          <div className="profile-meta">
            <span>{user.role}</span>
            <span className="profile-meta-dot" aria-hidden="true" />
            <Badge tab="learn" tone="soft">
              Level {user.level}
            </Badge>
            <LevelMeter level={Math.min(3, Math.max(1, Math.round(user.level / 4)))} />
          </div>
        </div>
      </div>

      <Card hover={false} className="profile-xp-card">
        <div className="profile-xp-head">
          <div>
            <p className="settings-label">Level {user.level}</p>
            <h2>{user.xp.toLocaleString()} XP</h2>
          </div>
          <span>{Math.max(0, XP_PER_LEVEL - user.xp).toLocaleString()} XP to the next level</span>
        </div>
        <ProgressBar value={xpProgress} tab="learn" height={10} />
      </Card>

      <div className="stat-grid profile-stats">
        {stats.map((stat) => (
          <Card
            key={stat.label}
            hover={false}
            className="profile-stat"
            style={{ '--accent': stat.color } as CSSProperties}
          >
            <span
              className="profile-stat-icon"
              style={{ color: stat.color, background: `${stat.color}1a` }}
            >
              <Icon name={stat.icon} size={18} />
            </span>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </Card>
        ))}
      </div>

      <SectionHead title="Achievements" sub="Progress markers earned through focused practice." />
      <div className="achievement-grid">
        {achievements.map((achievement) => (
          <Card
            key={achievement.id}
            hover={false}
            className={`achievement-card${achievement.earned ? ' earned' : ' unearned'}`}
          >
            <div
              className="achievement-icon"
              style={{ color: achievement.color, background: `${achievement.color}1a` }}
            >
              <Icon name={achievement.icon} size={19} />
            </div>
            <div className="achievement-copy">
              <h3>{achievement.label}</h3>
              <p>{achievement.earned ? 'Unlocked' : 'Keep going to unlock'}</p>
            </div>
            <span
              className={`achievement-state${achievement.earned ? ' earned' : ''}`}
              aria-label={achievement.earned ? 'Earned' : 'Locked'}
            >
              <Icon name={achievement.earned ? 'check' : 'lock'} size={14} />
            </span>
          </Card>
        ))}
      </div>

      <SectionHead
        title="Notifications"
        sub={unread > 0 ? `${unread} unread update${unread === 1 ? '' : 's'}` : 'You are all caught up.'}
        action={
          <Button
            variant="outline"
            size="sm"
            disabled={unread === 0}
            onClick={() => {
              markNotificationsRead();
              showToast('Notifications marked as read', 'success');
            }}
          >
            Mark all as read
          </Button>
        }
      />

      <div className="notification-list">
        {notifications.length === 0 ? (
          <Card hover={false}>
            <p className="empty-inline">No notifications yet.</p>
          </Card>
        ) : (
          notifications.map((notification) => (
            <Card
              key={notification.id}
              hover={false}
              className={`notification-row${notification.read ? '' : ' unread'}`}
            >
              <span
                className="notification-icon"
                style={{
                  color: NOTIFICATION_COLOR[notification.kind],
                  background: `${NOTIFICATION_COLOR[notification.kind]}1a`,
                }}
              >
                <Icon name={NOTIFICATION_ICON[notification.kind]} size={17} />
              </span>
              <div className="notification-copy">
                <h3>{notification.title}</h3>
                <p>{notification.body}</p>
              </div>
              <span className="notification-time">{notification.time}</span>
              {!notification.read && <span className="notification-dot" aria-label="Unread" />}
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
