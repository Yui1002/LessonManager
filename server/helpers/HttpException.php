<?php
class HttpException {
    private $statusCode;
    private $innerMessage;
    private $exceptionObj; //can be used as a wrapper for class

    public function __construct($code, $message, $exception)
    {
        $this->statusCode = $code;
        $this->innerMessage = $message;
        $this->exceptionObj = $exception;
    }

    public function get() {
        http_response_code($this->statusCode);
        echo $this->innerMessage;
    }
}


?>