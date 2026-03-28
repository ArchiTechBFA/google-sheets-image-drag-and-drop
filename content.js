let isMenuOpening = false;

document.addEventListener('dragenter', (e) => {
  if (isMenuOpening) return;

  if (e.dataTransfer && e.dataTransfer.types.includes('Files')) {
    isMenuOpening = true;
    openImageMenu();
    
    // Safety Lock Reset
    setTimeout(() => {
      isMenuOpening = false;
    }, 3000);
  }
}, true); 

// Click Simulator
function openImageMenu() {
  function simulateClick(element) {
    const opts = { bubbles: true, cancelable: true, view: window };
    element.dispatchEvent(new MouseEvent('mouseover', opts));
    element.dispatchEvent(new MouseEvent('mousedown', opts));
    element.dispatchEvent(new MouseEvent('mouseup', opts));
  }

  // Timing Engine
  function waitForMenuAndClick(searchText, callback) {
    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      
      const menuItems = Array.from(document.querySelectorAll('.goog-menuitem'));
      const target = menuItems.find(item => item.innerText.includes(searchText));
      
      if (target) {
        clearInterval(interval);
        simulateClick(target);
        if (callback) setTimeout(callback, 50); 
      } else if (attempts > 300) { 
        clearInterval(interval);
      }
    }, 10);
  }

  // Step 1: Click main Insert menu
  const insertMenu = document.getElementById('docs-insert-menu');
  if (!insertMenu) {
    return;
  }
  simulateClick(insertMenu);
  
  // Step 2: Scan for "Image" and click it
  waitForMenuAndClick('Image', () => {
    // Step 3: Scan for "Insert image in cell" and click it
    waitForMenuAndClick('Insert image in cell', () => {
    });
  });
}