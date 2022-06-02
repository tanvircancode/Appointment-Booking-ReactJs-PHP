<?php

header('Content-Type: application/json');

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: *');

include('config.php');

class Appoint extends Database
{
    public function appointfromstudent()
    {
        $data = json_decode(file_get_contents("php://input"), true);

        $sid =  $data['sid'];
        $tid =  $data['tid'];
        $date =  $data['date'];
        $agenda =  $data['agenda'];
        $course =  $data['course'];
        $student_name = $data['student_name'];
        $teacher_name = $data['teacher_name'];
        $day =  $data['day'];

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {

            $sql = "insert into appoint_list(student_id, student_name, teacher_id, teacher_name, date, course, agenda,day)values($sid, '$student_name', $tid, '$teacher_name', '$date', '$course', '$agenda',$day)";

            if ($this->connect()->query($sql)) {
                echo json_encode(array('message' => 'record Inserted clear successfully', 'status' => true));
            } else {
                echo json_encode(array('message' => 'record not Inserted', 'status' => false));
            }
        }
    }
}




$new = new Appoint();
$new->appointfromstudent();
