/**
 * async 函数
 * 1. 函授的返回值为Promise对象
 * 2. promise对象的结果由async函数执行的返回值决定
 * 3. 函数内部可以不使用await
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
/*
async function testAsyncPromise() {
	return Promise.reject('出错了')	
}
testAsyncPromise().then((value) => {
	console.log("成功了 ", value)
}, (reason) => {
	console.log("失败了 ", reason)
})
*/



/*
	用于获取promise对象的结果	
	await 修饰符 必须写在async 函数中，但是async 函数中可以不使用await
	如果 await 的promise失败了，就会抛出异常，需要通过try catch来捕获
 */
// 下面的例子代码 使用的是await 右边的函数返回的是一个promise对象的例子
// ********************************************  
// await 的结果就是 promise 的value, 注意await 只能拿到成功的promise 的值
/*
function fn2() {
	return new Promise((resolve, reject)=>{
		setTimeout(() => {
			resolve(1)
		}, 2000);
	})
}

async function fn3() {
	const value = await fn2();
	console.log(value);
	console.log("这里得等待 await执行后才执行")
	return value;
}

fn3().then((val) => {
	console.log("成功的值是: ", val)
}, (reason) => {
	console.log("失败的 reason: ", reason)
})
*/

/*
	如果await 右侧函数 抛出异常了：
	1. 右侧的函数执行报错了
	2. 右侧返回的是一个失败的Promise对象

	async 函数内，await下面的代码都不会执行，所以这里需要非常注意如果await 右侧函数会抛出错误，一定要捕获
	并且 async 函数会返回一个失败的 promise对象，失败的原因就是 抛出的错误
*/
/*
function fn2(){
	// throw 1;
	return Promise.reject(1)
}

async function fn3() {
	try{
		const value = await fn2()
	}catch(e){
		console.log("出错了: ", e)
	}
	// 只有上面加上了try catch 才会执行
	console.log('这行代码不会执行了')
}

fn3().then((value) => {
	console.log('成功了， value: ', value)
}, (reason) => {
	console.log('失败了， reason: ', reason)
})
*/

// 如果await 右边的函数返回的是一个非promise对象，那await 就返回右边函数的返回值
/*
function fn2() {
	return 'hello';
}	

async function fn3() {
	const value = await fn2();
	console.log("value: ", value)
}

fn3().then((val) => {
	console.log("成功的值是: ", val)
})
*/


