/**
 * SkySoft Weather - User Manual Controller
 * Handles modal open, close, ESC key handling, and multilingual content updates.
 */

const UserManual = {
    modal: null,
    isOpen: false,

    init() {
        this.modal = document.getElementById('manualModal');
        if (!this.modal) return;

        // Open button in header / footer
        const openButtons = document.querySelectorAll('.open-manual-btn');
        openButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.open();
            });
        });

        // Close buttons inside modal
        const closeBtn = document.getElementById('manualCloseBtn');
        const closeBtnBottom = document.getElementById('manualCloseBtnBottom');

        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.close());
        }
        if (closeBtnBottom) {
            closeBtnBottom.addEventListener('click', () => this.close());
        }

        // Close on clicking backdrop outside dialog
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });

        // Close on ESC key press
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });

        // Initial translation
        this.updateContent();
    },

    open() {
        if (!this.modal) return;
        this.updateContent();
        this.modal.classList.add('open');
        this.isOpen = true;
        document.body.style.overflow = 'hidden';
    },

    close() {
        if (!this.modal) return;
        this.modal.classList.remove('open');
        this.isOpen = false;
        document.body.style.overflow = '';
    },

    updateContent() {
        if (typeof I18N === 'undefined') return;

        const setTxt = (id, key) => {
            const el = document.getElementById(id);
            if (el) el.textContent = I18N.t(key);
        };

        setTxt('manualHeaderTitle', 'manualTitle');
        setTxt('manualEscHint', 'manualEscHint');
        setTxt('manualCloseBtnText', 'closeBtn');

        setTxt('manualSearchTitle', 'manualSearchTitle');
        setTxt('manualSearchDesc', 'manualSearchDesc');

        setTxt('manualWeatherTitle', 'manualWeatherTitle');
        setTxt('manualWeatherDesc', 'manualWeatherDesc');

        setTxt('manualCountryTitle', 'manualCountryTitle');
        setTxt('manualCountryDesc', 'manualCountryDesc');

        setTxt('manualFavTitle', 'manualFavTitle');
        setTxt('manualFavDesc', 'manualFavDesc');

        setTxt('manualLangTitle', 'manualLangTitle');
        setTxt('manualLangDesc', 'manualLangDesc');
    }
};

window.UserManual = UserManual;
