<?php

include_once SYSTEM_PATH . "../repositories/notificationRepository.php";

class NotificationManager {
    
    private $notification;

    public function __construct()
    {
        $this->notification = new NotificationRepository();
    }

    public function getNotification() {
        return $this->notification->getNotification();
    }
}