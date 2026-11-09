/** Tri-color tab system: Learn / Work / Earn. */
export type TabKey = 'learn' | 'work' | 'earn';

/** App difficulty: 1 = Beginner, 2 = Intermediate, 3 = Advanced. */
export type Difficulty = 1 | 2 | 3;

export interface Lesson {
  id: string;
  title: string;
  durationMin: number;
  completed: boolean;
}

export interface Course {
  id: string;
  title: string;
  author: string;
  description: string;
  lessons: Lesson[];
  totalHours: number;
  rating: number;
  students: number;
  level: Difficulty;
  tab: TabKey;
  color: string;
  tags: string[];
}

export interface CourseProgress {
  courseId: string;
  completedLessons: number;
  totalLessons: number;
}

export type ProgressByCourse = Record<string, CourseProgress>;

export type TaskStatus = 'todo' | 'in_progress' | 'done';

export interface Task {
  id: string;
  title: string;
  project: string;
  due: string;
  priority: 'low' | 'medium' | 'high';
  status: TaskStatus;
}

export interface WorkflowStep {
  id: string;
  label: string;
  done: boolean;
}

export interface Workflow {
  id: string;
  title: string;
  description: string;
  color: string;
  steps: WorkflowStep[];
}

export interface EventItem {
  id: string;
  type: 'live' | 'workshop' | 'meetup' | 'bootcamp';
  title: string;
  description: string;
  date: string;
  time: string;
  enrolled: boolean;
  color: string;
}

export interface Earning {
  id: string;
  source: string;
  detail: string;
  amount: number;
  date: string;
  kind: 'course' | 'coach' | 'product' | 'referral';
}

export interface Achievement {
  id: string;
  label: string;
  icon: string;
  earned: boolean;
  color: string;
}

export type NotificationKind = 'info' | 'success' | 'alert';

export interface NotificationItem {
  id: string;
  kind: NotificationKind;
  title: string;
  body: string;
  time: string;
  read: boolean;
}

export interface User {
  name: string;
  role: string;
  level: number;
  xp: number;
  streak: number;
  coins: number;
  hearts: number;
}

export interface Settings {
  theme: 'light' | 'dark';
  autoplay: boolean;
  difficulty: Difficulty;
  email: boolean;
  push: boolean;
  digest: boolean;
  focus: TabKey;
}

export interface AppDef {
  id: string;
  name: string;
  desc: string;
  icon: string;
  tab: TabKey;
  color: string;
}

export interface ToastState {
  id: string;
  message: string;
  tone: 'success' | 'info' | 'error';
}