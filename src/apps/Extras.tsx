import { useState } from 'react';
import { Icon } from '../design/icons';
import { Button, Card, SectionHead } from '../components/ui';
import { useStore } from '../store/useStore';

const TOOLS = [
  {
    icon: 'wand',
    title: 'Project brief generator',
    description: 'Turn a rough idea into a practical project outline.',
  },
  {
    icon: 'fileText',
    title: 'Meeting note template',
    description: 'Capture decisions, owners, and the next move.',
  },
  {
    icon: 'target',
    title: 'Weekly focus planner',
    description: 'Choose a small number of outcomes for the week.',
  },
];

export default function Extras() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [draft, setDraft] = useState('');
  const showToast = useStore((s) => s.showToast);

  return (
    <div className="app-page">
      <div className="app-hero">
        <h1>Extras</h1>
        <p>Helpful starting points for the work around your core practice.</p>
      </div>

      <SectionHead title="Useful tools" sub="Lightweight generators that keep you moving." tab="earn" />

      <div className="extras-grid">
        {TOOLS.map((tool) => (
          <Card key={tool.title} className={`extra-card${selectedTool === tool.title ? ' selected' : ''}`}>
            <div className="extra-icon">
              <Icon name={tool.icon} size={20} />
            </div>
            <h3>{tool.title}</h3>
            <p>{tool.description}</p>
            <Button
              tab="earn"
              variant="soft"
              size="sm"
              onClick={() => {
                setSelectedTool(tool.title);
                setDraft('');
                showToast(`${tool.title} opened`, 'info');
              }}
            >
              Use tool
            </Button>
          </Card>
        ))}
      </div>

      {selectedTool && (
        <Card hover={false} className="generator-panel">
          <h3>{selectedTool}</h3>
          <p>Start with one sentence. This workspace can help you shape it into a useful first draft.</p>
          <label className="generator-label" htmlFor="generator-draft">
            Your starting point
          </label>
          <textarea
            id="generator-draft"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="What are you trying to accomplish?"
          />
          <div className="generator-actions">
            <span className="generator-count">{draft.trim().length} characters</span>
            <Button
              tab="earn"
              disabled={draft.trim().length === 0}
              onClick={() => showToast('Your draft is ready to refine', 'success')}
            >
              Create draft
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
