<?php

header('Content-Type: application/json');

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: *');

include('config.php');

class Register extends Database
{

    public function registration()
    {
        $data = json_decode(file_get_contents("php://input"), true);
        // print_r($data);exit;





        $sql = "insert into student_session( id, is_session ) values('$data','1')";

        if ($this->connect()->query($sql)) {
            echo json_encode(array('message' => 'record Inserted', 'status' => true, 'session_id' => $data));
        } else {
            echo json_encode(array('message' => 'record not Inserted', 'status' => false));
        }
    }
}




$new = new Register();
$new->registration();
