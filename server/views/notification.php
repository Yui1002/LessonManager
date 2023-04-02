<?php

include_once SYSTEM_PATH . "/database.php";

class Notification {
    private $db;
    private $getClassNotificationSql = "SELECT * FROM schedules WHERE start_date >= NOW() + INTERVAL 1 MINUTE AND start_date <= NOW() + INTERVAL 1 HOUR;";

    function __construct()
    {
        $this->db = Database::getInstance();
    }

    public function getClassNotification() {
        echo "hello from notification";
        $stmt = mysqli_query($this->db->getConnection(), $this->getClassNotificationSql);
        $row = $stmt->fetch_assoc();
        var_dump($row);
        return $row;
    }
}