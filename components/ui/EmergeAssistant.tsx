import Script from "next/script";

/**
 * EMERGE AURO Assistant: the floating help chat.
 *
 * Add <EmergeAssistant /> once inside <body> in app/layout.tsx. It loads
 * public/emerge-assistant/emerge-assistant.js after the page is ready, so it
 * never slows the first paint; the script loads its own stylesheet.
 *
 * Any element with a data-open-assistant attribute (for example a "Help" link
 * in the header) also opens the chat.
 *
 * Raise VERSION whenever the files in public/emerge-assistant/ are replaced, so
 * browsers fetch the new copy instead of a cached one.
 */
const VERSION = "1.2";

export default function EmergeAssistant() {
  return <Script src={`/emerge-assistant/emerge-assistant.js?v=${VERSION}`} strategy="lazyOnload" />;
}
