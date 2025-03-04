import React from 'react';
import { SidebarHeader } from './SidebarHeader';
import { SidebarContent } from './SidebarContent';
import { ThemeProvider } from '../theme-provider';

export function SidebarContainer() {
     return (
          <ThemeProvider>
               <div className="flex flex-col">
                    <SidebarHeader />
                    <SidebarContent />
               </div>
          </ThemeProvider>
     );
}
