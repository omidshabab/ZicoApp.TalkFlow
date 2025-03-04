import React from 'react';
import { createRoot } from 'react-dom/client';
import { SidebarContainer } from './components/sidebar/SidebarContainer';

export default function initialize(container: HTMLElement) {
     const root = createRoot(container);
     root.render(
          <React.StrictMode>
               <SidebarContainer />
          </React.StrictMode>
     );
} 