# Launch & Pin 🚀

A Firefox extension that helps you manage pinned tabs that automatically open on browser startup.

![Version](https://img.shields.io/badge/version-1.2-blue.svg)
[![Mozilla Add-on](https://img.shields.io/badge/Firefox-Add--on-orange.svg)](https://addons.mozilla.org/firefox/addon/launch-and-pin/)

## Features ✨

- 📌 Automatically open and pin your favorite websites on browser startup
- 🔄 Drag and drop to reorder your startup tabs
- ✏️ Edit URLs directly in the extension popup
- 🎯 Smart URL matching to prevent duplicate tabs
- 🎨 Clean, modern interface

## Installation 📥

1. Visit the [Firefox Add-ons page](https://addons.mozilla.org/firefox/addon/launch-and-pin/)
2. Click "Add to Firefox"
3. Follow the installation prompts

## Usage 💡

1. Click the extension icon in your toolbar
2. Enter the URLs you want to open on startup
3. Drag and drop to arrange them in your preferred order
4. URLs will automatically open as pinned tabs when you start Firefox

### URL Matching Options

- **Start Match**: By default, the extension prevents opening new tabs if the URL matches the start of an existing tab's URL
- **Exact Match**: Enable this option to only prevent duplicates when URLs match exactly

## Development 🛠️

### Prerequisites

- Firefox Browser
- Basic knowledge of HTML, CSS, and JavaScript

### Local Installation

1. Clone this repository

```bash
git clone https://github.com/robinparisi/launch-and-pin.git
```

2. Open Firefox and go to `about:debugging`
3. Click "This Firefox"
4. Click "Load Temporary Add-on"
5. Select any file from the extension's directory

### Files Overview

- `manifest.json`: Extension configuration
- `popup.html`: Main extension interface
- `popup.js`: Interface functionality
- `background.js`: Background processes and tab management
- `utils.js`: Utility functions and logging
- `icons/`: Extension icons

## Contributing 🤝

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support 💪

If you find this extension helpful, please:

- ⭐ Star this repository
- 📝 Leave a review on the Firefox Add-ons page
- 🐛 Report any issues you encounter
- 💡 Suggest new features

## Author ✍️

Robin Parisi - [GitHub](https://github.com/robinparisi)

---

Made with ❤️ for Firefox users who love organized tabs
