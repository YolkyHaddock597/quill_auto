document.addEventListener('DOMContentLoaded', function() {
    var toggleButton = document.getElementById('toggleInterceptor');
  
    toggleButton.addEventListener('click', function() {
      browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var activeTab = tabs[0];
        browser.tabs.sendMessage(activeTab.id, {toggleInterceptor: true})
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.error(error);
          });
      });
    });
  });
  