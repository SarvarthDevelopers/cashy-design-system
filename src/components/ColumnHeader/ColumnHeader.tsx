import React, { forwardRef } from 'react';
import styles from './ColumnHeader.module.css';

export interface ColumnHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * The title of the column
     */
    title: string;
    /**
     * The number of cards in the column
     */
    count?: number;
    /**
     * Determines which actions are visible
     * "admin" shows both config and add buttons
     * "staff" shows only add button
     */
    variant?: 'admin' | 'staff';
    /**
     * Callback when the config button is clicked
     */
    onConfigClick?: () => void;
    /**
     * Callback when the add button is clicked
     */
    onAddClick?: () => void;
}

export const ColumnHeader = forwardRef<HTMLDivElement, ColumnHeaderProps>(
    ({ title, count = 0, variant = 'admin', onConfigClick, onAddClick, className, ...props }, ref) => {
        return (
            <div ref={ref} className={`${styles.container} ${className || ''}`} {...props}>
                <div className={styles.header}>
                    <div className={styles.titleWrapper}>
                        <h3 className={styles.title} title={title}>
                            {title}
                        </h3>
                    </div>
                    
                    <div className={styles.actions}>
                        <div className={styles.badge} aria-label={`${count} items`}>
                            {count}
                        </div>
                        
                        {variant === 'admin' && (
                            <button
                                type="button"
                                className={styles.iconButton}
                                onClick={onConfigClick}
                                aria-label="Configure column"
                            >
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.66667 8H6.66667M6.66667 8C6.66667 9.10457 7.5621 10 8.66667 10C9.77124 10 10.6667 9.10457 10.6667 8C10.6667 6.89543 9.77124 6 8.66667 6C7.5621 6 6.66667 6.89543 6.66667 8ZM13.3333 8H10.6667M9.33333 3.33333H13.3333M2.66667 3.33333H5.33333M5.33333 3.33333C5.33333 4.4379 6.22876 5.33333 7.33333 5.33333C8.4379 5.33333 9.33333 4.4379 9.33333 3.33333C9.33333 2.22876 8.4379 1.33333 7.33333 1.33333C6.22876 1.33333 5.33333 2.22876 5.33333 3.33333ZM2.66667 12.6667H9.33333M13.3333 12.6667H12M12 12.6667C12 13.7712 11.1046 14.6667 10 14.6667C8.89543 14.6667 8 13.7712 8 12.6667C8 11.5621 8.89543 10.6667 10 10.6667C11.1046 10.6667 12 11.5621 12 12.6667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                        )}
                        
                        <button
                            type="button"
                            className={styles.iconButton}
                            onClick={onAddClick}
                            aria-label="Add item"
                        >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 3.33333V12.6667M3.33333 8H12.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
);

ColumnHeader.displayName = 'ColumnHeader';
