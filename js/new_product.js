//获得slider插件对象
var gallery = mui('.mui-slider');
gallery.slider({
  interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
});


;(function($,doc){
			
	window.rGoodsListBySearch = new loadDataTemplate({
		path : config.path.rGoodsListBySearchAction,
		contentTpl : Temp.rGoodsListBySearch,
		contentTplTarget : '.rGoodsListBySearch',
		data : {
			condition:4    //[4:新品 7:特价 8:热卖,9打折
		},
		success : function(r){
			r.data = parseJson(r.data);
			 console.log(r.data)
		} 
	}).init();  
	
	window.rGoodsListBySearchSelect = new loadDataTemplate({
		path : config.path.rGoodsListBySearchAction,
		contentTpl : Temp.rGoodsListBySearchSelect,
		contentTplTarget : '.rGoodsListBySearchSelect',
		data : {
			condition:4    //[4:新品 7:特价 8:热卖,9打折
		},
		success : function(r){
			r.data = parseJson(r.data);
			
		} 
	}).init(); 
	
	$(doc).on('tap','.goGoodsInfo',function(){
		var id = $(this).attr('data-id');
		wx.miniProgram.navigateTo({url: '/pages/goods-info/goods-info?goid='+id});
	});
	
	$(doc).on('tap','.goGoodsInfoList',function(){
		var id = $(this).attr('data-id');
		wx.miniProgram.navigateTo({url: '/pages/goods-info/goods-info?goid='+id});
	});
	
})(mui,document);