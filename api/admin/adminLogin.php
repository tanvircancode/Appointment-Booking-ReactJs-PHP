<?php

header('Content-Type: application/json');

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: *');

include('config.php');

class Login extends Database
{
    public function registration()
    {
        $data = json_decode(file_get_contents("php://input"), true);
        // $id =  $data['id'];
        // $name =  $data['name'];
        $email =  $data['email'];
        $password =  $data['password'];
        // $department =  $data['dept'];

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {

            // new
            if ($email && $password) {
                $sql = "select * from admin where email='$email' ";
                $info = $this->connect()->query($sql);
                $data = $info->fetch_assoc();
                $pass = $data['password'] ?? '';
                if ($info) {
                    if ($info->num_rows > 0) {

                        if ($password == $pass) {


                            $_SESSION['id'] = $data['id'];

                            echo json_encode(array('message' => 'Login Successfully', 'status' => true,'session_id' => $_SESSION['id']));
                        } else {
                            // array_push($this->result, "email and password didn't match");
                            echo json_encode(array('message' => 'email and password did not match', 'status' => false));
                            // return false;
                        }
                    } else {
                        // array_push($this->result, $email . " Does not exist in database");
                        echo json_encode(array('message' => 'Email Does not exist in database', 'status' => false));
                        // echo $password."     ".$pass."     ".password_verify($password, $pass);exit;

                        // return false;

                    }
                } else {
                    // array_push($this->result, $this->mysqli->error);
                    echo json_encode(array('message' => 'Connection Failed', 'status' => false));
                    // return false;
                }
            } else {
                // array_push($this->result, "email or password is empty");
                echo json_encode(array('message' => 'email or password is empty', 'status' => false));
                // return false;
            }
            // end

        }
    }
}




$new = new Login();
$new->registration();
