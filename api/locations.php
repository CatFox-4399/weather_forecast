<?php
/**
 * SkySoft Weather - Hierarchical Locations API
 * Provides Country -> State / Province -> City drill-down data
 * powered by an indexed SQLite database with fallback support.
 */

require_once dirname(__DIR__) . '/includes/config.php';

try {
    $action = isset($_GET['action']) ? sanitizeInput($_GET['action']) : 'countries';
    $sqliteFile = dirname(__DIR__) . '/assets/data/locations.sqlite';

    // Verify SQLite database exists and is readable
    $hasDb = file_exists($sqliteFile) && extension_loaded('pdo_sqlite');
    $pdo = null;

    if ($hasDb) {
        $pdo = new PDO('sqlite:' . $sqliteFile);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    }

    switch ($action) {
        case 'countries':
            if ($pdo) {
                $stmt = $pdo->query('SELECT code, name, capital, latitude, longitude, emoji, state_count FROM countries ORDER BY name ASC');
                $rows = $stmt->fetchAll();
                jsonResponse([
                    'success' => true,
                    'count' => count($rows),
                    'data' => $rows
                ]);
            } else {
                // Fallback to countries.json
                $dataFile = dirname(__DIR__) . '/assets/data/countries.json';
                if (!file_exists($dataFile)) {
                    jsonResponse(['success' => false, 'message' => 'Countries data unavailable.', 'data' => []], 500);
                }
                $json = json_decode(file_get_contents($dataFile), true);
                jsonResponse(['success' => true, 'count' => count($json), 'data' => $json]);
            }
            break;

        case 'states':
            $country = isset($_GET['country']) ? strtoupper(sanitizeInput($_GET['country'])) : '';
            if (empty($country)) {
                jsonResponse(['success' => false, 'message' => 'Country code is required.', 'data' => []], 400);
            }

            if ($pdo) {
                $stmt = $pdo->prepare('SELECT id, country_code, name, state_code, latitude, longitude, city_count FROM states WHERE country_code = ? ORDER BY name ASC');
                $stmt->execute([$country]);
                $rows = $stmt->fetchAll();
                jsonResponse([
                    'success' => true,
                    'country_code' => $country,
                    'count' => count($rows),
                    'data' => $rows
                ]);
            } else {
                jsonResponse(['success' => true, 'country_code' => $country, 'count' => 0, 'data' => []]);
            }
            break;

        case 'cities':
            $stateId = isset($_GET['state_id']) ? (int)$_GET['state_id'] : 0;
            $stateName = isset($_GET['state_name']) ? sanitizeInput($_GET['state_name']) : '';
            $country = isset($_GET['country']) ? strtoupper(sanitizeInput($_GET['country'])) : '';

            if ($stateId <= 0 && empty($stateName) && empty($country)) {
                jsonResponse(['success' => false, 'message' => 'Valid state_id, state_name, or country code required.', 'data' => []], 400);
            }

            if ($pdo) {
                if ($stateId > 0) {
                    $stmt = $pdo->prepare('SELECT id, state_id, country_code, name, latitude, longitude FROM cities WHERE state_id = ? ORDER BY name ASC');
                    $stmt->execute([$stateId]);
                } elseif (!empty($stateName) && !empty($country)) {
                    // Look up state_id first
                    $stmtState = $pdo->prepare('SELECT id, name, latitude, longitude FROM states WHERE country_code = ? AND (name = ? OR name LIKE ?) LIMIT 1');
                    $stmtState->execute([$country, $stateName, "%$stateName%"]);
                    $foundState = $stmtState->fetch();
                    if ($foundState) {
                        $stateId = (int)$foundState['id'];
                        $stmt = $pdo->prepare('SELECT id, state_id, country_code, name, latitude, longitude FROM cities WHERE state_id = ? ORDER BY name ASC');
                        $stmt->execute([$stateId]);
                    } else {
                        $stmt = $pdo->prepare('SELECT id, state_id, country_code, name, latitude, longitude FROM cities WHERE country_code = ? AND name LIKE ? ORDER BY name ASC LIMIT 50');
                        $stmt->execute([$country, "%$stateName%"]);
                    }
                } else {
                    $stmt = $pdo->prepare('SELECT id, state_id, country_code, name, latitude, longitude FROM cities WHERE country_code = ? ORDER BY name ASC LIMIT 100');
                    $stmt->execute([$country]);
                }
                $rows = $stmt->fetchAll();

                // If no sub-cities exist for this state, provide the state itself as the destination city
                if (empty($rows) && $stateId > 0) {
                    $stmtSt = $pdo->prepare('SELECT id, name, country_code, latitude, longitude FROM states WHERE id = ? LIMIT 1');
                    $stmtSt->execute([$stateId]);
                    $st = $stmtSt->fetch();
                    if ($st) {
                        $rows = [[
                            'id' => $st['id'],
                            'state_id' => $st['id'],
                            'country_code' => $st['country_code'],
                            'name' => $st['name'],
                            'latitude' => $st['latitude'],
                            'longitude' => $st['longitude']
                        ]];
                    }
                }

                jsonResponse([
                    'success' => true,
                    'state_id' => $stateId,
                    'count' => count($rows),
                    'data' => $rows
                ]);
            } else {
                jsonResponse(['success' => true, 'state_id' => $stateId, 'count' => 0, 'data' => []]);
            }
            break;

        case 'country_info':
            $country = isset($_GET['country']) ? strtoupper(sanitizeInput($_GET['country'])) : '';
            if (empty($country)) {
                jsonResponse(['success' => false, 'message' => 'Country code is required.'], 400);
            }

            if ($pdo) {
                $stmt = $pdo->prepare('SELECT code, name, capital, latitude, longitude, emoji, state_count FROM countries WHERE code = ? LIMIT 1');
                $stmt->execute([$country]);
                $row = $stmt->fetch();
                if ($row) {
                    jsonResponse(['success' => true, 'data' => $row]);
                }
            }

            // Fallback to countries.json
            $dataFile = dirname(__DIR__) . '/assets/data/countries.json';
            if (file_exists($dataFile)) {
                $json = json_decode(file_get_contents($dataFile), true);
                foreach ($json as $item) {
                    if (strtoupper($item['code'] ?? '') === $country) {
                        jsonResponse([
                            'success' => true,
                            'data' => [
                                'code' => $item['code'],
                                'name' => $item['name'],
                                'capital' => $item['capital'],
                                'latitude' => $item['lat'],
                                'longitude' => $item['lon'],
                                'emoji' => '',
                                'state_count' => 0
                            ]
                        ]);
                    }
                }
            }

            jsonResponse(['success' => false, 'message' => 'Country not found.'], 404);
            break;

        default:
            jsonResponse(['success' => false, 'message' => 'Unknown action.'], 400);
            break;
    }

} catch (Throwable $e) {
    error_log('Error in api/locations.php: ' . $e->getMessage());
    jsonResponse(['success' => false, 'message' => 'An error occurred while loading location data.'], 500);
}
