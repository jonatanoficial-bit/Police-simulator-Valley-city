import { setLanguage, getCurrentLanguage } from './localization.js';
import { caseManager } from './case_manager.js';
import { uiManager } from './ui_manager.js';

// Attach event listeners once DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize UI manager once the DOM is ready
  uiManager.init();
  // Set initial language based on the selected option in the language selector
  setLanguage(document.getElementById('language-select').value);
  // Update static texts on the UI to match the chosen language
  uiManager.updateTexts();
  // Handle click on "New Game" button to load and start the first case
  document.getElementById('btn-new-game').addEventListener('click', async () => {
    try {
      // Load the predefined case and start it
      await caseManager.loadCase('case1');
      caseManager.start();
      // Update text labels again (in case language changed during loading)
      uiManager.updateTexts();
    } catch (err) {
      console.error(err);
      alert('Erro ao carregar o caso');
    }
  });
  // Handle language changes from the dropdown
  document.getElementById('language-select').addEventListener('change', (ev) => {
    const lang = ev.target.value;
    setLanguage(lang);
    uiManager.updateTexts();
  });
});