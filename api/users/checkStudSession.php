<?php

header('Content-Type: application/json');

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');

include('config.php');

class EditUser extends Database
{

    public function edit()
    {
        $data = json_decode(file_get_contents("php://input"), true);
        $id =  $_GET['id'];
        // echo $id;exit;



        $sql = "select * from student_session where id = {$id}";
        $result = $this->connect()->query($sql) or die("SQL query Faled.");

        if ($result->num_rows > 0) {
            $data = $result->fetch_assoc();
            echo json_encode($data);
        } else {
            echo json_encode(array('message' => 'No records Found', 'status' => false, 'is_session' => 'Empty'));
        }
    }
}

$obj = new EditUser();
$obj->edit();
