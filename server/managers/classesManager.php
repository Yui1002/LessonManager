<?php

include_once SYSTEM_PATH . "/repositories/classesRepository.php";
include_once SYSTEM_PATH . "/helpers/HttpException.php";

class classesManager {
    private $classes;

    public function __construct()
    {
        $this->classes = new ClassesRepository();
    }

    public function getClasses() {
        return $this->classes->getClasses();
    }

    public function createClass($data) {
        $isOverlapped = $this->classes->isOverlap($data["start_date"], $data["end_date"]);
        if (!$isOverlapped) {
            $this->classes->createClass($data);
            $res = new HttpException(200, "Scheduled successfully", NULL);
            return $res->get();
        } else {
            $res = new HttpException(400, "This class is overlapped", NULL);
            return $res->get();
        }
    }

    public function deleteClass($data) {
        $id = $this->classes->getClassId($data["start_date"], $data["end_date"])->getData()["id"];
        return $this->classes->deleteClass($id);
    }

    public function getClassesByDate($data) {
        $month = $data["month"];
        $year = $data["year"];
        $res = $this->classes->getClassesByDate($month, $year)->getEncoded();
        return $res;
    }

}