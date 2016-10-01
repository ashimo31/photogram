//tpcommonheader
var tpLinkName=["シルエット素材","飾り枠","人ピクトグラム素材",	"フキダシ素材",	"矢印",	"花・植物イラスト",	"ネットショップ素材","ループ・BGM素材","飾り線素材","フラットアイコン","クリスマスetc","パターン背景","アイコン","twitter"];
var tpLinkURL=["kage-design.com","frames-design.com","pictogram2.com","fukidesign.com",	"yajidesign.com","flode-design.com","design-ec.com","dust-sounds.com","free-line-design.com","flat-icon-design.com","event-pre.com","bg-patterns.com","icooon-mono.com","twitter.com/topeconheroes"];
jQuery(function($){
	var tplinkTxt='<li>Topeconheroes</li>';
	for(var i=0; i<tpLinkName.length;i++){
		if(tpLinkURL[i] !="none")
		tplinkTxt=tplinkTxt+('<li><a href="http://'+tpLinkURL[i]+'">'+tpLinkName[i]+'</a></li>');
	}
	$("div#tplinkheader ul").html(tplinkTxt);
	
	$("div#tplinkheader ul li").hover(
		function(){
			var indexNum=$("div#tplinkheader ul li").index(this);
			var indexNumM1=indexNum-1;
			var offset = $(this).offset();
			
			var offset2=offset.left-30;
			if(indexNum !=0){
				$("#bPointer").show().css('left',offset2).html(tpLinkName[indexNumM1]);
			}
		},
		function(){
			$("#bPointer").hide();
		}
	);
	$("#tplinkheader").prependTo("body");
});