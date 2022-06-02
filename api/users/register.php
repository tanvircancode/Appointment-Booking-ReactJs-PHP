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
        $pass =  $data['password'];
        $roll =  $data['roll'] ?? '';
        $course =  $data['course'] ?? '';


        $password = password_hash($pass, PASSWORD_BCRYPT);

        $department =  $data['department'];

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            if ($email && $pass) {

                if ($roll != '') {
                    $sql = "insert into common(  name, email,password, roll,department ) values('$name','$email', '$password', '$roll', '$department')";
                } else {
                    $sql = "insert into common(  name, email,password,course,department ) values('$name','$email', '$password', '$course', '$department')";
                }

                // $sql = "insert into common( name, email, password,roll,course,department ) values('$name','$email','$password','$roll','$course', '$department')";
                $dupEmail = "select * from common where email='$email'";
                $info = $this->connect()->query($dupEmail);

                if ($info->num_rows > 0) {
                    echo json_encode(array('message' => 'Duplicate Email Entered', 'status' => false));
                } else if ($this->connect()->query($sql)) {
                    echo json_encode(array('message' => 'Registration successful', 'status' => true, 'roll' => $roll));
                }
            } else {
                echo json_encode(array('message' => 'email or password is empty', 'status' => false));
            }
        }
    }
}




$new = new Register();
$new->registration();
