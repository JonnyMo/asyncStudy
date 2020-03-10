/**
 * 学习区分宏队列和 微队列 
 * 代码的执行先后顺序：
 * 先执行同步代码，遇到回调函数，将其放入 队列中，继续向下执行，直到所有的同步代码都执行完
 *
 * 队列中的代码执行顺序：
 * 微队列中的先执行，因为宏队列的回调函数在执行前，都会检查微队列中是否是空的，不是空的，才去执行宏任务
 *
 * promise 回调先执行
 * timeout 后执行
 */

/*
	promise onResolved()
	timeout callback
 */
/*
setTimeout(() => { // 会立即放入宏队列
	console.log('timeout callback');
})

Promise.resolve(1).then(value => {// 会立即放入微队列
	console.log('promise onResolved()')
})
*/

/*
执行结果：
4
1
3
2
 */
setTimeout(() => { // 会立即放入宏队列
	console.log(1);
	Promise.resolve(1).then(value => {
		console.log(2)
	})
})

setTimeout(() => {
	console.log(3);
})
Promise.resolve(1).then(value => {// 会立即放入微队列
	console.log(4);
})






