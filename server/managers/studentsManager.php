<?php

include_once SYSTEM_PATH . "../repositories/studentsRepository.php";

class StudentsManager {

    private $student;

    public function __construct()
    {
        echo "hello";
        $this->student = new StudentsRepository();
    }

    public function getAllStudents() {
       return $this->student->getAllStudents();
    }

    public function getStudentByEmail($data) {
        return $this->student->getStudentByEmail($data["email"]);
    }

    public function createNewStudent($data, $file) {
        $uploadFile = $this->uploadFile($file);
        $this->student->createNewStudent($data, $uploadFile);
    }

    public function deleteStudent($data) {
        $record = $this->student->getStudentByEmail($data["email"])->getData();
        $file = $record["profile_photo"];
        $this->deleteFile($file);
        return $this->student->deleteStudent($data["email"]);
    }

    public function editStudent($data, $file) {
        return $this->student->editStudent($data, $file);
    }

    public function uploadFile($file) {
        $uploaddir = "server/uploads/";
        $name = $this->generateName($file['file']['name']);
        $uploadfile = $uploaddir.basename($name);

        if (move_uploaded_file($file['file']['tmp_name'], $uploadfile)) {
            return $uploadfile;
        } else {
            throw new HttpException(500, "Failed to upload file", NULL);
        }
    }

    public function generateName($fileName) {
        $name = substr($fileName, 0, strrpos($fileName, '.'));
        if (strlen($name) > 15) $name = substr($name, 0, 15);
        $name = trim($name);
        $nameMime = substr($fileName, strrpos($fileName, '.'));
        $timestampSec = strval(time());
        return $name.$timestampSec.$nameMime;
    }

    public function deleteFile($file) {
        if (!$file) return;
        if (!unlink($file)) {
            echo "Failed to delete file";
        } else {
            echo "$file has been deleted";
        }
    }
}