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
        // print_r($data);
        // exit;
        $id =  $_GET['id'];

        $saturday = $data['saturday'] ?? NULL;
        $sunday = $data['sunday'] ?? NULL;
        $monday = $data['monday'] ?? NULL;
        $tuesday = $data['tuesday'] ?? NULL;
        $wednesday = $data['wednesday'] ?? NULL;
        $thursday = $data['thursday'] ?? NULL;
        $friday = $data['friday'] ?? NULL;


        $sql = "insert into teacher_hours (id,saturday, sunday, monday, tuesday, wednesday, thursday, friday) values($id, '$saturday','$sunday' , '$monday', '$tuesday', '$wednesday','$thursday' ,'$friday')";

        if ($this->connect()->query($sql)) {
            echo json_encode(array('message' => 'record Updated', 'status' => true));
        } else {
            echo json_encode(array('message' => 'record not Updated', 'status' => false));
        }
    }
}
$new = new UpdateUser();
$new->update();
