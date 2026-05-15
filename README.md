# Delete Untitled Sheets Library

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A Google Apps Script library that automatically deletes Google Sheets named "Untitled" or "Untitled(n)" from the authorized user's Google Drive by moving them to the trash.

Originally built for a school district to keep shared Drive environments clean. Generalized for public use.

---

## What It Does

When called, `deleteUntitledGoogleSheets()` searches the authorized user's Drive for spreadsheets with auto-generated default names and moves them to the trash. It matches:

- Exact name `Untitled`
- Names matching the pattern `Untitled(n)` — e.g., `Untitled(1)`, `Untitled(2)`

All actions are logged via `Logger` for review in the Apps Script execution log.

---

## Setup

### 1. Deploy as a Library

1. Open the script project in [Google Apps Script](https://script.google.com).
2. Click **Deploy > New deployment**.
3. Choose **Library** as the deployment type.
4. Copy the **Script ID** from **Project Settings** — you'll need it in the next step.

### 2. Add the Library to Your Script

1. In your calling script, go to **Libraries** (the `+` icon in the left sidebar).
2. Paste the Script ID and click **Look up**.
3. Select the latest version and choose an identifier (e.g., `DeleteUntitledSheets`).
4. Click **Add**.

### 3. Call the Function

```js
DeleteUntitledSheets.deleteUntitledGoogleSheets();
```

---

## Setting Up a Trigger

This library is designed to run on a recurring schedule. To set up a weekly trigger in your calling script:

1. In the Apps Script editor, click **Triggers** (clock icon in the left sidebar).
2. Click **Add Trigger**.
3. Set the following:
   - **Function**: the function in your script that calls `DeleteUntitledSheets.deleteUntitledGoogleSheets()`
   - **Event source**: Time-driven
   - **Type**: Week timer
   - **Day**: Sunday (or your preference)
   - **Time**: Midnight to 1am (or your preference)
4. Click **Save**.

---

## Script Properties

This library does not require any Script Properties. It operates entirely on the Drive of the Google account that authorized the calling script.

---

## Project Structure

```
delete-untitled-sheets-library/
├── src/
│   ├── Code.js           # Library source
│   └── appsscript.json   # Apps Script manifest
├── .claspignore
├── .gitignore
├── LICENSE
└── README.md
```

---

## License

[MIT](LICENSE) © 2025 Alvaro Gomez
