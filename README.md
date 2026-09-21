# SkySoft Weather — Weather Forecast Website

**SkySoft Weather** is a modern, responsive, simple, and elegant weather forecast web application built using native **PHP 8+**, **MySQL**, **HTML5**, **CSS3**, **Vanilla JavaScript**, and the live **Open-Meteo API**.

The application delivers real-time weather forecasts, a 24-hour horizontal hourly forecast scroller, a 7-day extended outlook, a worldwide Country A–Z directory featuring 197 sovereign nations, city search autocomplete, MySQL-backed favorites and search history, and full internationalization (4 languages: English, Malay, Chinese, Japanese) with an interactive User Manual.

---

## Key Features

1. **Global City Search & Autocomplete**:
   - Fast, debounced city search querying the Open-Meteo Geocoding API.
   - Live suggestion dropdown showing city name, administrative region, country, and country code.
   - Pre-configured popular quick-access chips (Kuala Lumpur, Penang, Singapore, Tokyo, London, New York).

2. **Current Live Weather (Hero Card)**:
   - Real-time weather data powered by Open-Meteo (zero mock or fake data).
   - City name, country, and country code flag.
   - Synchronized live clock and date formatted to the selected city's exact local timezone.
   - Current temperature (°C) and feels-like temperature.
   - Weather condition description and custom vector SVG weather icons.
   - Essential metrics: Humidity (%), Wind Speed (km/h) & 16-point Compass Direction, Surface Pressure (hPa), and Sunrise & Sunset times.
   - Subtle dynamic background gradients adapting to day/night and atmospheric conditions.

3. **24-Hour Hourly Forecast**:
   - Real-time hourly predictions for the next 24 hours starting from the current local hour.
   - Displays hour, weather icon, temperature, and condition.
   - Horizontally scrollable track on desktop and touch-enabled on mobile devices.

4. **7-Day Weather Outlook**:
   - 7-day weather forecast displaying relative weekday names ("Today", "Tomorrow", weekday), date, condition icon, description, and high/low temperature ranges.

5. **Country A–Z Directory (197 Nations)**:
   - Interactive alphabet ribbon (`A B C D ... Z`).
   - Filter and explore ~197 sovereign countries stored in `assets/data/countries.json`.
   - Clicking any country card immediately fetches and displays live weather for its capital city.

6. **Favorites System**:
   - One-click heart toggle on the hero card to add or remove favorite cities.
   - Slide-in favorites drawer displaying all saved locations with direct launch and remove actions.
   - Persisted in MySQL database via PDO with prepared statements.
   - **Graceful degradation**: If MySQL is offline, the website automatically falls back to browser `localStorage` without errors or disruptions.

7. **Search History**:
   - Automatically tracks recently searched cities in MySQL.
   - Slide-in history drawer with quick city re-loading and a "Clear All" option.

8. **Multilingual Localization (4 Languages)**:
   - **English (EN)**
   - **Bahasa Melayu (MS)**
   - **简体中文 (ZH)**
   - **日本語 (JA)**
   - Translates all website text, WMO weather codes, compass bearings, calendar labels, and the User Manual.
   - User language preference is remembered via `localStorage`.

9. **Interactive User Manual**:
   - Modal guide detailing:
     - How to search for a city
     - How to interpret weather metrics
     - How to use Country A–Z
     - How to manage Favorites & History
     - How to switch languages
   - Supports keyboard `ESC` key to close, close buttons, and backdrop click.

10. **Progressive Web App (PWA) & Offline Support**:
    - Web App Manifest (`manifest.json`) with standalone display mode, theme colors, and custom maskable app icons.
    - Service Worker (`sw.js`) implementing pre-caching of the application shell and network-first weather synchronization with offline fallback.
    - Native install prompt support on Desktop (Google Chrome, Microsoft Edge) and Mobile (Android, iOS "Add to Home Screen").
    - Install button integrated into the top navigation bar.

11. **Performance & File Caching**:
    - Weather forecast responses cached on the server for **5 minutes**.
    - Geocoding search queries cached for **30 minutes**.
    - Protects external API quotas and ensures instant response times.

---

## Technology Stack

- **Backend**: Native PHP 8+ (No frameworks, pure standard library)
- **Database**: MySQL / MariaDB (PDO with prepared statements)
- **Frontend Structure**: Semantic HTML5
- **Styling**: Vanilla CSS3 (Custom properties, Flexbox, CSS Grid, Glassmorphism, Responsive design — no Bootstrap, no Tailwind)
- **Scripting**: Vanilla JavaScript ES6+ (Fetch API, DOM manipulation, Intl API — no jQuery, no React/Vue)
- **Weather Provider**: [Open-Meteo Weather API](https://open-meteo.com/) (Free, reliable, no API key required)

---

## Folder Structure

```text
weatherforecast/
│
├── index.php                 # Main responsive application interface
│
├── includes/
│   ├── config.php            # Database credentials, cache TTLs, helper functions
│   ├── db.php                # PDO connection with auto-table setup & fallback
│   ├── footer.php            # Semantic footer with Open-Meteo attribution
│   └── manual.php            # User manual modal component markup
│
├── api/
│   ├── countries.php         # Country A-Z data provider & alphabet filtering
│   ├── search.php            # City geocoding search API (30-minute cache)
│   ├── weather.php           # Current, hourly & 7-day forecast API (5-minute cache)
│   └── history.php           # Search history & favorites management endpoint
│
├── assets/
│   ├── css/
│   │   └── style.css         # Modern soft design system (responsive CSS3)
│   │
│   ├── js/
│   │   ├── app.js            # Main application controller
│   │   ├── i18n.js           # 4-Language translation dictionary & WMO codes
│   │   └── manual.js         # User manual modal controller (ESC handler)
│   │
│   └── data/
│       └── countries.json    # Complete dataset of 197 countries with capitals & coords
│
├── cache/
│   └── .gitkeep              # File-based cache storage directory
│
├── sql/
│   └── schema.sql            # Database schema for weather_forecast
│
├── README.md                 # Setup guide and documentation
└── .gitignore                # Git ignore rules
```

---

## Installation & Setup on XAMPP

### 1. Place the Project in XAMPP
Ensure the project is located inside your XAMPP `htdocs` directory:
```text
C:\xampp\htdocs\weatherforecast
# or
D:\xampp\htdocs\weatherforecast
```

### 2. Start XAMPP Services
1. Open the **XAMPP Control Panel**.
2. Start **Apache**.
3. Start **MySQL**.

### 3. Setup the Database
1. Open your browser and navigate to **phpMyAdmin**:
   ```text
   http://localhost/phpmyadmin/
   ```
2. Click **Import** in the top menu.
3. Choose the SQL schema file:
   ```text
   sql/schema.sql
   ```
4. Click **Import** at the bottom.

*Alternatively, run via MySQL command line:*
```bash
mysql -u root -p < sql/schema.sql
```

The schema automatically creates:
- Database: `weather_forecast`
- Table: `search_history` (id, city, country, country_code, latitude, longitude, searched_at)
- Table: `favorites` (id, city, country, country_code, latitude, longitude, created_at)

> **Note**: `includes/db.php` also contains an auto-initialization fallback: if the database or tables do not exist when the app connects, it creates them automatically.

### 4. Database Configuration (Optional)
If your MySQL root password is not blank or you use custom ports, configure `includes/config.php`:
```php
define('DB_HOST', '127.0.0.1');
define('DB_PORT', '3306');
define('DB_NAME', 'weather_forecast');
define('DB_USER', 'root');
define('DB_PASS', '');
```

---

## Running the Website

Open your web browser and visit:
```text
http://localhost/weatherforecast/
```
*(or `http://localhost/skysoft-weather/` depending on your folder name)*

You can also run it using PHP's built-in server during development:
```bash
cd /d D:\xampp\htdocs\weatherforecast
php -S 127.0.0.1:8000
```
Then open `http://127.0.0.1:8000/`.

---

## API Endpoints Reference

All frontend modules communicate with the backend via JSON APIs:

| Endpoint | Method | Parameters | Description |
| :--- | :--- | :--- | :--- |
| `api/search.php` | GET | `q=CityName` | Autocompletes city search with 30-min cache |
| `api/weather.php` | GET | `lat=..&lon=..&city=..&country=..` | Fetches live weather, 24h hourly, 7-day daily forecast (5-min cache) |
| `api/countries.php` | GET | `letter=A` (optional) | Returns sovereign countries filtered by first letter |
| `api/history.php` | GET | `action=history` | Retrieves recent 10 search history entries |
| `api/history.php` | POST | `action=history` | Records a new city search entry |
| `api/history.php` | GET | `action=favorites` | Retrieves list of all saved favorite cities |
| `api/history.php` | POST | `action=favorite` | Adds a city to favorites |
| `api/history.php` | POST | `action=toggle_favorite`| Toggles a city favorite status |
| `api/history.php` | DELETE | `action=favorite&id=..` | Removes a city from favorites |
| `api/history.php` | DELETE | `action=clear_history` | Clears all recorded search history |

---

## Troubleshooting

1. **Weather data is not loading / shows error banner**:
   - Check your internet connection. SkySoft Weather connects to Open-Meteo at `api.open-meteo.com`.
   - Check PHP cURL extension: ensure `extension=curl` is enabled in your `php.ini`.
   - Inspect PHP error logs (`D:\xampp\apache\logs\error.log` or `error_log`).

2. **Database connection failed / MySQL is stopped**:
   - The application is built with **graceful degradation**. If MySQL is unavailable, the weather forecast will continue to work seamlessly, and favorites/history will automatically use browser `localStorage`.
   - Start MySQL from the XAMPP Control Panel.

3. **Cache permissions**:
   - Ensure PHP has write permissions to the `cache/` directory.

---

## License & Credits

- Developed for **SkySoft Weather**.
- Real-time meteorological data provided by [Open-Meteo](https://open-meteo.com/).
- Clean and modern open-source design for educational and commercial use.
