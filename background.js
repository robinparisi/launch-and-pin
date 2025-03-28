async function openStartupTabs() {
  const result = await browser.storage.local.get([
    "startupUrls",
    "matchFullUrl",
  ]);
  const urls = result.startupUrls || [];
  const matchFullUrl = result.matchFullUrl || false;

  log("Stored URLs:", urls);
  log("Match full URL:", matchFullUrl);

  // Get all existing tabs
  const existingTabs = await browser.tabs.query({});
  log(
    "Existing tabs:",
    existingTabs.map((tab) => ({ url: tab.url, pinned: tab.pinned }))
  );

  for (const url of urls) {
    try {
      const urlObj = new URL(url);
      const normalizedUrl = normalizeUrl(url);
      log(`Processing URL: ${normalizedUrl}`);

      // Check if any existing tab URL matches based on preference
      const existingTab = existingTabs.find((tab) => {
        const normalizedTabUrl = normalizeUrl(tab.url);
        return matchFullUrl
          ? normalizedTabUrl === normalizedUrl
          : normalizedUrl.startsWith(normalizedTabUrl);
      });

      if (existingTab) {
        // If tab exists but not pinned, pin it
        if (!existingTab.pinned) {
          log(`Pinning existing tab for ${normalizedUrl}`);
          await browser.tabs.update(existingTab.id, { pinned: true });
        } else {
          log(`Tab for ${normalizedUrl} already exists and is pinned`);
        }
      } else {
        log(`Creating new pinned tab for ${normalizedUrl}`);
        await browser.tabs.create({ url: url, pinned: true });
      }
    } catch (err) {
      error(`Error processing URL ${url}:`, err);
    }
  }
}

// Run on browser startup
browser.runtime.onStartup.addListener(openStartupTabs);

// Run when extension is installed or updated
browser.runtime.onInstalled.addListener(openStartupTabs);
