import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { KanBanBoard } from './KanBanBoard';
import { ColumnHeader } from '../ColumnHeader/ColumnHeader';

const meta = {
  title: 'Board/KanBanBoard',
  component: KanBanBoard,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
      onAddColumn: { action: 'onAddColumn' }
  }
} satisfies Meta<typeof KanBanBoard>;

export default meta;

// We use an extended type just for the Story parameters to expose controls 
// while keeping the native component strictly typed using KanBanBoardProps
type StoryProps = React.ComponentProps<typeof KanBanBoard> & {
    firstColumnTitle?: string;
    firstColumnCount?: number;
    colCount?: number;
};
type Story = StoryObj<StoryProps>;

interface DummyColumnProps {
  title: string;
  count: number;
  variant?: 'admin' | 'staff';
  focused?: boolean;
}

const DummyColumn: React.FC<DummyColumnProps> = ({ 
  title, 
  count, 
  variant = 'admin'
}) => (
  <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
    <div className="cashy-kanban-column-header">
      <ColumnHeader title={title} count={count} variant={variant} />
    </div>
    <div className="cashy-kanban-column-body">
      {/* Dynamically render cards based on the column's count property */}
      {Array.from({ length: count }).map((_, i) => (
        <div 
          key={`dummy-card-${i}`} 
          style={{ 
            minHeight: '96px', 
            width: '100%',
            backgroundColor: 'var(--background-secondary, #F4F5F7)', 
            borderRadius: 'var(--radius-200, 8px)', 
            border: '1px solid var(--border-primary, #E2E8F0)',
            flexShrink: 0 
          }} 
        />
      ))}
    </div>
  </div>
);

export const Default: Story = {
  args: {
    firstColumnTitle: 'Editable Column',
    firstColumnCount: 12,
    colCount: 5,
    onAddColumn: fn()
  },
  render: function Render(args) {
    // We construct the initial columns based on Controls
    const initialColumns = React.useMemo(() => Array.from({ length: args.colCount ?? 5 }).map((_, i) => ({
      id: `col-${i}-${Date.now()}`,
      title: i === 0 ? (args.firstColumnTitle ?? 'Column 1') : `Column ${i + 1}`,
      count: i === 0 ? (args.firstColumnCount ?? 12) : Math.floor(Math.random() * 20),
      variant: (i % 2 === 0 ? 'admin' : 'staff') as 'admin' | 'staff',
      focused: false,
    })), [args.colCount, args.firstColumnCount, args.firstColumnTitle]); // Intentionally only rebuilding array map structurally if explicitly column count resizes

    const [columns, setColumns] = React.useState(initialColumns);

    // Sync specific story semantic controls dynamically to strictly the first column only
    React.useEffect(() => {
        setColumns(cols => {
            const newCols = [...cols];
            if (newCols.length > 0) {
                newCols[0].title = args.firstColumnTitle ?? newCols[0].title;
                newCols[0].count = args.firstColumnCount ?? newCols[0].count;
            }
            return newCols;
        });
    }, [args.firstColumnTitle, args.firstColumnCount]);

    // Extracted structurally stable addition handler
    const handleAddColumn = React.useCallback((index: number) => {
      // Trigger the Storybook log action explicitly
      if (args.onAddColumn) args.onAddColumn(index);

      // Inject the new column dynamically
      const newColumn = {
        id: `col-new-${Date.now()}-${Math.random()}`,
        title: 'New Column',
        count: 0,
        variant: 'staff' as const,
        focused: true, // Applies the blue focus border
      };
      
      setColumns(prev => {
        const next = [...prev];
        next.splice(index, 0, newColumn);
        return next;
      });
    }, [args]);

    return (
        // Reset focus simply internally when user interacts with the canvas
        // (In a real app, this relates to onBlur functionality on inline-edit inputs)
        <div onClick={() => setColumns(prev => prev.map(c => ({ ...c, focused: false })))}>
            <KanBanBoard {...args} onAddColumn={handleAddColumn}>
                {columns.map(col => (
                    <DummyColumn 
                        key={col.id} 
                        title={col.title} 
                        count={col.count} 
                        variant={col.variant}
                        focused={col.focused}
                    />
                ))}
            </KanBanBoard>
        </div>
    );
  }
};
