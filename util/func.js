export function debounce(fn, delay) {
	let timer = null;
	return function() {
		let context = this; //事件调用的话，this就是dom对象
		let args = arguments; //事件调用的话，就是事件的e参数
		//将上一个的定时器清除
		if (timer) {
			clearTimeout(timer)
		};
		//建立新的定时器
		timer = setTimeout(fn.bind(context, args), delay);
	}
}
//全局唯一标识符
export function guid(len, radix) {
	var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
	var uuid = [],
		i;
	radix = radix || chars.length;

	if (len) {
		// Compact form
		for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
	} else {
		// rfc4122, version 4 form
		var r;

		// rfc4122 requires these characters
		uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
		uuid[14] = '4';

		// Fill in random data.  At i==19 set the high bits of clock sequence as
		// per rfc4122, sec. 4.1.5
		for (i = 0; i < 36; i++) {
			if (!uuid[i]) {
				r = 0 | Math.random() * 16;
				uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
			}
		}
	}

	return uuid.join('');
}
export function random(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}
export function randomName() {
	var str1 = "赵钱孙李周吴郑王冯陈褚卫蒋沈韩杨朱秦尤许何吕施张孔曹严华金魏陶姜戚谢邹喻柏水窦章云苏潘葛奚范彭郎";
	var str2 = "一二三四五六七八九十壹贰叁肆伍陆柒捌玖拾";
	return str1[random(0, 47)] + str2[random(0, 19)] + str2[random(0, 19)];
}
export function randomAvatar() {
	let n = random(1, 20)
	return `../../static/images/avatar/${n}.jpg`;
}
//对象数组交集
export function intersect(a, b) {
	var obj = {};
	var arr = a.concat(b);
	let res = arr.reduce(function(pre, cur) {
		obj.hasOwnProperty(cur.user.uid) ? pre.push(cur) : obj[cur.user.uid] = true;
		return pre;
	}, []);
	console.log(res)
	return res
}
//对象数组并集
export function union(a, b) {
	var obj = {};
	var arr = a.concat(b);
	let res = arr.reduce(function(pre, cur) {
		if (!obj.hasOwnProperty(cur.user.uid)) {
			pre.push(cur);
		}
		obj[cur.user.uid] = true;
		return pre;
	}, [])


}
/**
 * 对比版本号，如需要，请自行修改判断规则
 * 支持比对	("3.0.0.0.0.1.0.1", "3.0.0.0.0.1")	("3.0.0.1", "3.0")	("3.1.1", "3.1.1.1") 之类的
 * @param {Object} v1
 * @param {Object} v2
 * v1 > v2 return 1
 * v1 < v2 return -1
 * v1 == v2 return 0
 */
export function compareVersion(v1 = '0', v2 = '0') {
	const arr1 = version1.split('.')
	const arr2 = version2.split('.')
	const length1 = arr1.length
	const length2 = arr2.length
	const minlength = Math.min(length1, length2)
	let i = 0
	for (i; i < minlength; i++) {
		let a = parseInt(arr1[i])
		let b = parseInt(arr2[i])
		if (a > b) {
			return 1
		} else if (a < b) {
			return -1
		}
	}
	if (length1 > length2) {
		for (let j = i; j < length1; j++) {
			if (parseInt(arr1[j]) != 0) {
				return 1
			}
		}
		return 0
	} else if (length1 < length2) {
		for (let j = i; j < length2; j++) {
			if (parseInt(arr2[j]) != 0) {
				return -1
			}
		}
		return 0
	}
	return 0
}
