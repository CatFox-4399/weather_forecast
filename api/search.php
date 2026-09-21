<?php
/**
 * SkySoft Weather - City Search API
 * Connects to Open-Meteo Geocoding API with 30-minute caching.
 */

require_once dirname(__DIR__) . '/includes/config.php';

try {
    $query = isset($_GET['q']) ? sanitizeInput($_GET['q']) : '';

    if (mb_strlen($query, 'UTF-8') < 2) {
        jsonResponse([
            'success' => true,
            'query' => $query,
            'results' => []
        ]);
    }

    $cacheKey = 'search_' . mb_strtolower($query, 'UTF-8');
    $cachedData = getCache($cacheKey, CACHE_TTL_SEARCH);
    if ($cachedData !== null) {
        jsonResponse([
            'success' => true,
            'cached' => true,
            'query' => $query,
            'results' => $cachedData
        ]);
    }

    $apiUrl = 'https://geocoding-api.open-meteo.com/v1/search?' . http_build_query([
        'name' => $query,
        'count' => 10,
        'language' => 'en',
        'format' => 'json'
    ]);

    // Use cURL for reliable request handling with timeout
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $apiUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 6);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 3);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_USERAGENT, 'SkySoftWeather/1.0');

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlError = curl_error($ch);
    curl_close($ch);

    if ($response === false || $httpCode !== 200) {
        error_log("Search API error for '{$query}': HTTP {$httpCode}, cURL: {$curlError}");
        jsonResponse([
            'success' => false,
            'message' => 'Unable to search cities. Please try again.',
            'results' => []
        ], 502);
    }

    $data = json_decode($response, true);
    $results = [];

    if (isset($data['results']) && is_array($data['results'])) {
        foreach ($data['results'] as $item) {
            $results[] = [
                'id' => (int)($item['id'] ?? 0),
                'name' => (string)($item['name'] ?? ''),
                'country' => (string)($item['country'] ?? ''),
                'country_code' => strtoupper((string)($item['country_code'] ?? '')),
                'admin1' => (string)($item['admin1'] ?? ''),
                'latitude' => (float)($item['latitude'] ?? 0),
                'longitude' => (float)($item['longitude'] ?? 0),
                'timezone' => (string)($item['timezone'] ?? 'UTC')
            ];
        }
    }

    // Cache the parsed results
    setCache($cacheKey, $results);

    jsonResponse([
        'success' => true,
        'cached' => false,
        'query' => $query,
        'results' => $results
    ]);
} catch (Throwable $e) {
    error_log('Error in api/search.php: ' . $e->getMessage());
    jsonResponse([
        'success' => false,
        'message' => 'Unable to search cities. Please try again.',
        'results' => []
    ], 500);
}
