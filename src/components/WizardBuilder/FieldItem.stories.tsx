import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import { FieldItem, type FieldItemProps, type FieldItemData } from './FieldItem';

// ─── Shared decorator: consistent with project standard ─────────────────────

const meta: Meta<FieldItemProps> = {
  title: 'Wizard Builder/FieldItem',
  component: FieldItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '90vw', maxWidth: '800px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    isSelected: { control: 'boolean' },
    onSelect: { action: 'onSelect' },
    onRemove: { action: 'onRemove' },
    onUpdate: { action: 'onUpdate' },
    field: { table: { disable: true } },
  },
  render: function Render(args) {
    const [{ field, isSelected }, updateArgs] = useArgs();
    
    const handleUpdate = (id: string, updates: Partial<FieldItemData>) => {
      updateArgs({ field: { ...field, ...updates } });
      args.onUpdate?.(id, updates);
    };

    return (
      <FieldItem 
        {...args} 
        field={field} 
        isSelected={isSelected}
        onSelect={() => updateArgs({ isSelected: !isSelected })}
        onUpdate={handleUpdate} 
      />
    );
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ━━━━━━ MOCK DATA GENERATOR ━━━━━━

const createField = (type: string, label: string, extra = {}): FieldItemData => ({
  id: `field-${Math.random().toString(36).substr(2, 9)}`,
  fieldType: { type: type as any, label: type.charAt(0).toUpperCase() + type.slice(1), icon: type },
  label,
  placeholder: 'Enter value',
  required: false,
  expanded: false,
  ...extra,
});

// ━━━━━━ STORIES (ALL 9 TYPES) ━━━━━━

export const TextInput: Story = {
  args: { field: createField('text', 'Full Name') }
};

export const Textarea: Story = {
  args: { field: createField('textarea', 'Biography') }
};

export const Dropdown: Story = {
  args: { field: createField('dropdown', 'Country', { options: ['USA', 'India', 'Germany'], placeholder: 'Select country' }) }
};

export const Checkbox: Story = {
  args: { field: createField('checkbox', 'Interests', { options: ['Art', 'Tech', 'Music'] }) }
};

export const FileUpload: Story = {
  args: { field: createField('file', 'Resume', { buttonLabel: 'Upload PDF', maxFileSize: 5 }) }
};

export const ImageUpload: Story = {
  args: { field: createField('image', 'Vehicle Photo', { buttonLabel: 'Upload Photo', maxFileSize: 2, enableCamera: false, expanded: true }) }
};

export const CameraEnabled: Story = {
  args: { field: createField('image', 'Identity Proof', { buttonLabel: 'Capture Photo', enableCamera: true, expanded: true }) }
};

export const DatePicker: Story = {
  args: { field: createField('date', 'Birth Date') }
};

export const Toggle: Story = {
  args: { field: createField('toggle', 'Notifications', { helpText: 'Enable email alerts' }) }
};

export const URL: Story = {
  args: { field: createField('url', 'Portfolio URL', { placeholder: 'https://' }) }
};

// ━━━━━━ CANVAS OVERVIEW ━━━━━━

export const CanvasOverview: Story = {
  name: 'Canvas / Overview',
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
  render: function Render() {
    const [fields, setFields] = React.useState<FieldItemData[]>([
      createField('text', 'VIN Number', { placeholder: 'Enter VIN', required: true }),
      createField('image', 'Vehicle Exterior', { enableCamera: true, expanded: true }),
      createField('dropdown', 'Roadworthiness', { options: ['Roadworthy', 'Needs Repairs'], expanded: false }),
    ]);
    const [draggedId, setDraggedId] = React.useState<string | null>(null);

    const handleUpdate = (id: string, updates: Partial<FieldItemData>) => {
      setFields(prev => prev.map(f => f.id === id ? { ...f, ...updates } : f));
    };

    const handleDragStart = (id: string) => {
      setDraggedId(id);
    };

    const handleDragOver = (e: React.DragEvent, targetId: string) => {
      e.preventDefault();
      if (!draggedId || draggedId === targetId) return;

      const draggedIndex = fields.findIndex(f => f.id === draggedId);
      const targetIndex = fields.findIndex(f => f.id === targetId);

      if (draggedIndex !== -1 && targetIndex !== -1) {
        const newFields = [...fields];
        const [removed] = newFields.splice(draggedIndex, 1);
        newFields.splice(targetIndex, 0, removed);
        setFields(newFields);
      }
    };

    const handleDragEnd = () => {
      setDraggedId(null);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {fields.map(f => (
          <FieldItem 
            key={f.id} 
            field={f} 
            isSelected={f.expanded}
            onUpdate={handleUpdate}
            onRemove={(id) => setFields(prev => prev.filter(item => item.id !== id))}
            draggable
            isDragging={draggedId === f.id}
            onDragStart={() => handleDragStart(f.id)}
            onDragOver={(e) => handleDragOver(e, f.id)}
            onDragEnd={handleDragEnd}
          />
        ))}
      </div>
    );
  },
};
