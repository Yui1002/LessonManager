<?php
include_once SYSTEM_PATH."/global.php";
include_once SYSTEM_PATH.'/views/userAction.php';
include_once SYSTEM_PATH."/views/students.php";
include_once SYSTEM_PATH."/views/notification.php";


//Get the action from the url. This assumes every request has a action param passed in
$action = "default";
if (isset($_GET['action'])) {
    $action = $_GET['action'];
} else if (isset($_POST['action'])) {
    $action = $_POST['action'];
}

//Example of how sessions work in php
if (isset($_SESSION['test'])) {
    $_SESSION['test']++;
} else {
    $_SESSION['test'] = 0;
}

$controller = new RootController();
$controller->route($action);

class RootController {
    public function route($action) {
        switch ($action) {
            case 'index': //HOST/lessonManager?action=index
                $this->index();
                break;
            case 'register': //HOST/lessonManager?action=register
                $this->register();
                break;
            case 'login'://HOST/lessonManager?action=login
                $this->login();
                break;
            case 'getAllStudents': //HOST/lessonManager?action=students
                $this->getAllStudents();
                break;
            case 'getStudentByEmail': //HOST/lessonManager?action=getStudentByEmail
                $this->getStudentByEmail();
                break;
            case 'getStudentId': 
                $this->getStudentId();
                break;
            case 'createNewStudent': 
                $this->createNewStudent();
                break;
            case 'notification':
                $this->notification();
        }
    }

    //if the path intends to go to index, get the index file
    public function index() {
        include_once SYSTEM_PATH.'/views/index.php';
    }

    //if the path intends to go to register, get the register file
    public function register() {
        $register = new UserAction();
        $data = json_decode(file_get_contents('php://input'), true);
        if (!$register->registerUser($data["username"], $data["password"])) {
            http_response_code(400);
        }
    }

    public function login() {
        if (isset($_SESSION["UserLoggedIn"])) {
            return $_SESSION["UserLoggedIn"];
        }

        $login = new UserAction();
        $data = json_decode(file_get_contents("php://input"), true);
        if (!$login->loginUser($data["username"], $data["password"])) {
            http_response_code(400);
            return;
        }
        $_SESSION["UserLoggedIn"] = true; 
    }

    public function getAllStudents() {
        $students = new Students();
        $result = $students->getAllStudents();
        echo json_encode($result);
    }

    public function getStudentByEmail() {
        $students = new Students();
        $data = json_decode(file_get_contents("php://input"), true);
        return $students->getStudentByEmail($data["email"]);  
    }

    public function getStudentId() {
        $students = new Students();
        $data = json_decode(file_get_contents("php://input"), true);
        return $students->getStudentId($data["email"]);   
    }

    public function createNewStudent() {
        $students = new Students();
        $data = json_decode(file_get_contents("php://input"), true);
        return $students->createNewStudent($data["req"], $data["file"]);  
    }

    public function notification() {
        $data = json_decode(file_get_contents("php://input"), true);
    }


}
