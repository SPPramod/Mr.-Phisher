function createPopup() {
  const popupHtml = `
    <div class="phishing-popup">
      <div class="card w-full max-w-md mx-auto">
        <div class="card-header bg-red-500 text-white p-6 rounded-t-md">
          <div class="flex items-center">
            <svg class="h-6 w-6 mr-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/>
              <path d="M12 9v4"/>
              <path d="M12 17h.01"/>
            </svg>
            <h3 class="text-xl font-bold">Malicious Website Detected</h3>
          </div>
        </div>
        <div class="card-content p-6 space-y-4">
          <p class="text-muted-foreground">
            The website you are trying to access has been identified as potentially malicious. Continuing may put your
            device and personal information at risk.
          </p>
          <div class="flex justify-between">
            <button id="continueButton" class="button-destructive">
              Continue Anyway
            </button>
            <button id="goBackButton" class="button-outline">
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  const popupStyle = `
    <style>
      .phishing-popup {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
      }
      .card {
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        overflow: hidden;
      }
      .card-header {
        background-color: #f56565;
        color: #fff;
        padding: 1.5rem;
        border-bottom: 1px solid #e2e8f0;
      }
      .card-content {
        padding: 1.5rem;
        color: #4a5568;
      }
      .flex {
        display: flex;
        align-items: center;
      }
      .items-center {
        align-items: center;
      }
      .space-y-4 > * + * {
        margin-top: 1rem;
      }
      .justify-between {
        justify-content: space-between;
      }
      .button-destructive {
        background-color: #f56565;
        color: #fff;
        border: none;
        padding: 0.5rem 1rem;
        cursor: pointer;
        border-radius: 4px;
      }
      .button-outline {
        background-color: transparent;
        color: #4a5568;
        border: 1px solid #cbd5e0;
        padding: 0.5rem 1rem;
        cursor: pointer;
        border-radius: 4px;
      }
    </style>
  `;

  document.body.innerHTML += popupHtml;
  document.head.innerHTML += popupStyle;

  document.getElementById('continueButton').addEventListener('click', () => {
    // Functionality for "Continue Anyway"
    // Remove the popup
    document.querySelector('.phishing-popup').remove();
  });

  document.getElementById('goBackButton').addEventListener('click', () => {
    // Functionality for "Go Back"
    // Redirect to a safe page or previous page
    window.history.back();
  });
}

chrome.runtime.sendMessage({ action: 'checkPhishing', url: window.location.href }, (response) => {
  if (response.result === 'PHISHING') {
    createPopup();
  }
});
