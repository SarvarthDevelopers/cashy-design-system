import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { DateRangePicker } from './DateRangePicker';

describe('DateRangePicker', () => {
    it('renders with label and placeholder', () => {
        render(<DateRangePicker label="Travel Dates" placeholder="Select dates" />);
        expect(screen.getByText('Travel Dates')).toBeInTheDocument();
        expect(screen.getByText('Select dates')).toBeInTheDocument();
    });

    it('renders default selected range formatted value', () => {
        const defaultRange = {
            from: new Date(2024, 1, 2),  // Feb 2, 2024
            to: new Date(2024, 1, 15),  // Feb 15, 2024
        };
        render(<DateRangePicker label="Travel Dates" defaultValue={defaultRange} />);
        expect(screen.getByText('Feb 2, 2024 - Feb 15, 2024')).toBeInTheDocument();
    });

    it('shows error state and message', () => {
        render(
            <DateRangePicker
                label="Travel Dates"
                error={true}
                errorMessage="Invalid range"
            />
        );
        expect(screen.getByText('Invalid range')).toBeInTheDocument();
    });

    it('prevents interaction when disabled', async () => {
        const user = userEvent.setup();
        render(<DateRangePicker label="Travel Dates" disabled />);
        const trigger = screen.getByRole('button', { name: /Travel Dates/i });
        
        expect(trigger).toBeDisabled();
        
        await user.click(trigger);
        expect(screen.queryByText('February 2024')).not.toBeInTheDocument();
    });

    it('opens popover on click and selects a range', async () => {
        const user = userEvent.setup();
        const handleChange = vi.fn();
        const defaultRange = {
            from: new Date(2024, 1, 2),  // Feb 2, 2024
            to: null,
        };

        render(
            <DateRangePicker 
                label="Travel Dates" 
                defaultValue={defaultRange} 
                onChange={handleChange} 
            />
        );

        const trigger = screen.getByRole('button', { name: /Travel Dates/i });
        await user.click(trigger);

        // Check header months are displayed
        expect(screen.getByText('February 2024')).toBeInTheDocument();
        expect(screen.getByText('March 2024')).toBeInTheDocument();

        // Select end date: click "15" on Left calendar
        const dayCell = screen.getAllByRole('button', { name: '15' })[0]; // Left calendar day 15
        await user.click(dayCell);

        expect(handleChange).toHaveBeenCalledWith({
            from: expect.any(Date),
            to: expect.any(Date),
        });

        expect(screen.getByText('Feb 2, 2024 - Feb 15, 2024')).toBeInTheDocument();
    });

    it('applies quick select presets from the sidebar', async () => {
        const user = userEvent.setup();
        const handleChange = vi.fn();

        render(
            <DateRangePicker 
                label="Travel Dates" 
                onChange={handleChange} 
            />
        );

        const trigger = screen.getByRole('button', { name: /Travel Dates/i });
        await user.click(trigger);

        // Click "Yesterday" preset button
        const yesterdayBtn = screen.getByRole('button', { name: 'Yesterday' });
        await user.click(yesterdayBtn);

        expect(handleChange).toHaveBeenCalled();
    });
});
