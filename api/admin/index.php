<?php

header('Content-Type: application/json');

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: *');

include('config.php');

class Index extends Database
{

    public function registration()
    {
        $data = json_decode(file_get_contents("php://input"), true);
        // $id =  $data['id'];
        $name =  $data['name']  ?? '';
        $email =  $data['email'];
        $password =  $data['password'];
        $department =  $data['dept'] ?? '';
        echo $_SERVER['REQUEST_URI'];exit;

        // if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        //     $sql = "insert into common( name, email, password,department ) values('$name','$email','$password','$department')";

        //     if ($this->connect()->query($sql)) {
        //         echo json_encode(array('message' => 'Student record Inserted', 'status' => true));
        //     } else {
        //         echo json_encode(array('message' => 'Student record not Inserted', 'status' => false));
        //     }
        // }
    }
}

$new = new Index();
$new->registration();
