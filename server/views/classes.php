<?php

include_once SYSTEM_PATH . "/database.php";

class Classes 
{
    private $db;
    private $getClassesSql = "SELECT student_id, name, start_date, end_date, description FROM schedules;";
    private $getClassIdSql = "SELECT id FROM schedules WHERE start_date = ? AND end_date = ?";
    private $createClassSql = "INSERT into schedules VALUES (DEFAULT, ?, ?, ?, ?, ?);";
    private $deleteClassSql = "DELETE FROM schedules WHERE id = ?";
    private $isOverlapSql = "SELECT * FROM schedules WHERE (? < start_date AND ? > start_date AND ? < end_date) or (start_date <= ? AND ? <= end_date) or (? > start_date AND ? < end_date AND ? > end_date);";
    private $getPastClassSql = "SELECT * FROM schedules WHERE month(start_date) = ? and year(start_date) = ?;";

    private $data;

    function __construct()
    {
        $this->db = Database::getInstance();
        $this->data = NULL;
    }

    public function getClasses() {
        $stmt = mysqli_query($this->db->getConnection(), $this->getClassesSql);
        $rows = $stmt->fetch_all(MYSQLI_ASSOC);
        $this->data = $rows;
        return $this;
    }

    public function createClass($studentId, $name, $startDate, $endDate, $description) 
    {
        $stmt = mysqli_prepare($this->db->getConnection(), $this->createClassSql);
        mysqli_stmt_bind_param($stmt, "issss", $studentId, $name, $startDate, $endDate, $description);
        return mysqli_stmt_execute($stmt);
    }

    public function isOverlap($startDate, $endDate) {
        $stmt = mysqli_prepare($this->db->getConnection(), $this->isOverlapSql);
        mysqli_stmt_bind_param($stmt, "ssssssss", $startDate, $endDate, $endDate, $startDate, $endDate, $startDate, $startDate, $endDate);
        mysqli_stmt_execute($stmt);
        $stmt->store_result();
        return $stmt->num_rows > 0;
    }

    public function deleteClass($id) 
    {
        $stmt = mysqli_prepare($this->db->getConnection(), $this->deleteClassSql);
        mysqli_stmt_bind_param($stmt, "i", $id);
        return mysqli_stmt_execute($stmt);
    }

    public function getClassId($startDate, $endDate) {
        $stmt = mysqli_prepare($this->db->getConnection(), $this->getClassIdSql);
        mysqli_stmt_bind_param($stmt, "ss", $startDate, $endDate);
        mysqli_stmt_execute($stmt);
        $result = $stmt->get_result(); 
        $user = $result->fetch_assoc();
        $this->data = $user;
        return $this;
    }

    public function getClassesByDate($month, $year) {
        $stmt = mysqli_prepare($this->db->getConnection(), $this->getPastClassSql);
        mysqli_stmt_bind_param($stmt, "ii", $month, $year);
        mysqli_stmt_execute($stmt);
        $result = $stmt->get_result();
        $classes = $result->fetch_all(MYSQLI_ASSOC);
        $this->data = $classes;
        return $this;
    }

    public function getData() {
        return $this->data;
    }

    public function getEncoded() {
        return json_encode($this->data);
    }
}