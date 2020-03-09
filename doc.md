#这是学习b站上的promise 的笔记

###promise 是什么？###
promise 是用来处理异步操作的一种手段

###常见的异步操作有哪些？
setTimeout、ajax请求 算是是最常见的异步操作了

###为什么要用promise，回调地狱是什么？

####举例： 串行发送多个请求
下面的代码是串行发送3个请求，且前面的请求的响应作为后一个请求的参数，  
最终需要嵌套3次拿到结果，交给handle函数处理  
`
ajax({url: url1}, function(response){
	if(!response.code  === '0'){
		handleError(response.msg)
		return;	
	}
	ajax({url: url2, data: response.text}, function(response){
		if(!response.code  === '0'){
			handleError(response.msg)
			return;	
		}
		ajax({url: url3, data: response.text}, function(response){
			handle(response.text)
			if(!response.code  === '0'){
				handleError(response.msg)
				return;	
			}
		})
	})
})
`
####使用Promise API 该如何写呢？
`function wraper(args) {
	return new Promise(function(resolve, reject){
		ajax(args, function(response){
			if(response.code === '0'){
				resolve(response.data)
			}else{
				reject(response.msg)
			}
		})
	});
}
wraper({url: url1}).then(function(value) {
	return wraper({url: url2, data: value})
}).then(function(value){
	return wraper({url: url3, data: value})	
}).then(function(value){
	handle(value)
}, function(err){
	handleError(err)
})`
看起来代码的长度变长了， 但发现没有，我们没有一层层的嵌套回调函数了，另外处理错误的代码只用写一次就够了
(这里只是嵌套了3个，要是是5个以上的请求呢？)

####其他好处
统一处理异常
