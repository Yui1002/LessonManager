<?php

include_once SYSTEM_PATH . "/database.php";

class Schedules 
{
    private $db;
    private $getSchedulesSql = "SELECT student_id, name, start_date, end_date, description FROM schedules;";
    private $createScheduleSql = "INSERT into schedules VALUES (DEFAULT, ?, ?, ?, ?, ?);";

    private $data;

    function __construct()
    {
        $this->db = Database::getInstance();
        $this->data = NULL;
    }

    public function getSchedules() {
        $stmt = mysqli_query($this->db->getConnection(), $this->getSchedulesSql);
        $rows = $stmt->fetch_all(MYSQLI_ASSOC);
        $this->data = $rows;
        return $this;
    }

    public function createSchedule($studentId, $name, $startDate, $endDate, $description) 
    {
        $stmt = mysqli_prepare($this->db->getConnection(), $this->createScheduleSql);
        mysqli_stmt_bind_param($stmt, "issss", $studentId, $name, $startDate, $endDate, $description);
        return mysqli_stmt_execute($stmt);
    }

    public function getData() {
        return $this->data;
    }

    public function getEncoded() {
        return json_encode($this->data);
    }
}