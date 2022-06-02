<?php

header('Content-Type: application/json');

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: *');

include('config.php');

class FetchCommonAll extends Database
{    
    public function fetch_all(){
        $sql = "select * from common";
        $info = $this->connect()->query($sql) or die("SQL query Failed.");
        
        if($info->num_rows > 0){
            $data = $info -> fetch_all(MYSQLI_ASSOC);
            echo json_encode($data);
        }else{
            echo json_encode(array('message' => 'No records Found' , 'status' => false));
        }
    }
}

$new = new FetchCommonAll();
$new->fetch_all();
