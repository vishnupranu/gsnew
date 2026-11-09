import { useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import type { EventItem } from '../types';
import { useStore } from '../store/useStore';
import { Icon } from '../design/icons';
import { Badge, Button, Card, EmptyState, SectionHead } from '../components/ui';

type EventFilter = 'all' | EventItem['type'];

const FILTERS: { key: EventFilter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'live', label: 'Live' },
  { key: 'workshop', label: 'Workshops' },
  { key: 'meetup', label: 'Meetups' },
  { key: 'bootcamp', label: 'Bootcamps' },
];

const TYPE_ICON: Record<EventItem['type'], string> = {
  live: 'play',
  workshop: 'laptop',
  meetup: 'users',
  bootcamp: 'graduation',
};

export default function Events() {
  const events = useStore((s) => s.events);
  const toggleEventEnroll = useStore((s) => s.toggleEventEnroll);
  const showToast = useStore((s) => s.showToast);
  const [filter, setFilter] = useState<EventFilter>('all');

  const enrolled = useMemo(() => events.filter((event) => event.enrolled).length, [events]);
  const visible = filter === 'all' ? events : events.filter((event) => event.type === filter);

  return (
    <div className="app-page">
      <div className="app-hero">
        <h1>Events</h1>
        <p>Join live sessions, practical workshops, and focused meetups.</p>
      </div>

      <SectionHead
        title="Upcoming sessions"
        sub={`${enrolled} saved to your schedule`}
        action={
          <Badge tab="learn" tone="soft">
            India Standard Time
          </Badge>
        }
      />

      <div className="events-filter" role="group" aria-label="Filter events by type">
        {FILTERS.map((item) => (
          <button
            key={item.key}
            type="button"
            className={`chip${filter === item.key ? ' active' : ''}`}
            aria-pressed={filter === item.key}
            onClick={() => setFilter(item.key)}
          >
            {item.label}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <EmptyState
          icon={<Icon name="calendar" size={24} />}
          title="No events in this category"
          sub="Try another filter, or check back when new sessions are announced."
          action={
            <Button variant="outline" onClick={() => setFilter('all')}>
              Show all events
            </Button>
          }
        />
      ) : (
        <div className="app-grid">
          {visible.map((event) => (
            <Card
              key={event.id}
              className={`event-card${event.enrolled ? ' enrolled' : ''}`}
              style={{ '--accent': event.color } as CSSProperties}
            >
              <div className="event-card-top">
                <div className="event-type">
                  <span
                    className="event-type-icon"
                    style={{ color: event.color, background: `${event.color}1a` }}
                  >
                    <Icon name={TYPE_ICON[event.type]} size={15} />
                  </span>
                  <Badge tab="learn" tone="soft">
                    {event.type}
                  </Badge>
                </div>
                <span className="event-date">
                  {new Intl.DateTimeFormat('en-IN', { month: 'short', day: 'numeric' }).format(
                    new Date(`${event.date}T00:00:00`),
                  )}{' '}
                  · {event.time}
                </span>
              </div>

              <h3>{event.title}</h3>
              <p className="learn-card-desc">{event.description}</p>

              <div className="event-actions">
                <Button
                  tab="learn"
                  variant={event.enrolled ? 'outline' : 'primary'}
                  onClick={() => {
                    toggleEventEnroll(event.id);
                    showToast(
                      event.enrolled ? `Removed from ${event.title}` : `You joined ${event.title}`,
                      event.enrolled ? 'info' : 'success',
                    );
                  }}
                >
                  {event.enrolled ? 'Saved to schedule' : 'Save your seat'}
                </Button>
                <button
                  className="icon-text-button"
                  type="button"
                  onClick={() => showToast(`Reminder set for ${event.title}`, 'success')}
                >
                  <Icon name="bell" size={15} /> Remind me
                </button>
              </div>

              {event.enrolled && (
                <span className="event-enrolled">
                  <Icon name="check" size={13} /> On your schedule
                </span>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
