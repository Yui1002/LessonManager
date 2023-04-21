<?php

include_once SYSTEM_PATH . "/database.php";

class UserActionRepository
{

    private $db;
    private $getUserExistsSql = "SELECT * FROM users where username = ?;";
    private $insertIntoUserSql = "INSERT INTO users (username, password) VALUES (?, ?);";
    private $verifyLoginSql = "SELECT * FROM users where username = ? AND password = ?";

    function __construct()
    {
        $this->db = Database::getInstance();
    }

    public function registerUser($data)
    {

        if ($this->doesUserExist($data["username"])) {
            throw new HttpException(400, "User already exists", NULL);
        }

        $hashedPassword = $this->getHashedPassword($data["password"]);
        $stmt = mysqli_prepare($this->db->getConnection(), $this->insertIntoUserSql);
        mysqli_stmt_bind_param($stmt, "ss", $data["username"], $hashedPassword);
        return mysqli_stmt_execute($stmt);
    }

    public function doesUserExist($username)
    {
        $stmt = mysqli_prepare($this->db->getConnection(), $this->getUserExistsSql);
        mysqli_stmt_bind_param($stmt, "s", $username);
        mysqli_stmt_execute($stmt);
        $row = mysqli_stmt_fetch($stmt);
        return $row;
    }

    public function loginUser($data)
    {
        return $this->verifyLogin($data["username"], $data["password"]);
    }

    public function getHashedPassword($password)
    {
        return hash("sha256", $password);
    }


    public function verifyLogin($username, $password)
    {
        $hashPassword = $this->getHashedPassword($password);
        $stmt = mysqli_prepare($this->db->getConnection(), $this->verifyLoginSql);
        mysqli_stmt_bind_param($stmt, "ss", $username, $hashPassword);
        mysqli_stmt_execute($stmt);
        $row = mysqli_stmt_fetch($stmt);
        var_dump($row);
        return $row;
    }
}
