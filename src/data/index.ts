import type {
  Achievement,
  AppDef,
  Course,
  Earning,
  EventItem,
  NotificationItem,
  Settings,
  Task,
  User,
  Workflow,
} from '../types';

const NOW = '2026-09-19';

/* ------------------------------- Courses -------------------------------- */

export const COURSES: Course[] = [
  {
    id: 'excel-mastery',
    title: 'Excel Mastery: From Spreadsheet to Command',
    author: 'Maya Chen',
    description:
      'Go from formulas to dashboards. Pivot tables, lookup functions, dynamic arrays and the habits that make you dangerous with a workbook.',
    lessons: [
      { id: 'excel-1', title: 'The spreadsheet mindset', durationMin: 18, completed: true },
      { id: 'excel-2', title: 'Lookups that scale: XLOOKUP & INDEX/MATCH', durationMin: 32, completed: true },
      { id: 'excel-3', title: 'Pivot tables from real messy data', durationMin: 41, completed: false },
      { id: 'excel-4', title: 'Dynamic arrays & spills', durationMin: 27, completed: false },
      { id: 'excel-5', title: 'Build a KPI dashboard that updates itself', durationMin: 46, completed: false },
    ],
    totalHours: 25.5,
    rating: 4.7,
    students: 84200,
    level: 1,
    tab: 'learn',
    color: '#2fd4a3',
    tags: ['Productivity', 'Data', 'Beginner'],
  },
  {
    id: 'python-fundamentals',
    title: 'Python Fundamentals',
    author: 'Rahul Varma',
    description:
      'A hands-on path from your first print() to clean scripts, files, and automation — no previous programming needed.',
    lessons: [
      { id: 'py-1', title: 'First program, first victory', durationMin: 12, completed: true },
      { id: 'py-2', title: 'Data types & control flow', durationMin: 34, completed: false },
      { id: 'py-3', title: 'Functions & modules that stay readable', durationMin: 38, completed: false },
      { id: 'py-4', title: 'Files, CSV & automating busywork', durationMin: 29, completed: false },
    ],
    totalHours: 18,
    rating: 4.8,
    students: 51000,
    level: 1,
    tab: 'learn',
    color: '#7c8cff',
    tags: ['Programming', 'Automation', 'Beginner'],
  },
  {
    id: 'ai-for-business',
    title: 'AI for Business',
    author: 'Dr. Lena Ortiz',
    description:
      'Deploy large language models and image tools into real workflows — prompts, pipelines, and evaluation that actually ships.',
    lessons: [
      { id: 'ai-1', title: 'What models can and cannot do', durationMin: 22, completed: false },
      { id: 'ai-2', title: 'Prompting as product design', durationMin: 31, completed: false },
      { id: 'ai-3', title: 'Structured outputs & evaluation', durationMin: 44, completed: false },
      { id: 'ai-4', title: 'A field guide to AI agents', durationMin: 52, completed: false },
    ],
    totalHours: 14.5,
    rating: 4.6,
    students: 23800,
    level: 2,
    tab: 'learn',
    color: '#a78bfa',
    tags: ['AI', 'Strategy', 'Intermediate'],
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing Bootcamp',
    author: 'Sofia Delgado',
    description:
      'The full funnel: positioning, content, paid acquisition, email, and the analytics loop that tells you what worked.',
    lessons: [
      { id: 'dm-1', title: 'Positioning before pixels', durationMin: 25, completed: false },
      { id: 'dm-2', title: 'Content engines that compound', durationMin: 36, completed: false },
      { id: 'dm-3', title: 'Paid acquisition on a budget', durationMin: 40, completed: false },
      { id: 'dm-4', title: 'Email & retention mechanics', durationMin: 28, completed: false },
    ],
    totalHours: 21,
    rating: 4.5,
    students: 40300,
    level: 1,
    tab: 'learn',
    color: '#f472b6',
    tags: ['Marketing', 'Growth', 'Beginner'],
  },
  {
    id: 'sql-analysis',
    title: 'SQL & Data Analysis',
    author: 'Marcus Webb',
    description:
      'Query your way to insight. Joins, window functions, and thinking in tables instead of spreadsheets.',
    lessons: [
      { id: 'sql-1', title: 'Select, join, repeat', durationMin: 20, completed: false },
      { id: 'sql-2', title: 'Window functions that feel like magic', durationMin: 37, completed: false },
      { id: 'sql-3', title: 'From query to dashboard', durationMin: 33, completed: false },
    ],
    totalHours: 12,
    rating: 4.7,
    students: 18700,
    level: 2,
    tab: 'learn',
    color: '#38bdf8',
    tags: ['Data', 'SQL', 'Intermediate'],
  },
  {
    id: 'public-speaking',
    title: 'Public Speaking & Presence',
    author: 'Nadia Hassan',
    description:
      'Structure, story and delivery — the practical system for talks, demos, and meetings where it matters.',
    lessons: [
      { id: 'ps-1', title: 'The one-idea talk', durationMin: 15, completed: false },
      { id: 'ps-2', title: 'Story structures that stick', durationMin: 26, completed: false },
      { id: 'ps-3', title: 'Voice, pace & the pause', durationMin: 24, completed: false },
    ],
    totalHours: 9.5,
    rating: 4.6,
    students: 12400,
    level: 1,
    tab: 'learn',
    color: '#fb923c',
    tags: ['Communication', 'Career', 'Beginner'],
  },
  {
    id: 'project-management',
    title: 'Project Management Essentials',
    author: 'Daniel Okafor',
    description:
      'Scope, schedule, stakeholders: run projects that finish on time without becoming the police.',
    lessons: [
      { id: 'pm-1', title: 'Projects as systems, not tasks', durationMin: 19, completed: false },
      { id: 'pm-2', title: 'Planning under uncertainty', durationMin: 35, completed: false },
      { id: 'pm-3', title: 'The weekly cadence that prevents fires', durationMin: 30, completed: false },
    ],
    totalHours: 16,
    rating: 4.4,
    students: 22100,
    level: 1,
    tab: 'work',
    color: '#7c8cff',
    tags: ['Management', 'Process', 'Beginner'],
  },
  {
    id: 'financial-modeling',
    title: 'Financial Modeling for Startups',
    author: 'Priya Natarajan',
    description:
      'Model revenue, costs and runway; pressure-test assumptions; present numbers investors trust.',
    lessons: [
      { id: 'fm-1', title: 'The three-statement model', durationMin: 42, completed: false },
      { id: 'fm-2', title: 'SaaS unit economics done right', durationMin: 38, completed: false },
      { id: 'fm-3', title: 'Scenario analysis & sensitivity', durationMin: 34, completed: false },
    ],
    totalHours: 19,
    rating: 4.8,
    students: 9800,
    level: 3,
    tab: 'work',
    color: '#2fd4a3',
    tags: ['Finance', 'SaaS', 'Advanced'],
  },
  {
    id: 'negotiation-skills',
    title: 'Negotiation Skills Mastery',
    author: 'Elena Vasquez',
    description:
      'Prepare, bargain, and close — a repeatable framework for salaries, contracts, and everyday deals.',
    lessons: [
      { id: 'neg-1', title: 'BATNA before anything', durationMin: 17, completed: false },
      { id: 'neg-2', title: 'Concession strategy', durationMin: 23, completed: false },
      { id: 'neg-3', title: 'Closing without burning the bridge', durationMin: 21, completed: false },
    ],
    totalHours: 8,
    rating: 4.5,
    students: 15100,
    level: 2,
    tab: 'work',
    color: '#f472b6',
    tags: ['Communication', 'Career', 'Intermediate'],
  },
  {
    id: 'nocode-apps',
    title: 'No-Code App Building',
    author: 'Tommy Ruiz',
    description:
      'Ship real products with no-code tools: databases, auth, and a front-end that feels custom.',
    lessons: [
      { id: 'nc-1', title: 'Picking your stack', durationMin: 14, completed: false },
      { id: 'nc-2', title: 'Data model first', durationMin: 28, completed: false },
      { id: 'nc-3', title: 'Automations & logic', durationMin: 31, completed: false },
    ],
    totalHours: 13,
    rating: 4.4,
    students: 13600,
    level: 1,
    tab: 'earn',
    color: '#ffc861',
    tags: ['No-Code', 'Building', 'Beginner'],
  },
  {
    id: 'crypto-web3',
    title: 'Crypto & Web3 Fundamentals',
    author: 'Aisha Rahman',
    description:
      'Wallets, swaps, and smart contracts explained without the hype — the mental model first, the buttons second.',
    lessons: [
      { id: 'c3-1', title: 'Why blockchains exist', durationMin: 24, completed: false },
      { id: 'c3-2', title: 'Wallets, keys & custody', durationMin: 27, completed: false },
      { id: 'c3-3', title: 'DeFi & smart contracts', durationMin: 39, completed: false },
    ],
    totalHours: 11,
    rating: 4.3,
    students: 29400,
    level: 2,
    tab: 'earn',
    color: '#38bdf8',
    tags: ['Web3', 'Finance', 'Intermediate'],
  },
  {
    id: 'freelance-launch',
    title: 'Launch a Freelance Practice',
    author: 'Jonas Meyer',
    description:
      'From first client to recurring revenue: offers, pricing, and the pipeline that keeps you booked.',
    lessons: [
      { id: 'fl-1', title: 'The offer-first approach', durationMin: 22, completed: false },
      { id: 'fl-2', title: 'Pricing without the cringe', durationMin: 25, completed: false },
      { id: 'fl-3', title: 'A pipeline that never dries up', durationMin: 33, completed: false },
    ],
    totalHours: 15,
    rating: 4.6,
    students: 17200,
    level: 2,
    tab: 'earn',
    color: '#a78bfa',
    tags: ['Freelance', 'Business', 'Intermediate'],
  },
];

/* -------------------------------- Tasks --------------------------------- */

export const TASKS: Task[] = [
  { id: 't-1', title: 'Send revised roadmap to stakeholders', project: 'Q4 Planning', due: '2026-09-22', priority: 'high', status: 'in_progress' },
  { id: 't-2', title: 'Review onboarding flow PR', project: 'Product', due: '2026-09-20', priority: 'high', status: 'todo' },
  { id: 't-3', title: 'Draft proposal for design partner program', project: 'Growth', due: '2026-09-24', priority: 'medium', status: 'todo' },
  { id: 't-4', title: 'Weekly 1:1 preparation notes', project: 'People', due: '2026-09-21', priority: 'medium', status: 'done' },
  { id: 't-5', title: 'Update pricing comparison sheet', project: 'Sales', due: '2026-09-26', priority: 'low', status: 'todo' },
  { id: 't-6', title: 'Clean up customer feedback tags', project: 'Research', due: '2026-09-23', priority: 'low', status: 'done' },
];

/* ------------------------------ Workflows ------------------------------- */

export const WORKFLOWS: Workflow[] = [
  {
    id: 'wf-onboard-client',
    title: 'Onboard a Client',
    description: 'From signed proposal to happy first week.',
    color: '#7c8cff',
    steps: [
      { id: 'wf1-1', label: 'Welcome call & goals', done: true },
      { id: 'wf1-2', label: 'Access & tooling setup', done: true },
      { id: 'wf1-3', label: 'Kickoff workshop', done: false },
      { id: 'wf1-4', label: 'First delivery & feedback loop', done: false },
    ],
  },
  {
    id: 'wf-launch-course',
    title: 'Launch an Online Course',
    description: 'Take a skill from idea to paying students.',
    color: '#ffc861',
    steps: [
      { id: 'wf2-1', label: 'Define outcome & audience', done: true },
      { id: 'wf2-2', label: 'Outline curriculum', done: false },
      { id: 'wf2-3', label: 'Record core module', done: false },
      { id: 'wf2-4', label: 'Publish & launch email', done: false },
    ],
  },
  {
    id: 'wf-study-week',
    title: 'Plan a Study Week',
    description: 'A repeatable weekly learning routine.',
    color: '#2fd4a3',
    steps: [
      { id: 'wf3-1', label: 'Pick one focus skill', done: true },
      { id: 'wf3-2', label: 'Block 5 focused sessions', done: false },
      { id: 'wf3-3', label: 'Apply with one real project', done: false },
      { id: 'wf3-4', label: 'Review & adjust for next week', done: false },
    ],
  },
  {
    id: 'wf-automate-invoices',
    title: 'Automate Invoices',
    description: 'Get paid on time, every time.',
    color: '#38bdf8',
    steps: [
      { id: 'wf4-1', label: 'Central template with brand', done: true },
      { id: 'wf4-2', label: 'Auto-create from project tracker', done: false },
      { id: 'wf4-3', label: 'Payment reminders sequence', done: false },
      { id: 'wf4-4', label: 'Monthly reconciliation', done: false },
    ],
  },
];

/* -------------------------------- Events -------------------------------- */

export const EVENTS: EventItem[] = [
  {
    id: 'e-1', type: 'live', title: 'Excel Hour: Dashboards Live',
    description: 'Build a real KPI dashboard together, start to finish, with Maya Chen.',
    date: '2026-09-24', time: '18:00 IST', enrolled: true, color: '#2fd4a3',
  },
  {
    id: 'e-2', type: 'workshop', title: 'AI Agents in the Workplace',
    description: 'Hands-on workshop: wire an agent to your actual tools, evaluate the results.',
    date: '2026-09-27', time: '19:30 IST', enrolled: false, color: '#a78bfa',
  },
  {
    id: 'e-3', type: 'meetup', title: 'Builders Meetup: Side Projects',
    description: 'Show and tell for people shipping on the side. Bring a demo or just curiosity.',
    date: '2026-10-02', time: '17:00 IST', enrolled: false, color: '#7c8cff',
  },
  {
    id: 'e-4', type: 'bootcamp', title: 'Freelance Foundations Bootcamp',
    description: 'Two days to structure offers, pricing and your first real pipeline.',
    date: '2026-10-09', time: '10:00 IST', enrolled: true, color: '#ffc861',
  },
  {
    id: 'e-5', type: 'live', title: 'Negotiation Scrimmage',
    description: 'Live roleplay: get a raise scenario, play it out, get real feedback.',
    date: '2026-10-15', time: '19:00 IST', enrolled: false, color: '#f472b6',
  },
];

/* ------------------------------- Earnings ------------------------------- */

export const EARNINGS: Earning[] = [
  { id: 'earn-1', source: 'Course sales', detail: 'Excel Mastery · 14 seats', amount: 896, date: '2026-09-17', kind: 'course' },
  { id: 'earn-2', source: '1:1 coaching', detail: 'Career strategy session', amount: 120, date: '2026-09-15', kind: 'coach' },
  { id: 'earn-3', source: 'Digital product', detail: 'Resume kit · 22 copies', amount: 176, date: '2026-09-12', kind: 'product' },
  { id: 'earn-4', source: 'Referral', detail: 'Enterprise plan · 20% share', amount: 240, date: '2026-09-08', kind: 'referral' },
  { id: 'earn-5', source: 'Course sales', detail: 'SQL & Data Analysis · 9 seats', amount: 621, date: '2026-09-05', kind: 'course' },
  { id: 'earn-6', source: 'Coaching', detail: 'Group workshop · 8 spots', amount: 320, date: '2026-09-01', kind: 'coach' },
];

/* ----------------------------- Achievements ----------------------------- */

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'a-1', label: 'Week Streak', icon: 'flame', earned: true, color: '#fb923c' },
  { id: 'a-2', label: 'Dedicated Learner', icon: 'book', earned: true, color: '#2fd4a3' },
  { id: 'a-3', label: 'First Client', icon: 'briefcase', earned: true, color: '#7c8cff' },
  { id: 'a-4', label: 'Creator', icon: 'dollar', earned: false, color: '#ffc861' },
];

/* ---------------------------- Notifications ----------------------------- */

export const NOTIFICATIONS: NotificationItem[] = [
  { id: 'n-1', kind: 'success', title: 'Lesson complete', body: 'Nice work — Excel Mastery lesson 2 is done. +5 XP.', time: '2h ago', read: false },
  { id: 'n-2', kind: 'info', title: 'New workshop', body: 'AI Agents in the Workplace is now open for enrollment.', time: '5h ago', read: false },
  { id: 'n-3', kind: 'alert', title: 'Task due tomorrow', body: 'Review onboarding flow PR is due on Sep 20.', time: '1d ago', read: true },
  { id: 'n-4', kind: 'info', title: 'New achievement', body: 'You unlocked “Dedicated Learner”.', time: '2d ago', read: true },
];

/* ----------------------------- User & settings --------------------------- */

export const DEFAULT_USER: User = {
  name: 'Alex Kim',
  role: 'Product Manager',
  level: 12,
  xp: 1240,
  streak: 9,
  coins: 320,
  hearts: 5,
};

export const DEFAULT_SETTINGS: Settings = {
  theme: 'light',
  autoplay: true,
  difficulty: 2,
  email: true,
  push: true,
  digest: false,
  focus: 'learn',
};

export const TODAY = NOW;

/* ------------------------------- App registry --------------------------- */

export const APPS: AppDef[] = [
  { id: 'learn', name: 'Learn', desc: 'Courses, lessons, and progress', icon: 'book', tab: 'learn', color: '#2fd4a3' },
  { id: 'events', name: 'Events', desc: 'Lives, workshops, and meetups', icon: 'calendar', tab: 'learn', color: '#a78bfa' },
  { id: 'profile', name: 'Profile', desc: 'Achievements and stats', icon: 'user', tab: 'learn', color: '#f472b6' },
  { id: 'work', name: 'Work', desc: 'Tasks and priorities', icon: 'briefcase', tab: 'work', color: '#7c8cff' },
  { id: 'workspace', name: 'Workspace', desc: 'Your current project board', icon: 'grid', tab: 'work', color: '#38bdf8' },
  { id: 'workflows', name: 'Workflows', desc: 'Repeatable step-by-step plays', icon: 'route', tab: 'work', color: '#2fd4a3' },
  { id: 'earn', name: 'Earn', desc: 'Income and creator studio', icon: 'dollar', tab: 'earn', color: '#ffc861' },
  { id: 'extras', name: 'Extras', desc: 'Bonus tools and generators', icon: 'sparkles', tab: 'earn', color: '#fb923c' },
  { id: 'onboarding', name: 'Onboarding', desc: 'Setup for new members', icon: 'rocket', tab: 'earn', color: '#a78bfa' },
];