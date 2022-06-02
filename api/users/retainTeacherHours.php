<?php

header('Content-Type: application/json');

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');

include('config.php');

class DeleteUser extends Database
{

    public function delete()
    {
        $data = json_decode(file_get_contents("php://input"), true);
        $id = $data['teacher_id'];
        
        

        if ($data['day'] == 1) {
            $sql = "update teacher_hours set saturday = saturday + 1 where id = {$id}";
        } else if ($data['day'] == 2) {
            $sql = "update teacher_hours set sunday = sunday + 1 where id = {$id}";
        } else if ($data['day'] == 3) {
            $sql = "update teacher_hours set monday = monday + 1 where id = {$id}";
        } else if ($data['day'] == 4) {
            $sql = "update teacher_hours set tuesday = tuesday + 1 where id = {$id}";
        } else if ($data['day'] == 5) {
            $sql = "update teacher_hours set wednesday = wednesday + 1 where id = {$id}";
        } else if ($data['day'] == 6) {
            $sql = "update teacher_hours set thursday = thursday + 1 where id = {$id}";
        } else if ($data['day'] == 7) {
            $sql = "update teacher_hours set friday = friday + 1 where id = {$id}";
        }

        // $sql = "delete from appoint_list where id = {$id}";

        if ($this->connect()->query($sql)) {
            echo json_encode(array('message' => 'Retain Successfully', 'status' => true));
        } else {
            echo json_encode(array('message' => 'Cannot retain', 'status' => false));
        }
    }
}

$obj = new DeleteUser();
$obj->delete();
