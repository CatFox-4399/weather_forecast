<?php
/**
 * SkySoft Weather - History & Favorites API
 * Supports search history tracking and favorites management via MySQL PDO.
 * Gracefully degrades if MySQL is unavailable.
 */

require_once dirname(__DIR__) . '/includes/config.php';
require_once dirname(__DIR__) . '/includes/db.php';

try {
    $pdo = Database::getConnection();
    $dbAvailable = ($pdo !== null);

    $method = $_SERVER['REQUEST_METHOD'];
    $action = isset($_GET['action']) ? sanitizeInput($_GET['action']) : '';

    // If database is not available, return graceful fallback response
    if (!$dbAvailable) {
        jsonResponse([
            'success' => false,
            'db_available' => false,
            'message' => 'Database storage is temporarily offline. Falling back to local storage.',
            'data' => []
        ]);
    }

    // Read JSON payload for POST/DELETE requests if applicable
    $rawInput = file_get_contents('php://input');
    $payload = [];
    if (!empty($rawInput)) {
        $decoded = json_decode($rawInput, true);
        if (is_array($decoded)) {
            $payload = $decoded;
        }
    }

    // 1. SEARCH HISTORY - GET
    if ($action === 'history' && $method === 'GET') {
        $stmt = $pdo->prepare('SELECT id, city, country, country_code, latitude, longitude, searched_at FROM search_history ORDER BY searched_at DESC LIMIT 10');
        $stmt->execute();
        $rows = $stmt->fetchAll();

        jsonResponse([
            'success' => true,
            'db_available' => true,
            'data' => $rows
        ]);
    }

    // 2. SEARCH HISTORY - RECORD (POST)
    if ($action === 'history' && $method === 'POST') {
        $city = sanitizeInput($payload['city'] ?? ($_POST['city'] ?? ''));
        $country = sanitizeInput($payload['country'] ?? ($_POST['country'] ?? ''));
        $countryCode = sanitizeInput($payload['country_code'] ?? ($_POST['country_code'] ?? ''));
        $lat = filter_var($payload['latitude'] ?? ($_POST['latitude'] ?? null), FILTER_VALIDATE_FLOAT);
        $lon = filter_var($payload['longitude'] ?? ($_POST['longitude'] ?? null), FILTER_VALIDATE_FLOAT);

        if (empty($city) || $lat === null || $lon === null) {
            jsonResponse(['success' => false, 'message' => 'Invalid history parameters.'], 400);
        }

        // Avoid immediately duplicate consecutive search entry
        $checkStmt = $pdo->prepare('SELECT id FROM search_history WHERE city = :city AND country = :country ORDER BY searched_at DESC LIMIT 1');
        $checkStmt->execute([':city' => $city, ':country' => $country]);
        $latest = $checkStmt->fetch();

        if ($latest) {
            // Update timestamp of recent search
            $upStmt = $pdo->prepare('UPDATE search_history SET searched_at = NOW(), latitude = :lat, longitude = :lon, country_code = :cc WHERE id = :id');
            $upStmt->execute([':lat' => $lat, ':lon' => $lon, ':cc' => $countryCode, ':id' => $latest['id']]);
        } else {
            $insStmt = $pdo->prepare('INSERT INTO search_history (city, country, country_code, latitude, longitude, searched_at) VALUES (:city, :country, :cc, :lat, :lon, NOW())');
            $insStmt->execute([
                ':city' => $city,
                ':country' => $country,
                ':cc' => $countryCode,
                ':lat' => $lat,
                ':lon' => $lon
            ]);
        }

        jsonResponse([
            'success' => true,
            'db_available' => true,
            'message' => 'Search recorded.'
        ]);
    }

    // 3. SEARCH HISTORY - CLEAR (DELETE or POST clear)
    if (($action === 'clear_history') || ($action === 'history' && $method === 'DELETE')) {
        $pdo->exec('DELETE FROM search_history');
        jsonResponse([
            'success' => true,
            'db_available' => true,
            'message' => 'Search history cleared.'
        ]);
    }

    // 4. FAVORITES - GET
    if ($action === 'favorites' && $method === 'GET') {
        $stmt = $pdo->prepare('SELECT id, city, country, country_code, latitude, longitude, created_at FROM favorites ORDER BY created_at DESC');
        $stmt->execute();
        $rows = $stmt->fetchAll();

        jsonResponse([
            'success' => true,
            'db_available' => true,
            'data' => $rows
        ]);
    }

    // 5. FAVORITES - ADD (POST)
    if ($action === 'favorite' && $method === 'POST') {
        $city = sanitizeInput($payload['city'] ?? ($_POST['city'] ?? ''));
        $country = sanitizeInput($payload['country'] ?? ($_POST['country'] ?? ''));
        $countryCode = sanitizeInput($payload['country_code'] ?? ($_POST['country_code'] ?? ''));
        $lat = filter_var($payload['latitude'] ?? ($_POST['latitude'] ?? null), FILTER_VALIDATE_FLOAT);
        $lon = filter_var($payload['longitude'] ?? ($_POST['longitude'] ?? null), FILTER_VALIDATE_FLOAT);

        if (empty($city) || $lat === null || $lon === null) {
            jsonResponse(['success' => false, 'message' => 'Invalid favorite parameters.'], 400);
        }

        // Check if already in favorites
        $chk = $pdo->prepare('SELECT id FROM favorites WHERE city = :city AND country = :country LIMIT 1');
        $chk->execute([':city' => $city, ':country' => $country]);
        $existing = $chk->fetch();

        if ($existing) {
            jsonResponse([
                'success' => true,
                'db_available' => true,
                'is_favorite' => true,
                'message' => 'City is already in favorites.',
                'id' => (int)$existing['id']
            ]);
        }

        $ins = $pdo->prepare('INSERT INTO favorites (city, country, country_code, latitude, longitude, created_at) VALUES (:city, :country, :cc, :lat, :lon, NOW())');
        $ins->execute([
            ':city' => $city,
            ':country' => $country,
            ':cc' => $countryCode,
            ':lat' => $lat,
            ':lon' => $lon
        ]);
        $newId = (int)$pdo->lastInsertId();

        jsonResponse([
            'success' => true,
            'db_available' => true,
            'is_favorite' => true,
            'message' => 'City added to favorites.',
            'id' => $newId
        ]);
    }

    // 6. FAVORITES - REMOVE (DELETE or POST remove)
    if (($action === 'favorite' && $method === 'DELETE') || ($action === 'remove_favorite')) {
        $id = filter_var($_GET['id'] ?? ($payload['id'] ?? null), FILTER_VALIDATE_INT);
        $city = sanitizeInput($_GET['city'] ?? ($payload['city'] ?? ''));
        $country = sanitizeInput($_GET['country'] ?? ($payload['country'] ?? ''));

        if ($id) {
            $del = $pdo->prepare('DELETE FROM favorites WHERE id = :id');
            $del->execute([':id' => $id]);
        } elseif (!empty($city)) {
            $del = $pdo->prepare('DELETE FROM favorites WHERE city = :city AND country = :country');
            $del->execute([':city' => $city, ':country' => $country]);
        } else {
            jsonResponse(['success' => false, 'message' => 'Missing ID or city to remove.'], 400);
        }

        jsonResponse([
            'success' => true,
            'db_available' => true,
            'is_favorite' => false,
            'message' => 'City removed from favorites.'
        ]);
    }

    // 7. FAVORITES - TOGGLE CONVENIENCE (POST)
    if ($action === 'toggle_favorite' && $method === 'POST') {
        $city = sanitizeInput($payload['city'] ?? ($_POST['city'] ?? ''));
        $country = sanitizeInput($payload['country'] ?? ($_POST['country'] ?? ''));
        $countryCode = sanitizeInput($payload['country_code'] ?? ($_POST['country_code'] ?? ''));
        $lat = filter_var($payload['latitude'] ?? ($_POST['latitude'] ?? null), FILTER_VALIDATE_FLOAT);
        $lon = filter_var($payload['longitude'] ?? ($_POST['longitude'] ?? null), FILTER_VALIDATE_FLOAT);

        if (empty($city) || $lat === null || $lon === null) {
            jsonResponse(['success' => false, 'message' => 'Invalid parameters.'], 400);
        }

        $chk = $pdo->prepare('SELECT id FROM favorites WHERE city = :city AND country = :country LIMIT 1');
        $chk->execute([':city' => $city, ':country' => $country]);
        $existing = $chk->fetch();

        if ($existing) {
            $del = $pdo->prepare('DELETE FROM favorites WHERE id = :id');
            $del->execute([':id' => $existing['id']]);
            jsonResponse([
                'success' => true,
                'db_available' => true,
                'is_favorite' => false,
                'message' => 'Removed from favorites.'
            ]);
        } else {
            $ins = $pdo->prepare('INSERT INTO favorites (city, country, country_code, latitude, longitude, created_at) VALUES (:city, :country, :cc, :lat, :lon, NOW())');
            $ins->execute([
                ':city' => $city,
                ':country' => $country,
                ':cc' => $countryCode,
                ':lat' => $lat,
                ':lon' => $lon
            ]);
            jsonResponse([
                'success' => true,
                'db_available' => true,
                'is_favorite' => true,
                'message' => 'Added to favorites.'
            ]);
        }
    }

    // Default unknown action
    jsonResponse(['success' => false, 'message' => 'Invalid API action.'], 400);
} catch (Throwable $e) {
    error_log('Error in api/history.php: ' . $e->getMessage());
    jsonResponse([
        'success' => false,
        'message' => 'An error occurred while managing history/favorites.'
    ], 500);
}
