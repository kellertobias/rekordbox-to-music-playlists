const app = Application.currentApplication();
app.includeStandardAdditions = true;

export const writeFile = (
  text: string,
  fileString: string,
  options?: { overwriteExistingContent: boolean }
) => {
  try {
    // Open the file for writing
    // @ts-ignore
    var openedFile = app.openForAccess(Path(fileString), {
      writePermission: true,
    });

    // Clear the file if content should be overwritten
    if (options?.overwriteExistingContent) {
      // @ts-ignore
      app.setEof(openedFile, { to: 0 });
    }

    // Write the new content to the file
    // @ts-ignore
    app.write(text, { to: openedFile, startingAt: app.getEof(openedFile) });

    // Close the file
    // @ts-ignore
    app.closeAccess(openedFile);

    // Return a boolean indicating that writing was successful
    return true;
  } catch (error) {
    console.log(`Couldn't close file: ${error}`);
  }
  return false;
};
