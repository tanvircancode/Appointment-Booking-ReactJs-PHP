<?php

header('Content-Type: application/json');

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');

include('config.php');

class TeacherHours extends Database
{
    public function hours()
    {
        $data = json_decode(file_get_contents("php://input"), true);
        $id =  $_GET['id'];

        $sql = "select * from teacher_hours where id = {$id} order by increment desc  limit 1  ";
        $result = $this->connect()->query($sql) or die("SQL query Faled.");

        if ($result->num_rows > 0) {
            $data = $result->fetch_assoc();
            echo json_encode($data);
        } else {
            echo json_encode(array('message' => 'No records Found', 'status' => false));
        }
    }
}

$obj = new TeacherHours();
$obj->hours();
