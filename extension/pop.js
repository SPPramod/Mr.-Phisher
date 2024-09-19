document.addEventListener('DOMContentLoaded', function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const currentTab = tabs[0];
    const currentUrl = currentTab.url;

    fetch('http://localhost:5000/classify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: currentUrl }),
    })
    .then(response => response.json())
    .then(data => {
      const resultElement = document.getElementById('result');
      resultElement.textContent = `Classification: ${data.classification}`;
      if (data.classification === "PHISHING") {
        createPopup();
      }
    })
    .catch(error => {
      console.error('Error:', error);
      const resultElement = document.getElementById('result');
      resultElement.textContent = 'Error fetching classification.';
    });
  });
});
