import React, { useContext } from 'react';
import { TabsContext } from './Tabs';

export interface TabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * Unique value for the tab
     */
    value: string;
    /**
     * Optional icon to display
     */
    icon?: React.ReactNode;
}

export const Tab = React.forwardRef<HTMLButtonElement, TabProps>(({
    value,
    icon,
    children,
    className = '',
    disabled,
    ...props
}, ref) => {
    const context = useContext(TabsContext);

    if (!context) {
        throw new Error('Tab must be used within a Tabs component');
    }

    const { value: selectedValue, onValueChange } = context;
    const isSelected = selectedValue === value;

    return (
        <button
            type="button"
            role="tab"
            aria-selected={isSelected}
            disabled={disabled}
            className={`tab ${isSelected ? 'tab--selected' : ''} ${className}`}
            onClick={() => !disabled && onValueChange(value)}
            ref={ref}
            {...props}
        >
            {icon && <span className="tab__icon">{icon}</span>}
            <span className="tab__label">{children}</span>

        </button>
    );
});

Tab.displayName = 'Tab';
