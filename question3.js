

const first = () => (new Promise((resolve, reject) => {
	console.log(3)

	let p = new Promise((resolve, reject) => {
		console.log(7)

		setTimeout(() => {
			console.log(5) //?
			resolve(6)
		}, 0)

		resolve(1)//???
	})

	resolve(2) //???

	p.then((arg) => {//1
		console.log(arg)
	})
}))

first().then((arg) => {
	console.log(arg)//2
})

console.log(4)
/*
 结果： 3, 7, 4, 1, 2, 5
 宏： []
 微： []
 */
