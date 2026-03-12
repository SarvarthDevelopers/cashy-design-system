import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import './TaskCard.css';

const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
];

const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

interface CalendarSmallProps {
    /**
     * Currently selected date
     */
    selectedDate: Date | null;
    /**
     * Callback when a date is selected
     */
    onDateSelect: (date: Date) => void;
    /**
     * Minimum selectable date (dates before this are disabled)
     */
    minDate?: Date;
}

/**
 * Get all calendar day cells for a given month.
 * Returns an array of weeks, each containing 7 day objects.
 */
function getCalendarDays(year: number, month: number) {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // Monday = 0, Sunday = 6 (ISO week)
    let startDayOfWeek = firstDay.getDay() - 1;
    if (startDayOfWeek < 0) startDayOfWeek = 6;

    const days: { date: Date; isCurrentMonth: boolean }[] = [];

    // Fill days from previous month
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
        const date = new Date(year, month, -i);
        days.push({ date, isCurrentMonth: false });
    }

    // Fill current month days
    for (let d = 1; d <= lastDay.getDate(); d++) {
        days.push({ date: new Date(year, month, d), isCurrentMonth: true });
    }

    // Fill remaining days from next month to complete the last week
    const remaining = 7 - (days.length % 7);
    if (remaining < 7) {
        for (let i = 1; i <= remaining; i++) {
            days.push({ date: new Date(year, month + 1, i), isCurrentMonth: false });
        }
    }

    // Split into weeks
    const weeks: typeof days[] = [];
    for (let i = 0; i < days.length; i += 7) {
        weeks.push(days.slice(i, i + 7));
    }

    return weeks;
}

function isSameDay(a: Date, b: Date): boolean {
    return a.getFullYear() === b.getFullYear()
        && a.getMonth() === b.getMonth()
        && a.getDate() === b.getDate();
}

/**
 * CalendarSmall — A compact date picker calendar component.
 * Used within TaskCreateCardLarge when selecting a custom due date.
 */
export const CalendarSmall: React.FC<CalendarSmallProps> = ({
    selectedDate,
    onDateSelect,
    minDate,
}) => {
    const today = new Date();
    const [viewYear, setViewYear] = useState(selectedDate?.getFullYear() ?? today.getFullYear());
    const [viewMonth, setViewMonth] = useState(selectedDate?.getMonth() ?? today.getMonth());

    const weeks = getCalendarDays(viewYear, viewMonth);

    const handlePrevMonth = () => {
        if (viewMonth === 0) {
            setViewYear(viewYear - 1);
            setViewMonth(11);
        } else {
            setViewMonth(viewMonth - 1);
        }
    };

    const handleNextMonth = () => {
        if (viewMonth === 11) {
            setViewYear(viewYear + 1);
            setViewMonth(0);
        } else {
            setViewMonth(viewMonth + 1);
        }
    };

    const isDateDisabled = (date: Date): boolean => {
        if (!minDate) return false;
        const min = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
        const check = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        return check < min;
    };

    return (
        <div className="task-calendar" role="dialog" aria-label="Date picker">
            {/* Header: Month Year navigation */}
            <div className="task-calendar__header">
                <button
                    type="button"
                    className="task-calendar__nav-btn"
                    onClick={handlePrevMonth}
                    aria-label="Previous month"
                >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <p className="task-calendar__month-year">
                    {MONTH_NAMES[viewMonth]} {viewYear}
                </p>
                <button
                    type="button"
                    className="task-calendar__nav-btn"
                    onClick={handleNextMonth}
                    aria-label="Next month"
                >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>

            <div className="task-calendar__divider" />

            {/* Body: Day names + Dates */}
            <div className="task-calendar__body">
                <div className="task-calendar__day-names">
                    {DAY_NAMES.map((day) => (
                        <span key={day} className="task-calendar__day-name">{day}</span>
                    ))}
                </div>

                {weeks.map((week, wIdx) => (
                    <div key={wIdx} className="task-calendar__date-row">
                        {week.map((day, dIdx) => {
                            const isSelected = selectedDate ? isSameDay(day.date, selectedDate) : false;
                            const isDisabled = !day.isCurrentMonth || isDateDisabled(day.date);
                            const isToday = isSameDay(day.date, today);

                            const classNames = [
                                'task-calendar__date',
                                isSelected ? 'task-calendar__date--selected' : '',
                                isDisabled ? 'task-calendar__date--disabled' : '',
                                isToday ? 'task-calendar__date--today' : '',
                            ].filter(Boolean).join(' ');

                            return (
                                <button
                                    key={dIdx}
                                    type="button"
                                    className={classNames}
                                    onClick={() => !isDisabled && onDateSelect(day.date)}
                                    disabled={isDisabled}
                                    aria-label={day.date.toLocaleDateString('en-US', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                    aria-selected={isSelected}
                                >
                                    {day.date.getDate()}
                                </button>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

CalendarSmall.displayName = 'CalendarSmall';

/* ========================================
   Calendar Icon SVG
   ======================================== */
const CalendarIcon: React.FC = () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M4.66675 1.16675V2.91675M9.33341 1.16675V2.91675M1.75008 5.54175H12.2501M2.33341 2.33341H11.6667C11.9889 2.33341 12.2501 2.59461 12.2501 2.91675V12.2501C12.2501 12.5722 11.9889 12.8334 11.6667 12.8334H2.33341C2.01128 12.8334 1.75008 12.5722 1.75008 12.2501V2.91675C1.75008 2.59461 2.01128 2.33341 2.33341 2.33341Z"
            stroke="currentColor"
            strokeWidth="1.16667"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

/* ========================================
   TaskCreateCardLarge
   ======================================== */

export type PriorityOption = 'today' | 'tomorrow' | 'custom';

export interface TaskCreateCardLargeProps {
    /**
     * Callback when the task is submitted.
     * Receives the task title, optional description, and selected due date.
     */
    onAdd: (data: { title: string; description: string; dueDate: Date }) => void;
    /**
     * Callback when the cancel button is clicked
     */
    onCancel: () => void;
    /**
     * Optional additional CSS class
     */
    className?: string;
}

/**
 * TaskCreateCardLarge is the inline task creation form that appears
 * when clicking the plus button on a ColumnHeader.
 *
 * Priority is determined by the selected due date:
 * - "Today" pill = high priority
 * - "Tomorrow" pill = medium priority
 * - Calendar icon = low priority (custom date)
 */
export const TaskCreateCardLarge = React.forwardRef<HTMLDivElement, TaskCreateCardLargeProps>(({
    onAdd,
    onCancel,
    className = '',
}, ref) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedPriority, setSelectedPriority] = useState<PriorityOption>('today');
    const [customDate, setCustomDate] = useState<Date | null>(null);
    const [showCalendar, setShowCalendar] = useState(false);
    const calendarRef = useRef<HTMLDivElement>(null);
    const calendarBtnRef = useRef<HTMLButtonElement>(null);
    const titleInputRef = useRef<HTMLInputElement>(null);
    const [calendarPos, setCalendarPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

    // Focus title input on mount
    useEffect(() => {
        titleInputRef.current?.focus();
    }, []);

    // Close calendar on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                calendarRef.current && !calendarRef.current.contains(event.target as Node) &&
                calendarBtnRef.current && !calendarBtnRef.current.contains(event.target as Node)
            ) {
                setShowCalendar(false);
            }
        };
        if (showCalendar) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showCalendar]);

    // Position the calendar portal relative to the calendar button
    useEffect(() => {
        if (showCalendar && calendarBtnRef.current) {
            const rect = calendarBtnRef.current.getBoundingClientRect();
            setCalendarPos({
                top: rect.bottom + 6,
                left: Math.max(8, rect.right - 240), // 240px calendar width, right-aligned to button
            });
        }
    }, [showCalendar]);

    const getDueDate = useCallback((): Date => {
        const now = new Date();
        if (selectedPriority === 'today') {
            return new Date(now.getFullYear(), now.getMonth(), now.getDate());
        }
        if (selectedPriority === 'tomorrow') {
            return new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
        }
        // custom
        return customDate ?? new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2);
    }, [selectedPriority, customDate]);

    const handleAdd = () => {
        if (!title.trim()) return;
        onAdd({
            title: title.trim(),
            description: description.trim(),
            dueDate: getDueDate(),
        });
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleAdd();
        }
        if (e.key === 'Escape') {
            onCancel();
        }
    };

    const handleCalendarDateSelect = (date: Date) => {
        setCustomDate(date);
        setSelectedPriority('custom');
        setShowCalendar(false);
    };

    const getFormattedCustomDate = (): string => {
        if (!customDate) return '';
        return customDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    // Minimum date for calendar is the day after tomorrow (today & tomorrow have their own pills)
    const dayAfterTomorrow = new Date();
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);

    const isAddDisabled = !title.trim();

    return (
        <div
            ref={ref}
            className={`task-create-card ${className}`}
            onKeyDown={handleKeyDown}
        >
            {/* Header */}
            <div className="task-create-card__header">
                <p className="task-create-card__header-title">Adding task</p>
                <div className="task-create-card__header-buttons">
                    <button
                        type="button"
                        className="task-create-card__btn task-create-card__btn--cancel"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        className="task-create-card__btn task-create-card__btn--add"
                        onClick={handleAdd}
                        disabled={isAddDisabled}
                    >
                        Add
                    </button>
                </div>
            </div>

            {/* Content: Inputs */}
            <div className="task-create-card__content">
                <input
                    ref={titleInputRef}
                    type="text"
                    className="task-create-card__input"
                    placeholder="Write a task..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value.slice(0, 60))}
                    maxLength={60}
                    aria-label="Task title"
                />
                <textarea
                    className="task-create-card__textarea"
                    placeholder={`Optional description...\n(Max 100 characters)`}
                    value={description}
                    onChange={(e) => setDescription(e.target.value.slice(0, 100))}
                    maxLength={100}
                    aria-label="Task description"
                />
            </div>

            {/* Priority Row */}
            <div className="task-create-card__priority">
                <p className="task-create-card__priority-label">Priority:</p>
                <div className="task-create-card__priority-pills">
                    <button
                        type="button"
                        className={`task-create-card__pill ${selectedPriority === 'today' ? 'task-create-card__pill--active-high' : ''}`}
                        onClick={() => { setSelectedPriority('today'); setShowCalendar(false); }}
                        aria-pressed={selectedPriority === 'today'}
                    >
                        Today
                    </button>
                    <button
                        type="button"
                        className={`task-create-card__pill ${selectedPriority === 'tomorrow' ? 'task-create-card__pill--active-medium' : ''}`}
                        onClick={() => { setSelectedPriority('tomorrow'); setShowCalendar(false); }}
                        aria-pressed={selectedPriority === 'tomorrow'}
                    >
                        Tomorrow
                    </button>
                    <div style={{ position: 'relative' }}>
                        <button
                            ref={calendarBtnRef}
                            type="button"
                            className={`task-create-card__pill task-create-card__pill--icon ${selectedPriority === 'custom' ? 'task-create-card__pill--active-low' : ''}`}
                            onClick={() => setShowCalendar(!showCalendar)}
                            aria-label={selectedPriority === 'custom' && customDate
                                ? `Custom date: ${getFormattedCustomDate()}`
                                : 'Pick a custom date'
                            }
                            aria-pressed={selectedPriority === 'custom'}
                        >
                            <CalendarIcon />
                        </button>
                        {showCalendar && createPortal(
                            <div
                                ref={calendarRef}
                                className="task-calendar-portal"
                                style={{ top: calendarPos.top, left: calendarPos.left }}
                            >
                                <CalendarSmall
                                    selectedDate={customDate}
                                    onDateSelect={handleCalendarDateSelect}
                                    minDate={dayAfterTomorrow}
                                />
                            </div>,
                            document.body,
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
});

TaskCreateCardLarge.displayName = 'TaskCreateCardLarge';
