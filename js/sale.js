;(function($,doc){
			
	window.rGoodsListBySearch = new loadDataTemplate({
		path : config.path.rGoodsListBySearchAction,
		contentTpl : Temp.rGoodsListBySearch,
		contentTplTarget : '.rGoodsListBySearch',
		data : {
			condition:7    //[4:新品 7:特价 8:热卖,9打折
		},
		success : function(r){
			r.data = parseJson(r.data);
			 
		} 
	}).init();  
	
	window.rGoodsListBySearchSelect = new loadDataTemplate({
		path : config.path.rGoodsListBySearchAction,
		contentTpl : Temp.rGoodsListBySearchSelect,
		contentTplTarget : '.rGoodsListBySearchSelect',
		data : {
			condition:7    //[4:新品 7:特价 8:热卖,9打折
		},
		success : function(r){
			r.data = parseJson(r.data);
			
		} 
	}).init(); 
	$(doc).on('tap','.special',function(){//特价商品
		rGoodsListBySearchSelect.load({'condition':7});
	});
	$(doc).on('tap','.discount',function(){//打折商品
		rGoodsListBySearchSelect.load({'condition':9});
	});
	
	
	
	$(doc).on('tap','.goGoodsInfo',function(){
		var id = $(this).attr('data-id');
		wx.miniProgram.navigateTo({url: '/pages/goods-info/goods-info?goid='+id});
	});
	
	$(doc).on('tap','.goGoodsInfo_1',function(){
		var id = $(this).attr('data-id');
		wx.miniProgram.navigateTo({url: '/pages/goods-info/goods-info?goid='+id});
	});
	$(doc).on('tap','.goGoodsInfo_2',function(){
		var id = $(this).attr('data-id');
		wx.miniProgram.navigateTo({url: '/pages/goods-info/goods-info?goid='+id});
	});
})(mui,document);

/*
wx.miniProgram.navigateTo({url: '/pages/goods-info/goods-info?goid=245'})
wx.miniProgram.postMessage({ data: 'foo' })
wx.miniProgram.postMessage({ data: {foo: 'bar'} })
wx.miniProgram.getEnv(function(res) { 
	console.log(res.miniprogram) 
	//true
}) 
*/
