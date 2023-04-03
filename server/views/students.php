<?php

include_once SYSTEM_PATH . "/database.php";


class Students
{
    private $db;
    private $getStudentsSql = "SELECT * FROM students";
    private $getStudentByEmailSql = "SELECT * FROM students WHERE email = ?";
    private $getStudentByIdSql = "SELECT * FROM students WHERE id = ?";
    private $createNewStudentSql = "INSERT INTO students VALUES (DEFAULT, ?, ?, ?, ?, ?, ?, ?)";
    private $deleteStudentSql = "DELETE FROM students WHERE email = ?";
    private $updateStudentSql = "UPDATE students SET first_name = ?, last_name=?, country=?, phone_number=?, email=?, profile_photo=?, lesson_hours=? WHERE id=?";

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

    public function createNewStudent($firstName, $lastName, $country, $phoneNumber, $email, $file, $lessonHours)
    {
        echo $firstName;
        $stmt = mysqli_prepare($this->db->getConnection(), $this->createNewStudentSql);
        mysqli_stmt_bind_param($stmt, "ssssssi", $firstName, $lastName, $country, $phoneNumber, $email, $file, $lessonHours);
        return mysqli_stmt_execute($stmt);
    }

    
    public function editStudent($id, $firstName, $lastName, $country, $phoneNumber, $email, $file, $lessonHours) 
    {
        // update row
        $stmt = mysqli_prepare($this->db->getConnection(), $this->updateStudentSql);
        mysqli_stmt_bind_param($stmt, "ssssssii", $firstName, $lastName, $country, $phoneNumber, $email, $file, $lessonHours, $id);
        mysqli_stmt_execute($stmt);
        
        // get row 
        echo $this->getStudentById($id)->getData();
    }
    
    public function getStudentById($id) {
        $stmt = mysqli_prepare($this->db->getConnection(), $this->getStudentByIdSql);
        mysqli_stmt_bind_param($stmt, "i", $id);
        mysqli_stmt_execute($stmt);
        $result = $stmt->get_result(); 
        $user = $result->fetch_assoc();
        $this->data = $user;
        return $this;
    }
    
    public function deleteStudent($email) {
        $stmt = mysqli_prepare($this->db->getConnection(), $this->deleteStudentSql);
        mysqli_stmt_bind_param($stmt, "s", $email);
        return mysqli_stmt_execute($stmt);
    }
    
    public function getData() {
        return $this->data;
    }

    public function getEncoded() {
        return json_encode($this->data);
    }
}
