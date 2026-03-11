import { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within, fn, waitFor } from '@storybook/test';
import { Dropdown } from './Dropdown';

const DropdownWrapper = (args: import('react').ComponentProps<typeof Dropdown>) => {
    const [value, setValue] = useState(args.value);
    
    // Sync with controls
    useEffect(() => {
        setValue(args.value);
    }, [args.value]);

    const handleChange = (selected: string) => {
        setValue(selected);
        args.onChange?.(selected);
    };

    return <Dropdown {...args} value={value} onChange={handleChange} />;
};

const meta: Meta<typeof Dropdown> = {
    title: 'Components/Dropdown',
    component: Dropdown,
    parameters: {
        layout: 'padded',
        design: {
            type: 'figma',
        },
    },
    tags: [],
    argTypes: {
        onChange: { action: 'changed' },
        disabled: {
            control: 'boolean',
            description: 'Disable the dropdown',
        },
        error: {
            control: 'boolean',
            description: 'Show error state',
        },
    },
    render: (args) => <DropdownWrapper {...args} />,
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

const defaultOptions = [
    { label: 'Cashy AT', value: 'at' },
    { label: 'Cashy DE', value: 'de' },
];

export const Default: Story = {
    args: {
        placeholder: 'Company',
        options: defaultOptions,
    },
};

export const Focused: Story = {
    args: {
        placeholder: 'Company',
        options: defaultOptions,
    },
    play: async ({ canvasElement }) => {
         const canvas = within(canvasElement);
         const trigger = canvas.getByRole('combobox');
         await userEvent.click(trigger);
    }
};

export const Filled: Story = {
    args: {
        placeholder: 'Company',
        options: defaultOptions,
        value: 'at',
    },
};

export const Disabled: Story = {
    args: {
        placeholder: 'Company',
        options: defaultOptions,
        disabled: true,
    },
};

export const WithLabelAndHelperText: Story = {
    args: {
        label: 'Select Region',
        placeholder: 'Company',
        options: defaultOptions,
        helperText: 'Please select a company region to proceed.',
    },
};

export const ErrorState: Story = {
    args: {
        label: 'Select Region',
        placeholder: 'Company',
        options: defaultOptions,
        error: true,
        errorMessage: 'Region is required.',
    },
};

export const InteractiveSelection: Story = {
     args: {
        placeholder: 'Company',
        options: defaultOptions,
        onChange: fn(),
    },
    play: async ({ args, canvasElement }) => {
        const canvas = within(canvasElement);
        const trigger = canvas.getByRole('combobox');
        
        // Open dropdown
        await userEvent.click(trigger);
        
        // Find options in the listbox
        const listbox = canvas.getByRole('listbox');
        const optionsList = within(listbox).getAllByRole('option');
        
        // Click the first option
        await userEvent.click(optionsList[0]);
        
        // Verify selection
        await waitFor(() => expect(args.onChange).toHaveBeenCalledWith('at'));
    }
}
