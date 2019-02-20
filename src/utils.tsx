// Utility methods
export default class Utils {
  /**
   * Downloads the given content into a file with given filename and content type
   *
   * @param content - The content to be in the downloaded file
   * @param filename - The filename the downloaded file will have
   * @param contentType - The content type the downloaded file will have
   */
  static download(content: string, fileName: string, contentType: string) {
    var a = document.createElement("a");
    var file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }
}
