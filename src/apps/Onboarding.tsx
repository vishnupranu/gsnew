import { useEffect, useState } from 'react';
import type { Difficulty, TabKey } from '../types';
import { useStore } from '../store/useStore';
import { Icon } from '../design/icons';
import { Button, Card, ProgressBar, ProgressRing, SectionHead } from '../components/ui';

const STEPS = [
  {
    id: 'focus',
    title: 'Choose your focus tab',
    description: 'Pick where you want the workspace to start each day.',
  },
  {
    id: 'difficulty',
    title: 'Set your difficulty',
    description: 'Beginner, intermediate, or advanced pacing.',
  },
  {
    id: 'autoplay',
    title: 'Lesson autoplay',
    description: 'Advance to the next lesson automatically.',
  },
  {
    id: 'email',
    title: 'Email reminders',
    description: 'Notifications for due tasks and events.',
  },
  {
    id: 'push',
    title: 'Push notifications',
    description: 'Instant alerts on new content.',
  },
  {
    id: 'digest',
    title: 'Weekly digest',
    description: 'A Sunday summary of your progress.',
  },
] as const;

type StepId = (typeof STEPS)[number]['id'];

const STORAGE_KEY = 'gsapps.onboarding.v1';
const STEP_IDS = STEPS.map((step) => step.id);

function loadCompleted(): StepId[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (value): value is StepId => typeof value === 'string' && (STEP_IDS as readonly string[]).includes(value),
    );
  } catch {
    return [];
  }
}

export default function Onboarding() {
  const settings = useStore((s) => s.settings);
  const updateSettings = useStore((s) => s.updateSettings);
  const showToast = useStore((s) => s.showToast);
  const [completed, setCompleted] = useState<StepId[]>(loadCompleted);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
    } catch {
      // Storage can be unavailable in private mode; the checklist still works for this session.
    }
  }, [completed]);

  const progress = (completed.length / STEPS.length) * 100;
  const allDone = completed.length === STEPS.length;

  const complete = (id: StepId) => {
    setCompleted((current) => (current.includes(id) ? current : [...current, id]));
  };

  const toggle = (id: StepId) => {
    setCompleted((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  return (
    <div className="app-page">
      <div className="app-hero">
        <h1>Onboarding</h1>
        <p>Set up a workspace that matches how you want to learn and work.</p>
      </div>

      <Card hover={false} className="onboarding-card">
        <SectionHead
          title="Your setup checklist"
          sub="Complete the essentials; you can change any preference later."
          tab="earn"
        />

        <div className="setup-progress">
          <ProgressRing value={progress} size={64} stroke={6} tab="earn" />
          <div>
            <strong>
              {completed.length} of {STEPS.length} steps complete
            </strong>
            <span>Your choices are saved automatically.</span>
          </div>
        </div>

        <ProgressBar value={progress} tab="earn" height={10} />

        <ol className="setup-steps">
          {STEPS.map((step, index) => {
            const done = completed.includes(step.id);
            return (
              <li key={step.id} className={done ? 'done' : ''}>
                <div className="setup-step-head">
                  <button
                    type="button"
                    className="setup-check"
                    aria-pressed={done}
                    aria-label={`Mark "${step.title}" ${done ? 'incomplete' : 'complete'}`}
                    onClick={() => toggle(step.id)}
                  >
                    {done ? <Icon name="check" size={15} /> : index + 1}
                  </button>
                  <div className="setup-copy">
                    <strong>{step.title}</strong>
                    <small>{step.description}</small>
                  </div>
                </div>

                <div className="setup-controls">
                  {step.id === 'focus' && (
                    <div className="settings-seg" role="group" aria-label="Focus tab">
                      {(['learn', 'work', 'earn'] as TabKey[]).map((tab) => (
                        <button
                          key={tab}
                          type="button"
                          className={settings.focus === tab ? 'active' : ''}
                          onClick={() => {
                            updateSettings({ focus: tab });
                            complete('focus');
                          }}
                        >
                          {tab === 'learn' ? 'Learn' : tab === 'work' ? 'Work' : 'Earn'}
                        </button>
                      ))}
                    </div>
                  )}

                  {step.id === 'difficulty' && (
                    <div className="settings-seg" role="group" aria-label="Difficulty">
                      {([1, 2, 3] as Difficulty[]).map((level) => (
                        <button
                          key={level}
                          type="button"
                          className={settings.difficulty === level ? 'active' : ''}
                          onClick={() => {
                            updateSettings({ difficulty: level });
                            complete('difficulty');
                          }}
                        >
                          {level === 1 ? 'Beginner' : level === 2 ? 'Intermediate' : 'Advanced'}
                        </button>
                      ))}
                    </div>
                  )}

                  {step.id === 'autoplay' && (
                    <ToggleButton
                      label="Lesson autoplay"
                      on={settings.autoplay}
                      onChange={(value) => {
                        updateSettings({ autoplay: value });
                        complete('autoplay');
                      }}
                    />
                  )}

                  {step.id === 'email' && (
                    <ToggleButton
                      label="Email reminders"
                      on={settings.email}
                      onChange={(value) => {
                        updateSettings({ email: value });
                        complete('email');
                      }}
                    />
                  )}

                  {step.id === 'push' && (
                    <ToggleButton
                      label="Push notifications"
                      on={settings.push}
                      onChange={(value) => {
                        updateSettings({ push: value });
                        complete('push');
                      }}
                    />
                  )}

                  {step.id === 'digest' && (
                    <ToggleButton
                      label="Weekly digest"
                      on={settings.digest}
                      onChange={(value) => {
                        updateSettings({ digest: value });
                        complete('digest');
                      }}
                    />
                  )}
                </div>
              </li>
            );
          })}
        </ol>

        <div className="setup-actions">
          <Button
            tab="earn"
            variant="ghost"
            onClick={() => {
              setCompleted([]);
              showToast('Setup checklist reset', 'info');
            }}
            disabled={completed.length === 0}
          >
            Reset checklist
          </Button>
          <Button
            tab="earn"
            disabled={!allDone}
            onClick={() => showToast('Workspace setup complete', 'success')}
          >
            Finish setup
          </Button>
        </div>
      </Card>
    </div>
  );
}

function ToggleButton({
  label,
  on,
  onChange,
}: {
  label: string;
  on: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <button
      type="button"
      className="settings-row setup-toggle"
      aria-pressed={on}
      aria-label={`${label}: ${on ? 'on' : 'off'}`}
      onClick={() => onChange(!on)}
    >
      <span className="settings-row-text">
        <strong>{on ? 'Enabled' : 'Disabled'}</strong>
        <small>Tap to turn {label.toLowerCase()} {on ? 'off' : 'on'}.</small>
      </span>
      <span className={`toggle${on ? ' on' : ''}`} aria-hidden="true">
        <i />
      </span>
    </button>
  );
}
