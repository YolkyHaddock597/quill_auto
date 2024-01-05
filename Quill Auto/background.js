let firstMatchFound = false;
function logURL(requestDetails) {
    const targetUrlPattern = "https://cms.quill.org/questions/";

  // Check if the URL contains the target pattern and if the first match hasn't been found yet
  if (!firstMatchFound && requestDetails.url.includes(targetUrlPattern)) {
    console.log(`Loading URL with target pattern: ${requestDetails.url}`);

    // Get the current tab's URL
    browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const currentTabUrl = tabs[0].url;

      // Check if the current tab's URL is different from the targeted URL
      if (currentTabUrl !== requestDetails.url) {
        // Fetch the JSON file
        fetch(requestDetails.url)
          .then(response => {
            if (!response.ok) {
              throw new Error(`Failed to fetch JSON: ${response.statusText}`);
            }
            return response.json();
          })
          .then(jsonData => {
            // Process the JSON data as needed
            console.log("JSON Data:", jsonData);


            // Set the flag to indicate that the first match has been found
            firstMatchFound = true;

            // Optionally, you may want to cancel the original request
            return { cancel: true };
          })
          .catch(error => {
            console.error("Error fetching JSON:", error);
          });
      }
    });
  }
}

browser.webRequest.onBeforeRequest.addListener(
  logURL,
  { urls: ["<all_urls>"] }
);