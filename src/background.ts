import browser from "webextension-polyfill";
import { MESSAGE_TYPES, GOOGLE_MEET_URL_PATTERN } from "./lib/constants";
import { isInGoogleMeetRoom } from "./lib/utils";

// Listen for tab updates
browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Check if URL is loaded and it's a Google Meet URL
  if (changeInfo.status === "complete" && tab.url) {
    // Determine if we're in a Google Meet room
    const inMeetRoom = isInGoogleMeetRoom(tab.url);

    // Send message to content script
    if (tab.url.startsWith("https://meet.google.com/")) {
      browser.tabs
        .sendMessage(tabId, {
          type: inMeetRoom
            ? MESSAGE_TYPES.IN_MEET_ROOM
            : MESSAGE_TYPES.NOT_IN_MEET_ROOM,
        })
        .catch((err) => {
          // Handle error when content script is not ready or not loaded
          console.log("Error sending message to content script", err);
        });
    }
  }
});

// Listen for installation
browser.runtime.onInstalled.addListener((details) => {
  console.log("TalkFlow extension installed:", details);
});
