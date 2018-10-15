<?php


header("Access-Control-Allow-Methods: POST, GET, PUT");
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

class Record {

	var $url, $recordId, $token;
	function __construct($url, $recordId, $token) {
		$this->url = $url;
		$this->token = $token;
		$this->recordId = $recordId;
	}

	function httpGet() {
		$curl = curl_init();
		curl_setopt_array($curl, array(
    	CURLOPT_RETURNTRANSFER => 1,
    	CURLOPT_URL => $this->url,
    	CURLOPT_HTTPHEADER => array(
				'Authorization: Bearer '.$this->token
			)
    	));

		$response = curl_exec($curl);
		$responseData = json_decode($response, TRUE);
		return $response;

	}

	function httpPut($data, $url) {
		// $data = array("a" => $a);
		$ch = curl_init($url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
		curl_setopt($ch, CURLOPT_HTTPHEADER, array(
				'Authorization: Bearer '.$this->token,
				'Content-Type: application/json'
			));
		curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

		$response = curl_exec($ch);
		$responseData = json_decode($response, TRUE);
		return $response;
	}
}

$d = json_decode(file_get_contents("php://input"));
//$d = file_get_contents("php://input");

$token = $d->accessToken;

$data = $d->body;

$url = "https://app.iformbuilder.com/exzact/api/v60/profiles/480072/pages/3715122/records/132";

// $url = str_replace( '\/', '/', $url );

$object = new Record($url, 135, $token);

$responseData = $object->httpGet();

$responseData = json_decode($responseData, TRUE);


$recordEditRes = $object->httpPut($data, $url);

echo $recordEditRes;

?>