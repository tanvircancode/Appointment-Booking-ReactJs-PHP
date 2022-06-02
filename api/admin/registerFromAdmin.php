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
        // $id =  $data['id'];
        $name =  $data['name'];
        $email =  $data['email'];
        $roll =  $data['roll'] ?? '';
        $course =  $data['course'] ?? '';
        $department =  $data['department'];

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {

            if ($roll != '') {
                $sql = "insert into common( is_approved, name, email,roll,department ) values(1, '$name','$email', '$roll', '$department')";
            } else {
                $sql = "insert into common( is_approved, name, email,course,department ) values(1, '$name','$email', '$course', '$department')";
            }

            $dupEmail = "select * from common where email='$email'";
            $info = $this->connect()->query($dupEmail);

            if ($info->num_rows > 0) {
                echo json_encode(array('message' => 'Duplicate Email Number Entered', 'status' => false));
            } else if ($this->connect()->query($sql)) {
                echo json_encode(array('message' => 'record Inserted', 'status' => true));
            } else {
                echo json_encode(array('message' => 'record not Inserted', 'status' => false));
            }
        }
    }
}




$new = new Register();
$new->registration();
