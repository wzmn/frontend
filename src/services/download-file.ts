export default function downloadFile(blob: Blob, fileName: string) {
  console.log("inside");
  // Create an object URL from the Blob
  var blobUrl = URL.createObjectURL(blob);

  // Create an anchor element
  var anchor = document.createElement("a");

  // Set the href attribute to the Blob URL
  anchor.href = blobUrl;

  // Set the download attribute to the desired file name
  anchor.download = fileName;

  // Append the anchor element to the document
  document.body.appendChild(anchor);

  // Trigger a click event on the anchor element
  anchor.click();

  // Remove the anchor element and revoke the object URL
  document.body.removeChild(anchor);
  URL.revokeObjectURL(blobUrl);
}
