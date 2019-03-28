//获得slider插件对象
var gallery = mui('.mui-slider');
gallery.slider({
  interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
});

;(function($,doc){
			
	
	
	
	$(doc).on('tap','.goGoodsInfo',function(){
		var id = $(this).attr('data-id');
		wx.miniProgram.navigateTo({url: '/pages/goods-info/goods-info?goid='+id});
	});
	
	$(doc).on('tap','.goGoodsInfoList',function(){
		var id = $(this).attr('data-id');
		wx.miniProgram.navigateTo({url: '/pages/goods-info/goods-info?goid='+id});
	});
	
})(mui,document);