browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.toggleInterceptor) {
      console.log('Message received in content script');
      sendResponse({}); // Respond to the message
    }
  });
  