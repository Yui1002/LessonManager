<?php
include_once SYSTEM_PATH . "/global.php";
include_once SYSTEM_PATH . '/views/userAction.php';
include_once SYSTEM_PATH . "/views/students.php";
include_once SYSTEM_PATH . "/views/notification.php";

//Get the action from the url. This assumes every request has a action param passed in
//function or class (action) returns string
$action = "default";
if (isset($_GET['action'])) {
    $action = $_GET['action'];
} else if (isset($_POST['action'])) {
    $action = $_POST['action'];
} else if (isset($_PUT['action'])) {
    $action = $_PUT['action'];
}
//$action = Action::GetActionName();
$controller = new RootController();
$controller->route($action);

class RootController
{
    
    private $data;
    private $student;
    private $userActions;
    private $notification;

    public function __construct()
    {
        $this->data = NULL;
        $this->student = new Students();
        $this->userActions = new UserAction();
        $this->notification = new Notification();
    }
    public function route($action)
    {
        $this->data = json_decode(file_get_contents("php://input"), true);
        switch ($action) {
            case 'index': 
                $this->index();
                break;
            case 'register':
                $this->register();
                break;
            case 'login':
                $this->login();
                break;
            case 'getAllStudents':
                $this->getAllStudents();
                break;
            case 'getStudentByEmail':
                $this->getStudentByEmail();
                break;
            case 'getStudentId':
                $this->getStudentId();
                break;
            case 'createNewStudent':
                $this->createNewStudent();
                break;
            case 'notification':
                $this->getNotification();
                break;
            case 'editProfile':
                $this->editProfile();
                break;
        }
    }

    //if the path intends to go to index, get the index file
    public function index()
    {
        include_once SYSTEM_PATH . '/views/index.php';
    }

    //if the path intends to go to register, get the register file
    public function register()
    {
        if (!$this->userActions->registerUser($this->data["username"], $this->data["password"])) {
            http_response_code(400);
        }
    }

    public function login()
    {
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

    public function getAllStudents()
    {
        echo $this->student->getAllStudents()->getEncoded();
    }

    public function getStudentByEmail()
    {
        echo $this->student->getStudentByEmail($this->data["email"])->getEncoded();
    }

    public function createNewStudent()
    {
        echo $this->student->createNewStudent($this->data["req"], $data["file"])->getEncoded();
    }

    public function getNotification()
    {
        echo $this->notification->getNotification()->getEncoded();
    }

    public function editProfile()
    {
        $params = $_POST['firstName'];
        var_dump($params);
        $students = new Students();
        $uploaddir = "server/uploads/";
        $uploadfile = $uploaddir . basename($_FILES['file']['name']);

        if (move_uploaded_file($_FILES['file']['tmp_name'], $uploadfile)) {
            echo "The file has been uploaded successfully";
        } else {
            echo $_FILES["file"]["error"];
        }
    }
}
