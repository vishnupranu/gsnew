import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  Achievement,
  Earning,
  EventItem,
  NotificationItem,
  ProgressByCourse,
  Settings,
  TabKey,
  Task,
  TaskStatus,
  ToastState,
  User,
  Workflow,
} from '../types';
import {
  ACHIEVEMENTS,
  APPS,
  COURSES,
  DEFAULT_SETTINGS,
  DEFAULT_USER,
  EARNINGS,
  EVENTS,
  NOTIFICATIONS,
  TASKS,
  WORKFLOWS,
} from '../data';

// ---- persistence shape (what gets written to localStorage) ----------------

interface PersistedState {
  user: User;
  settings: Settings;
  enrolled: ProgressByCourse;
  tasks: Task[];
  favorites: string[];
  events: EventItem[];
  notifications: NotificationItem[];
  activeTab: TabKey;
  activeApp: string;
}

// ---- full store shape ------------------------------------------------------

interface StoreState extends PersistedState {
  activeTab: TabKey;
  activeApp: string;
  workflows: Workflow[];
  events: EventItem[];
  achievements: Achievement[];
  earnings: Earning[];
  notifications: NotificationItem[];
  searchOpen: boolean;
  settingsOpen: boolean;
  toast: ToastState | null;

  setActiveTab: (tab: TabKey) => void;
  openApp: (id: string) => void;
  enroll: (courseId: string) => void;
  toggleLesson: (courseId: string, lessonId: string) => void;
  setTaskStatus: (taskId: string, status: TaskStatus) => void;
  toggleEventEnroll: (eventId: string) => void;
  toggleFavorite: (id: string) => void;
  showToast: (message: string, tone?: ToastState['tone']) => void;
  clearToast: () => void;
  addXp: (amount: number) => void;
  updateSettings: (patch: Partial<Settings>) => void;
  markNotificationsRead: () => void;
  toggleSearch: () => void;
  setSearchOpen: (open: boolean) => void;
  setSettingsOpen: (open: boolean) => void;
}

const toastId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

// Courses seeded as enrolled, keyed by id -> lessons completed (prefix model).
const SEEDED_PROGRESS: Record<string, number> = {
  'excel-mastery': 2,
  'python-fundamentals': 1,
};

const initialEnrolled: ProgressByCourse = {};
for (const [courseId, completedLessons] of Object.entries(SEEDED_PROGRESS)) {
  const course = COURSES.find((c) => c.id === courseId);
  if (course) {
    initialEnrolled[courseId] = {
      courseId,
      completedLessons,
      totalLessons: course.lessons.length,
    };
  }
}

const initialTab: TabKey = DEFAULT_SETTINGS.focus;
const initialApp: string = (APPS.find((a) => a.tab === initialTab) ?? APPS[0]).id;

export const useStore = create<StoreState>()(
  persist<StoreState, [], [], PersistedState>(
    (set) => ({
      activeTab: initialTab,
      activeApp: initialApp,
      user: DEFAULT_USER,
      settings: DEFAULT_SETTINGS,
      enrolled: initialEnrolled,
      tasks: TASKS,
      workflows: WORKFLOWS,
      events: EVENTS,
      achievements: ACHIEVEMENTS,
      earnings: EARNINGS,
      notifications: NOTIFICATIONS,
      favorites: [],
      searchOpen: false,
      settingsOpen: false,
      toast: null,

      setActiveTab: (tab) =>
        set((state) =>
          state.activeTab === tab
            ? state
            : { activeTab: tab, activeApp: (APPS.find((a) => a.tab === tab) ?? APPS[0]).id },
        ),

      openApp: (id) =>
        set((state) => {
          const app = APPS.find((a) => a.id === id);
          if (!app || (state.activeTab === app.tab && state.activeApp === app.id)) return state;
          return { activeTab: app.tab, activeApp: app.id };
        }),

      enroll: (courseId) =>
        set((state) => {
          if (state.enrolled[courseId]) return state;
          const course = COURSES.find((c) => c.id === courseId);
          if (!course) return state;
          return {
            enrolled: {
              ...state.enrolled,
              [courseId]: { courseId, completedLessons: 0, totalLessons: course.lessons.length },
            },
            toast: { id: toastId(), message: `${course.title} added to your learning`, tone: 'success' },
          };
        }),

      toggleLesson: (courseId, lessonId) =>
        set((state) => {
          const course = COURSES.find((c) => c.id === courseId);
          if (!course) return state;
          const idx = course.lessons.findIndex((l) => l.id === lessonId);
          if (idx === -1) return state;
          const prev = state.enrolled[courseId];
          const wasCounted = prev ? idx < prev.completedLessons : false;
          const nextCount = wasCounted ? idx : Math.max(prev ? prev.completedLessons : 0, idx + 1);
          const enrolled = { ...state.enrolled };
          if (nextCount <= 0) {
            delete enrolled[courseId];
          } else {
            enrolled[courseId] = { courseId, completedLessons: nextCount, totalLessons: course.lessons.length };
          }
          if (wasCounted) return { enrolled };
          return {
            enrolled,
            user: { ...state.user, xp: state.user.xp + 5 },
            toast: { id: toastId(), message: 'Lesson complete · +5 XP', tone: 'success' },
          };
        }),

      setTaskStatus: (taskId, status) =>
        set((state) => {
          const task = state.tasks.find((t) => t.id === taskId);
          if (!task) return state;
          const tasks = state.tasks.map((t) => (t.id === taskId ? { ...t, status } : t));
          if (status === 'done' && task.status !== 'done') {
            return { tasks, toast: { id: toastId(), message: 'Task completed', tone: 'success' } };
          }
          return { tasks };
        }),

      toggleEventEnroll: (eventId) =>
        set((state) => ({
          events: state.events.map((e) => (e.id === eventId ? { ...e, enrolled: !e.enrolled } : e)),
        })),

      toggleFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((f) => f !== id)
            : [...state.favorites, id],
        })),

      showToast: (message, tone = 'info') => set({ toast: { id: toastId(), message, tone } }),

      clearToast: () => set({ toast: null }),

      addXp: (amount) => set((state) => ({ user: { ...state.user, xp: state.user.xp + amount } })),

      updateSettings: (patch) => set((state) => ({ settings: { ...state.settings, ...patch } })),

      markNotificationsRead: () =>
        set((state) => ({ notifications: state.notifications.map((n) => ({ ...n, read: true })) })),

      toggleSearch: () => set((state) => ({ searchOpen: !state.searchOpen })),

      setSearchOpen: (open) => set({ searchOpen: open }),

      setSettingsOpen: (open) => set({ settingsOpen: open }),
    }),
    {
      name: 'gsapps.trsining',
      version: 2,
      migrate: (persisted) => persisted as PersistedState,
      partialize: (state) => ({
        user: state.user,
        settings: state.settings,
        enrolled: state.enrolled,
        tasks: state.tasks,
        favorites: state.favorites,
        events: state.events,
        notifications: state.notifications,
        activeTab: state.activeTab,
        activeApp: state.activeApp,
      }),
    },
  ),
);