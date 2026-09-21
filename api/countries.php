<?php
/**
 * SkySoft Weather - Countries API
 * Provides country list and A-Z filtering.
 */

require_once dirname(__DIR__) . '/includes/config.php';

try {
    $dataFile = dirname(__DIR__) . '/assets/data/countries.json';
    if (!file_exists($dataFile)) {
        error_log('countries.json file not found at: ' . $dataFile);
        jsonResponse(['success' => false, 'message' => 'Country data is currently unavailable.', 'data' => []], 500);
    }

    $jsonContent = @file_get_contents($dataFile);
    if ($jsonContent === false) {
        error_log('Failed to read countries.json');
        jsonResponse(['success' => false, 'message' => 'Unable to read country data.', 'data' => []], 500);
    }

    $countries = json_decode($jsonContent, true);
    if (!is_array($countries)) {
        error_log('Failed to decode countries.json');
        jsonResponse(['success' => false, 'message' => 'Invalid country data format.', 'data' => []], 500);
    }

    $letter = isset($_GET['letter']) ? strtoupper(trim(sanitizeInput($_GET['letter']))) : '';

    if ($letter !== '' && strlen($letter) === 1 && ctype_alpha($letter)) {
        $filtered = array_values(array_filter($countries, function ($item) use ($letter) {
            $firstChar = strtoupper(mb_substr($item['name'] ?? '', 0, 1, 'UTF-8'));
            return $firstChar === $letter;
        }));
        jsonResponse([
            'success' => true,
            'letter' => $letter,
            'count' => count($filtered),
            'data' => $filtered
        ]);
    }

    jsonResponse([
        'success' => true,
        'count' => count($countries),
        'data' => $countries
    ]);
} catch (Throwable $e) {
    error_log('Error in api/countries.php: ' . $e->getMessage());
    jsonResponse(['success' => false, 'message' => 'An error occurred while loading countries.', 'data' => []], 500);
}
