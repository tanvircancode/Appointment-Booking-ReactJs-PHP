<?php
header('Content-Type: application/json');

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');

include('config.php');

class UpdateUser extends Database
{
    public function update()
    {
        $data = json_decode(file_get_contents("php://input"), true);
        // print_r($data);exit;
        $id =  $_GET['id'];

        $name = $data['name'];
        $roll = $data['roll'] ?? '';
        $email = $data['email'];
        $department = $data['department'];
        $course = $data['course'] ?? '';

        $sql = "update common set name = '{$name}', roll = '{$roll}' , email = '{$email}', course = '{$course}', department = '{$department}' where id={$id}";

        if ($this->connect()->query($sql)) {
            echo json_encode(array('message' => 'record Updated', 'status' => true));
        } else {
            echo json_encode(array('message' => 'record not Updated', 'status' => false));
        }
    }
}
$new = new UpdateUser();
$new->update();
