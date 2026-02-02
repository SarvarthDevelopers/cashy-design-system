import type { Meta, StoryObj } from '@storybook/react';
import { TextArea } from './TextArea';

const meta: Meta<typeof TextArea> = {
    title: 'Components/TextArea',
    component: TextArea,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        resize: {
            control: 'select',
            options: ['none', 'vertical', 'horizontal', 'both'],
        },
        error: { control: 'boolean' },
        disabled: { control: 'boolean' },
        rows: { control: 'number' },
    },
};

export default meta;
type Story = StoryObj<typeof TextArea>;

// --- Default TextArea ---
export const Default: Story = {
    args: {
        label: 'Description',
        placeholder: 'Enter a detailed description...',
        rows: 4,
        helperText: 'Max 500 characters',
    },
};

// --- Error State ---
export const WithError: Story = {
    args: {
        label: 'Feedback',
        error: true,
        errorMessage: 'Feedback is required.',
    },
};

// --- Disabled State ---
export const Disabled: Story = {
    args: {
        label: 'Read Only Notes',
        value: 'This content cannot be edited.',
        disabled: true,
    },
};
