<?php
class Router {
    private static $routes = [
        '' => ['section' => 'home', 'subsection' => null],
        'explore' => ['section' => 'explore', 'subsection' => null],
        'trash' => ['section' => 'trash', 'subsection' => null],
        'settings' => ['section' => 'settings', 'subsection' => 'accessibility'],
        'settings/accessibility' => ['section' => 'settings', 'subsection' => 'accessibility'],
        'settings/about' => ['section' => 'settings', 'subsection' => 'about'],
        'help' => ['section' => 'help', 'subsection' => 'privacy-policy'],
        'help/privacy-policy' => ['section' => 'help', 'subsection' => 'privacy-policy'],
        'help/terms' => ['section' => 'help', 'subsection' => 'terms'],
        'help/cookies' => ['section' => 'help', 'subsection' => 'cookies'],
        'help/feedback' => ['section' => 'help', 'subsection' => 'feedback'],
    ];

    public static function getCurrentRoute() {
        $requestUri = urldecode($_SERVER['REQUEST_URI']);
        $scriptName = $_SERVER['SCRIPT_NAME'];
        $basePath = dirname($scriptName);

        if (strpos($requestUri, $basePath) === 0) {
            $requestUri = substr($requestUri, strlen($basePath));
        }

        $path = trim(parse_url($requestUri, PHP_URL_PATH), '/');
        return $path;
    }

    public static function getRouteConfig($path = null) {
        if ($path === null) {
            $path = self::getCurrentRoute();
        }

        if (array_key_exists($path, self::$routes)) {
            return self::$routes[$path];
        }

        return null;
    }
}

$currentPath = Router::getCurrentRoute();
$routeConfig = Router::getRouteConfig($currentPath);

if ($routeConfig === null) {
    // You can handle 404 here if you want
    $routeConfig = ['section' => 'home', 'subsection' => null];
}

$CURRENT_SECTION = $routeConfig['section'];
$CURRENT_SUBSECTION = $routeConfig['subsection'];
?>