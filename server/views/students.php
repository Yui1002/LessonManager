<?php

include_once SYSTEM_PATH . "/database.php";


class Students
{
    private $db;
    private $getStudentsSql = "SELECT * FROM students";
    private $getStudentByEmailSql = "SELECT * FROM students WHERE email = ?";
    private $getStudentIdSql = "SELECT id FROM students WHERE email = ?";
    private $createNewStudentSql = "INSERT INTO students VALUES (DEFAULT, ?, ?, ?, ?, ?, ?, ?)";
    private $deleteStudentSql = "DELETE FROM students WHERE email = ?";

    private $data;

    function __construct()
    {
        $this->db = Database::getInstance();
        $this->data = NULL;
    }

    public function getAllStudents()
    {
        $stmt = mysqli_query($this->db->getConnection(), $this->getStudentsSql);
        $rows = $stmt->fetch_all(MYSQLI_ASSOC);
        $this->data = $rows;
        return $this;
    }

    public function getStudentByEmail($email)
    {
        $stmt = mysqli_prepare($this->db->getConnection(), $this->getStudentByEmailSql);
        mysqli_stmt_bind_param($stmt, "s", $email);
        mysqli_stmt_execute($stmt);
        $result = $stmt->get_result(); 
        $user = $result->fetch_assoc();
        $this->data = $user;
        return $this;
    }

    public function getStudentId($email)
    {
        $stmt = mysqli_prepare($this->db->getConnection(), $this->getStudentIdSql);
        mysqli_stmt_bind_param($stmt, "s", $email);
        mysqli_stmt_execute($stmt);
        $result = $stmt->get_result(); 
        $user = $result->fetch_assoc(); 
        var_dump($user);
        $this->data =$user; 
        return $user;
    }

    public function createNewStudent($firstName, $lastName, $country, $phoneNumber, $email, $file, $lessonHours)
    {
        $stmt = mysqli_prepare($this->db->getConnection(), $this->createNewStudentSql);
        mysqli_stmt_bind_param($stmt, "ssssssi", $firstName, $lastName, $country, $phoneNumber, $email, $file, $lessonHours);
        return mysqli_stmt_execute($stmt);
    }

    public function getEncoded() {
        return json_encode($this->data);
    }

    public function editStudent() {

    }

    public function deleteStudent($email) {
        $stmt = mysqli_prepare($this->db->getConnection(), $this->deleteStudentSql);
        mysqli_stmt_bind_param($stmt, "s", $email);
        return mysqli_stmt_execute($stmt);
    }
}
