<?php

header('Content-Type: application/json');

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');

include('config.php');

class DeleteTeacherHour extends Database
{

  public function delete()
  {
    $data = json_decode(file_get_contents("php://input"), true);
    // print_r($data);exit;
    $id =  $_GET['id'];


    $sql = "update teacher_hours set saturday  = NULL, sunday =NULL , monday =NULL, tuesday = NULL, wednesday = NULL,
          thursday = NULL , friday = NULL where id={$id}";


    if ($this->connect()->query($sql)) {
      echo json_encode(array('message' => 'Deleted Successfully', 'status' => true));
    } else {
      echo json_encode(array('message' => 'Cannot Delete', 'status' => false));
    }
  }
}

$obj = new DeleteTeacherHour();
$obj->delete();
