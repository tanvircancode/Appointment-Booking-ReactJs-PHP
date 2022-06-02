<?php
header('Content-Type: application/json');

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');

include('config.php');

class approveUser extends Database
{
    public function approve()
    {
        $data = json_decode(file_get_contents("php://input"), true);
        // print_r($data);exit;
        $id =  $_GET['id'];

        

        $sql = "update common set is_approved = 1 where id={$id}";

        if ($this->connect()->query($sql)) {
            echo json_encode(array('message' => 'record Updated', 'status' => true));
        } else {
            echo json_encode(array('message' => 'record not Updated', 'status' => false));
        }
    }
}
$new = new approveUser();
$new->approve();
