import { useMemo } from 'react';
import type { CSSProperties } from 'react';
import { COURSES } from '../data';
import { useStore } from '../store/useStore';
import { Icon } from '../design/icons';
import { Card, ProgressBar, SectionHead } from '../components/ui';

export default function Workspace() {
  const enrolled = useStore((s) => s.enrolled);
  const tasks = useStore((s) => s.tasks);
  const showToast = useStore((s) => s.showToast);
  const enrolledCourses = useMemo(() => Object.values(enrolled), [enrolled]);
  const overallProgress = enrolledCourses.length
    ? Math.round(
        enrolledCourses.reduce(
          (sum, course) => sum + (course.completedLessons / Math.max(1, course.totalLessons)) * 100,
          0,
        ) / enrolledCourses.length,
      )
    : 0;
  const completeTasks = tasks.filter((task) => task.status === 'done').length;

  return (
    <div className="app-page">
      <div className="app-hero">
        <h1>Workspace</h1>
        <p>Your personal operating view for learning and delivery.</p>
      </div>

      <div className="workspace-dashboard">
        <Card className="workspace-focus" hover={false}>
          <p className="eyebrow">Focus score</p>
          <div className="focus-score">
            <strong>{overallProgress}%</strong>
            <span>learning progress</span>
          </div>
          <ProgressBar value={overallProgress} tab="work" height={10} />
          <p>
            {enrolledCourses.length
              ? `${enrolledCourses.length} course${enrolledCourses.length === 1 ? '' : 's'} currently in progress`
              : 'Enroll in a course to start tracking momentum.'}
          </p>
        </Card>

        <Card className="workspace-actions">
          <SectionHead
            title="Today’s next move"
            sub={`${completeTasks} of ${tasks.length} tasks closed`}
            tab="work"
          />
          <div className="workspace-action-list">
            <button
              type="button"
              onClick={() => showToast('Focus session started for 25 minutes', 'success')}
            >
              <Icon name="clock" size={17} />
              <span>
                <strong>Start focus session</strong>
                <small>Protect 25 minutes for your highest-value task.</small>
              </span>
            </button>
            <button type="button" onClick={() => showToast('Your planning review is ready', 'info')}>
              <Icon name="list" size={17} />
              <span>
                <strong>Review task board</strong>
                <small>Move one task to done before adding more work.</small>
              </span>
            </button>
          </div>
        </Card>
      </div>

      <SectionHead title="Active learning" sub="Resume the work already in motion." />
      <div className="active-course-list">
        {enrolledCourses.length ? (
          enrolledCourses.map((progress) => {
            const course = COURSES.find((item) => item.id === progress.courseId);
            const pct = (progress.completedLessons / Math.max(1, progress.totalLessons)) * 100;
            return (
              <Card
                key={progress.courseId}
                className="active-course"
                style={{ '--accent': course?.color ?? '#7c8cff' } as CSSProperties}
              >
                <div className="active-course-copy">
                  <h3>{course?.title ?? progress.courseId.replace(/-/g, ' ')}</h3>
                  <p>
                    {progress.completedLessons} of {progress.totalLessons} lessons complete
                  </p>
                </div>
                <ProgressBar value={pct} tab="work" height={8} />
              </Card>
            );
          })
        ) : (
          <Card hover={false}>
            <p className="empty-inline">
              No courses in progress yet. Open Learn to choose a practical skill path.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
