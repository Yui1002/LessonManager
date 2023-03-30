<?php

include_once SYSTEM_PATH . "/database.php";


class Students {
    private $db;
    private $getStudentsSql = "SELECT * FROM students";
    private $getStudentIdSql = "SELECT id FROM students WHERE email = ?";
    private $createNewStudentSql = "INSERT INTO students VALUES (?, ?, ?, ?, ?, ?, ?)";
    private $deleteStudentSql = "DELETE FROM students WHERE email = ?";

    function __construct()
    {
        $this->db = Database::getInstance();
    }
}