import React, { useState, useEffect } from 'react';
import './Tabs.css';

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Controlled value of the active tab
     */
    value?: string;
    /**
     * Default value for uncontrolled state
     */
    defaultValue?: string;
    /**
     * Callback when value changes
     */
    onValueChange?: (value: string) => void;
    /**
     * Visual variant of the tabs
     */
    variant?: 'underline' | 'pill' | 'ghost' | 'segment';
    /**
     * Whether tabs should take up full width
     */
    fullWidth?: boolean;
    /**
     * Tab items
     */
    children: React.ReactNode;
}

export const TabsContext = React.createContext<{
    value: string;
    onValueChange: (value: string) => void;
    variant: 'underline' | 'pill' | 'ghost' | 'segment';
} | null>(null);

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(({
    value: controlledValue,
    defaultValue,
    onValueChange,
    variant = 'underline',
    fullWidth = false,
    className = '',
    children,
    ...props
}, ref) => {
    const [statsValue, setLocalValue] = useState(defaultValue || '');
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : statsValue;

    const handleValueChange = (newValue: string) => {
        if (!isControlled) {
            setLocalValue(newValue);
        }
        onValueChange?.(newValue);
    };

    // Set initial value if not controlled and defaultValue is not provided, 
    // strictly speaking we might wait for children to mount to pick first, 
    // but standard practice is purely controlled or default. 
    // If no default and no value, nothing is selected.

    return (
        <TabsContext.Provider value={{ value: value || '', onValueChange: handleValueChange, variant }}>
            <div
                className={`tabs tabs--${variant} ${fullWidth ? 'tabs--full-width' : ''} ${className}`}
                ref={ref}
                {...props}
            >
                {children}
            </div>
        </TabsContext.Provider>
    );
});

Tabs.displayName = 'Tabs';
