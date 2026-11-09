import { useMemo } from 'react';
import type { Task, TaskStatus } from '../types';
import { TODAY } from '../data';
import { useStore } from '../store/useStore';
import { Icon } from '../design/icons';
import { Badge, Card, ProgressBar, SectionHead } from '../components/ui';

const COLUMNS: { status: TaskStatus; title: string }[] = [
  { status: 'todo', title: 'To do' },
  { status: 'in_progress', title: 'In progress' },
  { status: 'done', title: 'Done' },
];

const PRIORITY_TONE: Record<Task['priority'], 'solid' | 'outline' | 'soft'> = {
  high: 'solid',
  medium: 'outline',
  low: 'soft',
};

export default function Work() {
  const tasks = useStore((s) => s.tasks);
  const setTaskStatus = useStore((s) => s.setTaskStatus);
  const showToast = useStore((s) => s.showToast);

  const done = tasks.filter((task) => task.status === 'done').length;
  const open = tasks.length - done;
  const inProgress = tasks.filter((task) => task.status === 'in_progress').length;
  const pct = tasks.length ? (done / tasks.length) * 100 : 0;
  const highPriority = tasks.filter((task) => task.priority === 'high' && task.status !== 'done').length;

  const summary = useMemo(
    () => `${open} open task${open === 1 ? '' : 's'}`,
    [open],
  );

  const move = (task: Task, direction: -1 | 1) => {
    const order: TaskStatus[] = ['todo', 'in_progress', 'done'];
    const index = order.indexOf(task.status);
    const next = order[Math.min(order.length - 1, Math.max(0, index + direction))];
    if (next === task.status) return;
    setTaskStatus(task.id, next);
    if (next !== 'done') showToast('Task moved', 'info');
  };

  return (
    <div className="app-page">
      <div className="app-hero">
        <h1>Work</h1>
        <p>Move important work forward with one clear next step.</p>
      </div>

      <SectionHead
        title="This week"
        sub={summary}
        action={
          <Badge tab="work" tone="soft">
            {highPriority} high priority
          </Badge>
        }
      />

      <div className="work-summary">
        <Card hover={false} className="work-summary-card">
          <span>Open</span>
          <strong>{open}</strong>
        </Card>
        <Card hover={false} className="work-summary-card">
          <span>In progress</span>
          <strong>{inProgress}</strong>
        </Card>
        <Card hover={false} className="work-summary-card">
          <span>Done</span>
          <strong>{done}</strong>
        </Card>
        <Card hover={false} className="work-summary-card work-progress">
          <div>
            <span>Completion</span>
            <strong>{Math.round(pct)}%</strong>
          </div>
          <ProgressBar value={pct} tab="work" height={8} />
        </Card>
      </div>

      <div className="kanban-grid">
        {COLUMNS.map((column) => {
          const columnTasks = tasks.filter((task) => task.status === column.status);
          return (
            <section key={column.status} className="kanban-column" aria-label={column.title}>
              <div className="kanban-head">
                <h3>{column.title}</h3>
                <span>{columnTasks.length}</span>
              </div>

              {columnTasks.length === 0 && <p className="kanban-empty">No tasks here.</p>}

              {columnTasks.map((task) => {
                const overdue = task.status !== 'done' && task.due < TODAY;
                return (
                  <Card key={task.id} className={`task-card priority-${task.priority}`}>
                    <div className="task-card-top">
                      <Badge tab="work" tone={PRIORITY_TONE[task.priority]}>
                        {task.priority}
                      </Badge>
                      <div className="task-actions">
                        <button
                          type="button"
                          className="task-move"
                          aria-label={`Move ${task.title} back`}
                          disabled={task.status === 'todo'}
                          onClick={() => move(task, -1)}
                        >
                          <Icon name="chevronLeft" size={14} />
                        </button>
                        <button
                          type="button"
                          className="task-move"
                          aria-label={`Move ${task.title} forward`}
                          disabled={task.status === 'done'}
                          onClick={() => move(task, 1)}
                        >
                          <Icon name="chevronRight" size={14} />
                        </button>
                      </div>
                    </div>
                    <h4>{task.title}</h4>
                    <p>{task.project}</p>
                    <div className="task-card-meta">
                      <span className={overdue ? 'task-due overdue' : 'task-due'}>
                        <Icon name="clock" size={13} /> {overdue ? 'Overdue' : 'Due'}{' '}
                        {new Intl.DateTimeFormat('en-IN', { month: 'short', day: 'numeric' }).format(
                          new Date(`${task.due}T00:00:00`),
                        )}
                      </span>
                    </div>
                  </Card>
                );
              })}
            </section>
          );
        })}
      </div>
    </div>
  );
}
