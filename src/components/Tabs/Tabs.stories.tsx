import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Tabs } from './Tabs';
import { Tab } from './Tab';

const meta: Meta<typeof Tabs> = {
    title: 'Components/Tabs',
    component: Tabs,
    parameters: {
        layout: 'centered',
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/SgNdO2YmHiOGzsGwy1ZHWN/CASHY-Design-System-Kit?node-id=58-2991&t=JL116qCGQBMLHtwl-4',
        },
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['underline', 'pill', 'ghost', 'segment'],
            description: 'Visual variant of the tabs',
        },
        fullWidth: {
            control: 'boolean',
            description: 'Whether tabs should take up full container width',
        },
        onValueChange: { action: 'value changed' },
    },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Underline: Story = {
    args: {
        defaultValue: 'tab1',
        variant: 'underline',
        children: (
            <>
                <Tab value="tab1">Account</Tab>
                <Tab value="tab2">Preferences</Tab>
                <Tab value="tab3">Security</Tab>
            </>
        ),
    },
};

export const Pill: Story = {
    args: {
        defaultValue: 'tab1',
        variant: 'pill',
        children: (
            <>
                <Tab value="tab1">All</Tab>
                <Tab value="tab2">Active</Tab>
                <Tab value="tab3">Completed</Tab>
            </>
        ),
    },
};

export const Ghost: Story = {
    args: {
        defaultValue: 'tab1',
        variant: 'ghost',
        children: (
            <>
                <Tab value="tab1">Overview</Tab>
                <Tab value="tab2">Analytics</Tab>
                <Tab value="tab3">Reports</Tab>
            </>
        ),
    },
};

export const Segment: Story = {
    args: {
        defaultValue: 'tab1',
        variant: 'segment',
        children: (
            <>
                <Tab value="tab1">Daily</Tab>
                <Tab value="tab2">Weekly</Tab>
                <Tab value="tab3">Monthly</Tab>
            </>
        ),
    },
};

export const FullWidth: Story = {
    args: {
        defaultValue: 'tab1',
        variant: 'underline',
        fullWidth: true,
        children: (
            <>
                <Tab value="tab1">Login</Tab>
                <Tab value="tab2">Register</Tab>
            </>
        ),
    },
    parameters: {
        layout: 'padded', // To improved visibility of full width
    },
    decorators: [
        (Story) => (
            <div style={{ width: '400px' }}>
                <Story />
            </div>
        ),
    ]
};

export const DisabledTab: Story = {
    args: {
        defaultValue: 'tab1',
        variant: 'underline',
        children: (
            <>
                <Tab value="tab1">Available</Tab>
                <Tab value="tab2" disabled>Unavailable</Tab>
                <Tab value="tab3">Hidden</Tab>
            </>
        ),
    },
};
