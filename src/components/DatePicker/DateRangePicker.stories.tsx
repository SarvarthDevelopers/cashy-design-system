import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DateRangePicker, type DateRangePickerProps, type DateRange } from './DateRangePicker';

const meta: Meta<DateRangePickerProps> = {
    title: 'Components/DateRangePicker',
    component: DateRangePicker,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        error: { control: 'boolean' },
        disabled: { control: 'boolean' },
        placeholder: { control: 'text' },
        label: { control: 'text' },
        errorMessage: { control: 'text' },
        helperText: { control: 'text' },
    },
    decorators: [
        (Story) => (
            <div style={{ minHeight: '400px', width: '360px', display: 'flex', alignItems: 'flex-start', paddingTop: '20px' }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<DateRangePickerProps>;

const DateRangePickerWrapper = (props: DateRangePickerProps) => {
    const [value, setValue] = useState<DateRange>(
        props.value !== undefined ? props.value : (props.defaultValue || { from: null, to: null })
    );
    return <DateRangePicker {...props} value={value} onChange={setValue} />;
};

export const Default: Story = {
    args: {
        label: 'Date Range',
        placeholder: 'Select date range',
    },
    render: (args) => <DateRangePickerWrapper {...args} />,
};

export const WithValue: Story = {
    args: {
        label: 'Date Range',
        defaultValue: {
            from: new Date(2024, 1, 2),  // Feb 2, 2024
            to: new Date(2024, 1, 15),  // Feb 15, 2024
        },
    },
    render: (args) => <DateRangePickerWrapper {...args} />,
};

export const WithError: Story = {
    args: {
        label: 'Date Range',
        defaultValue: {
            from: new Date(2024, 1, 2),
            to: new Date(2024, 1, 15),
        },
        error: true,
        errorMessage: 'Invalid date range selected.',
    },
    render: (args) => <DateRangePickerWrapper {...args} />,
};

export const Disabled: Story = {
    args: {
        label: 'Date Range',
        defaultValue: {
            from: new Date(2024, 1, 2),
            to: new Date(2024, 1, 15),
        },
        disabled: true,
    },
    render: (args) => <DateRangePickerWrapper {...args} />,
};
