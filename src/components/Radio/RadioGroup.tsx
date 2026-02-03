import React, { useId, useState } from 'react';
import { RadioContext } from './RadioContext';
import './Radio.css';

export interface RadioGroupProps {
    /**
     * The name attribute for all radio buttons in the group
     */
    name?: string;
    /**
     * Currently selected value
     */
    value?: string | number;
    /**
     * Default selected value (uncontrolled)
     */
    defaultValue?: string | number;
    /**
     * Callback when selection changes
     */
    onChange?: (value: string) => void; // specific type for safety
    /**
     * Disable all radios in the group
     */
    disabled?: boolean;
    /**
     * Size of radios in the group
     */
    size?: 'small' | 'medium' | 'large';
    /**
     * Direction of the group layout
     */
    direction?: 'horizontal' | 'vertical';
    className?: string;
    children: React.ReactNode;
}

/**
 * Wrapper for a group of Radio buttons.
 */
export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(({
    name,
    value,
    defaultValue,
    onChange,
    disabled = false,
    size = 'medium',
    direction = 'vertical',
    className = '',
    children,
    ...props
}, ref) => {
    const generatedName = useId();
    const groupName = name || `radio-group-${generatedName}`;

    // Handle controlled vs uncontrolled state
    const [internalValue, setInternalValue] = useState(defaultValue);
    const isControlled = typeof value !== 'undefined';
    const currentValue = isControlled ? value : internalValue;

    // Note: In a real app we might use useControllableState hook here.
    // For simplicity, we assume controlled if value is provided, otherwise uncontrolled logic 
    // is often handled by native inputs, but for Context we might need state.
    // However, native radio behavior works well if 'name' is consistent. 
    // But 'onChange' on group usually needs interception.

    // We'll trust the user to pass 'value' and 'onChange' for controlled, 
    // or rely on native bubbling for uncontrolled if they just listen to form events.
    // But to update the UI of custom radios, we might need to know checking status via Context?
    // Actually, native :checked selector works if inputs are synced via 'name'.
    // BUT, for controlled components in React, we need to pass 'checked' prop to Input.

    const handleGroupChange = (newValue: string | number) => {
        if (!isControlled) {
            setInternalValue(newValue);
        }
        if (onChange) {
            onChange(newValue.toString());
        }
    };

    return (
        <RadioContext.Provider value={{
            name: groupName,
            value: currentValue,
            onChange: handleGroupChange,
            disabled,
            size
        }}>
            <div
                ref={ref}
                role="radiogroup"
                className={`radio-group radio-group--${direction} ${className}`}
                {...props}
            >
                {children}
            </div>
        </RadioContext.Provider>
    );
});

RadioGroup.displayName = 'RadioGroup';
