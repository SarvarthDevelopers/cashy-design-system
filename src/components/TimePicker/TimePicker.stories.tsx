import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TimePicker, type TimePickerProps } from './TimePicker';

const meta: Meta<TimePickerProps> = {
    title: 'Components/TimePicker',
    component: TimePicker,
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
        minuteInterval: { control: { type: 'number', step: 15 } },
    },
    decorators: [
        (Story) => (
            <div style={{ minHeight: '350px', width: '200px', display: 'flex', alignItems: 'flex-start', paddingTop: '20px' }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<TimePickerProps>;

const TimePickerWrapper = (props: TimePickerProps) => {
    const [value, setValue] = useState<string | null>(
        props.value !== undefined ? props.value : (props.defaultValue || null)
    );
    return <TimePicker {...props} value={value} onChange={setValue} />;
};

export const Default: Story = {
    args: {
        label: 'Label',
        placeholder: 'Select time',
        minuteInterval: 15,
    },
    render: (args) => <TimePickerWrapper {...args} />,
};

export const WithValue: Story = {
    args: {
        label: 'Label',
        defaultValue: '12:00',
        minuteInterval: 15,
    },
    render: (args) => <TimePickerWrapper {...args} />,
};

export const WithError: Story = {
    args: {
        label: 'Label',
        defaultValue: '14:45',
        error: true,
        errorMessage: 'Invalid time selected.',
        minuteInterval: 15,
    },
    render: (args) => <TimePickerWrapper {...args} />,
};

export const Disabled: Story = {
    args: {
        label: 'Label',
        defaultValue: '14:45',
        disabled: true,
        minuteInterval: 15,
    },
    render: (args) => <TimePickerWrapper {...args} />,
};
