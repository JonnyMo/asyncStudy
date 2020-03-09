(function (window) {
	const RESOLVED = 'resolved'
	const REJECTED = 'rejected'
	const PENDING = 'pendding'
	
	function Promise(executor){
		var self = this;
		self.result = undefined
		self.status = PENDING 
		self.callbacks = [];

		function resolve(value){
			if (self.status !== PENDING){
				return;
			}
			// 存放onResolved 或 onRejected 回调函数执行的结果
			let data = null;
			self.result = value
			self.status = RESOLVED

			// 立刻异步执行回调函数
			if(self.callbacks.length > 0){
				setTimeout(() => {
					self.callbacks.forEach((callbackObj) => {
						data = callbackObj.onResolved(self.result)
					})
				})
			}
		}

		function reject(reason) {
			if (self.status !== PENDING){
				return;
			}
			self.result = reason
			self.status = REJECTED
			// 立刻异步执行回调函数
			// 存放onResolved 或 onRejected 回调函数执行的结果
			let data = null;
			if(self.callbacks.length > 0){
				setTimeout(() => {
					self.callbacks.forEach((callbackObj) => {
						callbackObj.onRejected(self.result)
					})
				})
			}
		}

		//万一 执行器函数报错了， 就要执行reject
		try{
			executor(resolve, reject)
		}catch(e){
			reject(e)
		}
	}


	Promise.prototype.then = function(onResolved, onRejected) {
		let self = this;
		

		return new Promise(function (resolve, reject) {
			let data = null;

			if(typeof onResolved !== 'function'){
				onResolved = (value) => value;
			}
			if(typeof onRejected !== 'function'){
				onRejected = (err) => {throw err};
			}

			function _handle(callbackFn){
				try{
					data = callbackFn(self.result)
					if(data instanceof Promise){
						data.then((value) =>{
							resolve(value)
						}, (reason) =>{
							reject(reason)
						})
					}else{
						resolve(data)
					}							
				}catch(e){
					reject(e)
				}
			}

			// 对于先绑定onResolved 和 onRejected 回调函数的情况，
			// 需要重新包装onResolved，并加上处理then返回的promise实例的 状态
			if(self.status === PENDING){
				// 注意在这里来改变then 返回的Promise实例的状态
				self.callbacks.push({
					onResolved(){
						_handle(onResolved)
					}, onRejected(){
						_handle(onRejected)
					}
				})
			}else if(self.status === RESOLVED){
				setTimeout(()=>{
					_handle(onResolved)
				})
			}else{
				setTimeout(()=>{
					_handle(onRejected)
				})
			}	
		})

	}


	Promise.prototype.catch = function(onRejected) {
		return this.then(null, onRejected)
	};


	Promise.all = function(promises) {

		return new Promise((resolve, reject)=>{
			let count = 0;	
			let values = new Array(promises.length);

			promises.forEach((obj, index) => {
				if(obj instanceof Promise){
					obj.then((value) => {
						// 保证成功的值都是按promises 数组中的顺序来存放的
						values[index] = value;
						count++;
						if(count === promises.length){
							resolve(values)
						}
					}, 
					(err) => {
						reject(err)	
					})
				}else{
					count++;
					values[index] = obj;
					if(count === promises.length){
						resolve(values)
					}
				}
			})	
		});

	};

	Promise.race = function (promises) {
		return new Promise((resolve, reject) => {
			promises.forEach((obj) => {
				if (obj instanceof Promise){
					obj.then(resolve, reject)
				}else {
					resolve(obj)
				}
			})		
		})
	}

	Promise.resolve = function (val) {
		return new Promise((resolve, reject) => {
			resolve(val)
		});
	}

	Promise.reject = function (reason) {
		return new Promise((resolve, reject) => {
			reject(reason)
		});
	}


	window.Promise = Promise;
})(window)