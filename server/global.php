<?php

set_include_path(dirname(__FILE__)); # include path - don't change
session_start();
include_once 'config.php';
include_once 'controllers/site_controller.php';
include_once "./helpers/HttpException.php";

?>