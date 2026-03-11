import React, { forwardRef, useState, useRef, useEffect } from 'react';
import styles from './Dropdown.module.css';

export interface DropdownOption {
    label: string;
    value: string;
}

export interface DropdownProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'value' | 'onChange'> {
    options: DropdownOption[];
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    label?: string;
    error?: boolean;
    errorMessage?: string;
    helperText?: string;
}

export const Dropdown = forwardRef<HTMLButtonElement, DropdownProps>(
    ({ options, value, onChange, placeholder = 'Select an option', label, error, errorMessage, helperText, disabled, className, ...props }, ref) => {
        const [isOpen, setIsOpen] = useState(false);
        const containerRef = useRef<HTMLDivElement>(null);

        const generatedId = React.useId();
        const buttonId = props.id || generatedId;
        const listboxId = `${buttonId}-listbox`;
        const helperId = helperText ? `${buttonId}-helper` : undefined;
        const errorId = errorMessage ? `${buttonId}-error` : undefined;
        const describedBy = [helperId, errorId].filter(Boolean).join(' ');

        const selectedOption = options.find((opt) => opt.value === value);

        useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                    setIsOpen(false);
                }
            };

            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, []);

        const handleToggle = () => {
            if (!disabled) {
                setIsOpen((prev) => !prev);
            }
        };

        const handleSelect = (optionValue: string, e: React.MouseEvent) => {
            e.stopPropagation();
            if (!disabled) {
                onChange?.(optionValue);
                setIsOpen(false);
            }
        };

        return (
            <div className={`${styles.container} ${className || ''}`} ref={containerRef}>
                {label && (
                    <label htmlFor={buttonId} className={styles.label}>
                        {label}
                    </label>
                )}

                <button
                    ref={ref}
                    id={buttonId}
                    type="button"
                    className={`
                        ${styles.trigger}
                        ${isOpen ? styles.isOpen : ''}
                        ${disabled ? styles.disabled : ''}
                        ${error ? styles.error : ''}
                    `}
                    onClick={handleToggle}
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
                    aria-controls={isOpen ? listboxId : undefined}
                    disabled={disabled}
                    aria-invalid={!!error}
                    aria-describedby={describedBy || undefined}
                    {...props}
                >
                    <div className={styles.content}>
                        {selectedOption ? (
                            <span className={styles.value}>{selectedOption.label}</span>
                        ) : (
                            <span className={`${styles.value} ${styles.placeholder}`}>{placeholder}</span>
                        )}
                    </div>
                    <div className={styles.icon}>
                        {isOpen ? (
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 12.5L10 7.5L5 12.5" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        ) : (
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        )}
                    </div>
                </button>

                {isOpen && (
                    <div id={listboxId} className={styles.dropdownList} role="listbox">
                        {options.map((option) => {
                            const isSelected = option.value === value;
                            return (
                                <button
                                    key={option.value}
                                    type="button"
                                    className={`${styles.item} ${isSelected ? styles.selected : ''}`}
                                    onClick={(e) => handleSelect(option.value, e)}
                                    role="option"
                                    aria-selected={isSelected}
                                >
                                    {option.label}
                                </button>
                            );
                        })}
                    </div>
                )}

                {errorMessage && <span id={errorId} className={styles.errorMessage}>{errorMessage}</span>}
                {!errorMessage && helperText && <span id={helperId} className={styles.helperText}>{helperText}</span>}
            </div>
        );
    }
);

Dropdown.displayName = 'Dropdown';
