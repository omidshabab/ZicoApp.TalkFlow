import browser from "webextension-polyfill";
import { MESSAGE_TYPES } from "./lib/constants";
import { injectSidebar, removeSidebar, isInGoogleMeetRoom } from "./lib/utils";

// Flag to track if we're in a meeting room
let inMeetingRoom = false;

// Process the current URL when content script loads
function checkCurrentPage() {
  if (isInGoogleMeetRoom(window.location.href)) {
    inMeetingRoom = true;
    injectSidebar();
  } else {
    inMeetingRoom = false;
    removeSidebar();
  }
}

// Listen for messages from background script
browser.runtime.onMessage.addListener((message) => {
  console.log("Content script received message:", message);

  if (message.type === MESSAGE_TYPES.IN_MEET_ROOM) {
    inMeetingRoom = true;
    injectSidebar();
  } else if (message.type === MESSAGE_TYPES.NOT_IN_MEET_ROOM) {
    inMeetingRoom = false;
    removeSidebar();
  } else if (message.type === MESSAGE_TYPES.TOGGLE_SIDEBAR) {
    const sidebar = document.getElementById("talkflow-sidebar");
    if (sidebar) {
      sidebar.classList.toggle("hidden");
    }
  }
});

// Run initial check
checkCurrentPage();

// Listen for URL changes (for SPA navigation)
let lastUrl = window.location.href;
new MutationObserver(() => {
  const currentUrl = window.location.href;
  if (currentUrl !== lastUrl) {
    lastUrl = currentUrl;
    checkCurrentPage();
  }
}).observe(document, { subtree: true, childList: true });

console.log("TalkFlow content script loaded!");
