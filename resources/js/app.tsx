import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { ReactLenis } from 'lenis/react'
import { easeInOut } from 'motion';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob('./Pages/**/*.tsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <ReactLenis root  options={{ duration: 2, lerp: 0.1 }}>
                <App {...props} />
                <Toaster position="top-right" reverseOrder={false} />
            </ReactLenis>
        );
    },
    progress: {
        color: "red"
    }
});
