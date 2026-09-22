/**
 * SkyAtmosphere - Dynamic Sky & Weather Background Engine
 * High-performance canvas & DOM atmospheric effects system:
 * - Day/Night transitions: Sun with corona & rotating rays vs. Moon with lunar craters & moonlight glow
 * - Starfield: Twinkling stars with variable depth & occasional shooting stars
 * - Procedural cloud layers: Multi-depth parallax drifting cumulus & overcast clouds
 * - Precipitation: Realistic angled rain drops with splash particles & floating 3D snowflakes
 * - Thunderstorm: Dynamic branching lightning strikes and screen flash illumination
 * - Battery-friendly: Pauses when tab is hidden (Page Visibility API) & Retina DPI aware
 */

const SkyAtmosphere = {
    // Canvas & Container Elements
    container: null,
    canvas: null,
    ctx: null,
    celestialContainer: null,
    cloudContainer: null,
    lightningOverlay: null,

    // Animation loop state
    animFrameId: null,
    isRunning: false,
    width: window.innerWidth,
    height: window.innerHeight,
    dpr: Math.min(window.devicePixelRatio || 1, 2),

    // Active Weather State
    state: {
        isDay: 1,
        solarPhase: 'day', // 'day', 'night', 'sunrise', 'sunset'
        condition: 'clear', // 'clear', 'partlyCloudy', 'cloudy', 'rain', 'heavyRain', 'thunderstorm', 'snow', 'fog'
        weatherCode: 0,
        windSpeed: 10,
        manualOverride: null, // null or mode string for testing
        liveWeatherCode: null,
        liveIsDay: null,
        liveWindSpeed: null,
        liveSunTimes: null
    },

    // Particle Collections
    stars: [],
    shootingStars: [],
    rainDrops: [],
    rainSplashes: [],
    windGusts: [],
    snowFlakes: [],
    clouds: [],
    activeBolts: [],
    lightningTimer: 0,
    lightningFlashOpacity: 0,

    /**
     * Initialize the Sky Engine
     */
    init() {
        this.container = document.getElementById('skyBackground');
        if (!this.container) {
            console.warn('SkyAtmosphere: #skyBackground container not found.');
            return;
        }

        this.canvas = document.getElementById('skyCanvas');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');

        this.celestialContainer = document.getElementById('skyCelestial');
        this.cloudContainer = document.getElementById('skyClouds');
        this.lightningOverlay = document.getElementById('skyLightningOverlay');

        this.handleResize = this.handleResize.bind(this);
        window.addEventListener('resize', this.handleResize, { passive: true });

        // Handle tab visibility to save CPU / battery
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.stopLoop();
            } else {
                this.startLoop();
            }
        });

        this.handleResize();
        this.applyAtmosphereClasses();
        this.initStars();
        this.initPrecipitation();
        this.renderCelestial();
        this.renderClouds();

        this.startLoop();
    },

    /**
     * Resize canvas to viewport with device pixel ratio
     */
    handleResize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.dpr = Math.min(window.devicePixelRatio || 1, 2);

        if (this.canvas) {
            this.canvas.width = this.width * this.dpr;
            this.canvas.height = this.height * this.dpr;
            this.canvas.style.width = `${this.width}px`;
            this.canvas.style.height = `${this.height}px`;

            if (this.ctx) {
                this.ctx.setTransform(1, 0, 0, 1, 0, 0);
                this.ctx.scale(this.dpr, this.dpr);
            }
        }

        // Re-generate stars density for new dimensions
        this.initStars();
        this.initPrecipitation();
        this.renderClouds();
    },

    /**
     * Map WMO Weather Code to Sky Condition Category
     */
    categorizeWeather(code, windSpeed = 10) {
        const c = parseInt(code, 10) || 0;
        const w = parseFloat(windSpeed) || 0;

        if (c >= 95) return 'thunderstorm';
        // Heavy rain codes (65: Heavy rain, 67: Heavy freezing rain, 82: Violent rain showers)
        // or moderate rain with strong wind (>= 24 km/h)
        if (c === 65 || c === 67 || c === 82 || ((c === 63 || c === 64 || c === 81) && w >= 24)) {
            return 'heavyRain';
        }
        if ((c >= 71 && c <= 77) || c === 85 || c === 86) return 'snow';
        if ((c >= 51 && c <= 67) || (c >= 80 && c <= 82)) return 'rain';
        if (c === 45 || c === 48) return 'fog';
        if (c === 3) return 'cloudy';
        if (c === 1 || c === 2) return 'partlyCloudy';
        if (c === 0) return 'clear';
        return 'clear';
    },

    /**
     * Calculate Solar Phase (sunrise, day, sunset, night) from sunTimes and isDay
     */
    calculateSolarPhase(isDay, sunTimes) {
        if (!sunTimes || !sunTimes.sunrise || !sunTimes.sunset) {
            return isDay === 1 ? 'day' : 'night';
        }

        try {
            const parseMinutes = (iso) => {
                if (!iso) return null;
                const timeStr = iso.includes('T') ? iso.split('T')[1] : iso;
                const parts = timeStr.split(':');
                if (parts.length < 2) return null;
                const h = parseInt(parts[0], 10);
                const m = parseInt(parts[1], 10);
                if (isNaN(h) || isNaN(m)) return null;
                return h * 60 + m;
            };

            const curMinutes = parseMinutes(sunTimes.time);
            const riseMinutes = parseMinutes(sunTimes.sunrise);
            const setMinutes = parseMinutes(sunTimes.sunset);

            if (curMinutes === null || riseMinutes === null || setMinutes === null) {
                return isDay === 1 ? 'day' : 'night';
            }

            // Sunrise window: 35 minutes before sunrise to 45 minutes after sunrise
            if (curMinutes >= (riseMinutes - 35) && curMinutes <= (riseMinutes + 45)) {
                return 'sunrise';
            }

            // Sunset window: 45 minutes before sunset to 35 minutes after sunset
            if (curMinutes >= (setMinutes - 45) && curMinutes <= (setMinutes + 35)) {
                return 'sunset';
            }

            return isDay === 1 ? 'day' : 'night';
        } catch (e) {
            return isDay === 1 ? 'day' : 'night';
        }
    },

    /**
     * Update sky according to live weather
     */
    setWeather(weatherCode, isDay = 1, windSpeed = 10, sunTimes = null) {
        const numericIsDay = (isDay === 0 || isDay === '0') ? 0 : 1;
        const numericCode = parseInt(weatherCode, 10) || 0;
        const numericWind = parseFloat(windSpeed) || 10;

        // Save real-time city weather values for restoration
        this.state.liveWeatherCode = numericCode;
        this.state.liveIsDay = numericIsDay;
        this.state.liveWindSpeed = numericWind;
        if (sunTimes) {
            this.state.liveSunTimes = sunTimes;
        }

        // If manual override is active, do not overwrite screen until returned to auto
        if (this.state.manualOverride) return;

        const solarPhase = this.calculateSolarPhase(numericIsDay, this.state.liveSunTimes);
        const condition = this.categorizeWeather(numericCode, numericWind);
        const phaseChanged = this.state.solarPhase !== solarPhase || this.state.isDay !== numericIsDay;

        this.state.weatherCode = numericCode;
        this.state.isDay = numericIsDay;
        this.state.solarPhase = solarPhase;
        this.state.condition = condition;
        this.state.windSpeed = numericWind;

        this.applyAtmosphereClasses();
        this.renderCelestial();
        this.renderClouds();
        this.initPrecipitation();

        if (phaseChanged) {
            this.initStars();
        }
    },

    /**
     * Set manual test override (for UI switcher or user testing)
     */
    setOverride(mode) {
        if (mode === 'auto' || !mode) {
            this.state.manualOverride = null;
            const code = this.state.liveWeatherCode !== null ? this.state.liveWeatherCode : 0;
            const day = this.state.liveIsDay !== null ? this.state.liveIsDay : 1;
            const wind = this.state.liveWindSpeed !== null ? this.state.liveWindSpeed : 10;

            const solarPhase = this.calculateSolarPhase(day, this.state.liveSunTimes);
            const condition = this.categorizeWeather(code, wind);
            this.state.weatherCode = code;
            this.state.isDay = day;
            this.state.solarPhase = solarPhase;
            this.state.condition = condition;
            this.state.windSpeed = wind;

            this.applyAtmosphereClasses();
            this.renderCelestial();
            this.renderClouds();
            this.initPrecipitation();
            this.initStars();
            return;
        }

        this.state.manualOverride = mode;

        switch (mode) {
            case 'sunrise':
                this.state.solarPhase = 'sunrise';
                this.state.isDay = 1;
                this.state.condition = 'clear';
                this.state.weatherCode = 0;
                this.state.windSpeed = 8;
                break;
            case 'sunrisePartlyCloudy':
                this.state.solarPhase = 'sunrise';
                this.state.isDay = 1;
                this.state.condition = 'partlyCloudy';
                this.state.weatherCode = 2;
                this.state.windSpeed = 10;
                break;
            case 'sunset':
                this.state.solarPhase = 'sunset';
                this.state.isDay = 0;
                this.state.condition = 'clear';
                this.state.weatherCode = 0;
                this.state.windSpeed = 8;
                break;
            case 'partlyCloudySunset':
            case 'sunsetPartlyCloudy':
                this.state.solarPhase = 'sunset';
                this.state.isDay = 0;
                this.state.condition = 'partlyCloudy';
                this.state.weatherCode = 2;
                this.state.windSpeed = 10;
                break;
            case 'clearDay':
                this.state.solarPhase = 'day';
                this.state.isDay = 1;
                this.state.condition = 'clear';
                this.state.weatherCode = 0;
                this.state.windSpeed = 8;
                break;
            case 'clearNight':
                this.state.solarPhase = 'night';
                this.state.isDay = 0;
                this.state.condition = 'clear';
                this.state.weatherCode = 0;
                this.state.windSpeed = 8;
                break;
            case 'clear':
                this.state.solarPhase = 'day';
                this.state.condition = 'clear';
                this.state.weatherCode = 0;
                this.state.windSpeed = 8;
                break;
            case 'partlyCloudyDay':
                this.state.solarPhase = 'day';
                this.state.isDay = 1;
                this.state.condition = 'partlyCloudy';
                this.state.weatherCode = 2;
                this.state.windSpeed = 12;
                break;
            case 'partlyCloudyNight':
                this.state.solarPhase = 'night';
                this.state.isDay = 0;
                this.state.condition = 'partlyCloudy';
                this.state.weatherCode = 2;
                this.state.windSpeed = 12;
                break;
            case 'partlyCloudy':
                this.state.solarPhase = 'day';
                this.state.condition = 'partlyCloudy';
                this.state.weatherCode = 2;
                this.state.windSpeed = 12;
                break;
            case 'cloudyDay':
                this.state.solarPhase = 'day';
                this.state.isDay = 1;
                this.state.condition = 'cloudy';
                this.state.weatherCode = 3;
                this.state.windSpeed = 15;
                break;
            case 'cloudyNight':
                this.state.solarPhase = 'night';
                this.state.isDay = 0;
                this.state.condition = 'cloudy';
                this.state.weatherCode = 3;
                this.state.windSpeed = 15;
                break;
            case 'cloudy':
                this.state.solarPhase = 'day';
                this.state.condition = 'cloudy';
                this.state.weatherCode = 3;
                this.state.windSpeed = 15;
                break;
            case 'rainDay':
                this.state.solarPhase = 'day';
                this.state.isDay = 1;
                this.state.condition = 'rain';
                this.state.weatherCode = 61;
                this.state.windSpeed = 14;
                break;
            case 'rainNight':
                this.state.solarPhase = 'night';
                this.state.isDay = 0;
                this.state.condition = 'rain';
                this.state.weatherCode = 61;
                this.state.windSpeed = 14;
                break;
            case 'rain':
                this.state.solarPhase = 'day';
                this.state.condition = 'rain';
                this.state.weatherCode = 61;
                this.state.windSpeed = 14;
                break;
            case 'heavyRainDay':
                this.state.solarPhase = 'day';
                this.state.isDay = 1;
                this.state.condition = 'heavyRain';
                this.state.weatherCode = 65;
                this.state.windSpeed = 38;
                break;
            case 'heavyRainNight':
                this.state.solarPhase = 'night';
                this.state.isDay = 0;
                this.state.condition = 'heavyRain';
                this.state.weatherCode = 65;
                this.state.windSpeed = 38;
                break;
            case 'heavyRain':
                this.state.solarPhase = 'day';
                this.state.condition = 'heavyRain';
                this.state.weatherCode = 65;
                this.state.windSpeed = 38;
                break;
            case 'thunderstormDay':
                this.state.solarPhase = 'day';
                this.state.isDay = 1;
                this.state.condition = 'thunderstorm';
                this.state.weatherCode = 95;
                this.state.windSpeed = 44;
                break;
            case 'thunderstormNight':
                this.state.solarPhase = 'night';
                this.state.isDay = 0;
                this.state.condition = 'thunderstorm';
                this.state.weatherCode = 95;
                this.state.windSpeed = 44;
                break;
            case 'thunderstorm':
                this.state.solarPhase = 'day';
                this.state.condition = 'thunderstorm';
                this.state.weatherCode = 95;
                this.state.windSpeed = 44;
                break;
            case 'snowDay':
                this.state.solarPhase = 'day';
                this.state.isDay = 1;
                this.state.condition = 'snow';
                this.state.weatherCode = 73;
                this.state.windSpeed = 10;
                break;
            case 'snowNight':
                this.state.solarPhase = 'night';
                this.state.isDay = 0;
                this.state.condition = 'snow';
                this.state.weatherCode = 73;
                this.state.windSpeed = 10;
                break;
            case 'snow':
                this.state.solarPhase = 'day';
                this.state.condition = 'snow';
                this.state.weatherCode = 73;
                this.state.windSpeed = 10;
                break;
            case 'fog':
                this.state.solarPhase = 'day';
                this.state.condition = 'fog';
                this.state.weatherCode = 45;
                this.state.windSpeed = 5;
                break;
            default:
                this.state.solarPhase = 'day';
                this.state.isDay = 1;
                this.state.condition = 'clear';
                this.state.weatherCode = 0;
                this.state.windSpeed = 10;
                break;
        }

        this.applyAtmosphereClasses();
        this.renderCelestial();
        this.renderClouds();
        this.initPrecipitation();
        this.initStars();
    },

    /**
     * Apply CSS styling classes to #skyBackground
     */
    applyAtmosphereClasses() {
        if (!this.container) return;

        const isDay = this.state.isDay === 1;
        const phase = this.state.solarPhase;
        const cond = this.state.condition;
        const isStrongWind = (this.state.windSpeed >= 22) || cond === 'heavyRain' || cond === 'thunderstorm';

        this.container.className = 'sky-background';

        if (phase === 'sunrise') {
            this.container.classList.add('sky-sunrise');
        } else if (phase === 'sunset') {
            this.container.classList.add('sky-sunset');
        } else {
            this.container.classList.add(isDay ? 'sky-day' : 'sky-night');
        }

        this.container.classList.add(`sky-${cond}`);
        if (isStrongWind) {
            this.container.classList.add('sky-strong-wind');
        }

        // Update body theme class to keep text and cards perfectly legible
        const isNightTheme = phase === 'sunset' || phase === 'night' || !isDay || cond === 'thunderstorm' || cond === 'heavyRain';
        document.body.classList.toggle('theme-night', isNightTheme);
    },

    /**
     * Initialize Starfield for night and twilight sky
     */
    initStars() {
        this.stars = [];
        this.shootingStars = [];
        const phase = this.state.solarPhase;

        // Density based on condition (heavy rain/storm completely obscures stars)
        if (this.state.condition === 'heavyRain' || this.state.condition === 'thunderstorm') {
            return; // completely obscured by dense tempest clouds
        }

        // During sunrise and sunset (golden hour / twilight), faint stars appear in the deep indigo zenith
        if (phase === 'sunrise' || phase === 'sunset') {
            const count = this.state.condition === 'clear' ? 45 : (this.state.condition === 'partlyCloudy' ? 20 : 0);
            for (let i = 0; i < count; i++) {
                this.stars.push({
                    x: Math.random() * this.width,
                    y: Math.random() * (this.height * 0.32), // Zenith upper 32%
                    radius: Math.random() * 1.3 + 0.4,
                    baseAlpha: Math.random() * 0.4 + 0.2,
                    twinkleSpeed: Math.random() * 0.04 + 0.01,
                    phase: Math.random() * Math.PI * 2,
                    color: Math.random() > 0.6 ? '#bae6fd' : '#ffffff'
                });
            }
            return;
        }

        if (this.state.isDay === 1) return;

        let count = 150;
        if (this.state.condition === 'cloudy') {
            count = 20; // partially hidden by thick clouds
        } else if (this.state.condition === 'partlyCloudy') {
            count = 80;
        } else if (this.state.condition === 'rain') {
            count = 15;
        }

        for (let i = 0; i < count; i++) {
            this.stars.push({
                x: Math.random() * this.width,
                y: Math.random() * (this.height * 0.75), // Upper 75% of sky
                radius: Math.random() * 1.5 + 0.5,
                baseAlpha: Math.random() * 0.7 + 0.3,
                twinkleSpeed: Math.random() * 0.04 + 0.01,
                phase: Math.random() * Math.PI * 2,
                color: Math.random() > 0.8 ? '#bae6fd' : (Math.random() > 0.9 ? '#fef08a' : '#ffffff')
            });
        }
    },

    /**
     * Trigger a shooting star occasionally during clear night
     */
    maybeSpawnShootingStar() {
        if (this.state.isDay === 1 || this.state.condition === 'thunderstorm' || this.state.condition === 'cloudy') return;
        if (this.shootingStars.length >= 2) return;

        // 0.4% chance per frame in clear night
        if (Math.random() < 0.004) {
            const startX = Math.random() * this.width * 0.7;
            const startY = Math.random() * (this.height * 0.35);
            const length = Math.random() * 120 + 80;
            const speed = Math.random() * 12 + 10;
            const angle = Math.PI / 4 + (Math.random() * 0.2 - 0.1); // ~45 deg

            this.shootingStars.push({
                x: startX,
                y: startY,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                length: length,
                life: 1.0,
                decay: Math.random() * 0.025 + 0.015
            });
        }
    },

    /**
     * Initialize precipitation particles based on condition
     */
    initPrecipitation() {
        this.rainDrops = [];
        this.rainSplashes = [];
        this.windGusts = [];
        this.snowFlakes = [];
        this.activeBolts = [];

        const cond = this.state.condition;
        const isHeavy = cond === 'heavyRain' || cond === 'thunderstorm';
        const isModerate = cond === 'rain';

        if (isHeavy || isModerate) {
            const isMobile = this.width < 768;
            // Density: torrential downpour = 280 drops (desktop) / 160 (mobile); moderate = 80 / 45
            const count = isHeavy ? (isMobile ? 160 : 280) : (isMobile ? 45 : 80);

            // Dynamic Wind Slant: calculated from wind speed
            const wind = Math.max(10, this.state.windSpeed || (isHeavy ? 35 : 12));
            const baseSlant = isHeavy
                ? -Math.min(22, Math.max(9, wind * 0.38 + 5))
                : -Math.min(8, Math.max(2.5, wind * 0.22));

            for (let i = 0; i < count; i++) {
                this.rainDrops.push({
                    x: Math.random() * (this.width + Math.abs(baseSlant) * 2 + 200) - 100,
                    y: Math.random() * this.height,
                    length: isHeavy ? (Math.random() * 26 + 26) : (Math.random() * 12 + 14),
                    speed: isHeavy ? (Math.random() * 12 + 24) : (Math.random() * 6 + 13),
                    slant: baseSlant + (Math.random() * 2.2 - 1.1),
                    thickness: isHeavy ? (Math.random() * 0.9 + 1.2) : (Math.random() * 0.5 + 1.0),
                    alpha: isHeavy ? (Math.random() * 0.35 + 0.45) : (Math.random() * 0.25 + 0.35)
                });
            }

            // Strong Wind Atmospheric Vapor Scuds (horizontal mist gusts)
            if (isHeavy) {
                const gustCount = 6;
                for (let g = 0; g < gustCount; g++) {
                    this.windGusts.push({
                        x: Math.random() * (this.width + 400) - 200,
                        y: Math.random() * (this.height * 0.7) + (this.height * 0.15),
                        length: Math.random() * 220 + 160,
                        speed: Math.random() * 8 + 24,
                        height: Math.random() * 18 + 10,
                        alpha: Math.random() * 0.08 + 0.04
                    });
                }
            }
        } else if (cond === 'snow') {
            const count = 90;
            for (let i = 0; i < count; i++) {
                this.snowFlakes.push({
                    x: Math.random() * this.width,
                    y: Math.random() * this.height,
                    radius: Math.random() * 3.5 + 1.2,
                    speed: Math.random() * 1.5 + 0.8,
                    wind: Math.random() * 1.2 - 0.4,
                    wobbleSpeed: Math.random() * 0.03 + 0.01,
                    wobbleDistance: Math.random() * 25 + 10,
                    wobblePhase: Math.random() * Math.PI * 2,
                    alpha: Math.random() * 0.6 + 0.4
                });
            }
        }
    },

    /**
     * Render the Sun or Moon inside #skyCelestial
     */
    renderCelestial() {
        if (!this.celestialContainer) return;

        const isDay = this.state.isDay === 1;
        const phase = this.state.solarPhase;
        const cond = this.state.condition;

        // Heavy storms or torrential rain completely obscure celestial bodies
        if (cond === 'thunderstorm' || cond === 'heavyRain') {
            this.celestialContainer.className = 'sky-celestial celestial-hidden';
            this.celestialContainer.innerHTML = '';
            return;
        }

        this.celestialContainer.innerHTML = '';

        let phaseClass = 'celestial-day';
        if (phase === 'sunrise') phaseClass = 'celestial-sunrise';
        else if (phase === 'sunset') phaseClass = 'celestial-sunset';
        else if (!isDay || phase === 'night') phaseClass = 'celestial-night';

        this.celestialContainer.className = `sky-celestial ${phaseClass}`;

        if (cond === 'cloudy') {
            this.celestialContainer.classList.add('celestial-dimmed');
        }

        if (phase === 'sunrise') {
            // Golden Sunrise Sun with Radiant Morning Scattering
            this.celestialContainer.innerHTML = `
                <div class="sun-wrapper sun-sunrise" aria-label="Sunrise">
                    <div class="sun-atmospheric-dome sunrise-dome"></div>
                    <div class="sun-corona-outer sunrise-corona"></div>
                    <div class="sun-corona-mid sunrise-mid"></div>
                    <div class="sun-anamorphic-flare sunrise-flare"></div>
                    <div class="sun-diffraction-rays sunrise-rays"></div>
                    <div class="sun-disk sunrise-disk">
                        <div class="sun-photosphere sunrise-photosphere"></div>
                        <div class="sun-chromosphere-edge sunrise-chromosphere"></div>
                    </div>
                </div>
            `;
        } else if (phase === 'sunset') {
            // Dramatic Fiery Sunset Sun with Twilight Optical Streaks
            this.celestialContainer.innerHTML = `
                <div class="sun-wrapper sun-sunset" aria-label="Sunset">
                    <div class="sun-atmospheric-dome sunset-dome"></div>
                    <div class="sun-corona-outer sunset-corona"></div>
                    <div class="sun-corona-mid sunset-mid"></div>
                    <div class="sun-anamorphic-flare sunset-flare"></div>
                    <div class="sun-diffraction-rays sunset-rays"></div>
                    <div class="sun-disk sunset-disk">
                        <div class="sun-photosphere sunset-photosphere"></div>
                        <div class="sun-chromosphere-edge sunset-chromosphere"></div>
                    </div>
                </div>
            `;
        } else if (isDay) {
            // Photorealistic Incandescent Sun with Atmospheric Rayleigh Scattering & Optical Flares
            this.celestialContainer.innerHTML = `
                <div class="sun-wrapper" aria-label="Sun">
                    <div class="sun-atmospheric-dome"></div>
                    <div class="sun-corona-outer"></div>
                    <div class="sun-corona-mid"></div>
                    <div class="sun-anamorphic-flare"></div>
                    <div class="sun-diffraction-rays"></div>
                    <div class="sun-disk">
                        <div class="sun-photosphere"></div>
                        <div class="sun-chromosphere-edge"></div>
                    </div>
                </div>
            `;
        } else {
            // Authentic Real-Life Photorealistic Moon with Atmospheric Glow
            this.celestialContainer.innerHTML = `
                <div class="moon-wrapper" aria-label="Real Moon">
                    <div class="moon-atmospheric-dome"></div>
                    <div class="moon-corona-halo"></div>
                    <div class="moon-glow-pulse"></div>
                    <div class="moon-photosphere-container">
                        <img src="assets/icons/realistic_moon.png?v=3" alt="Real Full Moon" class="moon-photo-img" />
                    </div>
                </div>
            `;
        }
    },

    /**
     * Render Procedural Multi-layer Photorealistic Real-Life Clouds
     */
    renderClouds() {
        if (!this.cloudContainer) return;

        const isDay = this.state.isDay === 1;
        const cond = this.state.condition;

        this.cloudContainer.innerHTML = '';
        this.cloudContainer.className = 'sky-clouds';

        if (cond === 'clear') {
            // Delicate, photorealistic high-altitude wispy cirrus cloud drifting gently
            this.cloudContainer.innerHTML = `
                <div class="cloud-layer layer-distant">
                    <div class="real-cloud cloud-wispy cloud-speed-very-slow" style="top: 8%; left: -600px; width: 880px; opacity: ${isDay ? 0.45 : 0.28};">
                        <img src="assets/icons/cloud_wispy.png" alt="Wispy Cirrus" class="cloud-img" />
                    </div>
                </div>
            `;
            return;
        }

        // Heavy Rain / Severe Thunderstorm: Dense, multi-layered dark tempest cloud front
        if (cond === 'heavyRain' || cond === 'thunderstorm') {
            this.cloudContainer.innerHTML = `
                <div class="cloud-layer layer-distant">
                    <div class="real-cloud cloud-wispy cloud-speed-very-slow" style="top: 2%; left: -500px; width: 1100px;">
                        <img src="assets/icons/cloud_wispy.png" alt="Storm Veil" class="cloud-img" />
                    </div>
                </div>
                <div class="cloud-layer layer-mid">
                    <div class="real-cloud cloud-cumulus cloud-speed-slow" style="top: 5%; left: -680px; width: 850px; animation-delay: -12s;">
                        <img src="assets/icons/cloud_cumulus.png" alt="Storm Front" class="cloud-img" />
                    </div>
                    <div class="real-cloud cloud-cumulus cloud-speed-mid" style="top: 14%; left: -840px; width: 980px; animation-delay: -28s;">
                        <img src="assets/icons/cloud_cumulus.png" alt="Storm Cloud" class="cloud-img" />
                    </div>
                </div>
                <div class="cloud-layer layer-front">
                    <div class="real-cloud cloud-wispy cloud-speed-fast" style="top: 20%; left: -600px; width: 1050px; animation-delay: -8s;">
                        <img src="assets/icons/cloud_wispy.png" alt="Wind Scud" class="cloud-img" />
                    </div>
                    <div class="real-cloud cloud-cumulus cloud-speed-mid" style="top: 10%; left: -400px; width: 920px; animation-delay: -42s;">
                        <img src="assets/icons/cloud_cumulus.png" alt="Tempest Cloud" class="cloud-img" />
                    </div>
                </div>
            `;
            return;
        }

        let cloudHtml = '';
        const isStormy = cond === 'rain';
        const isOvercast = cond === 'cloudy' || isStormy;

        // Layer 1: Distant high-altitude wispy cloud
        cloudHtml += `
            <div class="cloud-layer layer-distant">
                <div class="real-cloud cloud-wispy cloud-speed-very-slow" style="top: 5%; left: -500px; width: 920px;">
                    <img src="assets/icons/cloud_wispy.png" alt="Distant Cloud" class="cloud-img" />
                </div>
            </div>
        `;

        // Layer 2: Main Volumetric Cumulus Cloud
        cloudHtml += `
            <div class="cloud-layer layer-mid">
                <div class="real-cloud cloud-cumulus cloud-speed-slow" style="top: 8%; left: -680px; width: 700px; animation-delay: -35s;">
                    <img src="assets/icons/cloud_cumulus.png" alt="Cumulus Cloud" class="cloud-img" />
                </div>
            </div>
        `;

        // Layer 3: Overcast / Rain frontal cloud layer
        if (isOvercast) {
            cloudHtml += `
                <div class="cloud-layer layer-front">
                    <div class="real-cloud cloud-cumulus cloud-speed-mid" style="top: 18%; left: -750px; width: 820px; animation-delay: -65s;">
                        <img src="assets/icons/cloud_cumulus.png" alt="Heavy Cloud" class="cloud-img" />
                    </div>
                    <div class="real-cloud cloud-wispy cloud-speed-slow" style="top: 24%; left: -600px; width: 900px; animation-delay: -10s;">
                        <img src="assets/icons/cloud_wispy.png" alt="Storm Vapor" class="cloud-img" />
                    </div>
                </div>
            `;
        }

        // Realistic layered ground/horizon mist for fog
        if (cond === 'fog') {
            cloudHtml += `
                <div class="sky-fog-bank fog-bank-1"></div>
                <div class="sky-fog-bank fog-bank-2"></div>
            `;
        }

        this.cloudContainer.innerHTML = cloudHtml;
    },

    /**
     * Start animation render loop
     */
    startLoop() {
        if (this.isRunning) return;
        this.isRunning = true;

        const loop = () => {
            if (!this.isRunning) return;
            this.updateAndDraw();
            this.animFrameId = requestAnimationFrame(loop);
        };

        this.animFrameId = requestAnimationFrame(loop);
    },

    /**
     * Stop animation render loop
     */
    stopLoop() {
        this.isRunning = false;
        if (this.animFrameId) {
            cancelAnimationFrame(this.animFrameId);
            this.animFrameId = null;
        }
    },

    /**
     * Core update & draw routine per frame
     */
    updateAndDraw() {
        if (!this.ctx) return;
        this.ctx.clearRect(0, 0, this.width, this.height);

        const cond = this.state.condition;

        // 1. Draw Starfield & Meteors (Night or Sunrise/Sunset twilight stars)
        const showStars = (this.state.isDay === 0 || this.state.solarPhase === 'sunrise' || this.state.solarPhase === 'sunset') 
            && cond !== 'thunderstorm' && cond !== 'heavyRain';
        if (showStars) {
            this.drawStars();
            if (this.state.isDay === 0 && this.state.solarPhase === 'night') {
                this.maybeSpawnShootingStar();
                this.drawShootingStars();
            }
        }

        // 2. Draw Rain / Snow
        if (cond === 'rain' || cond === 'heavyRain' || cond === 'thunderstorm') {
            this.drawRain();
        } else if (cond === 'snow') {
            this.drawSnow();
        }

        // 3. Thunderstorm Lightning Logic & Rendering
        if (cond === 'thunderstorm') {
            this.updateLightning();
            this.drawLightning();
        }
    },

    /**
     * Draw Twinkling Stars
     */
    drawStars() {
        const ctx = this.ctx;
        const count = this.stars.length;

        for (let i = 0; i < count; i++) {
            const star = this.stars[i];
            star.phase += star.twinkleSpeed;
            const alpha = star.baseAlpha + Math.sin(star.phase) * 0.35;
            const currentAlpha = Math.max(0.1, Math.min(1.0, alpha));

            ctx.fillStyle = star.color;
            ctx.globalAlpha = currentAlpha;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.globalAlpha = 1.0;
    },

    /**
     * Draw Shooting Stars / Meteors
     */
    drawShootingStars() {
        const ctx = this.ctx;
        for (let i = this.shootingStars.length - 1; i >= 0; i--) {
            const meteor = this.shootingStars[i];
            meteor.x += meteor.vx;
            meteor.y += meteor.vy;
            meteor.life -= meteor.decay;

            if (meteor.life <= 0 || meteor.x > this.width + 100 || meteor.y > this.height) {
                this.shootingStars.splice(i, 1);
                continue;
            }

            const tailX = meteor.x - meteor.vx * (meteor.length / 15);
            const tailY = meteor.y - meteor.vy * (meteor.length / 15);

            const grad = ctx.createLinearGradient(meteor.x, meteor.y, tailX, tailY);
            grad.addColorStop(0, `rgba(255, 255, 255, ${meteor.life * 0.9})`);
            grad.addColorStop(0.3, `rgba(186, 230, 253, ${meteor.life * 0.6})`);
            grad.addColorStop(1, 'rgba(186, 230, 253, 0)');

            ctx.lineWidth = 2.2;
            ctx.strokeStyle = grad;
            ctx.beginPath();
            ctx.moveTo(meteor.x, meteor.y);
            ctx.lineTo(tailX, tailY);
            ctx.stroke();

            // Head glow
            ctx.fillStyle = `rgba(255, 255, 255, ${meteor.life})`;
            ctx.beginPath();
            ctx.arc(meteor.x, meteor.y, 2, 0, Math.PI * 2);
            ctx.fill();
        }
    },

    /**
     * Draw Falling Rain, Strong Wind Gusts & Ground Impact Splashes
     */
    drawRain() {
        const ctx = this.ctx;
        const len = this.rainDrops.length;
        if (len === 0) return;

        const isNight = this.state.isDay === 0;
        const isHeavy = this.state.condition === 'heavyRain' || this.state.condition === 'thunderstorm';
        const h = this.height;
        const w = this.width;

        // 1. Draw Strong Wind Gust Atmospheric Vapor Streaks
        if (isHeavy && this.windGusts.length > 0) {
            ctx.save();
            for (let g = 0; g < this.windGusts.length; g++) {
                const gust = this.windGusts[g];
                gust.x -= gust.speed;
                if (gust.x + gust.length < -100) {
                    gust.x = w + Math.random() * 250;
                    gust.y = Math.random() * (h * 0.7) + (h * 0.15);
                }

                const gustGrad = ctx.createLinearGradient(gust.x, gust.y, gust.x + gust.length, gust.y);
                gustGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
                gustGrad.addColorStop(0.5, isNight ? `rgba(186, 230, 253, ${gust.alpha})` : `rgba(224, 242, 254, ${gust.alpha * 1.2})`);
                gustGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

                ctx.fillStyle = gustGrad;
                ctx.beginPath();
                ctx.ellipse(gust.x + gust.length / 2, gust.y, gust.length / 2, gust.height / 2, -0.12, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();
        }

        // 2. Draw Angled Raindrops
        ctx.save();
        const strokeColor = isNight
            ? (isHeavy ? 'rgba(224, 242, 254, 0.65)' : 'rgba(186, 230, 253, 0.48)')
            : (isHeavy ? 'rgba(203, 213, 225, 0.62)' : 'rgba(148, 163, 184, 0.46)');

        ctx.strokeStyle = strokeColor;
        ctx.lineCap = 'round';

        for (let i = 0; i < len; i++) {
            const drop = this.rainDrops[i];
            drop.x += drop.slant;
            drop.y += drop.speed;

            // Ground impact collision & splash spawning
            if (drop.y > h - 18) {
                if (isHeavy && Math.random() < 0.35 && this.rainSplashes.length < 80) {
                    const splashCount = Math.floor(Math.random() * 3) + 2;
                    for (let s = 0; s < splashCount; s++) {
                        this.rainSplashes.push({
                            x: drop.x,
                            y: h - Math.random() * 10,
                            vx: (Math.random() - 0.5) * 4.2 + drop.slant * 0.18,
                            vy: -(Math.random() * 3.5 + 2.0),
                            radius: Math.random() * 1.3 + 0.8,
                            alpha: 0.75,
                            decay: Math.random() * 0.05 + 0.04
                        });
                    }
                }

                // Recycle drop to top with slant offset
                drop.y = -drop.length - Math.random() * 25;
                drop.x = Math.random() * (w + Math.abs(drop.slant) * 2 + 200) - 100;
            }

            ctx.lineWidth = drop.thickness || 1.6;
            ctx.beginPath();
            ctx.moveTo(drop.x, drop.y);
            ctx.lineTo(drop.x + drop.slant, drop.y + drop.length);
            ctx.stroke();
        }
        ctx.restore();

        // 3. Draw Ground Impact Splashes
        if (this.rainSplashes.length > 0) {
            ctx.save();
            ctx.fillStyle = isNight ? 'rgba(224, 242, 254, 0.75)' : 'rgba(241, 245, 249, 0.72)';

            for (let i = this.rainSplashes.length - 1; i >= 0; i--) {
                const sp = this.rainSplashes[i];
                sp.x += sp.vx;
                sp.y += sp.vy;
                sp.vy += 0.32; // gravity pulling splash downward
                sp.alpha -= sp.decay;

                if (sp.alpha <= 0 || sp.y > h + 5) {
                    this.rainSplashes.splice(i, 1);
                    continue;
                }

                ctx.globalAlpha = Math.max(0, sp.alpha);
                ctx.beginPath();
                ctx.arc(sp.x, sp.y, sp.radius, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();
        }
    },

    /**
     * Draw Drifting Snowflakes (Batched Single-Pass GPU Rendering)
     */
    drawSnow() {
        const ctx = this.ctx;
        const len = this.snowFlakes.length;
        if (len === 0) return;

        const w = this.width;
        const h = this.height;

        ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
        ctx.beginPath();

        for (let i = 0; i < len; i++) {
            const flake = this.snowFlakes[i];
            flake.wobblePhase += flake.wobbleSpeed;
            flake.y += flake.speed;
            flake.x += flake.wind + Math.sin(flake.wobblePhase) * 0.5;

            if (flake.y > h + 10) {
                flake.y = -10;
                flake.x = Math.random() * w;
            }
            if (flake.x > w + 10) flake.x = -10;
            if (flake.x < -10) flake.x = w + 10;

            ctx.moveTo(flake.x + flake.radius, flake.y);
            ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        }

        ctx.fill();
    },

    /**
     * Thunderstorm Lightning Logic & Overlay Flash
     */
    updateLightning() {
        this.lightningTimer++;

        // Random lightning strike every ~140 to ~260 frames (every 2.5 - 4.5 seconds)
        if ((this.lightningTimer > 150 && Math.random() < 0.02) || this.lightningTimer > 280) {
            this.lightningTimer = 0;
            this.createLightningStrike();
        }

        // Update active bolt lifespans
        for (let i = this.activeBolts.length - 1; i >= 0; i--) {
            const bolt = this.activeBolts[i];
            bolt.life -= bolt.decay;
            if (bolt.life <= 0) {
                this.activeBolts.splice(i, 1);
            }
        }

        // Fade lightning flash overlay
        if (this.lightningFlashOpacity > 0) {
            this.lightningFlashOpacity = Math.max(0, this.lightningFlashOpacity - 0.06);
            if (this.lightningOverlay) {
                this.lightningOverlay.style.opacity = this.lightningFlashOpacity.toString();
            }
            if (this.container && this.lightningFlashOpacity <= 0.05) {
                this.container.classList.remove('lightning-active');
            }
        }
    },

    /**
     * Generate and trigger a realistic branching lightning strike
     */
    createLightningStrike() {
        const w = this.width;
        const h = this.height;

        // Strike starts from the cloud base (upper 15%) and targets ground/lower atmosphere
        const startX = Math.random() * (w * 0.7) + w * 0.15;
        const startY = Math.random() * 40 + 15;
        const targetX = startX + (Math.random() - 0.5) * (w * 0.35) - 35; // wind slant influence
        const targetY = h * (Math.random() * 0.35 + 0.65);

        const segments = [];
        this.generateBoltSegments(startX, startY, targetX, targetY, 3.2, 0, segments);

        const bolt = {
            segments: segments,
            life: 1.0,
            decay: 0.07,
            glowColor: '#60a5fa'
        };

        this.activeBolts.push(bolt);

        // Flash sky and clouds
        this.triggerAtmosphericFlash(0.95);

        // 55% chance of an immediate secondary return stroke (~60-90ms later)
        if (Math.random() < 0.55) {
            setTimeout(() => {
                if (this.state.condition !== 'thunderstorm') return;
                const reSegments = [];
                this.generateBoltSegments(startX + (Math.random() - 0.5) * 25, startY, targetX + (Math.random() - 0.5) * 35, targetY, 2.4, 0, reSegments);
                this.activeBolts.push({
                    segments: reSegments,
                    life: 0.85,
                    decay: 0.09,
                    glowColor: '#93c5fd'
                });
                this.triggerAtmosphericFlash(0.72);
            }, Math.random() * 40 + 60);
        }
    },

    /**
     * Procedural recursive branching jagged lightning path generator
     */
    generateBoltSegments(x1, y1, x2, y2, width, depth, segments) {
        const dx = x2 - x1;
        const dy = y2 - y1;
        const distance = Math.hypot(dx, dy);

        // Segment step size: ~20-28px
        const steps = Math.max(3, Math.floor(distance / (Math.random() * 8 + 20)));
        let curX = x1;
        let curY = y1;

        for (let i = 1; i <= steps; i++) {
            const progress = i / steps;
            const baseX = x1 + dx * progress;
            const baseY = y1 + dy * progress;
            const jitter = (1.0 - progress * 0.25) * (Math.random() - 0.5) * 36;

            const nextX = i === steps ? x2 : baseX + jitter;
            const nextY = i === steps ? y2 : baseY + (Math.random() - 0.5) * 8;

            segments.push({
                x1: curX,
                y1: curY,
                x2: nextX,
                y2: nextY,
                width: Math.max(0.8, width * (1.0 - progress * 0.35))
            });

            // Fork / Branching chance (22% per step if depth < 2)
            if (depth < 2 && Math.random() < 0.22 && i > 1 && i < steps - 1) {
                const branchAngle = (Math.random() * 0.6 + 0.35) * (Math.random() > 0.5 ? 1 : -1);
                const branchLen = distance * (Math.random() * 0.28 + 0.16);
                const branchEndX = curX + Math.cos(branchAngle) * branchLen + dx * 0.2;
                const branchEndY = curY + Math.sin(branchAngle) * branchLen + dy * 0.35;

                this.generateBoltSegments(curX, curY, branchEndX, branchEndY, width * 0.55, depth + 1, segments);
            }

            curX = nextX;
            curY = nextY;
        }
    },

    /**
     * Trigger synchronized atmospheric flash and cloud illumination
     */
    triggerAtmosphericFlash(maxAlpha = 0.95) {
        this.lightningFlashOpacity = maxAlpha;
        if (this.lightningOverlay) {
            this.lightningOverlay.style.opacity = maxAlpha.toString();
        }
        if (this.container) {
            this.container.classList.add('lightning-active');
        }
    },

    /**
     * Draw Realistic Branching Lightning on Canvas
     */
    drawLightning() {
        const ctx = this.ctx;
        const count = this.activeBolts.length;
        if (count === 0) return;

        ctx.save();

        for (let b = 0; b < count; b++) {
            const bolt = this.activeBolts[b];
            const alpha = Math.max(0, Math.min(1.0, bolt.life));
            const segs = bolt.segments;
            const segCount = segs.length;

            // Layer 1: Outer electric bloom & ionization envelope
            ctx.save();
            ctx.strokeStyle = `rgba(147, 197, 253, ${alpha * 0.55})`;
            ctx.shadowColor = bolt.glowColor;
            ctx.shadowBlur = 24;
            ctx.lineCap = 'round';
            ctx.beginPath();
            for (let i = 0; i < segCount; i++) {
                const s = segs[i];
                ctx.moveTo(s.x1, s.y1);
                ctx.lineTo(s.x2, s.y2);
            }
            ctx.lineWidth = 6.5;
            ctx.stroke();
            ctx.restore();

            // Layer 2: Vivid electric blue/purple body
            ctx.save();
            ctx.strokeStyle = `rgba(191, 219, 254, ${alpha * 0.88})`;
            ctx.shadowColor = '#93c5fd';
            ctx.shadowBlur = 12;
            ctx.lineCap = 'round';
            ctx.beginPath();
            for (let i = 0; i < segCount; i++) {
                const s = segs[i];
                ctx.moveTo(s.x1, s.y1);
                ctx.lineTo(s.x2, s.y2);
            }
            ctx.lineWidth = 3.2;
            ctx.stroke();
            ctx.restore();

            // Layer 3: Blinding white-hot core strike channel
            ctx.save();
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.98})`;
            ctx.shadowColor = '#ffffff';
            ctx.shadowBlur = 6;
            ctx.lineCap = 'round';
            ctx.beginPath();
            for (let i = 0; i < segCount; i++) {
                const s = segs[i];
                ctx.moveTo(s.x1, s.y1);
                ctx.lineTo(s.x2, s.y2);
            }
            ctx.lineWidth = 1.5;
            ctx.stroke();
            ctx.restore();
        }

        ctx.restore();
    }
};

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    SkyAtmosphere.init();
});

window.SkyAtmosphere = SkyAtmosphere;
