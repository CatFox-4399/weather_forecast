<?php
/**
 * SkySoft Weather - Weather API
 * Fetches current, hourly (24h), and 7-day forecast from Open-Meteo API.
 * Caches responses for 5 minutes.
 */

require_once dirname(__DIR__) . '/includes/config.php';

try {
    $lat = isset($_GET['lat']) ? filter_var($_GET['lat'], FILTER_VALIDATE_FLOAT) : null;
    $lon = isset($_GET['lon']) ? filter_var($_GET['lon'], FILTER_VALIDATE_FLOAT) : null;
    $cityName = isset($_GET['city']) ? sanitizeInput($_GET['city']) : 'Current Location';
    $countryName = isset($_GET['country']) ? sanitizeInput($_GET['country']) : '';
    $countryCode = isset($_GET['country_code']) ? sanitizeInput($_GET['country_code']) : '';

    if ($lat === null || $lon === null || $lat < -90 || $lat > 90 || $lon < -180 || $lon > 180) {
        jsonResponse([
            'success' => false,
            'message' => 'Invalid latitude or longitude provided.'
        ], 400);
    }

    $roundedLat = round($lat, 3);
    $roundedLon = round($lon, 3);
    $cacheKey = "weather_{$roundedLat}_{$roundedLon}";

    $cached = getCache($cacheKey, CACHE_TTL_WEATHER);
    if ($cached !== null) {
        // Ensure city & country overrides match the request if changed
        if (!empty($cityName) && $cityName !== 'Current Location') {
            $cached['location']['city'] = $cityName;
        }
        if (!empty($countryName)) {
            $cached['location']['country'] = $countryName;
        }
        if (!empty($countryCode)) {
            $cached['location']['country_code'] = $countryCode;
        }
        $cached['cached'] = true;
        jsonResponse($cached);
    }

    $params = [
        'latitude' => $lat,
        'longitude' => $lon,
        'current' => 'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,surface_pressure,wind_speed_10m,wind_direction_10m',
        'hourly' => 'temperature_2m,weather_code,is_day',
        'daily' => 'weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset',
        'timezone' => 'auto'
    ];

    $apiUrl = 'https://api.open-meteo.com/v1/forecast?' . http_build_query($params);

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $apiUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 8);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 4);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_USERAGENT, 'SkySoftWeather/1.0');

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlError = curl_error($ch);
    curl_close($ch);

    if ($response === false || $httpCode !== 200) {
        error_log("Open-Meteo API Error: HTTP {$httpCode}, cURL: {$curlError}, URL: {$apiUrl}");
        jsonResponse([
            'success' => false,
            'message' => 'Unable to load weather information. Please try again.'
        ], 502);
    }

    $raw = json_decode($response, true);
    if (!is_array($raw) || !isset($raw['current'])) {
        error_log("Invalid weather payload: " . substr($response, 0, 300));
        jsonResponse([
            'success' => false,
            'message' => 'Unable to load weather information. Please try again.'
        ], 502);
    }

    $timezone = $raw['timezone'] ?? 'UTC';
    $utcOffset = (int)($raw['utc_offset_seconds'] ?? 0);

    // Current weather data
    $current = $raw['current'];
    $currentTimeIso = $current['time'] ?? date('c');

    // Hourly Forecast (Extract next 24 hours starting from current hour)
    $hourlyData = [];
    if (isset($raw['hourly']['time']) && is_array($raw['hourly']['time'])) {
        $hourlyTimes = $raw['hourly']['time'];
        $hourlyTemps = $raw['hourly']['temperature_2m'] ?? [];
        $hourlyCodes = $raw['hourly']['weather_code'] ?? [];
        $hourlyIsDay = $raw['hourly']['is_day'] ?? [];

        // Find the index that matches or is closest after current time
        $startIndex = 0;
        $totalHours = count($hourlyTimes);
        for ($i = 0; $i < $totalHours; $i++) {
            if (strcmp($hourlyTimes[$i], $currentTimeIso) >= 0) {
                $startIndex = $i;
                break;
            }
        }

        for ($j = 0; $j < 24 && ($startIndex + $j) < $totalHours; $j++) {
            $idx = $startIndex + $j;
            $hourlyData[] = [
                'time' => $hourlyTimes[$idx],
                'temperature' => round((float)($hourlyTemps[$idx] ?? 0), 1),
                'weather_code' => (int)($hourlyCodes[$idx] ?? 0),
                'is_day' => (int)($hourlyIsDay[$idx] ?? 1)
            ];
        }
    }

    // Daily Forecast (7 Days)
    $dailyData = [];
    if (isset($raw['daily']['time']) && is_array($raw['daily']['time'])) {
        $dailyTimes = $raw['daily']['time'];
        $dailyCodes = $raw['daily']['weather_code'] ?? [];
        $dailyMax = $raw['daily']['temperature_2m_max'] ?? [];
        $dailyMin = $raw['daily']['temperature_2m_min'] ?? [];
        $dailySunrises = $raw['daily']['sunrise'] ?? [];
        $dailySunsets = $raw['daily']['sunset'] ?? [];

        $dayCount = min(7, count($dailyTimes));
        for ($k = 0; $k < $dayCount; $k++) {
            $dailyData[] = [
                'date' => $dailyTimes[$k],
                'weather_code' => (int)($dailyCodes[$k] ?? 0),
                'temp_max' => round((float)($dailyMax[$k] ?? 0), 1),
                'temp_min' => round((float)($dailyMin[$k] ?? 0), 1),
                'sunrise' => $dailySunrises[$k] ?? null,
                'sunset' => $dailySunsets[$k] ?? null
            ];
        }
    }

    // Wind direction helper
    $degrees = (float)($current['wind_direction_10m'] ?? 0);
    $compassPoints = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    $compassIndex = (int)round(($degrees % 360) / 22.5) % 16;
    $compassDirection = $compassPoints[$compassIndex];

    $todaySunrise = $dailyData[0]['sunrise'] ?? null;
    $todaySunset = $dailyData[0]['sunset'] ?? null;

    $result = [
        'success' => true,
        'cached' => false,
        'location' => [
            'city' => $cityName,
            'country' => $countryName,
            'country_code' => $countryCode,
            'latitude' => $lat,
            'longitude' => $lon,
            'timezone' => $timezone,
            'utc_offset_seconds' => $utcOffset
        ],
        'current' => [
            'time' => $currentTimeIso,
            'temperature' => round((float)($current['temperature_2m'] ?? 0), 1),
            'feels_like' => round((float)($current['apparent_temperature'] ?? 0), 1),
            'humidity' => (int)($current['relative_humidity_2m'] ?? 0),
            'weather_code' => (int)($current['weather_code'] ?? 0),
            'is_day' => (int)($current['is_day'] ?? 1),
            'precipitation' => (float)($current['precipitation'] ?? 0),
            'pressure' => round((float)($current['surface_pressure'] ?? 1013), 1),
            'wind_speed' => round((float)($current['wind_speed_10m'] ?? 0), 1),
            'wind_direction' => round($degrees, 0),
            'wind_compass' => $compassDirection,
            'sunrise' => $todaySunrise,
            'sunset' => $todaySunset
        ],
        'hourly' => $hourlyData,
        'daily' => $dailyData
    ];

    setCache($cacheKey, $result);
    jsonResponse($result);
} catch (Throwable $e) {
    error_log('Error in api/weather.php: ' . $e->getMessage());
    jsonResponse([
        'success' => false,
        'message' => 'Unable to load weather information. Please try again.'
    ], 500);
}
