import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { TimePicker } from './TimePicker';

describe('TimePicker', () => {
    it('renders with label and placeholder', () => {
        render(<TimePicker label="Meeting Time" placeholder="Select time" />);
        expect(screen.getByText('Meeting Time')).toBeInTheDocument();
        expect(screen.getByText('Select time')).toBeInTheDocument();
    });

    it('renders default selected time value', () => {
        render(<TimePicker label="Meeting Time" defaultValue="14:45" />);
        expect(screen.getByText('14:45')).toBeInTheDocument();
    });

    it('shows error state and message', () => {
        render(
            <TimePicker
                label="Meeting Time"
                error={true}
                errorMessage="Time is required"
            />
        );
        expect(screen.getByText('Time is required')).toBeInTheDocument();
    });

    it('shows helper text', () => {
        render(
            <TimePicker
                label="Meeting Time"
                helperText="Must be during business hours"
            />
        );
        expect(screen.getByText('Must be during business hours')).toBeInTheDocument();
    });

    it('prevents interaction when disabled', async () => {
        const user = userEvent.setup();
        render(<TimePicker label="Meeting Time" disabled />);
        const trigger = screen.getByRole('button', { name: /Meeting Time/i });
        
        expect(trigger).toBeDisabled();
        
        await user.click(trigger);
        expect(screen.queryByText('HH')).not.toBeInTheDocument();
    });

    it('opens popover list on click and selects a time via columns', async () => {
        const user = userEvent.setup();
        const handleChange = vi.fn();
        
        render(
            <TimePicker 
                label="Meeting Time" 
                minuteInterval={15} 
                onChange={handleChange} 
            />
        );
        
        const trigger = screen.getByRole('button', { name: /Meeting Time/i });
        await user.click(trigger);
        
        // Elements HH and MM headers and options should be displayed
        expect(screen.getByText('HH')).toBeInTheDocument();
        expect(screen.getByText('MM')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: '12' })).toBeInTheDocument();
        
        // Click hour '14'
        const hourBtn = screen.getByRole('button', { name: '14' });
        await user.click(hourBtn);
        
        // Click minute '30'
        const minBtn = screen.getByRole('button', { name: '30' });
        await user.click(minBtn);
        
        // Calls onChange and updates trigger display
        expect(handleChange).toHaveBeenCalledWith('14:30');
        expect(screen.getByText('14:30')).toBeInTheDocument();
    });
});
