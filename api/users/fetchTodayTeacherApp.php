<?php

header('Content-Type: application/json');

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');

include('config.php');

class AppointRequest extends Database
{

    public function edit()
    {
        $data = json_decode(file_get_contents("php://input"), true);
        // echo ($data);
        // exit;
        $id =  $_GET['id'];

        date_default_timezone_set('Asia/Dhaka');
         $today = date('w');
         
        if ($today == 6) {
            $day = 1;
        } else if($today <= 5  ) {
            $day = $today + 2;
        }
       



        $sql = "select * from appoint_list where teacher_id = {$id} and day = {$day}";

        $info = $this->connect()->query($sql) or die("SQL query Failed.");

        if ($info->num_rows > 0) {
            $data = $info->fetch_all(MYSQLI_ASSOC);
            echo json_encode($data);
        } else {
            echo json_encode(array('message' => 'No records Found', 'status' => false));
        }
    }
}

$obj = new AppointRequest();
$obj->edit();
