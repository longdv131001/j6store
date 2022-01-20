app.controller("product-ctrl", function ($scope, $http) {
	//alert("Quản lý Product")
	$scope.items = [];
	$scope.cates = [];
	$scope.form = {};
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

		//load product
		$http.get("/rest/products").then(resp => {
			$scope.items = resp.data;
			$scope.items.forEach(item => {
				item.createDate = new Date(item.createDate)
			})
		})
		//load category
		$http.get("/rest/categories").then(resp => {
			$scope.cates = resp.data;
		})
	}
	//Khời đầu
	$scope.initialize();
	//Xóa form
	$scope.reset = function () {
		//alert("Reset")
		$scope.reset = function () {
			$scope.form = {
				createDate: new Date,
				image: 'cloud-upload.jpg',
				available: true,
			}
		};
	}
	//Hiển thị lên form
	$scope.edit = function (item) {
		$scope.form = angular.copy(item);
		$(".nav-tabs a:eq(0)").tab('show')
	}
	//Thêm mới
	$scope.create = function () {
		//alert("Create")
		var item = angular.copy($scope.form);
		$http.post(`/rest/products`, item).then(resp => {
			resp.data.createDate = new Date(resp.data.createDate)
			$scope.items.push(resp.data);
			$scope.reset();
			alert("Thêm mới sản phẩm thành công!");
		}).catch(error => {
			alert("Thêm mới thất bại");
			console.log("Lỗi nè===:", error);
		});
	}
	//Cập nhật
	$scope.update = function () {
		//alert("Update")
		var item = angular.copy($scope.form);
		$http.put(`/rest/products/${item.id}`, item).then(resp => {
			var index = $scope.items.findIndex(p => p.id == item.id);
			$scope.items[index] = item;
			alert("Cập nhật thành công!");
		}).catch(error => {
			alert("Cập nhật thất bại");
			console.log("Lỗi nè===:", error);
		});
	}
	//Xóa
	$scope.delete = function (item) {
		//alert("Delete")
		$http.delete(`/rest/products/${item.id}`).then(resp => {
			var index = $scope.items.findIndex(p => p.id == item.id);
			$scope.items.splice(index, 1);
			$scope.reset();
			alert("Xóa thành công!");
		}).catch(error => {
			alert("Xóa thất bại");
			console.log("Lỗi nè===:", error);
		});
	}
	//Upload ảnh
	$scope.imageChanged = function (files) {
		var data = new FormData();
		data.append('file', files[0]);
		$http.post('/rest/upload/images', data, {
			transformRequest: angular.identity,
			headers: { 'Content-Type': undefined }
		}).then(resp => {
			$scope.form.image = resp.data.name;
		}).catch(error => {
			alert("Lỗi upload ảnh");
			console.log("Error", error);
		})
	}

	//Phân trang
	$scope.pager = {
		page: 0,
		size: 10,
		get items() {
			var start = this.page * this.size;
			return $scope.items.slice(start, start + this.size);
		},
		get count() {
			return Math.ceil(1.0 * $scope.items.length / this.size);
		},
		first() {
			this.page = 0;
		},
		prev() {
			this.page--;
			if (this.page < 0) {
				this.last();
			}
		},
		next() {
			this.page++;
			if (this.page >= this.count) {
				this.first();
			}
		},
		last() {
			this.page = this.count - 1;
		}
	}
})