<?php
    //base of server
    include_once './server/global.php';
    header('Access-Control-Allow-Origin: *');
	// $user = $_POST['name'];
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" name="viewport" content="width=device-width, initial-scale=1" />
        <title>Lesson Management</title>
    </head>
    <body>
        <div id="root"></div>
        <script src="./client/dist/main.js"></script>
    </body>
</html>

