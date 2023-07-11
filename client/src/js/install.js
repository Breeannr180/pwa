const butInstall = document.getElementById('buttonInstall');

let deferredPrompt;
// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {//event handler for beforeinstallprompt event
    event.preventDefault();//prevents default behavior of event
    deferredPrompt = event;//sets deferredPrompt to event
    // Show the install button
    butInstall.style.display = 'block';
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {//event handler for click event
    if (deferredPrompt) {//if deferredPrompt is true
        // Show the install prompt
        deferredPrompt.prompt();
    
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {//waits for user to respond to prompt
          if (choiceResult.outcome === 'accepted') {//if user accepts prompt
            console.log('User accepted the PWA installation');//logs that user accepted prompt
          } else {//if user declines prompt
            console.log('User dismissed the PWA installation');//logs that user declined prompt
          }
          // Reset the deferredPrompt variable
          deferredPrompt = null;//sets deferredPrompt to null
          // Hide the install button
          butInstall.style.display = 'none';
        });
    }
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('App installed successfully');
});
