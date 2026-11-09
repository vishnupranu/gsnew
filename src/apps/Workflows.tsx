import type { CSSProperties } from 'react';
import { useStore } from '../store/useStore';
import { Icon } from '../design/icons';
import { Badge, Button, Card, EmptyState, ProgressBar, ProgressRing, SectionHead } from '../components/ui';

export default function Workflows() {
  const workflows = useStore((s) => s.workflows);
  const showToast = useStore((s) => s.showToast);

  const overall = workflows.length
    ? Math.round(
        (workflows.reduce((sum, workflow) => {
          const done = workflow.steps.filter((step) => step.done).length;
          return sum + (workflow.steps.length ? done / workflow.steps.length : 0);
        }, 0) /
          workflows.length) *
          100,
      )
    : 0;

  return (
    <div className="app-page">
      <div className="app-hero">
        <h1>Workflows</h1>
        <p>Reusable playbooks that keep meaningful work from slipping through the gaps.</p>
      </div>

      <SectionHead
        title="Repeatable plays"
        sub="Choose a framework, then tailor it to the situation."
        action={
          <Badge tab="work" tone="soft">
            {overall}% complete
          </Badge>
        }
      />

      {workflows.length === 0 ? (
        <EmptyState
          icon={<Icon name="route" size={24} />}
          title="No workflows yet"
          sub="Saved playbooks will appear here once they are created."
        />
      ) : (
        <div className="workflow-grid">
          {workflows.map((workflow) => {
            const complete = workflow.steps.filter((step) => step.done).length;
            const percent = workflow.steps.length ? (complete / workflow.steps.length) * 100 : 0;
            return (
              <Card
                key={workflow.id}
                className="workflow-card"
                style={{ '--accent': workflow.color } as CSSProperties}
              >
                <div className="workflow-title">
                  <div className="workflow-heading">
                    <div
                      className="workflow-icon"
                      style={{ color: workflow.color, background: `${workflow.color}1a` }}
                    >
                      <Icon name="route" size={18} />
                    </div>
                    <div>
                      <h3>{workflow.title}</h3>
                      <p>{workflow.description}</p>
                    </div>
                  </div>
                  <ProgressRing value={percent} size={50} stroke={5} tab="work" />
                </div>

                <ol className="workflow-steps">
                  {workflow.steps.map((step) => (
                    <li className={step.done ? 'done' : ''} key={step.id}>
                      <Icon name={step.done ? 'checkCircle' : 'clock'} size={15} />
                      {step.label}
                    </li>
                  ))}
                </ol>

                <ProgressBar value={percent} tab="work" height={7} />

                <div className="workflow-footer">
                  <span>
                    {complete}/{workflow.steps.length} steps complete
                  </span>
                  <Button
                    tab="work"
                    variant="soft"
                    size="sm"
                    onClick={() => showToast(`Opened ${workflow.title}`, 'info')}
                  >
                    Open play
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
