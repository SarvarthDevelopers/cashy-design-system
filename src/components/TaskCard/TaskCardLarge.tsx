import React from 'react';
import './TaskCard.css';

export type TaskPriority = 'high' | 'medium' | 'low';

export interface TaskCardLargeProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Unique task ID (displayed as #ID)
     */
    taskId: string;
    /**
     * Name of the person assigned / who created the task
     */
    assignee: string;
    /**
     * Task title (max 60 characters, displayed in capitalized case)
     */
    title: string;
    /**
     * Optional task description (max 160 characters, displayed in full)
     */
    description?: string;
    /**
     * Priority level based on due date:
     * - high: due today (red background)
     * - medium: no specific priority / due tomorrow (blue background)
     * - low: due on other/custom date (white background)
     * @default 'medium'
     */
    priority?: TaskPriority;
    /**
     * Due date — shown in the meta row as "Today", "Tomorrow", or a short date (e.g. "Mar 15")
     */
    dueDate?: Date;
    /**
     * Callback when the more options button is clicked
     */
    onMoreClick?: () => void;
}

/** Formats dueDate as "Today", "Tomorrow", or "Mar 15" style */
function formatDueDate(date: Date): string {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    if (d.getTime() === today.getTime()) return 'Today';
    if (d.getTime() === tomorrow.getTime()) return 'Tomorrow';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

/**
 * TaskCardLarge displays a task within a Kanban column.
 *
 * Background color is determined by priority:
 * - high → red-50 (due today)
 * - medium → gray-50 (due tomorrow)
 * - low → blue-50 (other dates)
 */
export const TaskCardLarge = React.forwardRef<HTMLDivElement, TaskCardLargeProps>(({
    taskId,
    assignee,
    title,
    description,
    priority = 'medium',
    dueDate,
    onMoreClick,
    className = '',
    ...props
}, ref) => {

    const priorityClass = `task-card--priority-${priority}`;

    return (
        <div
            ref={ref}
            className={`task-card ${priorityClass} ${className}`}
            {...props}
        >
            {/* Header Row: #ID / Assignee / Due Date + More Button */}
            <div className="task-card__row task-card__row--header">
                <div className="task-card__meta">
                    <span>#{taskId}</span>
                    <span>/</span>
                    <span>{assignee}</span>
                    {dueDate && (
                        <>
                            <span aria-hidden="true">·</span>
                            <span>{formatDueDate(dueDate)}</span>
                        </>
                    )}
                </div>
                <button
                    type="button"
                    className="task-card__more-button"
                    onClick={(e) => {
                        e.stopPropagation();
                        onMoreClick?.();
                    }}
                    aria-label="More options"
                >
                    <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm5 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm5 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
                            fill="currentColor"
                        />
                    </svg>
                </button>
            </div>

            {/* Title Row */}
            <div className="task-card__row task-card__row--title">
                <div className="task-card__title-container">
                    <p className="task-card__title">{title}</p>
                </div>
            </div>

            {/* Description Row */}
            {description && (
                <div className="task-card__row task-card__row--description">
                    <p className="task-card__description">{description}</p>
                </div>
            )}
        </div>
    );
});

TaskCardLarge.displayName = 'TaskCardLarge';
