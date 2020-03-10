/**
 * async 函数
 * 1. 函授的返回值为Promise对象
 * 2. promise对象的结果由async函数执行的返回值决定
 */


/**
 * 下面的代码执行结果是 
 * true
 * 成功了 1
 * 上面的true 验证了，返回值是一个Promise对象
 * 下面的 1 验证了，testAsync 真实的返回值是 1，所以才导致a 触发onResolved 
 * @return {[type]} [description]
 */
/*
async function testAsync(){
	return 1;
}

let a = testAsync()
console.log(a instanceof Promise);
a.then((value) => {
	console.log('成功了', value);
}, (reason) =>{
	console.log("失败了 ", reason)
})
*/

/**
 * 执行结果是：
 * 失败了  TypeError: 哈哈
 * 抛出异常，相当于执行了 reject 
 */
/*
async function testAsync(){
	throw new TypeError('哈哈')
}
let a = testAsync()
a.then((value) => {
	console.log('成功了', value);
}, (reason) =>{
	console.log("失败了 ", reason)
})
*/


/**
 * 可以猜测 如果aysnc 函数内部返回一个新的Promise对象A，那执行async函数后，返回值就是跟A一样的状态和值
 * 这里的返回值的逻辑，跟 Promise 的then onResolved onRejected 回调函数执行的返回值逻辑一样
 */
async function testAsyncPromise() {
	return Promise.reject('出错了')	
}
testAsyncPromise().then((value) => {
	console.log("成功了 ", value)
}, (reason) => {
	console.log("失败了 ", reason)
}	)

