import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker, type DatePickerProps } from './DatePicker';

const meta: Meta<DatePickerProps> = {
    title: 'Components/DatePicker',
    component: DatePicker,
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
            <div style={{ minHeight: '400px', width: '340px', display: 'flex', alignItems: 'flex-start', paddingTop: '20px' }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<DatePickerProps>;

// Interactive controlled component to demonstrate change state in Storybook
const DatePickerWrapper = (props: DatePickerProps) => {
    const [value, setValue] = useState<Date | null>(
        props.value !== undefined ? props.value : (props.defaultValue || null)
    );
    return <DatePicker {...props} value={value} onChange={setValue} />;
};

export const Default: Story = {
    args: {
        label: 'Label',
        placeholder: 'Select date',
    },
    render: (args) => <DatePickerWrapper {...args} />,
};

export const WithValue: Story = {
    args: {
        label: 'Label',
        defaultValue: new Date(2024, 1, 2), // Feb 2, 2024
    },
    render: (args) => <DatePickerWrapper {...args} />,
};

export const WithError: Story = {
    args: {
        label: 'Label',
        defaultValue: new Date(2024, 1, 2),
        error: true,
        errorMessage: 'Invalid date selected.',
    },
    render: (args) => <DatePickerWrapper {...args} />,
};

export const Disabled: Story = {
    args: {
        label: 'Label',
        defaultValue: new Date(2024, 1, 2),
        disabled: true,
    },
    render: (args) => <DatePickerWrapper {...args} />,
};
