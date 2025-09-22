<?php
class Router {
    private static $routes = [
        '' => ['view' => 'main', 'section' => 'home'],
        'trends' => ['view' => 'main', 'section' => 'trends'],
        'favorites' => ['view' => 'main', 'section' => 'favorites'],
        'login' => ['view' => 'main', 'section' => 'login'],
        'register' => ['view' => 'main', 'section' => 'register'],
        'settings/accessibility' => ['view' => 'settings', 'section' => 'accessibility'],
        'settings/history-privacy' => ['view' => 'settings', 'section' => 'historyPrivacy'],
        'settings/history' => ['view' => 'settings', 'section' => 'history'],
        'help/privacy-policy' => ['view' => 'help', 'section' => 'privacyPolicy'],
        'help/terms-conditions' => ['view' => 'help', 'section' => 'termsConditions'],
        'help/cookie-policy' => ['view' => 'help', 'section' => 'cookiePolicy'],
        'help/send-feedback' => ['view' => 'help', 'section' => 'sendFeedback'],
        'admin/users' => ['view' => 'admin', 'section' => 'manageUsers', 'requires_auth' => 'administrator'],
        'admin/galleries' => ['view' => 'admin', 'section' => 'manageGalleries', 'requires_auth' => 'administrator']
    ];

    public static function getRouteConfig($path) {
        if (array_key_exists($path, self::$routes)) {
            $route = self::$routes[$path];
            if (isset($route['requires_auth'])) {
                if (!isset($_SESSION['user_role']) || $_SESSION['user_role'] !== $route['requires_auth']) {
                    return null; // No autorizado
                }
            }
            return $route;
        }

        if (preg_match('/^gallery\/[a-f0-9-]{36}\/photo\/\d+$/', $path)) {
            return ['view' => 'main', 'section' => 'photoView'];
        }

        if (preg_match('/^gallery\/[a-f0-9-]{36}$/', $path)) {
            return ['view' => 'main', 'section' => 'galleryPhotos'];
        }

        if (preg_match('/^favorites\/[a-f0-9-]{36}$/', $path)) {
            return ['view' => 'main', 'section' => 'userSpecificFavorites'];
        }
        
        if (preg_match('/^gallery\/[a-f0-9-]{36}\/access-code$/', $path)) {
            return ['view' => 'main', 'section' => 'accessCodePrompt'];
        }

        return null;
    }

    public static function getCurrentPath() {
        $basePath = dirname($_SERVER['SCRIPT_NAME']);
        $requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        
        if ($basePath !== '/' && strpos($requestUri, $basePath) === 0) {
            $path = substr($requestUri, strlen($basePath));
        } else {
            $path = $requestUri;
        }
        
        return trim($path, '/');
    }
}

$currentPath = Router::getCurrentPath();
$routeConfig = Router::getRouteConfig($currentPath);

if ($routeConfig === null) {
    $routeConfig = ['view' => 'main', 'section' => '404'];
}

$CURRENT_VIEW = $routeConfig['view'];
$CURRENT_SECTION = $routeConfig['section'];
?>