var app = angular.module("zerion", []);
app.controller("zerionController", ['$scope', '$http', function($scope, $http){
	$res = {};
	$reqDataArray = [];
	$scope.formData = {
		first_name: '',
		last_name: '',
		age: '',
		date_today: '',
		school: '',
		graduation_year: '',
		ssn: '',
		email: '',
		phone: '',
		major: ''
	}

	function getToken() {
		$http.get('http://localhost/zerion/zerion.php')
		.then(function(response){
			console.log(response);
			$scope.res = response.data;
			$scope.token = response.data;
		});
	}

	getToken();

	function checkExp(str, pattern) {
		return pattern.test(str);
	}


	$scope.iForm = function() {
		var phonePattern = new RegExp(/^(\()\d{3}(\))(\s)\d{3}(-)\d{4}$/);
		var ssnPattern = new RegExp(/\d{3}(-)\d{2}(-)\d{4}$/);
		var zipPattern = new RegExp(/\d{5}$/);
		var datePattern = new RegExp(/\d{4}(-)\d{2}(-)\d{2}$/);

		if(!checkExp($scope.formData.phone, phonePattern)){
			alert("Phone number is invalid");
			return;
		}

		if(!checkExp($scope.formData.ssn, ssnPattern)){
			alert("SSN is invalid");
			return;
		}

		if(!checkExp($scope.formData.zip_code, zipPattern)){
			alert("ZIP code is invalid");
			return;
		}

		if(!checkExp($scope.formData.date_today, datePattern)){
			alert("date is invalid");
			return;
		}

		console.log($scope.formData);
		var keyNames = Object.keys($scope.formData);
		var count = 0;
		keyNames.forEach(function(entry){
			count++;
			var prop = {};
			prop.element_name = entry;
			prop.value = $scope.formData[entry];
			$reqDataArray.push(prop);
		});
		console.log($reqDataArray);
		var body = {};
		body.fields = $reqDataArray;
		$res.body = body;
		$res.accessToken = $scope.token;
		$res = JSON.stringify($res);
		console.log($res);
		var auth = 'Bearer ' + $scope.token;
		console.log('auth: '+auth);

		$http.post('http://localhost/zerion/postFormData.php', $res)
			.then(function(response){
				console.log(response);
				if(response.status === 200)
					alert("Data successfully posted");
				else
					alert("Data posting unsuccessful...");
			});

		$scope.formData = {};
		$res = {};
		$reqDataArray = [];
		getToken();

	}




}]);

app.controller("tokenController", ['$scope', '$http', function($scope, $http){
	$up = {};
	$updateDataArray = [];

	$scope.updateData = {
		element_name: '',
		value: ''
	}


	function getToken() {
		$http.get('http://localhost/zerion/zerion.php')
		.then(function(response){
			console.log(response);
			$scope.res = response.data;
			$scope.token = response.data;
		});
	}

	getToken();

	function checkExp(str, pattern) {
		return pattern.test(str);
	}	

	$scope.iRecord = function() {
		var phonePattern = new RegExp(/^(\()\d{3}(\))(\s)\d{3}(-)\d{4}$/);
		var ssnPattern = new RegExp(/\d{3}(-)\d{2}(-)\d{4}$/);
		var zipPattern = new RegExp(/\d{5}$/);
		var datePattern = new RegExp(/\d{4}(-)\d{2}(-)\d{2}$/);



		console.log($scope.updateData);
		var keyNames = Object.keys($scope.updateData);
		var count = 0;
		var prop = {};
		prop.element_name = $scope.updateData.element_name;
		prop.value = $scope.updateData.value;
		$updateDataArray.push(prop);
		// keyNames.forEach(function(entry){
		// 	if ($scope.updateData[entry] == ('' || undefined || "" || NaN) || null) {
		// 		return;
		// 	}
		// 	else{
		// 		count++;
		// 		var prop = {};
		// 		prop.element_name = entry;
		// 		prop.value = $scope.updateData[entry];
		// 		$updateDataArray.push(prop);
		// 	}
		// });
		console.log($updateDataArray);
		var body = {};
		body.fields = $updateDataArray;
		$up.body = body;
		$up.accessToken = $scope.token;
		$up = JSON.stringify($up);
		console.log($up);
		var auth = 'Bearer ' + $scope.token;
		console.log('auth: '+auth);

		$http.post('http://localhost/zerion/getRecord.php', $up)
			.then(function(response){
				console.log(response);
				if(response.status == 200)
					alert("Data successfully posted");
				else
					alert("Data posting unsuccessful...");
			});

		$up = {};
		$updateDataArray = [];
		getToken();

	}
}]);