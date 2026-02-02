import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
    title: 'Components/Input',
    component: Input,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        type: {
            control: 'select',
            options: ['text', 'password', 'email', 'number', 'search'],
        },
        error: { control: 'boolean' },
        disabled: { control: 'boolean' },
    },
    decorators: [
        (Story) => (
            <div style={{ width: '400px', maxWidth: '100%' }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof Input>;

// --- Base Input ---
export const Base: Story = {
    args: {
        label: 'Email Address',
        placeholder: 'Enter your email',
        type: 'email',
        helperText: 'We will not share your email.',
    },
};

// --- Search Input ---
const SearchIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
);

export const Search: Story = {
    args: {
        label: 'Search',
        placeholder: 'Search for items...',
        type: 'search',
        leftIcon: <SearchIcon />,
    },
};

// --- Number Input ---
export const Number: Story = {
    args: {
        label: 'Quantity',
        placeholder: '0',
        type: 'number',
        min: 0,
        max: 100,
    },
};

// --- Error State ---
export const WithError: Story = {
    args: {
        label: 'Username',
        defaultValue: 'invalid_user',
        error: true,
        errorMessage: 'This username is already taken.',
    },
};

// --- Disabled State ---
export const Disabled: Story = {
    args: {
        label: 'Disabled Input',
        placeholder: 'Cannot type here',
        disabled: true,
    },
};
