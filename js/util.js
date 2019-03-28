
function isNull(s) {
	return s === '' || s === null || s === undefined;
}

function isFunc(test) {
	return typeof test == 'function';
}

function isLength(s, min, max) { //判断长度
	return s.length >= min && s.length <= max;
}

function isEmail(s) { //正确的邮箱格式返回true
	var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	return myreg.test(s);
}

function isPhone(s,c) { //电话号码正则表达式
	return true;
	if(c) var a = /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$|(^(13[0-9]|15[0|3|6|7|8|9]|18[8|9])\d{8}$)/;
	else var a = /^(13[0-9]|15[0|3|6|7|8|9]|18[8|9])\d{8}$/;
	return a.test(s);
}

function getUrlParam(name) { // 获取指定的URL参数
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); //匹配目标参数
	if(r != null) return decodeURI(r[2]);
	return null; //返回参数值
}


function parseUrl() { // 获取指定的URL参数 对象形式返回
	var s = window.location.search.substr(1);
	if(isNull(s)) return null;

	var obj = {};
	var arr1 = s.replace(/&/g, ',').split(',');
	for(i in arr1) {
		var arr2 = arr1[i].replace('=', ',').split(',');
		obj['' + arr2[0] + ''] = decodeURI(arr2[1]);
	}

	return obj;
}

function parseJson(e){ // 字符串转JSON
	if(typeof e === 'object') var d = e;
	else if(typeof e === 'string' && (/^\{\S|\s*\}+$/).test(e)) var d = eval('['+e+']')[0];
	else if(typeof e === 'string' && (/^\[\S|\s*\]+$/).test(e)) var d = eval('['+e+']')[0];
	else return e;
	if(typeof d == 'array') {
		for(var i = 0; i < d.length; i++){
			d[i] = parseJson(d[i]);
		}
	} else if(typeof e === 'object') {
		for(var i in d){
			d[i] = parseJson(d[i]);
		}
	}
	return d;
}

function  filterFileType(files,type) {
	for(var j = 0; j < files.length; j ++){
		var c = true;
		for(var i = 0; i < type.length; i ++){
			if(files[j].type === type[i]) c = false;
		}
		if(c) return false;
	}
	return true;
}

function previewImage(_file,_img) {
	var preview = _img;
	var file = _file.files[0];
	var reader = new FileReader();
	reader.onloadend = function() {
		preview.src = reader.result;
	}
	if(file) {
		reader.readAsDataURL(file);
	} else {
		preview.src = "";
	}
}

function getImgFilesSrc(files,fn) {
	var srcs = new Array();
	var i = 0;
	var loadFile = function(file){
		var reader = new FileReader();
		reader.onloadend = function() {
			i++;
			srcs.push(reader.result);
			if(i <= files.length-1) loadFile(files[i]);
			else fn(srcs,files);
		};
		reader.readAsDataURL(file);
	};
	if(files.length) {
		loadFile(files[i]);
	}
}

function Base64() {

	// private property
	_keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

	// public method for encoding
	this.encode = function(input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;
		input = _utf8_encode(input);
		while(i < input.length) {
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);
			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;
			if(isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if(isNaN(chr3)) {
				enc4 = 64;
			}
			output = output +
				_keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
				_keyStr.charAt(enc3) + _keyStr.charAt(enc4);
		}
		return output;
	}

	// public method for decoding
	this.decode = function(input) {
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;
		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
		while(i < input.length) {
			enc1 = _keyStr.indexOf(input.charAt(i++));
			enc2 = _keyStr.indexOf(input.charAt(i++));
			enc3 = _keyStr.indexOf(input.charAt(i++));
			enc4 = _keyStr.indexOf(input.charAt(i++));
			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;
			output = output + String.fromCharCode(chr1);
			if(enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if(enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}
		}
		output = _utf8_decode(output);
		return output;
	}

	// private method for UTF-8 encoding
	_utf8_encode = function(string) {
		string = string.replace(/\r\n/g, "\n");
		var utftext = "";
		for(var n = 0; n < string.length; n++) {
			var c = string.charCodeAt(n);
			if(c < 128) {
				utftext += String.fromCharCode(c);
			} else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			} else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}

		}
		return utftext;
	}

	// private method for UTF-8 decoding
	_utf8_decode = function(utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;
		while(i < utftext.length) {
			c = utftext.charCodeAt(i);
			if(c < 128) {
				string += String.fromCharCode(c);
				i++;
			} else if((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i + 1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			} else {
				c2 = utftext.charCodeAt(i + 1);
				c3 = utftext.charCodeAt(i + 2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
		}
		return string;
	}
}

function tap(obj, fn) {
	var btn = $(obj);
	for(var i = 0; i < btn.length; i++) {
		if(isFunc(fn)) {
			$(btn).eq(i)[0].addEventListener('tap', fn, false);
		}
	}
}

function scroll_to_bottom(select_obj){//滚动到底部
	var scroll_height=$(select_obj)[0].scrollHeight;
	$(select_obj).scrollTop(scroll_height);
}


function XHR() {
	var xhr = null;
	try {
		xhr = new XMLHttpRequest();
	} catch(e) {
		var IEXHRVers = ["Msxml3.XMLHTTP", "Msxml2.XMLHTTP", "Microsoft.XMLHTTP"];
		for(var i = 0, len = IEXHRVers.length; i < len; i++) {
			try {
				xhr = new ActiveXObject(IEXHRVers[i]);
			} catch(e) {
				continue;
			}
		}
	}
	return xhr;
}

function xhrUpLoad(type, url, send, success, error, uploading) {
	var xhr = XHR();
	xhr.open(type, url, true);
    
	xhr.onreadystatechange = function() { //在readystatechange事件上绑定一个函数
		//在这里面没有使用this.readyState这是因为IE下面ActiveXObject的特殊性
		if(xhr.readyState == 4 && xhr.status == 200) { //readyState表示文档加载进度,4表示完毕
			var r = xhr.responseText;
			if(success instanceof Function) {
				success(r);
			}
		}else if(xhr.readyState == 4 && xhr.status !== 200){
			if(error instanceof Function) {
				error(xhr);
			}
		}
	};

	//侦查当前附件上传情况
	xhr.upload.onprogress = function(evt) {
		loaded = evt.loaded;
		tot = evt.total;
		per = Math.floor(100 * loaded / tot); //已经上传的百分比
		if(uploading instanceof Function) {
			uploading(per);
		}
	};
	//当接收到数据时,会调用readystatechange事件上的事件处理函数
	xhr.send(send);
}

// 把 JSON 对象，转换为 FormData 对象
function parseFormData(d){
	var fd = new FormData();
	if(d) for(var key in d) { fd.append(key,d[key]); };
	return fd;
}




//$(function(){
//	$('body').append('<div id="toast" class="toast-view"><i class="icon-success"></i><i class="icon-error"></i><i class="icon-jinggao"></i><i class="icon-info"></i><span></span></div>');
//});

$.showToast = function(s,t,c){
	$('#toast').attr('class', 'toast-view show '+c).find('span').text(s);
	clearTimeout(window.timeOut);
	window.timeOut = setTimeout(function() {
		$('#toast').attr('class', 'toast-view').find('span').text('');
	}, t);
};
$.toast = {
	success : function(s,t){
		$.showToast(s,t || 3000,'success');
	},
	error : function(s,t){
		$.showToast(s,t || 3000,'error');
	},
	warning : function(s,t){
		$.showToast(s,t || 3000,'warning');
	},
	info : function(s,t){
		$.showToast(s,t || 3000,'info');
	}
};

// 导入HTML <import data-url=""></import>
window.onload=function(){
	importHtml();
};
function importHtml(){
	$('import').each(function(){
		var self = this;
		var url = $(self).data('url');
		$.get(url,function(e){
			$(self).replaceWith(e);
		});
	});
}


function tab(){
	var self = this;
	self.btn = '[tab-target]';
	self.schedule = '.run-bar a';
	self.content = '.tab-content .tab-item';
	self.active = 'active';
	self.init = function(){
		$(document).on('click',self.btn,function(){
			var target = $(this).attr('tab-target');
			self.show(target);
		});
		return self;
	};
	self.show = function(target){
		if(target) {
			$(self.schedule).removeClass(self.active);
			$(self.content).removeClass(self.active);
			$(self.schedule+'.'+target).addClass(self.active);
			$(self.content+'#'+target).addClass(self.active);
			var index = $(self.schedule).index($('.'+target));
			$(self.schedule+':lt('+index+')').addClass(self.active);
		}
		return self;
	};
	return self;
}

function loading(){
	this.title = 'loading';
	this.init = function(s){
		this.title = s ? s : this.title;
		this.obj = $('<div/>').addClass('loading').attr('title',this.title).appendTo('body');
		return this;
	};
	this.show = function(ms){
		$(this.obj).fadeIn(ms|300);
		return this;
	};
	this.hide = function(ms){
		$(this.obj).fadeOut(ms|300);
		return this;
	};
	return this;
}

/*var loadingBox = new loading(); // 獲取加載框對象
	loadingBox.init(這裡可以給個需要顯示的文字,默認文字是:loading); // 初始化
	loadingBox.show(這個可以給個過渡時間,默認是300ms); // 顯示加載框 
	loadingBox.hide(這個可以給個過渡時間,默認是300ms); // 隱藏加載框*/


$.fn.frameData = function(){
	var d = $(this).serializeArray()
	var data = {};
	for(var i in d){
		data[d[i].name] = d[i].value;
	}
	return data;
};


/*
* 名称：本地存储函数
* 功能：兼容各大浏览器存储
* 作者：轩枫
* 日期：2015/06/11
* 版本：V2.0
*/
 
/**
 * LocalStorage 本地存储兼容函数
 * getItem: 获取属性
 * setItem: 设置属性
 * removeItem: 删除属性
 *
 *
 * @example
 *
	iLocalStorage.setItem('key', 'value');
	console.log(iLocalStorage.getItem('key'));
	iLocalStorage.removeItem('key');
 *
 */
 
 
(function(window, document){
 
	// 1. IE7下的UserData对象
	var UserData = {
		userData: null,
		name: location.href,
		init: function(){
			// IE7下的初始化
			if(!UserData.userData){
				try{
					UserData.userData = document.createElement("INPUT");
					UserData.userData.type = "hidden";
					UserData.userData.style.display = "none";
					UserData.userData.addBehavior("#default#userData");
					document.body.appendChild(UserData.userData);
					var expires = new Date();
					expires.setDate(expires.getDate() + 365);
					UserData.userData.expires = expires.toUTCString();
				} catch(e){
					return false;
				}
			}
			return true;
		},
 
		setItem: function(key, value){
			if(UserData.init()){
				UserData.userData.load(UserData.name);
				UserData.userData.setAttribute(key, value);
				UserData.userData.save(UserData.name);
			}
		},
 
		getItem: function(key){
			if(UserData.init()){
				UserData.userData.load(UserData.name);
				return UserData.userData.getAttribute(key);
			}
		},
 
		removeItem: function(key){
			if(UserData.init()){
				UserData.userData.load(UserData.name);
				UserData.userData.removeAttribute(key);
				UserData.userData.save(UserData.name);
			}
		}
 
	};
 
	// 2. 兼容只支持globalStorage的浏览器
	// 使用： var storage = getLocalStorage();
	function getLocalStorage(){
		if(typeof localStorage == "object"){
			return localStorage;
		} else if(typeof globalStorage == "object"){
			return globalStorage[location.href];
		} else if(typeof userData == "object"){
			return globalStorage[location.href];
		} else{
			throw new Error("不支持本地存储");
		}
	}
	var storage = getLocalStorage();
 
	function iLocalStorage(){
 
	}
 
	// 高级浏览器的LocalStorage对象
	iLocalStorage.prototype = {
		setItem: function(key, value){
			if(!window.localStorage){
				UserData.setItem(key, value);
			}else{
				storage.setItem(key, value);
			}
		},
 
		getItem: function(key){
			if(!window.localStorage){
				return UserData.getItem(key);
			}else{
				return storage.getItem(key);
			}
		},
 
		removeItem: function(key){
			if(!window.localStorage){
				UserData.removeItem(key);
			}else{
				storage.removeItem(key);
			}
		}
	}
 
 
	if (typeof module == 'object') {
	    module.exports = new iLocalStorage();
	}else {
	    window.iLocalStorage = new iLocalStorage();
	}
 
})(window, document);

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
