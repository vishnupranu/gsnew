import type { CSSProperties } from 'react';
import type { Course } from '../types';
import { COURSES } from '../data';
import { useStore } from '../store/useStore';
import { Icon } from '../design/icons';
import {
  Badge,
  Button,
  Card,
  EmptyState,
  ProgressBar,
  SectionHead,
  Stars,
} from '../components/ui';

export default function Learn() {
  const activeTab = useStore(s => s.activeTab);
  const enrolled = useStore(s => s.enrolled);
  const enroll = useStore(s => s.enroll);
  const toggleLesson = useStore(s => s.toggleLesson);

  const courses = COURSES.filter(c => c.tab === activeTab);

  if (courses.length === 0) {
    return (
      <EmptyState
        icon="book"
        title="Nothing here yet"
        sub="Courses for this tab will appear when you switch to Learn."
      />
    );
  }

  return (
    <div className="app-page">
      <div className="app-hero">
        <h1>Learn</h1>
        <p>Pick a course, complete lessons, and grow your skills.</p>
      </div>

      <SectionHead
        title="Courses"
        sub={`${courses.length} ${activeTab} path${courses.length === 1 ? '' : 's'} available`}
        tab={activeTab}
      />

      <div className="app-grid">
        {courses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );

  function CourseCard({ course }: { course: Course }) {
    const progress = enrolled[course.id];
    const completed = progress?.completedLessons ?? 0;
    const total = course.lessons.length;
    const pct = total > 0 ? (completed / total) * 100 : 0;

    return (
      <Card className="learn-card" style={{ '--accent': course.color } as CSSProperties}>
        <div className="learn-card-top">
          <div className="learn-card-icon" style={{ background: course.color }}>
            <Icon name="book" size={20} />
          </div>
          <div className="learn-card-meta">
            <div className="learn-card-badges">
              <Badge>{course.level}</Badge>
              <Badge>{course.totalHours}h</Badge>
            </div>
            <Stars rating={course.rating} count={course.students} />
          </div>
        </div>

        <h3>{course.title}</h3>
        <p className="learn-card-desc">{course.description}</p>
        <p className="learn-card-author">by {course.author}</p>

        {progress ? (
          <>
            <ProgressBar value={pct} tab={activeTab} height={8} />
            <p className="learn-card-progress-text">
              {completed} of {total} lessons · {Math.round(pct)}%
            </p>

            <div className="learn-lessons">
              {course.lessons.map((lesson, i) => (
                <button
                  key={lesson.id}
                  type="button"
                  className={`learn-lesson${i < completed ? ' done' : ''}`}
                  onClick={() => toggleLesson(course.id, lesson.id)}
                >
                  <span className="learn-lesson-dot" />
                  <span className="learn-lesson-title">{lesson.title}</span>
                  <span className="learn-lesson-time">{lesson.durationMin}m</span>
                </button>
              ))}
            </div>
          </>
        ) : (
          <Button onClick={() => enroll(course.id)}>Enroll</Button>
        )}
      </Card>
    );
  }
}