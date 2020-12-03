// 节流函数
export function debounce(func,delay){
	let timer=null;
	return function(){
		if(timer){
			clearTimeout(timer);
		};
		timer=setTimeout(func,delay);
	}
}

// 时间戳转字符串函数
export function formatDate(value) {
  var date = new Date(value);
  var y = date.getFullYear(),
    m = date.getMonth() + 1,
    d = date.getDate(),
    h = date.getHours(),
    i = date.getMinutes(),
    s = date.getSeconds();
  if (m < 10) { m = '0' + m; }
  if (d < 10) { d = '0' + d; }
  if (h < 10) { h = '0' + h; }
  if (i < 10) { i = '0' + i; }
  if (s < 10) { s = '0' + s; }
  var t = y + '-' + m + '-' + d + ' ' + h + ':' + i + ':' + s;
  return t;
}