/**
		测试 executor 是否是异步执行的
		输出是 1, 2,  Promise { <pending> }
		表明 executor 函数是同步执行的 
		并且，如果不执行 resolve 或 reject promise状态就是pending
*/
/*
var p = new Promise((resolve, reject) => {
	console.log(1)
}).then((value) =>{
	console.log("成功了")	
}, (reason)=> {
	console.log("失败了")	
})
console.log(2);
console.log(p);
*/

/**
 * 测试then 获取 成功或失败的值
 */
/*
new Promise((resolve, reject)=>{
	//resolve(1)	
	reject(2)
}).then((value) =>{
	console.log("获取成功的值: ", value);
}, (reason) => {
	console.log("失败的理由是： ", reason)
})
 */


/**
 * 测试先设置onResolved 和 onRejected 回调，再改变状态
 * 表明promise 对于先设置回调函数还是后设置回调函数，都可以在状态改变时执行对应的回调函数 
 */
/*
new Promise((resolve, reject)=>{
	setTimeout(() => {
		resolve(2)	
	}, 2000)
}).then((value) =>{
	console.log("获取成功的值: ", value);
})
 */


/**
 * 测试then 设置的onResolved 和 onRejected 回调函数 都是异步执行的
 * 输出是: 1, 3, 4, 2
 * 1,3 的输出 理由同上面的例子一样，executor代码是同步的，
 * 执行到resolve(2) 的时候，会将 onResolved 放入异步队列中将继续向下执行，输出4，
 * 等到同步代码执行完了，执行onResolved 函数
 */
/*
var p = new Promise((resolve, reject) => {
	console.log(1)
	resolve(2);
	console.log(3);
}).then((val) => {
	console.log("成功了, 值是: ", val)
}, (reason) => {
	console.log("失败了, 理由是: ", reason)
})
console.log(4)
*/

/**
 * 测试 Promise 的then 返回值 
 * 测试结果： 
 *  Promise { <pending> }
 *	成功了, 值:  1
 *	Promise { undefined }
 *	
 * 最先执行的是86行的代码， 是一个Promise对象，直接输出的是 pending状态的，
 * 倒计时后输出的是一个 resolved状态的 promise 对象, 值是 undefined
 * p的状态改变 发生在 then的 onResolved执行后改变的，也说明onResolved 是异步执行的
 */
/*
var p = new Promise((resolve, reject) => {
	resolve(1);
}).then((value) => {
	console.log('成功了, 值: ', value)
}, (reason) => {
	console.log('失败了')	
})
console.log(p)
setTimeout(() => {
	console.log(p)
}, 1000)
*/

/**
 * 测试 then 返回值是一个非Promise对象的情况
 *  第一个then的onResolved 没有返回值, 即 返回的是 undefined
 *  导致第一个then 返回的promise状态就是 成功的，值就是 undefined
 *  进而导致第二个then的 onResolved 回调函数执行了，value就是 undefined 
 */
/*
var p = new Promise((resolve, reject) => {
	resolve(1);
}).then((value) => {
	console.log('成功了, 值: ', value)
}, (reason) => {
	console.log('失败了')	
}).then((value) => {
	//为什么这里会执行？
	console.log("成功2：", value)
}, (reason) => {
	console.log("失败2： ", reason)
})
*/

/**
 * 测试 then 返回值是一个Promise对象的情况
 *  第一个then的onResolved 回调函数返回的是一个Promise对象，此Promise 是一个成功的，值为 ***的promise
 *  导致第一个then 返回的promise状态就是 成功的，值就是 *** 
 *  进而导致第二个then的 onResolved 回调函数执行了，value就是 *** 
 */
var p = new Promise((resolve, reject) => {
	resolve(1);
}).then((value) => {
	console.log('成功了, 值: ', value)
	return Promise.resolve("***")
}, (reason) => {
	console.log('失败了')	
}).then((value) => {
	//为什么这里会执行？
	console.log("成功2：", value)
}, (reason) => {
	console.log("失败2： ", reason)
})















