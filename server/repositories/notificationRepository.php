<?php

include_once SYSTEM_PATH . "/database.php";

class NotificationRepository {
    private $db;
    private $getNotificationSql = "SELECT * FROM schedules WHERE start_date >= NOW() + INTERVAL 1 MINUTE AND start_date <= NOW() + INTERVAL 1 HOUR;";

    private $data;

    function __construct()
    {
        $this->db = Database::getInstance();
        $this->data = NULL;
    }

    public function getNotification() {
        $stmt = mysqli_query($this->db->getConnection(), $this->getNotificationSql);
        $rows = $stmt->fetch_all(MYSQLI_ASSOC);
        $this->data = $rows;
        return $this;
    }

    public function getEncoded() {
        // handle null
        return json_encode($this->data);
    }
}