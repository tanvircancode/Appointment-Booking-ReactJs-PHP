<?php

class Database
{
    public $db_host = "localhost";
    public $db_user = "root";
    public $db_pass = "";
    public $db_name = "react";
    public $mysqli = '';

    public function connect()
    {
        $conn  = new mysqli($this->db_host, $this->db_user, $this->db_pass, $this->db_name);
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        return $conn;
    }
}
