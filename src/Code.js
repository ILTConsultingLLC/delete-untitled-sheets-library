/**
 * @module DeleteUntitledSheetsLibrary
 * @description A Google Apps Script library that deletes Google Sheets with
 * "Untitled" in their name from the authorized user's Google Drive. Intended
 * to be called from a time-based trigger to keep Drive free of abandoned,
 * auto-named spreadsheets.
 *
 * @author Alvaro Gomez
 */

/**
 * Searches the authorized user's Google Drive for Google Sheets named
 * "Untitled" or "Untitled(n)" and moves them to the trash.
 *
 * Matches:
 * - Exact name "Untitled"
 * - Names matching the pattern "Untitled(n)" where n is one or more digits
 *
 * Recommended usage: call this function from a weekly time-based trigger
 * (e.g., every Sunday between midnight and 1:00 AM).
 *
 * @function deleteUntitledGoogleSheets
 * @return {void} No return value. Matched files are moved to trash and
 *     results are logged via Logger.
 * @example
 * // In the calling script, after adding this library with the identifier
 * // "DeleteUntitledSheets":
 * DeleteUntitledSheets.deleteUntitledGoogleSheets();
 */
function deleteUntitledGoogleSheets() {
  const query = "mimeType='application/vnd.google-apps.spreadsheet'";

  const files = DriveApp.searchFiles(query);

  while (files.hasNext()) {
    const file = files.next();
    const fileName = file.getName();
    const fileId = file.getId();

    if (fileName === "Untitled" || fileName.match(/^Untitled\(\d+\)$/)) {
      Logger.log(`Deleting file: Name = ${fileName}, ID = ${fileId}`);

      try {
        DriveApp.getFileById(fileId).setTrashed(true);
        Logger.log(`Successfully deleted file: ${fileName}`);
      } catch (error) {
        Logger.log(`Failed to delete file: ${fileName}, Error: ${error.message}`);
      }
    }
  }
}
