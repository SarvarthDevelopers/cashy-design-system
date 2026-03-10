import type { Meta, StoryObj } from '@storybook/react';
import { HeaderDesktop } from './HeaderDesktop';

const meta = {
  title: 'Components/HeaderDesktop',
  component: HeaderDesktop,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    logo: { control: 'text', description: 'ReactNode containing the Logo' },
    actions: { control: 'text', description: 'ReactNode for action icon buttons' },
    primaryAction: { control: 'text', description: 'ReactNode for the main layout CTA' }
  },
  decorators: [
    (Story, context) => (
      <div 
        data-theme="dark" 
        style={{ 
          width: context.viewMode === 'docs' ? '100%' : '100vw', 
          backgroundColor: '#131518' // Force the background outside the header to match the dark theme for visuals
        }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof HeaderDesktop>;

export default meta;
type Story = StoryObj<typeof meta>;

// --- Placeholder SVGs from Figma Extraction (Mock data) ---

const MockLogoSVG = () => (
  // Visual placeholder for "Cashy Logo", preserving the exact space from Figma extraction
  // Figma dimensions 87x26
  <svg width="87" height="26" viewBox="0 0 87 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="87" height="26" fill="#131518" />
    <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="white" fontFamily="Inter" fontSize="12px" fontWeight="600">
      Logo
    </text>
  </svg>
);

const MockIconSVG = () => (
  // Visual placeholder for the 20x20 Figma action icons
  <div className="cashy-header-icon-wrapper">
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="9" stroke="#8A95A6" strokeWidth="2"/>
    </svg>
  </div>
);

const MockIconActionButtons = () => (
   <>
      <button className="cashy-header-icon-btn" aria-label="Action 1">
        <MockIconSVG />
      </button>
      <button className="cashy-header-icon-btn" aria-label="Action 2">
        <MockIconSVG />
      </button>
      <button className="cashy-header-icon-btn" aria-label="Action 3">
        <MockIconSVG />
      </button>
   </>
);

const defaultNavItems = [
  { label: 'Deals', href: '#' },
  { label: 'Items', href: '#' },
  { label: 'Customers', href: '#' },
];


export const ConfigurableHeader: Story = {
  args: {
    logo: <MockLogoSVG />,
    navItems: defaultNavItems,
    primaryAction: <span>Create a Deal</span>,
    actions: <MockIconActionButtons />,
  },
};

export const HeaderWithoutActions: Story = {
  args: {
    logo: <MockLogoSVG />,
    navItems: defaultNavItems,
    primaryAction: <span>Create a Deal</span>,
  },
};

export const HeaderWithoutNav: Story = {
  args: {
    logo: <MockLogoSVG />,
    navItems: [],
    primaryAction: <span>Create a Deal</span>,
    actions: <MockIconActionButtons />,
  },
};
