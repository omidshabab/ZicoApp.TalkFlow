import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import browser from "webextension-polyfill";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Check if the current URL is a Google Meet room
 */
export function isInGoogleMeetRoom(url: string): boolean {
  // Google Meet URLs for active meetings typically contain a meeting code
  // Example: https://meet.google.com/abc-defg-hij
  const meetRegex = /^https:\/\/meet\.google\.com\/[a-z0-9\-]+$/i;
  return meetRegex.test(url);
}

/**
 * Inject the TalkFlow sidebar into the DOM
 */
export function injectSidebar() {
  // Create sidebar container if it doesn't exist
  if (!document.getElementById('talkflow-sidebar')) {
    const sidebar = document.createElement('div');
    sidebar.id = 'talkflow-sidebar';
    sidebar.className = 'hidden';
    
    // Create root for React
    const sidebarRoot = document.createElement('div');
    sidebarRoot.id = 'talkflow-root';
    sidebar.appendChild(sidebarRoot);
    
    // Create toggle button
    const toggleButton = document.createElement('div');
    toggleButton.id = 'talkflow-sidebar-toggle';
    toggleButton.className = 'hidden';
    toggleButton.innerHTML = `
      <img src="${browser.runtime.getURL('icon/32.png')}" width="20" height="20" alt="TalkFlow Icon" />
    `;
    
    toggleButton.addEventListener('click', () => {
      const isHidden = sidebar.classList.contains('hidden');
      
      if (isHidden) {
        sidebar.classList.remove('hidden');
        toggleButton.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6 6 18M6 6l12 12"></path>
          </svg>
        `;
        toggleButton.classList.remove('hidden');
      } else {
        sidebar.classList.add('hidden');
        toggleButton.innerHTML = `
          <img src="${browser.runtime.getURL('icon/32.png')}" width="20" height="20" alt="TalkFlow Icon" />
        `;
        toggleButton.classList.add('hidden');
      }
    });
    
    document.body.appendChild(sidebar);
    document.body.appendChild(toggleButton);
    
    // Initialize React in the sidebar
    import('../content-ui').then(module => {
      module.default(sidebarRoot);
    }).catch(err => {
      console.error('Failed to initialize React in sidebar:', err);
    });
  }
}

/**
 * Remove the TalkFlow sidebar from the DOM
 */
export function removeSidebar() {
  const sidebar = document.getElementById('talkflow-sidebar');
  const toggleButton = document.getElementById('talkflow-sidebar-toggle');
  
  if (sidebar) {
    sidebar.remove();
  }
  
  if (toggleButton) {
    toggleButton.remove();
  }
}