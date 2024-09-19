chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'checkPhishing') {
      const url = request.url;
  

      fetch('http://localhost:5000/classify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: url }),
      })
      .then(response => response.json())
      .then(data => {
        const prediction = data.classification;
        sendResponse({ result: prediction });
      })
      .catch(error => {
        console.error('Error:', error);
        sendResponse({ result: 'Error fetching classification.' });
      });
  
      return true;
    }
  });
  