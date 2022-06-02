<?php
header('Content-Type: application/json');

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');

include('config.php');

class StudentSearch extends Database
{
    public function search()
    {
        $data = json_decode(file_get_contents("php://input"), true);
        // print_r($data);
        $search_value = $_GET['search'];

        $sql = "select * from common where name like '%{$search_value}%' OR course like '%{$search_value}%'";
        $info = $this->connect()->query($sql);

        if ($info->num_rows > 0) {

            $data = $info->fetch_all(MYSQLI_ASSOC);
            echo json_encode($data);
        } else {
            echo json_encode(array('message' => 'No records Found', 'status' => false));
        }
    }
}
$new = new StudentSearch();
$new->search();
