<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

class PostData {
	var $body;
	var $accessToken;
	var $url;
	
	function __construct($body, $accessToken){
		$this->body = $body;
		$this->accessToken = $accessToken;
		$url = "https://app.iformbuilder.com/exzact/api/v60/profiles/480072/pages/3715122/records";
		$url = str_replace( '\/', '/', $url );
	}
	
	
	function httpPost($url, $data){
		$ch = curl_init($url);
		curl_setopt_array($ch, array(
			CURLOPT_POST => TRUE,
			CURLOPT_RETURNTRANSFER => TRUE,
			CURLOPT_HTTPHEADER => array(
				'Authorization: Bearer '.$this->accessToken,
				'Content-Type: application/json'
			),
			CURLOPT_POSTFIELDS => json_encode($this->body)
		));
		$response = curl_exec($ch);
		$responseData = json_decode($response, TRUE);
		return $response;
		}
}

$d = json_decode(file_get_contents("php://input"));
//$d = file_get_contents("php://input");


$token = $d->accessToken;
//echo $token;
$data = $d->body;

//$data = json_encode($data);
//echo $d;

//$data = '{"fields":[{"element_name":"first_name","value":"Prayas"},{"element_name":"last_name","value":"Rode"},{"element_name":"age","value":"26"}]}';

//$data = json_decode($data);
//$data = json_encode($data);
//echo $data;


//$token = "f427d20eb05ad5d8d1a9fb68ea3f113701d0635d";

$object = new PostData($data, $token);

$url = "https://app.iformbuilder.com/exzact/api/v60/profiles/480072/pages/3715122/records";
$url = str_replace( '\/', '/', $url );
//echo "My name is Anthony";
$responseData = $object->httpPost($url, $data);
//echo json_encode($responseData);
echo $responseData;

?>