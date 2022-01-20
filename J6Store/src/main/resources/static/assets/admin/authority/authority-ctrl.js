app.controller("authority-ctrl",function($scope,$http,$location){
   $scope.initialize = function () {

		//load all Role
		$http.get("/rest/roles").then(resp => {
			$scope.roles = resp.data;
		})

		//load staff and directors (adminstrators)
		$http.get("/rest/accounts?admin=true").then(resp => {
			$scope.admin = resp.data;
		})

		//load authorities of staff and directors
		$http.get("/rest/authorities?admin=true").then(resp => {
			$scope.authorities = resp.data;
		}).catch(error => {
			$location.path("/unauthorized");
		})
//}

		$scope.authority_of=function (acc,role) {
			if($scope.authorities){
				return $scope.authorities.find(ur => ur.account.username ==acc.username && ur.role.id==role.id);

			}
		}

		$scope.authority_changed=function(acc,role) {
			var authority=$scope.authority_of(acc,role);
			if(authority){//đã cấp quyền => thu hồi quyền (xóa)
				$scope.revoke_authority(authority);
			}else{//chưa được cấp quyền => cấp quyền(thêm mới)
				authority={account:acc,role:role};
				$scope.grant_authority(authority);
			}
		}

		//Thêm mới authority
		$scope.grant_authority=function (authority) {
			$http.post(`/rest/authorities`,authority).then(resp =>{
				$scope.authorities.push(resp.data)
				alert("Cấp quyền sử dụng thành công");
			}).catch(error =>{
				alert("Cấp quyền sử dụng thất bại");
				console.log("Lỗi nè cu :",error);
			})
		}

		//Xóa authority


	
 }
});