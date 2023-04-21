<?php

include_once SYSTEM_PATH . "/global.php";
include_once SYSTEM_PATH . "/helpers/HttpException.php";

include_once SYSTEM_PATH . "/managers/studentsManager.php";
include_once SYSTEM_PATH . "/managers/notificationManager.php";
include_once SYSTEM_PATH . "/managers/classesManager.php";
include_once SYSTEM_PATH . "/managers/userActionManager.php";

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
    private $classes;
    
    public function __construct()
    {
        $this->data = NULL;
        $this->student = new StudentsManager();
        $this->userActions = new UserActionManager();
        $this->notification = new NotificationManager();
        $this->classes = new classesManager();
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
                    echo 'hello from register';
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
                case 'getClasses':
                    $this->getClasses();
                    break;
                case 'createClass':
                    $this->createClass();
                    break;
                case 'deleteClass':
                    $this->deleteClass();
                    break;
                case 'getClassesByDate':
                    $this->getClassesByDate();
                    break;
                case 'checkLogin':
                    $this->isLoggedIn();
                    break;
                case 'endSession': 
                    $this->endSession();
                    break;
                default:
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
        // $this->userActions->registerUser($this->data["username"], $this->data["password"]);
        $this->userActions->registerUser($this->data);
    }

    public function login()
    {
        $isLoggedIn = $this->isLoggedIn();
        if (isset($isLoggedIn)) {
            return $isLoggedIn;  
        }

        $data = json_decode(file_get_contents("php://input"), true);
        echo $this->userActions->loginUser($data);
        // if (!$this->userActions->loginUser($data)) {
        //     http_response_code(401);
        //     return;
        // }

        // $login = new UserAction();
        // $data = json_decode(file_get_contents("php://input"), true);
        // if (!$login->loginUser($data)) {
        //     http_response_code(401);
        //     return;
        // }
        
        $_SESSION = array();
        $_SESSION["UserLoggedIn"] = true;
        http_response_code(200);
    }

    //isset -> NOT ( SOMETHING OR SOMETHING )
    //NOT ( (NOT SET) OR (NOT TRUE) )
    public function isLoggedIn() {
        if (isset($_SESSION) && $_SESSION["UserLoggedIn"]) {
            http_response_code(200);
            return $_SESSION["UserLoggedIn"];
        }
        http_response_code(401);
        return NULL;        
    }

    public function getAllStudents()
    {
        echo $this->student->getAllStudents()->getEncoded();
    }

    public function getStudentByEmail()
    {
        echo $this->student->getStudentByEmail($this->data)->getEncoded();
    }

    public function createNewStudent()
    {
        // $uploadFile = $this->uploadFile($_FILES);
        // echo $this->student->createNewStudent($_POST, $uploadFile);
        echo $this->student->createNewStudent($_POST, $_FILES);
    }

    // public function generateName($fileName) 
    // {
    //     $name = substr($fileName, 0, strrpos($fileName, '.'));
    //     if (strlen($name) > 15) $name = substr($name, 0, 15);
    //     $name = trim($name);
    //     $nameMime = substr($fileName, strrpos($fileName, '.'));
    //     $timestampSec = strval(time());
    //     return $name.$timestampSec.$nameMime;
    // }

    public function getNotification()
    {
        echo $this->notification->getNotification()->getEncoded();
    }

    public function editProfile()
    {
        $isNewFileUploaded = strlen($_FILES['file']['name']) > 0;
        if ($isNewFileUploaded) {
            $uploadFile = $this->student->uploadFile($_FILES);
        } else {
            $uploadFile = NULL;
        }
        $email = $_POST["email"]; 
        $record = $this->student->getStudentByEmail($email)->getData();
        if ($record == NULL) {
            throw new HttpException(400, "User not found", NULL);
        }
        if ($isNewFileUploaded) {
            $this->student->deleteFile($record["profile_photo"]);
        }
        echo $this->student->editStudent($_POST, $uploadFile);
    }

    public function deleteStudent() {
        echo $this->student->deleteStudent($this->data);
        // get image to delete from email
        // $record = $this->student->getStudentByEmail($this->data["email"])->getData();
        // $file = $record["profile_photo"];
        // var_dump($file);
        // $this->deleteFile($file);
        // echo $this->student->deleteStudent($this->data["email"]);
    }

    // public function uploadFile($file) {
    //     $uploaddir = "server/uploads/";
    //     $name = $this->generateName($file['file']['name']);
    //     $uploadfile = $uploaddir.basename($name);

    //     if (move_uploaded_file($file['file']['tmp_name'], $uploadfile)) {
    //         return $uploadfile;
    //     } else {
    //         throw new HttpException(500, "Failed to upload file", NULL);
    //     }
    // }

    // public function deleteFile($file) {
    //     if (!$file) return;
    //     if (!unlink($file)) {
    //         echo "Failed to delete file";
    //     } else {
    //         echo "$file has been deleted";
    //     }
    // } 

    public function getClasses() {
        echo $this->classes->getClasses()->getEncoded();
    }

    public function createClass() {
        echo $this->classes->createClass($this->data);
        // check if class overlaps
        // $isOverlapped = $this->classes->isOverlap($this->data["start_date"], $this->data["end_date"]);
        // if (!$isOverlapped) {
        //     $this->classes->createClass($this->data);
        //     $res = new HttpException(200, "Scheduled successfully", NULL);
        //     echo $res->get();
        // } else {
        //     $res = new HttpException(400, "This class is overlapped", NULL);
        //     echo $res->get();
        // }
    }

    public function deleteClass() {
        echo $this->classes->deleteClass($this->data);
        // $id = $this->classes->getClassId($this->data["start_date"], $this->data["end_date"])->getData()["id"];
        // echo $this->classes->deleteClass($id);
    }

    public function getClassesByDate() {
        echo $this->classes->getClassesByDate($_GET);
        // $month = $_GET["month"];
        // $year = $_GET["year"];
        // $res = $this->classes->getClassesByDate($month, $year)->getEncoded();
        // echo $res;
    }

    public function endSession() {
        $_SESSION["UserLoggedIn"] = false;
        session_destroy();
        return;
    }
}
