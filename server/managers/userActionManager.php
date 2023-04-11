<?php

include_once SYSTEM_PATH . "../repositories/userActionRepository.php";

class UserActionManager {
    private $userActions;

    public function __construct()
    {
        $this->userActions = new UserActionRepository();
    }

    public function registerUser($data) {
        return $this->userActions->registerUser($data);
    }

    public function loginUser($data) {
        $isLoggedIn = $this->isLoggedIn();
        if (isset($isLoggedIn)) {
            return $isLoggedIn;  
        }

        $login = new UserAction();
        $data = json_decode(file_get_contents("php://input"), true);
        if (!$login->loginUser($data)) {
            http_response_code(401);
            return;
        }
        
        $_SESSION = array();
        $_SESSION["UserLoggedIn"] = true;
        http_response_code(200);
    }
}