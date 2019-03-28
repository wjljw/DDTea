var $ = mui;

var config = {
	localhost : 'https://www.alqqj.com/',
	callBack : '',//'?jsoncallback=?',
	suffix : '.action',
	sidkey : 'user-sid',
	basePath : {
		rGoodsListBySearchAction:'rGoodsListBySearchAction'
	},
	imgPath : {
		
	},
	audios : {
		msg : 'audio/msg.mp3'
	},
	path : {
		
	},
	imgType : ['image/jpeg','image/jpg','image/png'],
	init : function(){
		for(var key in this.basePath){
			this.path[key] = this.localhost+this.basePath[key]+this.suffix+this.callBack;
		}
		for(var key in this.imgPath){
			this.path[key] = this.localhost+this.imgPath[key]+this.suffix;
		}
	},
	data : {
		bizChannel : ''//不指定参数则为全部频道【外卖：takeout 超市：supermarket】
	}
};

config.init(); // 初始化拼接路徑


mui.fn['hasClass'] = function(s){
	var self = this.length >= 1 ? this[0] : this;
	return (new RegExp('(\\s|^)' + s + '(\\s|$)')).test(self.className); 
};

mui.fn['addClass'] = function(s){
	for(var i = 0; i < this.length; i ++){
		var self = this[i];
		if(!mui(self).hasClass(s)) {
			self.className = (self.className.trim())+' '+s;
		}
	}
	return this;
};

mui.fn['removeClass'] = function(s){
	for(var i = 0; i < this.length; i ++){
		var self = this[i];
		if(mui(self).hasClass(s)) {
			var reg = new RegExp('(\\s|^)' + s + '(\\s|$)');  
			self.className = self.className.trim().replace(reg,' ');
		}
	}
	return this;
};

mui.fn['remove'] = function(s){
	for(var i = 0; i < this.length; i ++){
		var self = this[i];
		self = self.remove();
	}
	return this;
};

mui.fn['receive'] = function(s){
	for(var i = 0; i < this.length; i ++){
		var self = this[i];
		self = self.receive();
	}
	return this;
};


mui.fn['show'] = function(s){
	for(var i = 0; i < this.length; i ++){
		var self = this[i];
		if(self.style.display === 'none' || self.style.display === '') self.style.display = 'block';
	}
	return this;
};

mui.fn['hide'] = function(s){
	for(var i = 0; i < this.length; i ++){
		var self = this[i];
		if(self.style.display !== 'none') self.style.display = 'none';
	}
	return this;
};

mui.fn['text'] = function(s){
	if(s == null || s == undefined) return (this[0].innerText||this[0].innerHTML);
	for(var i = 0; i < this.length; i ++){this[i].innerText=s;} return this;
};

mui.fn['val'] = function(s){
	if(s == null || s == undefined) return this[0].value;
	for(var i = 0; i < this.length; i ++){this[i].value=s;} return this;
};

mui.fn['attr'] = function(name,val){
	name = name || false;
	if(name) {
		if(val == null || val == undefined) return this[0].getAttribute(name);
		for(var i = 0; i < this.length; i ++){
			var self = this[i];
			self.setAttribute(name,val);
		}
	}
	return this;
};

mui.fn['html'] = function(s){
	if(s == null || s == undefined) {
		return this[0].innerHTML;
	}
	for(var i = 0; i < this.length; i ++){
		var self = this[i];
		self.innerHTML = s;
	}
	return this;
};

mui.fn['append'] = function(s){
	s = typeof s === 'object' ? s.outerHTML : s; 
	for(var i = 0; i < this.length; i ++){
		var self = this[i];
		var div = document.createElement('div');
			div.innerHTML = s;
		var nodes = div.childNodes;
		for(var j = 0; j < nodes.length; j++) {
			self.appendChild(nodes[j].cloneNode(true));
		}
		div.remove();
	}
	return this;
};


mui.fn['css'] = function(csss){
	if(csss) {
		for(var i = 0; i < this.length; i++){
			var self = this[i];
			for(var key in csss) {
				var cssName = prefix(key);
				if(cssName) self.style[cssName] = csss[key];
			}
		}
	}
	return this;
};


mui.fn['frameData'] = function(){
	var self = this[0];
	var els = self.querySelectorAll('[name]');
	var data = {};
	for(var i = 0; i < els.length; i++){
		var name = els[i].getAttribute('name');
		if(name) data[name] = els[i].value;
	}
	return data;
};


mui.fn['eq'] = function(s){
	var els = [];
	if(this && this.length && !isNaN(s)) {
		els = [this[s]];
	}
	return mui(els);
};

mui.fn['find'] = function(s){
	var els = [];
	if(this && this.length && s && typeof s == 'string') {
		for(var i = 0; i < this.length; i++){
			var el = this[i].querySelectorAll(s) || [];
			for(var i = 0; i < el.length; i++){
				els.push(el[i]);
			}
		}
	}
	return mui(els);
};

mui.fn['parent'] = function(){
	var els = [];
	if(this && this.length) {
		for(var i = 0; i < this.length; i++){
			offRepeat(els,[this[i].parentElement]);
		}
	}
	return mui(els);
};

mui.fn['parents'] = function(s){
	var els = [];
	if(this && this.length && s && typeof s == 'string') {
		for(var i = 0; i < this.length; i++){
			if((/^\.\S+$/).test(s)){
				var classList = this[i].parentElement.classList || [];
				var className = s.replace(/^\./,'');
				for(var j = 0; j < classList.length; j++){
					if(className == classList[j]) {
						els.push(this[i].parentElement);
						break;
					}
				}
			}else if((/^\#\S+$/).test(s)){
				var id = s.replace(/^\#/,'');
				if(this[i].parentElement.id == id) offRepeat(els,[this[i].parentElement]);
			}else{
				if(this[i].parentElement.localName == s)  offRepeat(els,[this[i].parentElement]);
			}
			if(this[i].parentElement.localName != 'html') {
				var arr = mui(this[i].parentElement).parents(s);
				offRepeat(els,arr);
			}
		}
	}
	return mui(els);
};


function $ajax(url,opt,sfn,efn){
	window.rnum = window.rnum ? window.rnum + 1 : 1;
	var sid = iLocalStorage.getItem(config.sidkey);
	var options = {
		data:$.extend({},{'sid' : sid},config.data),
		dataType:'json',//服务器返回json格式数据
		type:'post',//HTTP请求类型
		timeout:10000,//超时时间设置为10秒；
		async:true, // 异步
		loading:true, // 默认使用加载提示
		cache: false , // 不缓存
		success:function(data){
			window.rnum--;
			//if(!window.rnum) loadBox.hide();
			data = parseJson(data);
			if(data.status === 'SUCCESS') {
				if(isFunc(sfn)) sfn(data);
			} else if (data.status === 'ERROR') {
				if(isFunc(sfn)) sfn(data);
				$.toast.error(data.msg);
			} else if (data.status === 'LOGIN') {
				var pages = ['index.html','supermarket.html','search.html','change-address.html','shop.html','cell-phone-retrieval.html','common-question.html','my-public.html','help-core.html'];
				if(isCurrentLocation(pages)) {
					if(isFunc(sfn)) sfn(data);
					return false;
				}
				$.toast.error(data.msg);
				setTimeout(function(){
					window.location.href = 'login.html';
				},1000);
			}
		},
		error:function(xhr,type,errorThrown){
			window.rnum--;
			if(!window.rnum) loadBox.hide();
			$.toast.error('requestError');
			if(isFunc(efn)) efn(xhr,type,errorThrown);
		}
	};
	if(opt) {
		if(opt.processData === false) opt.data.append('sid',sid);
		options = $.extend(true,options,opt);
	}
	//if(options.loading) loadBox.show();
	$.ajax(url,options);
}

/*new loadDataTemplate({
	path : 路徑,
	contentTpl : 內容模版,
	contentTplTarget : 內容目標,
	pgTpl : 分頁模版,
	pgTplTarget : 分頁目標,
	data : {
		數據體
	},
	success : function(){}
});*/
function loadDataTemplate(d){
	var self = this;
	self.tplData = {auto : true , loading : true , method : 'html'};
	self.tplData.data = {};
	self.tplData.result = {};
	self.tplData.contentTpl = null;
	self.tplData.contentTpl = null;
	if(d) {
		$.extend(self, $.extend(self.tplData, d));
	}
	self.init = function(){
		if(self.tplData.auto) self.load();
		if(self.tplData.pgTpl) self.pageEvents();
		return self;
	};
	self.load = function(d,e){
		if(d) $.extend(self.tplData.data, d);
		$ajax(self.tplData.path,{data:self.tplData.data,loading:self.tplData.loading},function(r){
			var r = parseJson(r);
			if(r.status === 'SUCCESS') {
				r.data = parseJson(r.data);
				$.extend(r,{ host : config.localhost , userinfo : window.USERINFO, language : window.LANGUAGE});
				if(r.pg) r.pg = parseJson(r.pg);
				if(e) $.extend(r,e);
				// 拷贝新数据对象，防止目标中修改了原型数据
				var d = {};
				d = $.extend(true,d,r);
				if(self.tplData.contentTpl) $(self.tplData.contentTplTarget)[self.tplData.method](self.tplData.contentTpl(d));
				if(self.tplData.pgTpl) $(self.tplData.pgTplTarget).html(self.tplData.pgTpl(d));
				if($.isArray(r.data)){
					r.getDataById = {};
					for(var i in r.data){
						r.getDataById[r.data[i].id] = r.data[i];
					}
				}
				$.extend(self.tplData.result, r);
				if($.isFunction(self.tplData.success)) self.tplData.success(r);
			}
		});
		return self;
	};
	self.search = function(d){
		$(self.tplData.contentTplTarget).html('');
		self.tplData.data['pg.pageIndex'] = 1;
		self.load(d);
		return self;
	};
	self.pageEvents = function(){
		$(document).off('click',self.tplData.pgTplTarget+' [pageIndex]');
		$(document).on('click',self.tplData.pgTplTarget+' [pageIndex]',function(){
			var i = $(this).attr('pageIndex');
			self.tplData.data['pg.pageIndex'] = i < 1 ? 1 : i > self.tplData.result.pg.totalPage ? self.tplData.result.pg.totalPage : i;
			self.load();
		});
		$(document).off('click',self.tplData.pgTplTarget+' .pageNumSelect');
		$(document).on('change',self.tplData.pgTplTarget+' .pageNumSelect',function(){
			self.tplData.data['pg.pageIndex'] = $(this).val();
			self.load();
		});
		return self;
	};
	return self;
}

function language(callBack){
	var self = this;
	self.lang = iLocalStorage.getItem('language') ? parseJson(iLocalStorage.getItem('language')) : {current:false};
	self.init = function(isUpdate){
		$ajax(config.path.rDsrcKeyAction,{async:false,loading:false},function(r){
			if(self.lang.version != r.data || isUpdate) {
				self.lang.version = r.data;
				self.load();
			} else {
				window.LANGUAGE = self.lang.data[self.lang.current];
				if(window.USERINFO && window.USERINFO.status == 'SUCCESS') {
					LANGUAGE.currency_chart = USERINFO.data.currencyInfo.currencyChart;
				}
				self.frameLang(LANGUAGE); // 序列页面上需要显示的语言
				if(isFunc(callBack)) callBack(self.lang);
			}
		});
		return self;
	};
	self.load = function(){
		$ajax(config.path.rDsrcListOfTextAction,{
			async:false,
			loading:false,
			data : {
				'dsrc.keycode' : self.lang.version
			}
		},function(r){
			if(r.data){
				self.lang.current = r.data.language;
				self.lang.data = self.lang.data ? self.lang.data : {};
				self.lang.data[r.data.language] = r.data.src;
				self.lang.data[self.lang.current]['currency_chart'] = r.data.currency_chart; // 币种符号
				self.lang.data[self.lang.current]['platform_customer_phone'] = r.data.platform_customer_phone; // 客服电话
				self.lang.data[self.lang.current]['platform_currency_info'] = r.data.platform_currency_info;
				self.lang.data[self.lang.current]['platform_language'] = r.data.platform_language;
				window.LANGUAGE = self.lang.data[self.lang.current];
				iLocalStorage.setItem('language',JSON.stringify(self.lang));
				self.frameLang(LANGUAGE); // 序列页面上需要显示的语言
				if(isFunc(callBack)) callBack(self.lang);
			}
		});
		return self; 
	};
	self.getLang = function(){
		if(self.lang.current && isFunc(callBack)) {
			window.LANGUAGE = self.lang.data[self.lang.current];
			self.frameLang(LANGUAGE); // 序列页面上需要显示的语言
			callBack(self.lang);
		} else self.init();
	};
	self.frameLang = function(lang){
		lang = lang || window.LANGUAGE;
		$('[lgt]').each(function(){ // text
			var val = this.getAttribute('lgt');
			this.innerText = lang[val];
		});
		$('[lgp]').each(function(){ // placeholder
			var val = this.getAttribute('lgp');
			this.setAttribute('placeholder',lang[val])
		});
		$('[lge]').each(function(){ // placeholder
			var val = this.getAttribute('lge');
			this.setAttribute('title',lang[val])
		});
	};
	
	return self;
}

function createOptions(el,path,name){
	$ajax(path,{async:false},function(r){
		var r = parseJson(r);
		r.data = parseJson(r.data);
		$(el).html('');
		for(var i in r.data){
			$(el).append(new Option(r.data[i].name,r.data[i].id));
		}
		if(name) {
			var d = {};
			for(var i in r.data){
				d[r.data[i].id] = r.data[i];
			}
			window[name] = d;
		}
	});
}

// 登录检出
function loginCheckAction(callback){
	$ajax(config.path.loginCheckAction,{
		async:false,
		loading:false
	},function(r){
		if(r.status === 'SUCCESS') {
			window.USERINFO = r;
//			if(r.data.photo){
//				 $('.header .photo').attr('src',config.localhost+r.data.photo);
//			}else{
//				$('.header .photo').attr('src','http://demo.cssmoban.com/cssthemes4/tid_5_klorofil/assets/img/user.png');
//			}
			initChatSocket(USERINFO.data.id);
			if(window.LANGUAGE || (window.LANGUAGE = {})) {
				LANGUAGE.currency_chart = USERINFO.data.currencyInfo.currencyChart;
				new language().frameLang(LANGUAGE);
			}
		}
		if(isFunc(callback)) callback(r);
		initMsgSocket(r.status === 'SUCCESS'); // 是否打开socket通道
	});
}

// 登出
function loginOut(){
	$ajax(config.path.logoutAction,{},function(r){
		var r = parseJson(r);
		if(r.status === 'SUCCESS') {
			$.toast.success(r.msg);
			setTimeout(function(){
				window.location.href = 'index.html';
			},1000);
		}
	});
}


//:::::::::: 动态加密解密（DED: dynamic encript deciphering） :::::::::::

var DEDCK=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",
		"A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
		"0","1","2","3","4","5","6","7","8","9",
		"`","~","!","@","#","$","%","^","&","*",
		"(",")","-","_","=","+","[","]","{","}",
		";",":","'","\"","\\","|",",",".","<",
		"<",">","/","?"," "];//chart key array

function DED$E(key,pwd){//DED 加密 [返回null则为加密失败]
	if(isNull(key) || isNull(pwd)) return null;
	var keyarr=key.split(",");
	if(keyarr.length!=DEDCK.length) return null;
	var npwd="";
	for(var i=0;i<pwd.length;i++){
		var x=DED$AtCK(pwd[i]);
		if(x==-1) return null;
		npwd+=keyarr[x];
	}
	return npwd;
}

function DED$AtCK(c){//检索密码符在CK中的位置
	for(var i=0;i<DEDCK.length;i++){
		if(c===DEDCK[i]) return i;
	}
	return -1;
}

function uiencryptAction(callBack){// 获取加密key
	$ajax(config.path.uiencryptAction,{},function(r){
		r = parseJson(r);
		if(r.status === 'SUCCESS') if(isFunc(callBack)) callBack(r);
	});
}

//:::::::::::::::::::::::::::END DED::::::::::::::::::::::::::::::::


function isCurrentLocation(arr){
	if(arr && arr.length) {
		var pathname = window.location.pathname;
		for(var i = 0; i < arr.length; i++){
			if(pathname.indexOf(arr[i]) != -1) return true;
		}
		return false;
	}
}


// 设置语言
function settingLanguageAction(id){
	$ajax(config.path.settingLanguageAction,{data:{'ui.language.id' : id}},function(r){
		if(r.status === 'SUCCESS'){
			$.toast.success(r.msg);
			//new language().init(true);
			window.location.reload();
		}
	});
}

// 设置幣種
function settingCurrencyAction(id){
	$ajax(config.path.settingCurrencyAction,{data:{'ui.currencyInfo.id' : id}},function(r){
		if(r.status === 'SUCCESS'){
			$.toast.success(r.msg);
			//new language().init(true);
			window.location.reload();
		}
	});
}

// 添加用户数据资源
function cDsrcOfUserAction(data){
	$ajax(config.path.cDsrcOfUserAction,{data:data},function(r){
		if(r.status === 'SUCCESS'){
			
		}
	});
}

// 修改数据资源
function uDsrcOfUserAction(data){
	$ajax(config.path.uDsrcOfUserAction,{data:data},function(r){
		if(r.status === 'SUCCESS'){
			
		}
	});
}

// 删除数据资源
function dDsrcAction(data){
	$ajax(config.path.dDsrcAction,{data:data},function(r){
		if(r.status === 'SUCCESS'){
			
		}
	});
}



function initDateSelector(){
	$('[time-range="true"]').each(function(){
		if($(this).attr('time-range') == 'true') {
			var self = this;
			var d = $.extend({
				elem: self
			}, $(self).data());
			//时间范围
			d.lang = 'en';
			laydate.render(d);
			$(self).attr('time-range',false);
		}
	});
}




/*::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
/*::::::::::::::::::::::::::::::::::::::::::::::: chat.js start ::::::::::::::::::::::::::::::::::::::::::::::*/
/*::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//                 聊天组件  XS 2016-10-28 pm 23:11
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

var chat_component_name="chat";
var chat_command_type_script="-";
//命令头  $符号表示返回类型命令  【接收时使用】
var CMD_TYPE_CHAT$SYSCUE="syscue";//系统提示
var CMD_HEAD_CHAT$ACK="ack";//確認消息
var CMD_TYPE_CHAT$MSG="msg";//接收消息
//命令类型  2符号表示发送类型命令  【发送时使用】
var CMD_TYPE_CHAT2MSG="msg";//发送消息


function initChatSocket(id){ // 初始化聊天socket通道
	var uid = id || 'uid';
	$ajax(config.path.ipAction,{},function(r){
		if(r.status == 'SUCCESS') {
			if($WebSocketServer.hasComponent('chat')) $WebSocketServer.uid(uid+','+r.data);//绑定会话
			else chat_init(uid+','+r.data); // 打开socket通道
		}
	});
}

function chat_init(userId){
	//注册聊天服务通道
	$WebSocketServer.register({
		name:chat_component_name,
		onpen:function(){
			userId && chat_uid(userId);//绑定会话
		},
		onclose:function(){
			
		},
		onmessage:function(msg){
			if(isNull(msg)) return;
			var ci=msg.indexOf(chat_command_type_script);//char index
			var cn=msg.substring(0, ci);//command name
			var mc=msg.substring(ci+1, msg.length);//message content
			var o=parseJson(mc);
			
			//$.toast.info('你有新的聊天信息');
			//audioPlay(config.audios.msg); // 播放提示音
			switch(cn){
			case CMD_TYPE_CHAT$MSG://接收消息  [数据格式] id type content CTime isRead isShield sponsor
				$(document).trigger('chat_msg_recv',{ data : o});
				/*chat_msg_recv(id,type,content,ctime,isread,isshield,sponsor);//接收消息  [输出]*/
				break;
			case CMD_HEAD_CHAT$ACK://确认消息
				console.log("INFO ## [聊天组件] [确认消息] "+mc);
				break;
			case CMD_TYPE_CHAT$SYSCUE://系统提示
				print_sys_cue_info(mc);//打印系统提示信息
				break;
			default:
				console.log("ERROR ## [聊天组件] ["+chat_component_name+"]未知命令消息！");	
				break;
			}
			return this;
		},
		onerror:function(){
			
		},
		onbeforeunload:function(){
			
		},
	});
}

function chat_msg_send_by_type(typ,msg){//合并聊天命令信息发送
	$WebSocketServer.send(chat_component_name,typ+chat_command_type_script+msg);
}

function chat_session_close(){//聊天会话关闭
	$WebSocketServer.close();
}

function chat_uid(id){//绑定会话
	$WebSocketServer.uid(id);
}

function chat_msg_send(session_id,send_id,recv_id,type,content){//发送消息  [格式]chat@msg-session_id,send_id,recv_id,type~content
	chat_msg_send_by_type(CMD_TYPE_CHAT2MSG,session_id+","+send_id+","+recv_id+","+type+"~"+content);
}

/*function chat_msg_recv(id,type,content,ctime,isread,isshield,sponsor){//接收消息  [输出]
	
}*/

//更新最后消息到会话项
function update_end_msg_to_session(sid,emsg,time){
	var session=$(".chat_session_"+sid);
	$(session).find(".emsg").text(emsg);
	$(session).find(".ctime").text(time);
}

//打印系统提示信息
function print_sys_cue_info(msg){
	$.toast.warning(msg);
}


/*::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
/*::::::::::::::::::::::::::::::::::::::::::::::: chat.js end ::::::::::::::::::::::::::::::::::::::::::::::*/
/*::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/

function msg_init(userId){
	var component_name="msg";
	//注册信息通知服务通道
	$WebSocketServer.register({
		name:component_name,
		onpen:function(){
			$WebSocketServer.uid(userId || 'msg');//绑定会话
		},
		onclose:function(){
			
		},
		onmessage:function(msg){
			if(isNull(msg)) return;
			var i = msg.indexOf('-');
			var type = msg.substring(0,i);
			var obj = msg.substring(i+1);
			obj = parseJson(obj);
			
			//audioPlay(config.audios.msg); // 播放提示音
			switch(type){
				case "OrderFormStatus": // 订单状态改变
					audioPlay(config.audios.msg); // 播放提示音
					$(document).trigger('OrderFormStatus',{ data : obj});
					$('header .btns .btn[href="order.html"]').addClass('new');
				break;
				case "new_customer_service_task": // 客服任务通知
					$(document).trigger('new_customer_service_task',{ data : obj});
					var num=$('.tasksNumber').text();
					if(num != 'N') $('.tasksNumber').text(parseInt(num)+1);
					$('.tasksRadius').removeClass('hide');
					rCustomerServiceTaskByCS.load();
				break;
				case "comment_customer_service_task"://评论客服任务通知
					var cstid=$('.submit_grade').attr('data-taskid');
					if(!isNull(cstid)){
						$('#evaluateServiceModal').css('display','block').removeClass('fade');
					}
				break;
			}
			return this;
		},
		onerror:function(){
			
		},
		onbeforeunload:function(){
			
		},
	});
}




/*::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
/*::::::::::::::::::::::::::::::::::::::::: web-socket-server.js start :::::::::::::::::::::::::::::::::::::::*/
/*::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
var $WebSocketServer={
	component_name:"wss",//组件名称
	cmd_head_send_con:"$",//命令头发送标识
	cmd_head_recv_con:"@",//命令头接收标识
	cmd_type_wss2uid:"uid",//绑定会话
	websocket:null,
	is_connecting:false,
	server_url:"",
	server_queue:{},
	server:function(){
		this.onpen=null;
		this.onclose=null;
		this.onmessage=null;
		this.onerror=null;
		this.onbeforeunload=null;
	},
	set_server_url:function(url){
		if(this.isNull(url)) $WebSocketServer.cue("e","服务器URL不能为空！");
		else this.server_url=url;
	},
	register:function(param){
		var name="";
		if(param.name){
			name=param.name;
			delete param.name;
		}else{
			$WebSocketServer.cue("e","注册失败，组件名[name]不能为空！");
			return false;
		}
		
		if(this.server_queue[name]){
			$WebSocketServer.cue("e","注册失败，该组件[name:"+name+"]已注册！");
			return false;
		}
		
		var server=new this.server();
		
		if(param.onpen){
			server.onpen=param.onpen;
			delete param.onpen;
		}
		
		if(param.onclose){
			server.onclose=param.onclose;
			delete param.onclose;
		}
		
		if(param.onmessage){
			server.onmessage=param.onmessage;
			delete param.onmessage;
		}
		
		if(param.onerror){
			server.onerror=param.onerror;
			delete param.onerror;
		}
		
		if(param.onbeforeunload){
			server.onbeforeunload=param.onbeforeunload;
			delete param.onbeforeunload;
		}
		
		this.server_queue[name]=server;
		if(!$WebSocketServer.is_connecting) this.connection();
		
		return true;
	},
	connection:function(){
		if(!$WebSocketServer.is_connecting){
			if(this.isNull(this.server_url)){
				$WebSocketServer.cue("e","服务器URL为空，无法连接！");
				return false;
			}
			if("WebSocket" in window){//判断当前浏览器是否支持WebSocket
				this.websocket=new WebSocket(this.server_url);
				
				this.websocket.onopen=function(){//连接建立成功时回调函数
					$WebSocketServer.is_connecting=true;
					if(!isNull($WebSocketServer.server_queue)){
						for(var key in $WebSocketServer.server_queue){
							var fn=$WebSocketServer.server_queue[key].onpen;
							if($WebSocketServer.isNull(fn)){
								$WebSocketServer.cue("s","WebSocket连接建立成功！");
							}else fn();
						}
						return;
					}
					$WebSocketServer.cue("s","WebSocket连接建立成功！");
				};
				
				this.websocket.onclose=function(){//连接关闭时回调函数
					$WebSocketServer.is_connecting=false;
					if(!isNull($WebSocketServer.server_queue)){
						for(var key in $WebSocketServer.server_queue){
							var fn=$WebSocketServer.server_queue[key].onclose;
							if($WebSocketServer.isNull(fn)){
								$WebSocketServer.cue("e","WebSocket连接已关闭！");
							}else fn();
						}
						return;
					}
					$WebSocketServer.cue("e","WebSocket连接已关闭！");
				};
				
				this.websocket.onmessage=function(event){//接收消息时回调函数
					$WebSocketServer.is_connecting=true;
					var msg=event.data;
					if($WebSocketServer.isNull(msg)) return;
					if(!isNull($WebSocketServer.server_queue)){
						var ci=msg.indexOf($WebSocketServer.cmd_head_send_con);//char index
						var cn=msg.substring(0, ci);//component name
						var mc=msg.substring(ci+1, msg.length);//message content
						var fn=$WebSocketServer.server_queue[cn].onmessage;
						if($WebSocketServer.isNull(fn)){
							$WebSocketServer.cue("e","WebSocket接收到消息["+msg+"]，未找到组件处理！");
						}else fn(mc);
						return;
					}
					$WebSocketServer.cue("e","WebSocket接收到消息["+msg+"]，暂无组件处理！");
				};
				
				this.websocket.onerror=function(){//连接错误时回调函数
					$WebSocketServer.is_connecting=false;
					if(!isNull($WebSocketServer.server_queue)){
						for(var key in $WebSocketServer.server_queue){
							var fn=$WebSocketServer.server_queue[key].onerror;
							if($WebSocketServer.isNull(fn)){
								$WebSocketServer.cue("e","WebSocket连接错误！");
							}else fn();
						}
						return;
					}
					$WebSocketServer.cue("e","WebSocket连接错误！");
				};
				
				this.websocket.onbeforeunload=function(){//当窗口关闭时回调函数
					$WebSocketServer.is_connecting=false;
					$WebSocketServer.close();
					if(!isNull($WebSocketServer.server_queue)){
						for(var key in $WebSocketServer.server_queue){
							var fn=$WebSocketServer.server_queue[key].onbeforeunload;
							if($WebSocketServer.isNull(fn)){
								$WebSocketServer.cue("e","窗口已关闭！");
							}else fn();//必需使用者自行关闭
						}
						return;
					}
					$WebSocketServer.cue("e","窗口已关闭！");
				};
				
			}else{
				$WebSocketServer.is_connecting=false;
				$WebSocketServer.cue("e","当前浏览器不支持WebSocket！");
				return false;
			}
		}
	},
	close:function(){
		this.websocket.close();
		$WebSocketServer.is_connecting=false;
	},
	send:function(name,msg){//name: component name
		this.websocket.send(name+$WebSocketServer.cmd_head_recv_con+msg);
	},
	uid:function(id){//绑定会话  [用户ID绑定会话]wss@uid-uid
		setTimeout(function(){
			$WebSocketServer.send($WebSocketServer.component_name, $WebSocketServer.cmd_type_wss2uid+"-"+id);
		},100);
		
	},
	isNull:function(o){
		return o===null||o===undefined||o==="undefined"||o==="";
	},
	cue:function(status,info){
		switch(status){
			case "s":
				$.toast.success(info);
				break;
			case "e":
				$.toast.error(info);
				break;
		}
	},
	hasComponent:function(name){
		return !!this.server_queue[name];
	}
};

//$WebSocketServer.set_server_url("ws://"+$SERVER_DEV.ip+":"+$SERVER_DEV.port+"/"+R.project+"/websocket.ws");//设置服务器路径

$WebSocketServer.set_server_url(config.localhost.replace('http','ws')+"websocket.ws");//设置服务器路径

function initMsgSocket(c){ // 是否打开socket通道
	var uid = '';
	if(c){
		var ui = USERINFO.data;
		uid = ui.id || 'uid';
	} else {
		uid = 'uid';
	}
	$ajax(config.path.ipAction,{},function(r){
		if(r.status == 'SUCCESS') {
			if($WebSocketServer.hasComponent('msg')) $WebSocketServer.uid(uid+','+r.data);//绑定会话
			else msg_init(uid+','+r.data); // 打开socket通道
		}
	});
}
