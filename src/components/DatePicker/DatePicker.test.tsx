import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { DatePicker } from './DatePicker';

describe('DatePicker', () => {
    it('renders with label and placeholder', () => {
        render(<DatePicker label="Birth Date" placeholder="Select date" />);
        expect(screen.getByText('Birth Date')).toBeInTheDocument();
        expect(screen.getByText('Select date')).toBeInTheDocument();
    });

    it('renders with default selected date value', () => {
        const defaultDate = new Date(2024, 1, 2); // Feb 2, 2024
        render(<DatePicker label="Birth Date" defaultValue={defaultDate} />);
        expect(screen.getByText('Feb 2, 2024')).toBeInTheDocument();
    });

    it('shows error state and message', () => {
        render(
            <DatePicker
                label="Birth Date"
                error={true}
                errorMessage="Date is required"
            />
        );
        expect(screen.getByText('Date is required')).toBeInTheDocument();
    });

    it('shows helper text', () => {
        render(
            <DatePicker
                label="Birth Date"
                helperText="Must be in the past"
            />
        );
        expect(screen.getByText('Must be in the past')).toBeInTheDocument();
    });

    it('prevents interaction when disabled', async () => {
        const user = userEvent.setup();
        render(<DatePicker label="Birth Date" disabled />);
        const trigger = screen.getByRole('button', { name: /Birth Date/i });
        
        expect(trigger).toBeDisabled();
        
        await user.click(trigger);
        expect(screen.queryByText('February 2024')).not.toBeInTheDocument();
    });

    it('opens popover calendar on click and selects a date', async () => {
        const user = userEvent.setup();
        const handleChange = vi.fn();
        const defaultDate = new Date(2024, 1, 2); // Feb 2, 2024 (Friday)
        
        render(
            <DatePicker 
                label="Birth Date" 
                defaultValue={defaultDate} 
                onChange={handleChange} 
            />
        );
        
        const trigger = screen.getByRole('button', { name: /Birth Date/i });
        await user.click(trigger);
        
        // Check calendar header is displayed
        expect(screen.getByText('February 2024')).toBeInTheDocument();
        
        // Click on "15" (Feb 15, 2024)
        const dayCell = screen.getByRole('button', { name: '15' });
        await user.click(dayCell);
        
        expect(handleChange).toHaveBeenCalledWith(expect.any(Date));
        // The value should now reflect Feb 15, 2024
        expect(screen.getByText('Feb 15, 2024')).toBeInTheDocument();
    });
});
