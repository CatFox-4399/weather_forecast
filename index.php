<?php
/**
 * SkySoft Weather - Weather Forecast Website
 * Main Entry Page
 */
require_once __DIR__ . '/includes/config.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="SkySoft Weather - Modern, responsive weather forecast with real-time conditions, hourly 24h forecast, 7-day outlook, and global country directory powered by Open-Meteo.">
    <title>SkySoft Weather &mdash; Global Forecast</title>
    
    <!-- Modern Clean Google Font -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    
    <!-- Weather Stylesheet -->
    <link rel="stylesheet" href="assets/css/style.css?v=3.3">
    
    <!-- PWA Web App Manifest & Mobile Meta -->
    <link rel="manifest" href="manifest.json">
    <meta name="theme-color" content="#0284c7">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <meta name="apple-mobile-web-app-title" content="SkySoft Weather">
    <link rel="apple-touch-icon" href="assets/icons/icon-192.png">
    
    <!-- Favicon -->
    <link rel="icon" href="assets/icons/favicon.png" type="image/png">
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%230284c7'><path d='M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z'/></svg>" type="image/svg+xml">
</head>
<body>
    <!-- Dynamic Atmospheric Sky Background -->
    <div id="skyBackground" class="sky-background sky-day sky-clear" aria-hidden="true">
        <div id="skyCelestial" class="sky-celestial celestial-day"></div>
        <div id="skyClouds" class="sky-clouds"></div>
        <canvas id="skyCanvas" class="sky-canvas"></canvas>
        <div id="skyLightningOverlay" class="sky-lightning-overlay"></div>
    </div>

    <div class="app-container">
        <!-- Site Header -->
        <header class="site-header">
            <div class="brand-logo" id="brandHomeBtn" role="button" tabindex="0" title="SkySoft Weather">
                <div class="brand-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>
                    </svg>
                </div>
                <div class="brand-text">
                    <h1 id="headerAppName">SkySoft Weather</h1>
                    <span id="headerAppTagline">Global Forecast</span>
                </div>
            </div>

            <div class="header-controls">
                <!-- Favorites Drawer Toggle -->
                <button type="button" id="openFavoritesBtn" class="btn-control" title="View Favorite Cities">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                    </svg>
                    <span id="headerFavBtnText">Favorites</span>
                    <span id="favCountBadge" class="suggestion-badge" style="display: none; padding: 1px 6px; font-size: 0.7rem;">0</span>
                </button>

                <!-- Search History Toggle -->
                <button type="button" id="openHistoryBtn" class="btn-control" title="Recent Searches">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <span id="headerHistoryBtnText">History</span>
                </button>

                <!-- User Manual Button -->
                <button type="button" class="btn-control open-manual-btn" title="Open User Manual">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                    <span id="headerManualBtnText">Guide</span>
                </button>

                <!-- PWA Install Button (Shown dynamically when install prompt available) -->
                <button type="button" id="pwaInstallBtn" class="btn-control" style="display: none; background: rgba(2, 132, 199, 0.15); color: var(--brand-primary); border-color: var(--brand-primary);" title="Install SkySoft Weather App">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    <span id="headerInstallBtnText">Install App</span>
                </button>

                <!-- Language Selector -->
                <div class="lang-selector-wrap">
                    <select id="langSelect" class="lang-select" aria-label="Select Language">
                        <option value="en">English (EN)</option>
                        <option value="ms">Melayu (MS)</option>
                        <option value="zh">简体中文 (ZH)</option>
                        <option value="ja">日本語 (JA)</option>
                    </select>
                    <div class="lang-arrow">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </div>
                </div>

                <!-- Dynamic Sky Atmosphere Selector -->
                <div class="sky-selector-wrap" title="Atmospheric Sky View">
                    <div class="sky-mode-icon">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="4"></circle>
                            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path>
                        </svg>
                    </div>
                    <select id="skyModeSelect" class="sky-mode-select" aria-label="Sky Atmosphere Mode">
                        <option value="auto">Sky: Live Weather</option>
                        <option value="clearDay">Sunny Day (Sun)</option>
                        <option value="clearNight">Starry Night (Moon & Stars)</option>
                        <option value="partlyCloudyDay">Partly Cloudy (Day)</option>
                        <option value="partlyCloudyNight">Partly Cloudy (Night)</option>
                        <option value="cloudyDay">Overcast Clouds (Day)</option>
                        <option value="cloudyNight">Overcast Clouds (Night)</option>
                        <option value="rainDay">Light Rain (Day)</option>
                        <option value="rainNight">Light Rain (Night)</option>
                        <option value="heavyRainDay">Heavy Rain & Strong Wind (Day)</option>
                        <option value="heavyRainNight">Heavy Rain & Strong Wind (Night)</option>
                        <option value="thunderstormDay">Thunderstorm & Lightning (Day)</option>
                        <option value="thunderstormNight">Thunderstorm & Lightning (Night)</option>
                        <option value="snowDay">Snow (Day)</option>
                        <option value="snowNight">Snow (Night)</option>
                        <option value="fog">Atmospheric Fog</option>
                    </select>
                    <div class="lang-arrow">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </div>
                </div>
            </div>
        </header>

        <!-- City Search Bar -->
        <section class="search-section">
            <div class="search-box">
                <div class="search-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </div>
                <input type="text" id="citySearchInput" class="search-input" placeholder="Search city (e.g. Kuala Lumpur, Tokyo, London)..." autocomplete="off" spellcheck="false">
                <div id="searchSpinner" class="search-spinner"></div>
                <button type="button" id="searchClearBtn" class="search-clear-btn" aria-label="Clear search input">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>

            <!-- Auto-suggestions Dropdown -->
            <div id="searchSuggestions" class="search-suggestions" role="listbox"></div>

            <!-- Quick Access Cities (Requested Examples) -->
            <div class="quick-cities">
                <span id="quickCitiesLabel" class="quick-label">Popular:</span>
                <button type="button" class="quick-city-chip" data-city="Kuala Lumpur" data-country="Malaysia" data-lat="3.139" data-lon="101.687">Kuala Lumpur</button>
                <button type="button" class="quick-city-chip" data-city="Penang" data-country="Malaysia" data-lat="5.414" data-lon="100.329">Penang</button>
                <button type="button" class="quick-city-chip" data-city="Singapore" data-country="Singapore" data-lat="1.352" data-lon="103.820">Singapore</button>
                <button type="button" class="quick-city-chip" data-city="Tokyo" data-country="Japan" data-lat="35.6895" data-lon="139.6917">Tokyo</button>
                <button type="button" class="quick-city-chip" data-city="London" data-country="United Kingdom" data-lat="51.5074" data-lon="-0.1278">London</button>
                <button type="button" class="quick-city-chip" data-city="New York" data-country="United States" data-lat="40.7128" data-lon="-74.0060">New York</button>
            </div>
        </section>

        <!-- Hierarchical Location Explorer: Country -> State -> City -->
        <section class="hierarchy-explorer-section" id="hierarchyExplorerSection" aria-label="Regional Weather Explorer">
            <div class="hierarchy-header">
                <div class="hierarchy-title-wrap">
                    <div class="hierarchy-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                    </div>
                    <div>
                        <h2 class="hierarchy-title" id="textExplorerTitle">Regional Explorer: Country &rarr; State &rarr; City</h2>
                        <p class="hierarchy-subtitle" id="textExplorerSubtitle">Select a country to view capital weather, then select a state and city</p>
                    </div>
                </div>
                <button type="button" id="explorerResetBtn" class="explorer-reset-btn" title="Reset Filters">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                        <path d="M3 3v5h5"></path>
                    </svg>
                    <span id="textResetExplorer">Reset</span>
                </button>
            </div>

            <div class="hierarchy-selectors-grid">
                <!-- 1. Country Selector -->
                <div class="hierarchy-step-col" id="colStepCountry">
                    <label for="explorerCountrySelect" class="hierarchy-step-label">
                        <span class="step-num">1</span>
                        <span id="textStepCountry">Country</span>
                        <span class="step-hint">(Capital Weather)</span>
                    </label>
                    <div class="custom-select-wrap">
                        <select id="explorerCountrySelect" class="hierarchy-select" aria-label="Select Country">
                            <option value="" id="optCountryPlaceholder">Loading countries...</option>
                        </select>
                        <div class="select-arrow">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </div>
                    </div>
                </div>

                <!-- 2. State / Province Selector -->
                <div class="hierarchy-step-col" id="colStepState">
                    <label for="explorerStateSelect" class="hierarchy-step-label">
                        <span class="step-num">2</span>
                        <span id="textStepState">State / Province</span>
                    </label>
                    <div class="custom-select-wrap">
                        <select id="explorerStateSelect" class="hierarchy-select" aria-label="Select State" disabled>
                            <option value="" id="optStatePlaceholder">Select a country first</option>
                        </select>
                        <div class="select-arrow">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </div>
                    </div>
                </div>

                <!-- 3. City Selector -->
                <div class="hierarchy-step-col" id="colStepCity">
                    <label for="explorerCitySelect" class="hierarchy-step-label">
                        <span class="step-num">3</span>
                        <span id="textStepCity">City</span>
                    </label>
                    <div class="custom-select-wrap">
                        <select id="explorerCitySelect" class="hierarchy-select" aria-label="Select City" disabled>
                            <option value="" id="optCityPlaceholder">Select a state first</option>
                        </select>
                        <div class="select-arrow">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Notification Banner -->
        <div id="alertBanner" class="alert-banner" role="alert">
            <span id="alertMessage">Unable to load weather information. Please try again.</span>
            <button type="button" id="alertCloseBtn" class="alert-close" aria-label="Dismiss message">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        </div>

        <!-- Main Weather Dashboard -->
        <main class="weather-dashboard">
            <!-- 1. Hero Weather Card -->
            <section class="weather-hero-card" id="weatherHeroCard">
                <div class="hero-main">
                    <div class="location-header">
                        <div class="location-title-wrap">
                            <h2 id="cityName" class="location-name">Kuala Lumpur</h2>
                            <div class="location-meta">
                                <span id="countryName">Malaysia</span>
                                <span class="local-time-tag" id="localTimeTag">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <polyline points="12 6 12 12 16 14"></polyline>
                                    </svg>
                                    <span id="localDateTime">--:--</span>
                                </span>
                            </div>
                        </div>
                        <button type="button" id="favToggleBtn" class="btn-fav-toggle" aria-label="Toggle city favorite" title="Add to favorites">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                            </svg>
                        </button>
                    </div>

                    <div class="temp-display-wrap">
                        <div class="weather-hero-icon" id="weatherHeroIcon">
                            <!-- Injected SVG Icon -->
                        </div>
                        <div class="temp-numbers">
                            <div class="main-temp-wrap">
                                <span id="mainTemp" class="main-temp">--</span><span class="temp-unit">&deg;C</span>
                            </div>
                            <div id="conditionText" class="condition-text">Loading...</div>
                            <div class="feels-like-text">
                                <span id="lblFeelsLike">Feels like</span> <span id="valFeelsLike">--</span>&deg;C
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Weather Metrics Grid -->
                <div class="hero-metrics-grid">
                    <!-- Humidity -->
                    <div class="metric-card">
                        <div class="metric-icon">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
                            </svg>
                        </div>
                        <div class="metric-info">
                            <span class="metric-label" id="lblHumidity">Humidity</span>
                            <span class="metric-value" id="valHumidity">--%</span>
                        </div>
                    </div>

                    <!-- Wind Speed & Direction -->
                    <div class="metric-card">
                        <div class="metric-icon">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"></path>
                                <path d="M9.6 4.6A2 2 0 1 1 11 8H2"></path>
                                <path d="M12.6 19.4A2 2 0 1 0 14 16H2"></path>
                            </svg>
                        </div>
                        <div class="metric-info">
                            <span class="metric-label" id="lblWind">Wind</span>
                            <span class="metric-value" id="valWind">-- km/h</span>
                        </div>
                    </div>

                    <!-- Air Pressure -->
                    <div class="metric-card">
                        <div class="metric-icon">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="m16 12-4-4-4 4"></path>
                                <path d="M12 16V8"></path>
                            </svg>
                        </div>
                        <div class="metric-info">
                            <span class="metric-label" id="lblPressure">Pressure</span>
                            <span class="metric-value" id="valPressure">-- hPa</span>
                        </div>
                    </div>

                    <!-- Sunrise & Sunset -->
                    <div class="metric-card">
                        <div class="metric-icon">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M12 2v6"></path>
                                <path d="m4.93 4.93 4.24 4.24"></path>
                                <path d="M2 12h6"></path>
                                <path d="m4.93 19.07 4.24-4.24"></path>
                                <path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"></path>
                            </svg>
                        </div>
                        <div class="metric-info">
                            <span class="metric-label" id="lblSun">Sun Times</span>
                            <span class="metric-value" id="valSunTimes">-- / --</span>
                        </div>
                    </div>
                </div>
            </section>

            <!-- 2. Hourly Forecast (24 Hours - Horizontally Scrollable) -->
            <section class="section-container">
                <div class="section-header">
                    <h2 class="section-title">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        <span id="titleHourlyForecast">Hourly Forecast (24 Hours)</span>
                    </h2>
                </div>
                <div class="hourly-scroll-track" id="hourlyTrack" role="region" aria-label="Hourly weather scrollable forecast">
                    <!-- Dynamic Hourly Cards -->
                </div>
            </section>

            <!-- 3. 7-Day Forecast -->
            <section class="section-container">
                <div class="section-header">
                    <h2 class="section-title">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        <span id="titleDailyForecast">7-Day Forecast</span>
                    </h2>
                </div>
                <div class="daily-forecast-grid" id="dailyGrid">
                    <!-- Dynamic Daily Forecast Cards -->
                </div>
            </section>

            <!-- 4. Country A–Z Browser -->
            <section class="section-container country-browser-section">
                <div class="section-header">
                    <div>
                        <h2 class="section-title">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="2" y1="12" x2="22" y2="12"></line>
                                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                            </svg>
                            <span id="titleCountryBrowser">Country A–Z Directory</span>
                        </h2>
                        <p id="subtitleCountryBrowser" style="font-size: 0.85rem; color: var(--text-muted); margin-top: 2px;">
                            Browse sovereign countries and explore capital weather instantly
                        </p>
                    </div>
                </div>

                <!-- A-Z Alphabet Ribbon -->
                <div class="az-letters-ribbon" id="azRibbon" role="toolbar" aria-label="Country alphabet index">
                    <!-- A to Z buttons generated dynamically -->
                </div>

                <!-- Countries Grid -->
                <div class="countries-results-grid" id="countriesGrid">
                    <!-- Dynamic Country Cards -->
                </div>
            </section>
        </main>

        <!-- Favorites Slide-in Drawer -->
        <div id="favoritesDrawer" class="drawer-backdrop">
            <div class="drawer-panel" role="dialog" aria-modal="true">
                <div class="drawer-header">
                    <h3 class="drawer-title">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="#ef4444" stroke="#ef4444" stroke-width="2">
                            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                        </svg>
                        <span id="drawerFavTitle">Favorite Cities</span>
                    </h3>
                    <button type="button" id="closeFavoritesDrawerBtn" class="drawer-close-btn" aria-label="Close favorites">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                <div class="drawer-body" id="favoritesListContainer">
                    <!-- Favorite items injected here -->
                </div>
            </div>
        </div>

        <!-- History Slide-in Drawer -->
        <div id="historyDrawer" class="drawer-backdrop">
            <div class="drawer-panel" role="dialog" aria-modal="true">
                <div class="drawer-header">
                    <h3 class="drawer-title">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        <span id="drawerHistoryTitle">Recent Searches</span>
                    </h3>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <button type="button" id="clearHistoryBtn" class="btn-control" style="padding: 4px 10px; font-size: 0.78rem;">
                            <span id="drawerClearHistoryText">Clear</span>
                        </button>
                        <button type="button" id="closeHistoryDrawerBtn" class="drawer-close-btn" aria-label="Close search history">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="drawer-body" id="historyListContainer">
                    <!-- History items injected here -->
                </div>
            </div>
        </div>

        <!-- User Manual Modal -->
        <?php include __DIR__ . '/includes/manual.php'; ?>
    </div>

    <!-- Semantic Footer -->
    <?php include __DIR__ . '/includes/footer.php'; ?>

    <!-- Application JavaScript Modules -->
    <script src="assets/js/i18n.js?v=3.3"></script>
    <script src="assets/js/sky.js?v=3.3"></script>
    <script src="assets/js/manual.js?v=3.3"></script>
    <script src="assets/js/app.js?v=3.3"></script>
</body>
</html>
