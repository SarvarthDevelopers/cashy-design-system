import type { Preview } from "@storybook/react";
import "../src/index.css";

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        backgrounds: { disable: true }, // Disable default backgrounds to use our theme
        docs: {
            canvas: {
                // Ensure docs canvas respects theme
                style: {
                    backgroundColor: 'var(--background-primary)',
                },
            },
        },
    },
    globalTypes: {
        theme: {
            description: 'Global theme for components',
            defaultValue: 'light',
            toolbar: {
                title: 'Theme',
                icon: 'circlehollow',
                items: ['light', 'dark'],
                dynamicTitle: true,
            },
        },
    },
    decorators: [
        (Story, context) => {
            const { theme } = context.globals;
            // Apply data-theme attribute to the html element
            const html = document.documentElement;
            html.setAttribute('data-theme', theme);

            // Set background color for both canvas and docs
            const bgColor = theme === 'dark' ? '#131518' : '#FFFFFF';
            html.style.backgroundColor = bgColor;

            // Also apply to body for docs pages
            document.body.style.backgroundColor = bgColor;
            document.body.style.color = theme === 'dark' ? '#FFFFFF' : '#131518';

            return Story();
        },
    ],
};

export default preview;

