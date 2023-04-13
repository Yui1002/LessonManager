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
        return $this->userActions->loginUser($data);
    }
}