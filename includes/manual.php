<!-- User Manual Modal Dialog -->
<div id="manualModal" class="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modalManualTitle">
    <div class="modal-dialog">
        <div class="modal-header">
            <h2 id="modalManualTitle" class="modal-title">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
                <span id="manualHeaderTitle">User Manual & Guide</span>
            </h2>
            <button type="button" id="manualCloseBtn" class="modal-close-btn" aria-label="Close user manual">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        </div>
        <div class="modal-body">
            <!-- Step 1: City Search -->
            <div class="manual-step-card">
                <div class="step-badge">1</div>
                <div class="step-content">
                    <h3 id="manualSearchTitle">1. How to search for a city</h3>
                    <p id="manualSearchDesc">Type a city name in the top search bar (e.g. "Kuala Lumpur" or "Tokyo"). Select a suggested city from the dropdown to view its real-time weather.</p>
                </div>
            </div>

            <!-- Step 2: View Weather -->
            <div class="manual-step-card">
                <div class="step-badge">2</div>
                <div class="step-content">
                    <h3 id="manualWeatherTitle">2. How to view weather</h3>
                    <p id="manualWeatherDesc">View live temperature, feels-like temperature, humidity, wind speed/direction, surface pressure, and sunrise/sunset. Scroll horizontally for the 24-hour forecast, and check the 7-day outlook below.</p>
                </div>
            </div>

            <!-- Step 3: Country A-Z -->
            <div class="manual-step-card">
                <div class="step-badge">3</div>
                <div class="step-content">
                    <h3 id="manualCountryTitle">3. How to use Country A–Z</h3>
                    <p id="manualCountryDesc">Click any alphabet letter from A to Z in the Country Browser section to view countries beginning with that letter. Click any country card to immediately load weather for its capital city.</p>
                </div>
            </div>

            <!-- Step 4: Favorites & History -->
            <div class="manual-step-card">
                <div class="step-badge">4</div>
                <div class="step-content">
                    <h3 id="manualFavTitle">4. How to use Favorites & History</h3>
                    <p id="manualFavDesc">Click the heart icon on the hero weather card to add or remove the city from your favorites. Access saved favorites anytime using the "Favorites" button in the top navigation bar.</p>
                </div>
            </div>

            <!-- Step 5: Language Selector -->
            <div class="manual-step-card">
                <div class="step-badge">5</div>
                <div class="step-content">
                    <h3 id="manualLangTitle">5. How to change language</h3>
                    <p id="manualLangDesc">Use the language dropdown at the top right to switch between English, Malay (Bahasa Melayu), Chinese (简体中文), and Japanese (日本語). Your choice is saved automatically.</p>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <span id="manualEscHint">Press ESC or click outside to close</span>
            <button type="button" id="manualCloseBtnBottom" class="btn-control" style="padding: 6px 16px;">
                <span id="manualCloseBtnText">Close</span>
            </button>
        </div>
    </div>
</div>
