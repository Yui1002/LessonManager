<?php
include_once SYSTEM_PATH . "/global.php";
include_once SYSTEM_PATH . '/views/userAction.php';
include_once SYSTEM_PATH . "/views/students.php";
include_once SYSTEM_PATH . "/views/notification.php";
include_once SYSTEM_PATH . "/views/schedules.php";


//Get the action from the url. This assumes every request has a action param passed in
//function or class (action) returns string
$action = "default";
if (isset($_GET['action'])) {
    $action = $_GET['action'];
} else if (isset($_POST['action'])) {
    $action = $_POST['action'];
} else if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $action = $_SERVER['REQUEST_METHOD'];
} else if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $action = $_SERVER['REQUEST_METHOD'];
}

$controller = new RootController();
$controller->route($action);

class RootController
{

    private $data;
    private $student;
    private $userActions;
    private $notification;
    private $schedules;

    public function __construct()
    {
        $this->data = NULL;
        $this->student = new Students();
        $this->userActions = new UserAction();
        $this->notification = new Notification();
        $this->schedules = new Schedules();
    }
    public function route($action)
    {
        //global middleware to handle exceptions
        try {
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
                case 'deleteStudent': 
                    $this->deleteStudent();
                    break;
                case 'getSchedules':
                    $this->getSchedules();
                    break;
                case 'createSchedule':
                    $this->createSchedule();
                    break;
            }
        } catch (HttpException $ex) {
            $ex->get();
        } catch (Exception $ex) {
            http_response_code(500);
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
        $this->userActions->registerUser($this->data["username"], $this->data["password"]);
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
        $uploadFile = $this->uploadFile($_FILES);

        echo $this->student->createNewStudent(
            $_POST["firstName"],
            $_POST["lastName"],
            $_POST["country"],
            $_POST["phoneNumber"],
            $_POST["email"],
            $uploadFile,
            $_POST["lessonHours"],
        );
    }

    public function generateName($fileName) 
    {
        $name = substr($fileName, 0, strrpos($fileName, '.'));
        if (strlen($name) > 15) $name = substr($name, 0, 15);
        $name = trim($name);
        $nameMime = substr($fileName, strrpos($fileName, '.'));
        $timestampSec = strval(time());
        return $name.$timestampSec.$nameMime;
    }

    public function getNotification()
    {
        echo $this->notification->getNotification()->getEncoded();
    }

    public function editProfile()
    {
        // upload new profile photo
        $uploadFile = $this->uploadFile($_FILES);
        // find a record by email
        $email = $_POST["email"];
        $record = $this->student->getStudentByEmail($email)->getData();
        if ($record == NULL) {
            throw new HttpException(400, "User not found", NULL);
        }
        $id = $record["id"];
        $oldFile = $record["profile_photo"];
        $this->deleteFile($oldFile);
        echo $this->student->editStudent(
            $id, 
            $_POST["firstName"], 
            $_POST["lastName"], 
            $_POST["country"], 
            $_POST["phoneNumber"], 
            $_POST["email"], 
            $uploadFile, 
            $_POST["lessonHours"]
        );
    }

    public function deleteStudent() {
        echo $this->student->deleteStudent($this->data["email"]);
    }

    public function uploadFile($file) {
        $uploaddir = "server/uploads/";
        $name = $this->generateName($file['file']['name']);
        $uploadfile = $uploaddir.basename($name);

        if (move_uploaded_file($file['file']['tmp_name'], $uploadfile)) {
            echo "The file has been uploaded successfully";
        } else {
            echo $file["file"]["error"];
        }
        return $uploadfile;
    }

    public function deleteFile($file) {
        if (!unlink($file)) {
            echo ("$file cannot be deleted due to an error");
        } else {
            echo ("$file has been deleted");
        }
    } 

    public function getSchedules() {
        echo $this->schedules->getSchedules()->getEncoded();
    }

    public function createSchedule() {
        echo $this->schedules->createSchedule(
            $this->data["student_id"], 
            $this->data["name"], 
            $this->data["start_date"], 
            $this->data["end_date"], 
            $this->data["description"], 
        );
    }
}
