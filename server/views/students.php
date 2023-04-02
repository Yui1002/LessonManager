<?php

include_once SYSTEM_PATH . "/database.php";


class Students
{
    private $db;
    private $getStudentsSql = "SELECT * FROM students";
    private $getStudentByEmailSql = "SELECT * FROM students WHERE email = ?";
    private $getStudentIdSql = "SELECT id FROM students WHERE email = ?";
    private $createNewStudentSql = "INSERT INTO students VALUES (?, ?, ?, ?, ?, ?, ?)";
    private $deleteStudentSql = "DELETE FROM students WHERE email = ?";

    function __construct()
    {
        $this->db = Database::getInstance();
    }

    public function getAllStudents()
    {
        $stmt = mysqli_query($this->db->getConnection(), $this->getStudentsSql);
        $rows = $stmt->fetch_all(MYSQLI_ASSOC);
        return $rows;
    }

    public function getStudentByEmail($email)
    {
        $stmt = mysqli_prepare($this->db->getConnection(), $this->getStudentByEmailSql);
        mysqli_stmt_bind_param($stmt, "s", $email);
        mysqli_stmt_execute($stmt);
        $result = $stmt->get_result(); 
        $user = $result->fetch_assoc(); 
        return $user;
    }

    public function getStudentId($email)
    {
        $stmt = mysqli_prepare($this->db->getConnection(), $this->getStudentIdSql);
        mysqli_stmt_bind_param($stmt, "s", $email);
        mysqli_stmt_execute($stmt);
        $result = $stmt->get_result(); 
        $user = $result->fetch_assoc(); 
        var_dump($user);
        return $user;
    }


    public function createNewStudent($req, $file)
    {
        $stmt = mysqli_prepare($this->db->getConnection(), $this->createNewStudentSql);
        mysqli_stmt_bind_param($stmt, "ssssssi", $req->firstName, $req->lastName, $req->country, $req->phone, $file->file, $req->hours);
        mysqli_stmt_execute($stmt);

    }
}
