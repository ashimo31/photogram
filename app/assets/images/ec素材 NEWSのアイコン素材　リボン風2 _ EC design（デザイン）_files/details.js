//■■ギャラリーの実装

var imgCatTxt=0;
var indexLMSnum=0;
var arrayLMS=["l_","m_",""];
var arrayimgCatNameS=["png","jpg"];
var indexNum=0;
var scrollTop=0;
//var flag=""; //バナーなのかパーセントなのかバナーかつパーセントなのかのフラグ。
var pNum=10;　//割引パーセント
var bNum=1; //バナーサイズの種類
//var itemNum=8;　//素材の数デバッグよう
//var imgID="e_new_1";　//素材のIDデバッグ用
$(function(){
	
	if(flag=="p"){
		$("#bannerSize").hide();	
	}else if(flag=="b"){
		$("#changeDiscount,#LMS").hide();	
	}else if(flag=="pb"){
		$("#LMS").hide();	
	}else{
		$("#bannerSize,#changeDiscount").hide();
	}
	
	//バリエーションリストの背景画像の設定
	$("ul.variation li").css("background","url(d/"+imgID+"/tn_"+imgID+".png) no-repeat");
	
	$("ul.variation li:nth-child(2)").css("background-position","-85px 0");
	$("ul.variation li:nth-child(3)").css("background-position","-170px 0");
	$("ul.variation li:nth-child(4)").css("background-position","-255px 0");
	$("ul.variation li:nth-child(5)").css("background-position","-340px 0");
	$("ul.variation li:nth-child(6)").css("background-position","-425px 0");
	$("ul.variation li:nth-child(7)").css("background-position","-510px 0");
	$("ul.variation li:nth-child(8)").css("background-position","-595px 0");
	$("ul.variation li:nth-child(9)").css("background-position","-680px 0");
	$("ul.variation li:nth-child(10)").css("background-position","-765px 0");
	$("ul.variation li:nth-child(11)").css("background-position","-850px 0");
	$("ul.variation li:nth-child(12)").css("background-position","-935px 0");
	$("ul.variation li:nth-child(13)").css("background-position","-1020px 0");
	$("ul.variation li:nth-child(14)").css("background-position","-1105px 0");
	$("ul.variation li:nth-child(15)").css("background-position","-1190px 0");
	$("ul.variation li:nth-child(16)").css("background-position","-1275px 0");
	
	//ポップアップ表示
	$("#imgBox img,ul#fileDownload li:nth-child(4)").click(function(){
		imgCatTxt=0;
		indexNum=0;
		$("#glayLayer").fadeIn('fast');
		scrollTop=$(window).scrollTop();//スクロールの高さ取得
		$("#overLayer").fadeIn('fast').css("top",scrollTop+"px");

		changeIMG();
		selectCheck();
		nextBackShowHide();
	});


	//バリエーションボタンを押したとき
	$("#detailBox02 ul.variation li").click(function(){
		imgCatTxt=0;
		//何番目のliをクリックしたかを取得。
		indexNum=$("ul.variation li").index(this);
		$("#glayLayer").fadeIn('fast');
		scrollTop=$(window).scrollTop();//スクロールの高さ取得
		$("#overLayer").fadeIn('fast').css("top",scrollTop+"px");
		changeIMG();
		selectCheck();
		nextBackShowHide();
	});

	//割引パーセントボタンを押したとき
	$("#changeDiscount li").click(function(){
		//何番目のliをクリックしたかを取得。
		indexpNum=$("#changeDiscount li").index(this);
		indexpNum=indexpNum+1;
		$("#changeDiscount li").removeClass("on");
		$("#changeDiscount li:nth-child("+indexpNum+")").addClass("on");
		pNum=indexpNum*10;
		changeIMG();
	});

	//バナーサイズボタンを押したとき
	$("#bannerSize li").click(function(){
		//何番目のliをクリックしたかを取得。
		indexpNum=$("#bannerSize li").index(this);
		indexpNum=indexpNum+1;
		$("#bannerSize li").removeClass("on");
		$("#bannerSize li:nth-child("+indexpNum+")").addClass("on");
		bNum=indexpNum;
		changeIMG();
	});

	//JPG Download ボタンを押したとき　ポップアップ表示
	$("ul#fileDownload li:nth-child(3)").click(function(){
		imgCatTxt=1;
		$("#glayLayer").fadeIn('fast');
		scrollTop=$(window).scrollTop();//スクロールの高さ取得
		$("#overLayer").fadeIn('fast').css("top",scrollTop+"px");
		
		changeCatTxt();	
		changeIMG();
		nextBackShowHide();

	});

	//POPバリエーションボタンを押したとき
	$("#overLayer ul.variation li").click(function(){
		//何番目のliをクリックしたかを取得。
		indexNum=$("#overLayer ul.variation li").index(this);
		changeIMG();
		selectCheck();
		nextBackShowHide();
		
	});

	//popup を閉じる
	$("#glayLayer,#btnClose").click(function(){
		$("#glayLayer,#overLayer").fadeOut('fast');
		//初期化
		imgCatTxt=0;
		indexNum=0;
		indexLMSnum=0;
		pNum=10;　//割引パーセント
		bNum=1;
		$("#LMS li").removeClass();
		$("#bannerSize li").removeClass();
		$("#changeDiscount li").removeClass();
		$("ul#LMS li:nth-child(1)").addClass("on");
		$("#bannerSize li:nth-child(1)").addClass("on");
		$("#changeDiscount li:nth-child(1)").addClass("on");
		changeCatTxt();

	});	

	//jpg png ボタンを押したら切り替え
	$("#changeImg").click(function(){
		replaceJPGPNG();	
		changeIMG();
		return false;
	});

	//LMS 画像のサイズを変更すんよ。
	$("ul#LMS li").click(function(){
		//何番目のliをクリックしたかを取得。
		indexLMSnum=$("ul#LMS li").index(this);
		$("#LMS li").removeClass();
		var listNumLMS=indexLMSnum+1;
		$("ul#LMS li:nth-child("+listNumLMS+")").addClass("on");
		changeIMG();
		selectCheck();
	});
	

	//左右に進むボタン
	
	$("div#btnBack").click(function(){
		indexNum=indexNum-1;
		nextBackShowHide();
		changeIMG();
		selectCheck();
	});
	

	$("div#btnNext").click(function(){
		indexNum=indexNum+1;
		nextBackShowHide();
		changeIMG();
		selectCheck();
	});

	//画像の差し替え関数
	function changeIMG(){
		if(flag=="p"){
			var srcTxt='d/'+imgID+'/'+arrayLMS[indexLMSnum]+imgID+indexNum+'_'+pNum+'.'+arrayimgCatNameS[imgCatTxt];
		}else if(flag=="b"){
			var srcTxt='d/'+imgID+'/'+imgID+indexNum+'_'+bNum+'.'+arrayimgCatNameS[imgCatTxt];
		}else if(flag=="pb"){
			var srcTxt='d/'+imgID+'/'+imgID+indexNum+'_'+pNum+'_'+bNum+'.'+arrayimgCatNameS[imgCatTxt];
		}else{			
			var srcTxt='d/'+imgID+'/'+arrayLMS[indexLMSnum]+imgID+indexNum+'.'+arrayimgCatNameS[imgCatTxt];
		}
		$("#imgL img").attr('src',srcTxt);	
	}
	
	//サムネイルに現在の画像の位置をつける selectedをつける。
	function selectCheck(){
		$("#overLayer ul.variation li").removeClass();
		var listNum=indexNum+1;
		$("#overLayer ul.variation li:nth-child("+listNum+")").addClass("variSelected");
	}
	
	//NEXT BACK ボタンの実装
	function nextBackShowHide(){
		$("div#btnBack,div#btnNext").hide();
		if(itemNum !=1 && indexNum>0){
			$("div#btnBack").show();
		}
		if(itemNum !=1 && Number(itemNum)>Number(indexNum)+1){
			$("div#btnNext").show();
		}
	}
	
	//JPG,PNG切り替え関数。
	function replaceJPGPNG(){
		if(imgCatTxt==0){
			imgCatTxt=1;
			
			if(flag=="p"){
				var srcTxt='d/'+imgID+'/'+arrayLMS[indexLMSnum]+imgID+indexNum+'_'+pNum+'.'+arrayimgCatNameS[imgCatTxt];
			}else if(flag=="b"){
				var srcTxt='d/'+imgID+'/'+imgID+indexNum+'_'+bNum+'.'+arrayimgCatNameS[imgCatTxt];
			}else if(flag=="pb"){
				var srcTxt='d/'+imgID+'/'+imgID+indexNum+'_'+pNum+'_'+bNum+'.'+arrayimgCatNameS[imgCatTxt];
			}else{			
				var srcTxt='d/'+imgID+'/'+arrayLMS[indexLMSnum]+imgID+indexNum+'.'+arrayimgCatNameS[imgCatTxt];
			}
			$("#imgL img").attr('src',srcTxt);	
		}else{
			imgCatTxt=0;
		}
		changeCatTxt();
	}
	
	//テキスト差し替え関数
	function changeCatTxt(){
		if(imgCatTxt==0){
			$("#imgCat").removeClass("jpgVar").html("PNG");		
			$("#changeImg").html('<img src="wp-content/themes/ec/images/btn_png01.gif" alt="png画像"><img src="wp-content/themes/ec/images/btn_change.gif" alt="png、jpg画像に切り替えます。"><img src="wp-content/themes/ec/images/btn_jpg02.gif" alt="jpg">');
			var txtNow = $(".info").html();
        	$(".info").html(txtNow.replace("JPG",'透過PNG'));
		}else{
			$("#imgCat").addClass("jpgVar").html("JPG");
			$("#changeImg").html('<img src="wp-content/themes/ec/images/btn_png02.gif" alt="png画像"><img src="wp-content/themes/ec/images/btn_change.gif" alt="png、jpg画像に切り替えます。"><img src="wp-content/themes/ec/images/btn_jpg01.gif" alt="jpg">');
			var txtNow = $(".info").html();
        	$(".info").html(txtNow.replace("透過PNG",'JPG'));
		}
	}
	
});



// ■■Download　ポップアップ
var sec=5; //初期値を5秒にする。
var fileType="";
var newscroll=0;
$(function(){

	//illustrator Ai ボタンをクリック
	$("ul#fileDownload li:nth-child(1)").click(function(){
		var randnum = Math.floor( Math.random() * 3+1 ); 
		$("#waitIMG").attr('src','wp-content/themes/ec/images/wait'+randnum+'.gif');
		fileType="ai";
		newscroll=$(window).scrollTop();//スクロールの高さ取得
		$("#fileDown").css("top",newscroll+"px");
		$("#fileDownCover,#fileDown").show();
		
		$("#dlBtnboxBtn a").text("illustrator Ai");
		cdTimer();
	});
	
	

	//EPS ボタンをクリック
	$("#fileDownload li:nth-child(2)").click(function(){
		var randnum = Math.floor( Math.random() * 3+1 ); 
		$("#waitIMG").attr('src','wp-content/themes/ec/images/wait'+randnum+'.gif');
		fileType="eps";
		newscroll=$(window).scrollTop();//スクロールの高さ取得
		$("#fileDown").css("top",newscroll+"px");
		$("#fileDownCover,#fileDown").show();
		$("#dlBtnboxBtn a").text("EPS");
		cdTimer();
	});
	
	//閉じる
	$("#fileDownCover,#fileDownClose").click(function(){
		$("#dlBtnbox p").show();
		$("#dlBtnbox p span").html("5");
		sec=5;
		$("#dlBtnboxBtn").hide();
		$("#fileDownCover").hide();
		$("#fileDown").hide();
	});
	
	function cdTimer(){
		dltimer = setInterval(function(){
	     // 実行される処理
		 	if(sec>0){
				sec=sec-1;
				$("div#dlBtnbox p span").html(sec);
			}else{
				clearInterval(dltimer);
				$("#dlBtnbox p").hide();
				$("#dlBtnboxBtn").show();
				$("#dlBtnboxBtn a").attr('href','d/'+imgID+'/ec_'+imgID+'_'+fileType+'.zip')
			}
		}, 1000);
	}
});