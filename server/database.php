<?php

include_once "config.php";

//singleton
class Database
{
    // Hold the class instance.
    private static $instance = null;
    private $connection;
    // The constructor is private
    // to prevent initiation with outer code.
    private function __construct()
    {
        // The expensive process (e.g.,db connection) goes here.
        $this->connection  = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_DATABASE);
        if ($this->connection  === false) {
            die("Connection Failed: " . mysqli_connect_error());
        }
    }

    // The object is created from within the class itself
    // only if the class has no instance.
    public static function getInstance()
    {
        if (self::$instance == null) {
            self::$instance = new Database();
        }

        return self::$instance;
    }

    public function getConnection() {
        return $this->connection;
    }
}

