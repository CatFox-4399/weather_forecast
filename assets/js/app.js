/**
 * SkySoft Weather - Main Application Controller
 * Handles live weather fetching, Open-Meteo integration, search autocomplete,
 * 24-hour horizontal forecast, 7-day outlook, Country A-Z browser,
 * MySQL favorites & history with graceful local fallback, and multilingual i18n.
 */

const App = {
    // Current Application State
    state: {
        currentLocation: {
            city: 'Kuala Lumpur',
            country: 'Malaysia',
            country_code: 'MY',
            lat: 3.139,
            lon: 101.687,
            timezone: 'Asia/Kuala_Lumpur'
        },
        currentWeatherData: null,
        activeLetter: 'M',
        favorites: [],
        history: [],
        dbAvailable: true,
        searchDebounceTimer: null,
        clockInterval: null,
        pwaDeferredPrompt: null
    },

    // 1. Weather Vector Icons (Clean, modern inline SVGs)
    icons: {
        clearDay: `<svg viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="14" fill="#fbbf24"/><path d="M32 6v6M32 52v6M6 32h6M52 32h6M13.6 13.6l4.2 4.2M46.2 46.2l4.2 4.2M13.6 50.4l4.2-4.2M46.2 17.8l4.2-4.2" stroke="#f59e0b" stroke-width="4" stroke-linecap="round"/></svg>`,
        clearNight: `<svg viewBox="0 0 64 64" fill="none"><path d="M44 38.5A18 18 0 0 1 25.5 20c0-3.3.9-6.3 2.5-9A20 20 0 1 0 53 41c-2.7 1.6-5.7 2.5-9 2.5z" fill="#38bdf8"/><circle cx="48" cy="18" r="2" fill="#fef08a"/><circle cx="20" cy="12" r="1.5" fill="#fef08a"/><circle cx="14" cy="24" r="1.5" fill="#fef08a"/></svg>`,
        partlyCloudyDay: `<svg viewBox="0 0 64 64" fill="none"><circle cx="26" cy="24" r="10" fill="#fbbf24"/><path d="M46 48H22a10 10 0 0 1-2-19.8 14 14 0 0 1 27.2-3.2A11 11 0 0 1 46 48z" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="2"/></svg>`,
        partlyCloudyNight: `<svg viewBox="0 0 64 64" fill="none"><path d="M34 22A12 12 0 0 1 22 10c0-1.8.4-3.5 1.1-5A14 14 0 1 0 39 23c-1.5.7-3.2 1.1-5 1.1z" fill="#38bdf8"/><path d="M46 48H22a10 10 0 0 1-2-19.8 14 14 0 0 1 27.2-3.2A11 11 0 0 1 46 48z" fill="#94a3b8" stroke="#64748b" stroke-width="2"/></svg>`,
        cloudy: `<svg viewBox="0 0 64 64" fill="none"><path d="M48 44H20a10 10 0 0 1-2.5-19.7 14 14 0 0 1 26.6-4.3A12 12 0 0 1 48 44z" fill="#cbd5e1"/><path d="M44 50H16a8 8 0 0 1-2-15.7 12 12 0 0 1 22.8-3.3A10 10 0 0 1 44 50z" fill="#94a3b8"/></svg>`,
        fog: `<svg viewBox="0 0 64 64" fill="none"><path d="M44 32H16a8 8 0 0 1-2-15.7 12 12 0 0 1 22.8-3.3A10 10 0 0 1 44 32z" fill="#cbd5e1"/><line x1="14" y1="40" x2="50" y2="40" stroke="#94a3b8" stroke-width="4" stroke-linecap="round"/><line x1="18" y1="48" x2="46" y2="48" stroke="#94a3b8" stroke-width="4" stroke-linecap="round"/><line x1="22" y1="56" x2="42" y2="56" stroke="#94a3b8" stroke-width="4" stroke-linecap="round"/></svg>`,
        drizzle: `<svg viewBox="0 0 64 64" fill="none"><path d="M46 38H18a9 9 0 0 1-2-17.8 13 13 0 0 1 24.7-3.2A10 10 0 0 1 46 38z" fill="#94a3b8"/><line x1="22" y1="44" x2="20" y2="50" stroke="#0284c7" stroke-width="3" stroke-linecap="round"/><line x1="32" y1="44" x2="30" y2="50" stroke="#0284c7" stroke-width="3" stroke-linecap="round"/><line x1="42" y1="44" x2="40" y2="50" stroke="#0284c7" stroke-width="3" stroke-linecap="round"/></svg>`,
        rain: `<svg viewBox="0 0 64 64" fill="none"><path d="M48 38H18a10 10 0 0 1-2-19.8 14 14 0 0 1 26.6-3.7A11 11 0 0 1 48 38z" fill="#64748b"/><line x1="22" y1="44" x2="18" y2="56" stroke="#0284c7" stroke-width="3.5" stroke-linecap="round"/><line x1="33" y1="44" x2="29" y2="56" stroke="#0284c7" stroke-width="3.5" stroke-linecap="round"/><line x1="44" y1="44" x2="40" y2="56" stroke="#0284c7" stroke-width="3.5" stroke-linecap="round"/></svg>`,
        snow: `<svg viewBox="0 0 64 64" fill="none"><path d="M48 36H18a10 10 0 0 1-2-19.8 14 14 0 0 1 26.6-3.7A11 11 0 0 1 48 36z" fill="#cbd5e1"/><circle cx="22" cy="46" r="3" fill="#38bdf8"/><circle cx="34" cy="46" r="3" fill="#38bdf8"/><circle cx="44" cy="46" r="3" fill="#38bdf8"/><circle cx="28" cy="54" r="3" fill="#38bdf8"/><circle cx="40" cy="54" r="3" fill="#38bdf8"/></svg>`,
        thunderstorm: `<svg viewBox="0 0 64 64" fill="none"><path d="M48 36H18a10 10 0 0 1-2-19.8 14 14 0 0 1 26.6-3.7A11 11 0 0 1 48 36z" fill="#475569"/><polygon points="32,38 24,48 31,48 27,60 39,46 32,46" fill="#fbbf24"/></svg>`
    },

    /**
     * Map Open-Meteo WMO weather code to appropriate SVG icon
     */
    getWeatherIcon(code, isDay = 1) {
        if (code === 0) return isDay ? this.icons.clearDay : this.icons.clearNight;
        if (code === 1 || code === 2) return isDay ? this.icons.partlyCloudyDay : this.icons.partlyCloudyNight;
        if (code === 3) return this.icons.cloudy;
        if (code === 45 || code === 48) return this.icons.fog;
        if (code >= 51 && code <= 57) return this.icons.drizzle;
        if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return this.icons.rain;
        if ((code >= 71 && code <= 77) || code === 85 || code === 86) return this.icons.snow;
        if (code >= 95) return this.icons.thunderstorm;
        return isDay ? this.icons.clearDay : this.icons.clearNight;
    },

    /**
     * Initialize Application
     */
    init() {
        // Initialize i18n
        I18N.init();
        const langSelect = document.getElementById('langSelect');
        if (langSelect) {
            langSelect.value = I18N.currentLang;
            langSelect.addEventListener('change', (e) => this.handleLanguageChange(e.target.value));
        }

        // Initialize User Manual
        if (window.UserManual) {
            window.UserManual.init();
        }

        // Bind DOM event listeners
        this.bindEvents();

        // Load favorites & history from backend/local
        this.loadFavorites();
        this.loadHistory();

        // Render Country A-Z alphabet buttons and initial letter
        this.renderAzRibbon();
        this.loadCountriesByLetter(this.state.activeLetter);

        // Initialize Hierarchical Regional Explorer (Country -> State -> City)
        this.initLocationExplorer();

        // Apply translations
        this.applyTranslations();

        // Initialize PWA ServiceWorker & Install handling
        this.initPwa();

        // Fetch initial city weather (Kuala Lumpur)
        this.fetchWeather(this.state.currentLocation);
    },

    /**
     * Initialize PWA (Service Worker & Install Banner/Button)
     */
    initPwa() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('./sw.js')
                    .then(reg => {
                        console.log('SkySoft PWA ServiceWorker registered with scope:', reg.scope);
                    })
                    .catch(err => {
                        console.warn('PWA ServiceWorker registration error:', err);
                    });
            });
        }

        const installBtn = document.getElementById('pwaInstallBtn');

        // Capture PWA install prompt
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.state.pwaDeferredPrompt = e;
            if (installBtn) {
                installBtn.style.display = 'inline-flex';
            }
        });

        if (installBtn) {
            installBtn.addEventListener('click', async () => {
                if (!this.state.pwaDeferredPrompt) return;
                this.state.pwaDeferredPrompt.prompt();
                const choice = await this.state.pwaDeferredPrompt.userChoice;
                if (choice.outcome === 'accepted') {
                    console.log('User accepted SkySoft Weather PWA installation');
                }
                this.state.pwaDeferredPrompt = null;
                installBtn.style.display = 'none';
            });
        }

        window.addEventListener('appinstalled', () => {
            console.log('SkySoft Weather PWA was installed successfully');
            if (installBtn) {
                installBtn.style.display = 'none';
            }
        });
    },

    /**
     * Bind all interactive events
     */
    bindEvents() {
        // Brand logo home button resets to Kuala Lumpur
        const brandBtn = document.getElementById('brandHomeBtn');
        if (brandBtn) {
            brandBtn.addEventListener('click', () => {
                this.fetchWeather({
                    city: 'Kuala Lumpur',
                    country: 'Malaysia',
                    country_code: 'MY',
                    lat: 3.139,
                    lon: 101.687
                });
            });
        }

        // Search Input & debounced autocomplete
        const searchInput = document.getElementById('citySearchInput');
        const clearBtn = document.getElementById('searchClearBtn');

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const val = e.target.value.trim();
                if (clearBtn) {
                    clearBtn.classList.toggle('visible', val.length > 0);
                }
                clearTimeout(this.state.searchDebounceTimer);
                if (val.length >= 2) {
                    this.state.searchDebounceTimer = setTimeout(() => this.searchCities(val), 320);
                } else {
                    this.hideSuggestions();
                }
            });

            // Enter key search
            searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    const firstSuggestion = document.querySelector('#searchSuggestions .suggestion-item');
                    if (firstSuggestion) {
                        firstSuggestion.click();
                    }
                }
            });
        }

        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                if (searchInput) {
                    searchInput.value = '';
                    searchInput.focus();
                }
                clearBtn.classList.remove('visible');
                this.hideSuggestions();
            });
        }

        // Click outside search suggestions closes dropdown
        document.addEventListener('click', (e) => {
            const searchBox = document.querySelector('.search-section');
            if (searchBox && !searchBox.contains(e.target)) {
                this.hideSuggestions();
            }
        });

        // Quick City Chips
        const chips = document.querySelectorAll('.quick-city-chip');
        chips.forEach(chip => {
            chip.addEventListener('click', () => {
                const city = chip.getAttribute('data-city');
                const country = chip.getAttribute('data-country');
                const country_code = chip.getAttribute('data-country-code') || '';
                const lat = parseFloat(chip.getAttribute('data-lat'));
                const lon = parseFloat(chip.getAttribute('data-lon'));
                this.fetchWeather({ city, country, country_code, lat, lon });
            });
        });

        // Favorite toggle on hero card
        const favToggleBtn = document.getElementById('favToggleBtn');
        if (favToggleBtn) {
            favToggleBtn.addEventListener('click', () => this.toggleCurrentFavorite());
        }

        // Sky Atmosphere Mode Selector
        const skyModeSelect = document.getElementById('skyModeSelect');
        if (skyModeSelect) {
            skyModeSelect.addEventListener('change', (e) => {
                if (window.SkyAtmosphere) {
                    window.SkyAtmosphere.setOverride(e.target.value);
                }
            });
        }

        // Drawer Toggles
        const openFavBtn = document.getElementById('openFavoritesBtn');
        const closeFavBtn = document.getElementById('closeFavoritesDrawerBtn');
        const favDrawer = document.getElementById('favoritesDrawer');

        if (openFavBtn && favDrawer) {
            openFavBtn.addEventListener('click', () => {
                this.loadFavorites();
                favDrawer.classList.add('open');
            });
        }
        if (closeFavBtn && favDrawer) {
            closeFavBtn.addEventListener('click', () => favDrawer.classList.remove('open'));
        }
        if (favDrawer) {
            favDrawer.addEventListener('click', (e) => {
                if (e.target === favDrawer) favDrawer.classList.remove('open');
            });
        }

        const openHistBtn = document.getElementById('openHistoryBtn');
        const closeHistBtn = document.getElementById('closeHistoryDrawerBtn');
        const histDrawer = document.getElementById('historyDrawer');
        const clearHistBtn = document.getElementById('clearHistoryBtn');

        if (openHistBtn && histDrawer) {
            openHistBtn.addEventListener('click', () => {
                this.loadHistory();
                histDrawer.classList.add('open');
            });
        }
        if (closeHistBtn && histDrawer) {
            closeHistBtn.addEventListener('click', () => histDrawer.classList.remove('open'));
        }
        if (histDrawer) {
            histDrawer.addEventListener('click', (e) => {
                if (e.target === histDrawer) histDrawer.classList.remove('open');
            });
        }
        if (clearHistBtn) {
            clearHistBtn.addEventListener('click', () => this.clearHistory());
        }

        // Alert banner close
        const alertClose = document.getElementById('alertCloseBtn');
        if (alertClose) {
            alertClose.addEventListener('click', () => this.hideAlert());
        }
    },

    /**
     * Search cities via api/search.php
     */
    async searchCities(query) {
        const spinner = document.getElementById('searchSpinner');
        if (spinner) spinner.classList.add('active');

        try {
            const res = await fetch(`api/search.php?q=${encodeURIComponent(query)}`);
            if (!res.ok) throw new Error('Search request failed');
            const data = await res.json();
            this.renderSuggestions(data.results || []);
        } catch (err) {
            console.error('Search error:', err);
            this.renderSuggestions([]);
        } finally {
            if (spinner) spinner.classList.remove('active');
        }
    },

    /**
     * Render auto-suggestions dropdown
     */
    renderSuggestions(results) {
        const container = document.getElementById('searchSuggestions');
        if (!container) return;

        container.innerHTML = '';
        if (results.length === 0) {
            const empty = document.createElement('div');
            empty.className = 'suggestion-empty';
            empty.textContent = I18N.t('noCityFound');
            container.appendChild(empty);
            container.classList.add('open');
            return;
        }

        results.forEach(city => {
            const item = document.createElement('div');
            item.className = 'suggestion-item';
            item.setAttribute('role', 'option');

            const locCity = I18N.getCityName(city.name);
            const locCountry = I18N.getCountryName(city.country_code, city.country);
            const stateInfo = city.admin1 ? `${I18N.getStateName(city.admin1)}, ` : '';
            item.innerHTML = `
                <div>
                    <div class="suggestion-title">${locCity}</div>
                    <div class="suggestion-sub">${stateInfo}${locCountry}</div>
                </div>
                ${city.country_code ? `<span class="suggestion-badge">${city.country_code}</span>` : ''}
            `;

            item.addEventListener('click', () => {
                this.hideSuggestions();
                const searchInput = document.getElementById('citySearchInput');
                if (searchInput) searchInput.value = '';
                const clearBtn = document.getElementById('searchClearBtn');
                if (clearBtn) clearBtn.classList.remove('visible');

                this.fetchWeather({
                    city: city.name,
                    country: city.country,
                    country_code: city.country_code,
                    lat: city.latitude,
                    lon: city.longitude,
                    timezone: city.timezone
                });
            });

            container.appendChild(item);
        });

        container.classList.add('open');
    },

    hideSuggestions() {
        const container = document.getElementById('searchSuggestions');
        if (container) container.classList.remove('open');
    },

    /**
     * Fetch Live Weather Data from api/weather.php
     */
    async fetchWeather(loc) {
        this.hideAlert();
        const conditionTextEl = document.getElementById('conditionText');
        if (conditionTextEl) conditionTextEl.textContent = '...';

        try {
            const params = new URLSearchParams({
                lat: loc.lat,
                lon: loc.lon,
                city: loc.city || 'Unknown',
                country: loc.country || '',
                country_code: loc.country_code || ''
            });

            const res = await fetch(`api/weather.php?${params.toString()}`);
            if (!res.ok) {
                throw new Error('Weather API returned error ' + res.status);
            }

            const data = await res.json();
            if (!data.success) {
                throw new Error(data.message || 'Failed to fetch weather');
            }

            // Update application state
            this.state.currentLocation = {
                city: data.location.city,
                country: data.location.country,
                country_code: data.location.country_code,
                lat: data.location.latitude,
                lon: data.location.longitude,
                timezone: data.location.timezone
            };
            this.state.currentWeatherData = data;

            // Reset Sky selector and override to auto whenever weather is fetched
            const skySelect = document.getElementById('skyModeSelect');
            if (skySelect) skySelect.value = 'auto';
            if (window.SkyAtmosphere) {
                window.SkyAtmosphere.state.manualOverride = null;
            }

            // Render UI
            this.renderCurrentWeather(data);
            this.renderHourlyForecast(data.hourly || []);
            this.renderDailyForecast(data.daily || []);
            this.updateFavoriteButtonState();

            // Record to search history
            this.recordHistory(this.state.currentLocation);

        } catch (err) {
            console.error('Weather Fetch Error:', err);
            this.showAlert(I18N.t('errorWeather'));
        }
    },

    /**
     * Render Hero Current Weather
     */
    renderCurrentWeather(data) {
        const loc = data.location;
        const cur = data.current;

        // City & Country (Localized)
        const cityNameEl = document.getElementById('cityName');
        const countryNameEl = document.getElementById('countryName');
        const locCity = I18N.getCityName(loc.city);
        const locCountry = I18N.getCountryName(loc.country_code, loc.country);
        if (cityNameEl) cityNameEl.textContent = locCity;
        if (countryNameEl) {
            countryNameEl.textContent = locCountry + (loc.country_code ? ` (${loc.country_code})` : '');
        }

        // Live local date & time clock
        this.startCityClock(loc.timezone);

        // Temperature & Feels-Like
        const mainTempEl = document.getElementById('mainTemp');
        const valFeelsLikeEl = document.getElementById('valFeelsLike');
        if (mainTempEl) mainTempEl.textContent = Math.round(cur.temperature);
        if (valFeelsLikeEl) valFeelsLikeEl.textContent = Math.round(cur.feels_like);

        // Weather Condition & Icon
        const conditionTextEl = document.getElementById('conditionText');
        if (conditionTextEl) {
            conditionTextEl.textContent = I18N.getConditionText(cur.weather_code);
        }

        const heroIconEl = document.getElementById('weatherHeroIcon');
        if (heroIconEl) {
            heroIconEl.innerHTML = this.getWeatherIcon(cur.weather_code, cur.is_day);
        }

        // Metrics
        const valHumidityEl = document.getElementById('valHumidity');
        if (valHumidityEl) valHumidityEl.textContent = `${cur.humidity}%`;

        const valWindEl = document.getElementById('valWind');
        if (valWindEl) {
            const dir = I18N.getCompassDirection(cur.wind_compass);
            valWindEl.textContent = `${cur.wind_speed} km/h (${dir})`;
        }

        const valPressureEl = document.getElementById('valPressure');
        if (valPressureEl) valPressureEl.textContent = `${cur.pressure} hPa`;

        const valSunTimesEl = document.getElementById('valSunTimes');
        if (valSunTimesEl) {
            const sunriseStr = cur.sunrise ? this.formatTimeOnly(cur.sunrise, loc.timezone) : '--:--';
            const sunsetStr = cur.sunset ? this.formatTimeOnly(cur.sunset, loc.timezone) : '--:--';
            valSunTimesEl.textContent = `${sunriseStr} / ${sunsetStr}`;
        }

        // Atmospheric Theme Styling
        this.updateAtmosphericTheme(cur.weather_code, cur.is_day, cur.wind_speed, {
            time: cur.time,
            sunrise: cur.sunrise,
            sunset: cur.sunset,
            timezone: loc.timezone
        });
    },

    /**
     * Start live clock synchronized to city's timezone
     */
    startCityClock(timezone) {
        if (this.state.clockInterval) {
            clearInterval(this.state.clockInterval);
        }

        const updateClock = () => {
            const localDateTimeEl = document.getElementById('localDateTime');
            if (!localDateTimeEl) return;

            try {
                const now = new Date();
                const formatter = new Intl.DateTimeFormat(I18N.currentLang, {
                    timeZone: timezone,
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                });
                localDateTimeEl.textContent = formatter.format(now);
            } catch (e) {
                // Fallback if timezone not recognized
                const now = new Date();
                localDateTimeEl.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            }
        };

        updateClock();
        this.state.clockInterval = setInterval(updateClock, 10000);
    },

    /**
     * Format time (e.g. 18:45) using target timezone
     */
    formatTimeOnly(isoString, timezone) {
        try {
            const date = new Date(isoString);
            return new Intl.DateTimeFormat(I18N.currentLang, {
                timeZone: timezone,
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            }).format(date);
        } catch (e) {
            return isoString.split('T')[1]?.substring(0, 5) || '--:--';
        }
    },

    /**
     * Update background atmospheric theme dynamically based on weather & time
     */
    updateAtmosphericTheme(weatherCode, isDay, windSpeed = 10, sunTimes = null) {
        const body = document.body;
        body.classList.toggle('theme-night', isDay === 0);

        // Update Dynamic Sky Atmosphere (Canvas, Sun/Moon, Sunrise/Sunset, Clouds, Rain, Stars)
        if (window.SkyAtmosphere) {
            window.SkyAtmosphere.setWeather(weatherCode, isDay, windSpeed, sunTimes);
        }
    },

    /**
     * Render Hourly 24h Horizontal Forecast
     */
    renderHourlyForecast(hourlyItems) {
        const track = document.getElementById('hourlyTrack');
        if (!track) return;

        track.innerHTML = '';
        if (!hourlyItems || hourlyItems.length === 0) {
            track.innerHTML = `<div style="padding: 16px; color: var(--text-muted);">${I18N.t('errorWeather')}</div>`;
            return;
        }

        hourlyItems.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = `hourly-card ${index === 0 ? 'current-hour' : ''}`;

            const timeFormatted = this.formatTimeOnly(item.time, this.state.currentLocation.timezone);
            const conditionStr = I18N.getConditionText(item.weather_code);
            const iconSvg = this.getWeatherIcon(item.weather_code, item.is_day);

            card.innerHTML = `
                <div class="hourly-time">${index === 0 ? I18N.t('today') : timeFormatted}</div>
                <div class="hourly-icon">${iconSvg}</div>
                <div class="hourly-temp">${Math.round(item.temperature)}&deg;</div>
                <div class="hourly-condition" title="${conditionStr}">${conditionStr}</div>
            `;
            track.appendChild(card);
        });
    },

    /**
     * Render 7-Day Forecast Grid
     */
    renderDailyForecast(dailyItems) {
        const grid = document.getElementById('dailyGrid');
        if (!grid) return;

        grid.innerHTML = '';
        if (!dailyItems || dailyItems.length === 0) {
            grid.innerHTML = `<div style="padding: 16px; color: var(--text-muted);">${I18N.t('errorWeather')}</div>`;
            return;
        }

        dailyItems.forEach((day, index) => {
            const card = document.createElement('div');
            card.className = `daily-card ${index === 0 ? 'today' : ''}`;

            const dateObj = new Date(day.date + 'T00:00:00');
            const dayName = (index === 0) ? I18N.t('today') : ((index === 1) ? I18N.t('tomorrow') : I18N.getDayName(dateObj.getDay(), true));
            const dateStr = dateObj.toLocaleDateString(I18N.currentLang, { month: 'short', day: 'numeric' });
            const conditionStr = I18N.getConditionText(day.weather_code);
            const iconSvg = this.getWeatherIcon(day.weather_code, 1);

            card.innerHTML = `
                <div class="daily-day">${dayName}</div>
                <div class="daily-date">${dateStr}</div>
                <div class="daily-icon">${iconSvg}</div>
                <div class="daily-condition">${conditionStr}</div>
                <div class="daily-temp-range">
                    <span class="temp-max">${Math.round(day.temp_max)}&deg;</span>
                    <span class="temp-min">${Math.round(day.temp_min)}&deg;</span>
                </div>
            `;
            grid.appendChild(card);
        });
    },

    /**
     * Render Country A-Z Alphabet Ribbon
     */
    renderAzRibbon() {
        const ribbon = document.getElementById('azRibbon');
        if (!ribbon) return;

        ribbon.innerHTML = '';
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

        alphabet.forEach(letter => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = `az-letter-btn ${letter === this.state.activeLetter ? 'active' : ''}`;
            btn.textContent = letter;
            btn.setAttribute('aria-label', `View countries starting with ${letter}`);

            btn.addEventListener('click', () => {
                this.state.activeLetter = letter;
                document.querySelectorAll('.az-letter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.loadCountriesByLetter(letter);
            });

            ribbon.appendChild(btn);
        });
    },

    /**
     * Load Countries Filtered by Letter from api/countries.php
     */
    async loadCountriesByLetter(letter) {
        const grid = document.getElementById('countriesGrid');
        if (!grid) return;

        grid.innerHTML = `<div style="grid-column: 1 / -1; padding: 20px; text-align: center; color: var(--text-muted);">${I18N.t('loadingCountries')}</div>`;

        try {
            const res = await fetch(`api/countries.php?letter=${encodeURIComponent(letter)}`);
            if (!res.ok) throw new Error('Countries API error');
            const data = await res.json();
            const list = data.data || [];

            grid.innerHTML = '';
            if (list.length === 0) {
                grid.innerHTML = `<div style="grid-column: 1 / -1; padding: 30px; text-align: center; color: var(--text-muted);">${I18N.t('noCountriesForLetter')} <strong>"${letter}"</strong>.</div>`;
                return;
            }

            list.forEach(item => {
                const card = document.createElement('div');
                card.className = 'country-card-item';
                const locCountry = I18N.getCountryName(item.code, item.name);
                const locCapital = item.capital ? I18N.getCityName(item.capital) : '';
                card.innerHTML = `
                    <div class="country-item-info">
                        <span class="country-item-name">${locCountry}</span>
                        <span class="country-item-capital">${locCapital}</span>
                    </div>
                    <span class="country-item-code">${item.code}</span>
                `;

                // Click country card to instantly view weather for capital city
                card.addEventListener('click', () => {
                    this.fetchWeather({
                        city: item.capital || item.name,
                        country: item.name,
                        country_code: item.code,
                        lat: item.lat,
                        lon: item.lon
                    });
                    // Also synchronize the Hierarchical Location Explorer dropdown
                    this.syncExplorerCountry(item.code);
                    // Smooth scroll to hero card
                    document.getElementById('weatherHeroCard')?.scrollIntoView({ behavior: 'smooth' });
                });

                grid.appendChild(card);
            });
        } catch (err) {
            console.error('Failed to load countries:', err);
            grid.innerHTML = `<div style="grid-column: 1 / -1; padding: 20px; color: var(--brand-danger);">${I18N.t('errorWeather')}</div>`;
        }
    },

    /**
     * Initialize Hierarchical Regional Location Explorer (Country -> State -> City)
     */
    async initLocationExplorer() {
        const countrySelect = document.getElementById('explorerCountrySelect');
        const stateSelect = document.getElementById('explorerStateSelect');
        const citySelect = document.getElementById('explorerCitySelect');
        const resetBtn = document.getElementById('explorerResetBtn');

        if (!countrySelect || !stateSelect || !citySelect) return;

        // Load Countries
        try {
            const res = await fetch('api/locations.php?action=countries');
            const json = await res.json();
            if (json.success && Array.isArray(json.data)) {
                this.state.explorerCountries = json.data;
                this.renderExplorerCountryOptions(json.data);
            }
        } catch (err) {
            console.warn('Failed to load countries for explorer:', err);
            countrySelect.innerHTML = `<option value="">${I18N.t('errorWeather')}</option>`;
        }

        // 1. Country selection handler
        countrySelect.addEventListener('change', async (e) => {
            const code = e.target.value;
            if (!code) {
                this.resetExplorerStateCity();
                return;
            }

            const selectedOpt = countrySelect.selectedOptions[0];
            const countryName = selectedOpt?.dataset.name || '';
            const capitalName = selectedOpt?.dataset.capital || '';
            const lat = parseFloat(selectedOpt?.dataset.lat) || null;
            const lon = parseFloat(selectedOpt?.dataset.lon) || null;

            // Immediately load its capital's weather!
            if (lat !== null && lon !== null) {
                this.fetchWeather({
                    city: capitalName || countryName,
                    country: countryName,
                    country_code: code,
                    lat: lat,
                    lon: lon
                });
                document.getElementById('weatherHeroCard')?.scrollIntoView({ behavior: 'smooth' });
            }

            // Load States / Provinces for this country
            const colState = document.getElementById('colStepState');
            const colCity = document.getElementById('colStepCity');

            stateSelect.disabled = true;
            stateSelect.innerHTML = `<option value="">${I18N.t('loadingStates')}</option>`;
            citySelect.disabled = true;
            citySelect.innerHTML = `<option value="">${I18N.t('selectCityFirst')}</option>`;
            if (colState) colState.classList.remove('disabled');
            if (colCity) colCity.classList.add('disabled');

            try {
                const res = await fetch(`api/locations.php?action=states&country=${encodeURIComponent(code)}`);
                const json = await res.json();
                if (json.success && Array.isArray(json.data) && json.data.length > 0) {
                    stateSelect.disabled = false;
                    stateSelect.innerHTML = `<option value="">-- ${I18N.t('selectStatePrompt')} --</option>`;
                    json.data.forEach(s => {
                        const locState = I18N.getStateName(s.name);
                        const countStr = s.city_count > 0 ? ` (${s.city_count} cities)` : '';
                        stateSelect.innerHTML += `<option value="${s.id}" data-name="${s.name}" data-lat="${s.latitude || ''}" data-lon="${s.longitude || ''}">${locState}${countStr}</option>`;
                    });
                } else {
                    stateSelect.disabled = true;
                    stateSelect.innerHTML = `<option value="">Capital loaded (No sub-states)</option>`;
                    if (colState) colState.classList.add('disabled');
                }
            } catch (err) {
                console.error('Failed to load states:', err);
                stateSelect.disabled = true;
                stateSelect.innerHTML = `<option value="">Failed to load states</option>`;
            }
        });

        // 2. State selection handler
        stateSelect.addEventListener('change', async (e) => {
            const stateId = parseInt(e.target.value, 10);
            const colCity = document.getElementById('colStepCity');

            if (!stateId) {
                citySelect.disabled = true;
                citySelect.innerHTML = `<option value="">${I18N.t('selectCityFirst')}</option>`;
                if (colCity) colCity.classList.add('disabled');
                return;
            }

            const countryCode = countrySelect.value;
            const selectedOpt = stateSelect.selectedOptions[0];
            const stateName = selectedOpt?.dataset.name || '';
            const sLat = parseFloat(selectedOpt?.dataset.lat) || null;
            const sLon = parseFloat(selectedOpt?.dataset.lon) || null;

            citySelect.disabled = true;
            citySelect.innerHTML = `<option value="">${I18N.t('loadingCities')}</option>`;
            if (colCity) colCity.classList.remove('disabled');

            try {
                const res = await fetch(`api/locations.php?action=cities&state_id=${stateId}&country=${encodeURIComponent(countryCode)}`);
                const json = await res.json();
                if (json.success && Array.isArray(json.data) && json.data.length > 0) {
                    citySelect.disabled = false;
                    citySelect.innerHTML = `<option value="">-- ${I18N.t('selectCityPrompt')} --</option>`;
                    json.data.forEach(c => {
                        const locCity = I18N.getCityName(c.name);
                        citySelect.innerHTML += `<option value="${c.id}" data-name="${c.name}" data-lat="${c.latitude || ''}" data-lon="${c.longitude || ''}">${locCity}</option>`;
                    });
                } else if (sLat !== null && sLon !== null) {
                    // Fallback to the state coordinates if no sub-cities in DB
                    citySelect.disabled = false;
                    citySelect.innerHTML = `<option value="${stateId}" data-name="${stateName}" data-lat="${sLat}" data-lon="${sLon}">${stateName} (Central)</option>`;
                } else {
                    citySelect.disabled = true;
                    citySelect.innerHTML = `<option value="">No cities recorded for this state</option>`;
                }
            } catch (err) {
                console.error('Failed to load cities:', err);
                citySelect.disabled = true;
                citySelect.innerHTML = `<option value="">Failed to load cities</option>`;
            }
        });

        // 3. City selection handler
        citySelect.addEventListener('change', (e) => {
            const cityId = e.target.value;
            if (!cityId) return;

            const selectedOpt = citySelect.selectedOptions[0];
            const cityName = selectedOpt?.dataset.name || '';
            const lat = parseFloat(selectedOpt?.dataset.lat) || null;
            const lon = parseFloat(selectedOpt?.dataset.lon) || null;
            const countryCode = countrySelect.value;
            const countryOpt = countrySelect.selectedOptions[0];
            const countryName = countryOpt ? (countryOpt.dataset.name || '') : '';

            if (lat !== null && lon !== null) {
                this.fetchWeather({
                    city: cityName,
                    country: countryName,
                    country_code: countryCode,
                    lat: lat,
                    lon: lon
                });
                document.getElementById('weatherHeroCard')?.scrollIntoView({ behavior: 'smooth' });
            }
        });

        // Reset Button
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                countrySelect.value = '';
                this.resetExplorerStateCity();
            });
        }
    },

    /**
     * Render Country Options for Hierarchical Explorer
     */
    renderExplorerCountryOptions(countries) {
        const countrySelect = document.getElementById('explorerCountrySelect');
        if (!countrySelect) return;

        const currentVal = countrySelect.value;
        let html = `<option value="">-- ${I18N.t('selectCountryPrompt')} --</option>`;
        countries.forEach(c => {
            const flag = c.emoji ? `${c.emoji} ` : '';
            const localizedCountry = I18N.getCountryName(c.code, c.name);
            const localizedCapital = c.capital ? ` (${I18N.getCityName(c.capital)})` : '';
            html += `<option value="${c.code}" data-name="${c.name}" data-capital="${c.capital || ''}" data-lat="${c.latitude || ''}" data-lon="${c.longitude || ''}">${flag}${localizedCountry}${localizedCapital}</option>`;
        });
        countrySelect.innerHTML = html;
        if (currentVal) countrySelect.value = currentVal;
    },

    /**
     * Reset State and City dropdowns in Hierarchical Explorer
     */
    resetExplorerStateCity() {
        const stateSelect = document.getElementById('explorerStateSelect');
        const citySelect = document.getElementById('explorerCitySelect');
        const colState = document.getElementById('colStepState');
        const colCity = document.getElementById('colStepCity');

        if (stateSelect) {
            stateSelect.disabled = true;
            stateSelect.innerHTML = `<option value="">${I18N.t('selectStateFirst')}</option>`;
        }
        if (citySelect) {
            citySelect.disabled = true;
            citySelect.innerHTML = `<option value="">${I18N.t('selectCityFirst')}</option>`;
        }
        if (colState) colState.classList.add('disabled');
        if (colCity) colCity.classList.add('disabled');
    },

    /**
     * Synchronize Hierarchical Explorer with a selected Country Code
     */
    syncExplorerCountry(countryCode) {
        const countrySelect = document.getElementById('explorerCountrySelect');
        if (!countrySelect || !countryCode) return;

        const codeUpper = countryCode.toUpperCase();
        if (countrySelect.value !== codeUpper) {
            countrySelect.value = codeUpper;
            countrySelect.dispatchEvent(new Event('change'));
        }
    },

    /**
     * Favorites Management (MySQL PDO with localStorage Fallback)
     */
    async loadFavorites() {
        try {
            const res = await fetch('api/history.php?action=favorites');
            const json = await res.json();
            if (json.success && json.db_available) {
                this.state.favorites = json.data || [];
                this.state.dbAvailable = true;
            } else {
                // Fallback to localStorage
                this.state.dbAvailable = false;
                const local = localStorage.getItem('skysoft_favorites');
                this.state.favorites = local ? JSON.parse(local) : [];
            }
        } catch (err) {
            this.state.dbAvailable = false;
            const local = localStorage.getItem('skysoft_favorites');
            this.state.favorites = local ? JSON.parse(local) : [];
        }

        this.renderFavoritesList();
        this.updateFavoriteButtonState();
    },

    async toggleCurrentFavorite() {
        const cur = this.state.currentLocation;
        if (!cur || !cur.city) return;

        const isFav = this.isCityFavorite(cur.city, cur.country);

        if (this.state.dbAvailable) {
            try {
                const res = await fetch('api/history.php?action=toggle_favorite', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        city: cur.city,
                        country: cur.country,
                        country_code: cur.country_code,
                        latitude: cur.lat,
                        longitude: cur.lon
                    })
                });
                const json = await res.json();
                if (json.success) {
                    await this.loadFavorites();
                    return;
                }
            } catch (e) {
                console.warn('DB toggle failed, using localStorage fallback');
            }
        }

        // LocalStorage Fallback
        let favs = this.state.favorites;
        if (isFav) {
            favs = favs.filter(f => !(f.city === cur.city && f.country === cur.country));
        } else {
            favs.unshift({
                id: Date.now(),
                city: cur.city,
                country: cur.country,
                country_code: cur.country_code,
                latitude: cur.lat,
                longitude: cur.lon
            });
        }
        this.state.favorites = favs;
        localStorage.setItem('skysoft_favorites', JSON.stringify(favs));
        this.renderFavoritesList();
        this.updateFavoriteButtonState();
    },

    isCityFavorite(city, country) {
        return this.state.favorites.some(f => 
            f.city?.toLowerCase() === city?.toLowerCase() && 
            (!country || f.country?.toLowerCase() === country?.toLowerCase())
        );
    },

    updateFavoriteButtonState() {
        const btn = document.getElementById('favToggleBtn');
        const badge = document.getElementById('favCountBadge');
        const isFav = this.isCityFavorite(this.state.currentLocation.city, this.state.currentLocation.country);

        if (btn) {
            btn.classList.toggle('is-active', isFav);
            btn.setAttribute('title', isFav ? 'Remove from favorites' : 'Add to favorites');
        }

        if (badge) {
            const count = this.state.favorites.length;
            badge.textContent = count;
            badge.style.display = count > 0 ? 'inline-block' : 'none';
        }
    },

    renderFavoritesList() {
        const container = document.getElementById('favoritesListContainer');
        if (!container) return;

        container.innerHTML = '';
        if (this.state.favorites.length === 0) {
            container.innerHTML = `<div class="drawer-empty-msg">${I18N.t('emptyFavorites')}</div>`;
            return;
        }

        this.state.favorites.forEach(item => {
            const el = document.createElement('div');
            el.className = 'drawer-item';
            const locCity = I18N.getCityName(item.city);
            const locCountry = I18N.getCountryName(item.country_code, item.country);
            el.innerHTML = `
                <div class="drawer-item-clickable">
                    <span class="drawer-item-name">${locCity}</span>
                    <span class="drawer-item-sub">${locCountry}</span>
                </div>
                <button type="button" class="drawer-item-action-btn" title="Remove">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            `;

            // Click city to load weather
            el.querySelector('.drawer-item-clickable').addEventListener('click', () => {
                document.getElementById('favoritesDrawer')?.classList.remove('open');
                this.fetchWeather({
                    city: item.city,
                    country: item.country,
                    country_code: item.country_code,
                    lat: parseFloat(item.latitude),
                    lon: parseFloat(item.longitude)
                });
            });

            // Delete favorite
            el.querySelector('.drawer-item-action-btn').addEventListener('click', async (e) => {
                e.stopPropagation();
                await this.removeFavorite(item);
            });

            container.appendChild(el);
        });
    },

    async removeFavorite(item) {
        if (this.state.dbAvailable && item.id) {
            try {
                await fetch(`api/history.php?action=favorite&id=${item.id}`, { method: 'DELETE' });
                await this.loadFavorites();
                return;
            } catch (e) {
                console.warn('DB delete favorite failed, removing locally');
            }
        }

        this.state.favorites = this.state.favorites.filter(f => f.city !== item.city);
        localStorage.setItem('skysoft_favorites', JSON.stringify(this.state.favorites));
        this.renderFavoritesList();
        this.updateFavoriteButtonState();
    },

    /**
     * Search History Management (MySQL PDO with localStorage Fallback)
     */
    async loadHistory() {
        try {
            const res = await fetch('api/history.php?action=history');
            const json = await res.json();
            if (json.success && json.db_available) {
                this.state.history = json.data || [];
            } else {
                const local = localStorage.getItem('skysoft_history');
                this.state.history = local ? JSON.parse(local) : [];
            }
        } catch (e) {
            const local = localStorage.getItem('skysoft_history');
            this.state.history = local ? JSON.parse(local) : [];
        }

        this.renderHistoryList();
    },

    async recordHistory(loc) {
        if (!loc || !loc.city) return;

        if (this.state.dbAvailable) {
            try {
                await fetch('api/history.php?action=history', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        city: loc.city,
                        country: loc.country,
                        country_code: loc.country_code,
                        latitude: loc.lat,
                        longitude: loc.lon
                    })
                });
                return;
            } catch (e) {
                console.warn('DB history record failed, using localStorage');
            }
        }

        // Local fallback
        let hist = this.state.history.filter(h => h.city !== loc.city);
        hist.unshift({
            city: loc.city,
            country: loc.country,
            country_code: loc.country_code,
            latitude: loc.lat,
            longitude: loc.lon,
            searched_at: new Date().toISOString()
        });
        if (hist.length > 10) hist = hist.slice(0, 10);
        this.state.history = hist;
        localStorage.setItem('skysoft_history', JSON.stringify(hist));
    },

    async clearHistory() {
        if (this.state.dbAvailable) {
            try {
                await fetch('api/history.php?action=clear_history', { method: 'DELETE' });
            } catch (e) {
                console.warn('DB clear history failed');
            }
        }

        this.state.history = [];
        localStorage.removeItem('skysoft_history');
        this.renderHistoryList();
    },

    renderHistoryList() {
        const container = document.getElementById('historyListContainer');
        if (!container) return;

        container.innerHTML = '';
        if (this.state.history.length === 0) {
            container.innerHTML = `<div class="drawer-empty-msg">${I18N.t('emptyHistory')}</div>`;
            return;
        }

        this.state.history.forEach(item => {
            const el = document.createElement('div');
            el.className = 'drawer-item';
            const locCity = I18N.getCityName(item.city);
            const locCountry = I18N.getCountryName(item.country_code, item.country);
            el.innerHTML = `
                <div class="drawer-item-clickable">
                    <span class="drawer-item-name">${locCity}</span>
                    <span class="drawer-item-sub">${locCountry}</span>
                </div>
            `;

            el.addEventListener('click', () => {
                document.getElementById('historyDrawer')?.classList.remove('open');
                this.fetchWeather({
                    city: item.city,
                    country: item.country,
                    country_code: item.country_code,
                    lat: parseFloat(item.latitude),
                    lon: parseFloat(item.longitude)
                });
            });

            container.appendChild(el);
        });
    },

    /**
     * Language Selector Change Handler
     */
    handleLanguageChange(lang) {
        I18N.setLanguage(lang);
        this.applyTranslations();

        // Update active weather text if data is loaded
        if (this.state.currentWeatherData) {
            this.renderCurrentWeather(this.state.currentWeatherData);
            this.renderHourlyForecast(this.state.currentWeatherData.hourly);
            this.renderDailyForecast(this.state.currentWeatherData.daily);
        }

        // Update Country A-Z list
        this.loadCountriesByLetter(this.state.activeLetter);

        // Update drawers
        this.renderFavoritesList();
        this.renderHistoryList();

        // Update User Manual if open or loaded
        if (window.UserManual) {
            window.UserManual.updateContent();
        }
    },

    /**
     * Apply i18n translations across the UI
     */
    applyTranslations() {
        const setEl = (id, key) => {
            const el = document.getElementById(id);
            if (el) el.textContent = I18N.t(key);
        };

        setEl('headerAppName', 'appName');
        setEl('headerAppTagline', 'appTagline');
        setEl('headerFavBtnText', 'favoritesBtn');
        setEl('headerHistoryBtnText', 'historyBtn');
        setEl('headerManualBtnText', 'manualBtn');
        setEl('headerInstallBtnText', 'installBtn');
        setEl('quickCitiesLabel', 'quickLabel');

        const searchInput = document.getElementById('citySearchInput');
        if (searchInput) searchInput.placeholder = I18N.t('searchPlaceholder');

        setEl('lblFeelsLike', 'feelsLike');
        setEl('lblHumidity', 'humidity');
        setEl('lblWind', 'windSpeed');
        setEl('lblPressure', 'pressure');
        setEl('lblSun', 'sunTimes');

        setEl('titleHourlyForecast', 'hourlyTitle');
        setEl('titleDailyForecast', 'dailyTitle');
        setEl('titleCountryBrowser', 'countryTitle');
        setEl('subtitleCountryBrowser', 'countrySubtitle');

        // Sky Atmosphere Modes
        const skySelect = document.getElementById('skyModeSelect');
        if (skySelect) {
            Array.from(skySelect.options).forEach(opt => {
                opt.textContent = I18N.getSkyModeName(opt.value);
            });
        }
        const skyWrap = document.querySelector('.sky-selector-wrap');
        if (skyWrap) {
            skyWrap.setAttribute('title', I18N.t('skyViewTooltip') || 'Atmospheric Sky View');
        }

        // Quick City Chips
        const quickChips = document.querySelectorAll('.quick-city-chip');
        quickChips.forEach(chip => {
            const rawCity = chip.getAttribute('data-city');
            if (rawCity) chip.textContent = I18N.getCityName(rawCity);
        });

        // Hierarchical Regional Explorer Translations
        setEl('textExplorerTitle', 'explorerTitle');
        setEl('textExplorerSubtitle', 'explorerSubtitle');
        setEl('textResetExplorer', 'resetExplorer');
        setEl('textStepCountry', 'stepCountry');
        setEl('textStepState', 'stepState');
        setEl('textStepCity', 'stepCity');

        const optCountry = document.getElementById('optCountryPlaceholder');
        if (optCountry) optCountry.textContent = I18N.t('selectCountryPrompt');

        const stateSelect = document.getElementById('explorerStateSelect');
        if (stateSelect) {
            if (stateSelect.disabled) {
                const optState = document.getElementById('optStatePlaceholder') || stateSelect.options[0];
                if (optState) optState.textContent = I18N.t('selectStateFirst');
            } else {
                Array.from(stateSelect.options).forEach((opt, idx) => {
                    if (idx === 0) {
                        opt.textContent = `-- ${I18N.t('selectStatePrompt')} --`;
                    } else if (opt.dataset.name) {
                        const countMatch = opt.textContent.match(/\(\d+\s+.*?\)/);
                        const countStr = countMatch ? ` ${countMatch[0]}` : '';
                        opt.textContent = `${I18N.getStateName(opt.dataset.name)}${countStr}`;
                    }
                });
            }
        }

        const citySelect = document.getElementById('explorerCitySelect');
        if (citySelect) {
            if (citySelect.disabled) {
                const optCity = document.getElementById('optCityPlaceholder') || citySelect.options[0];
                if (optCity) optCity.textContent = I18N.t('selectCityFirst');
            } else {
                Array.from(citySelect.options).forEach((opt, idx) => {
                    if (idx === 0) {
                        opt.textContent = `-- ${I18N.t('selectCityPrompt')} --`;
                    } else if (opt.dataset.name) {
                        opt.textContent = I18N.getCityName(opt.dataset.name);
                    }
                });
            }
        }

        // Re-render Country Select Options if loaded
        if (this.state.explorerCountries && this.state.explorerCountries.length > 0) {
            this.renderExplorerCountryOptions(this.state.explorerCountries);
        }

        // Update Hero Weather Card if active
        if (this.state.currentWeatherData && this.state.currentWeatherData.location) {
            const loc = this.state.currentWeatherData.location;
            const cur = this.state.currentWeatherData.current;
            const cityNameEl = document.getElementById('cityName');
            const countryNameEl = document.getElementById('countryName');
            const conditionTextEl = document.getElementById('conditionText');
            if (cityNameEl) cityNameEl.textContent = I18N.getCityName(loc.city);
            if (countryNameEl) {
                const locCountry = I18N.getCountryName(loc.country_code || loc.country, loc.country);
                countryNameEl.textContent = locCountry + (loc.country_code ? ` (${loc.country_code})` : '');
            }
            if (conditionTextEl && cur?.weather_code !== undefined) {
                conditionTextEl.textContent = I18N.getConditionText(cur.weather_code);
            }
        }

        setEl('drawerFavTitle', 'favoritesBtn');
        setEl('drawerHistoryTitle', 'historyBtn');
        setEl('drawerClearHistoryText', 'clearBtn');
        setEl('footerTagline', 'appTagline');
        setEl('footerManualLink', 'manualBtn');
    },

    /**
     * Alerts
     */
    showAlert(msg) {
        const banner = document.getElementById('alertBanner');
        const msgEl = document.getElementById('alertMessage');
        if (banner && msgEl) {
            msgEl.textContent = msg;
            banner.classList.add('visible');
        }
    },

    hideAlert() {
        const banner = document.getElementById('alertBanner');
        if (banner) banner.classList.remove('visible');
    }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

window.App = App;
