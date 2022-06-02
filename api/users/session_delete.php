<?php

header('Content-Type: application/json');

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');

include('config.php');

class DeleteSession extends Database
{

    public function delete()
    {
        $data = json_decode(file_get_contents("php://input"), true);
        $id =  $_GET['id'];

        $sql = "delete from student_session where id = {$id}";

        if ($this->connect()->query($sql)) {
            echo json_encode(array('message' => 'session destroy Successfully', 'status' => true));
        } else {
            echo json_encode(array('message' => 'Cannot destroy session', 'status' => false));
        }
    }
}

$obj = new DeleteSession();
$obj->delete();
