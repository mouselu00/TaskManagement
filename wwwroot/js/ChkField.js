/*
==================================================================
LTrim(string):去除左邊的空格
==================================================================
*/
function lTrim(str)
{
    var whitespace = new String(" \t\n\r");
    var s = new String(str);
    
    if (whitespace.indexOf(s.charAt(0)) != -1)
    {
        var j=0, i = s.length;
        while (j < i && whitespace.indexOf(s.charAt(j)) != -1)
        {
            j++;
        }
        s = s.substring(j, i);
    }
    return s;
}

/*
==================================================================
RTrim(string):去除右邊的空格
==================================================================
*/
function rTrim(str)
{
    var whitespace = new String(" \t\n\r");
    var s = new String(str);

    if (whitespace.indexOf(s.charAt(s.length-1)) != -1)
    {
        var i = s.length - 1;
        while (i >= 0 && whitespace.indexOf(s.charAt(i)) != -1)
        {
            i--;
        }
        s = s.substring(0, i+1);
    }
    return s;
}

/*
==================================================================
Trim(string):去除前後空格
==================================================================
*/
function trim(str)
{
    return rTrim(lTrim(str));
}
/*日期驗證
*驗證格式為(2004/01/01)
*/
function isDate(DateString){
	var pat = /^(\d{4})(\/)(\d{1,2})(\/)(\d{1,2})$/;
	var re = new RegExp(pat);
	
	if (DateString==null){
		return false;
	}else if(!re.test(DateString)){
		return false;
	}else{
		var yyyy=""; 
		var mm=""; 
		var dd="";
		var maxday="";
		var arraydd=new Array(31,28,31,30,31,30,31,31,30,31,30,31);			
		//取出以"Dilimeter"所分隔的字，存成陣列
		tempArray = DateString.split("/");
		
		//檢驗字串裡是否只有2個分隔符號(ex:2004/01/01)
		if (tempArray.length!=3){
			return false;
		}
		//設定月的最大天數
		yyyy=parseInt(tempArray[0].replace(/^0*/,"")); 
		mm=parseInt(tempArray[1].replace(/^0*/,"")); 
		dd=parseInt(tempArray[2].replace(/^0*/,""));	  
	  	maxday=arraydd[mm-1];
		
	  	if(mm==2){
			if((yyyy%4==0&&yyyy%100!=0)||(yyyy%400==0)){
		  	maxday=29;
			}
  		}
		
		if(mm > 12 || dd > maxday){
			return false;
		}
		return true;
	}	
} 
/* CHECK Require 
 * 處理空的情況  */
function check_REQUIRE(strDisplayName, strSource, blnRequired) {
	strSource = trim(strSource);
	//alert("strDisplayName = "+strDisplayName+"\n blnRequired = "+blnRequired);	
    if(blnRequired == true){
		//處理空的情況
		if(strSource == ""){
    		alert("欄位\"" +strDisplayName + "\"不允許空白!");
    		return false;    		
   		}
    }    
    return true;	
}	
/* CHECK 'LIST_BOOK' 
 * 處理列印冊格式(021 | 122) */ 
function  check_LIST_BOOK(strDisplayName, strSource) {
	strSource = trim(strSource);
	if(((strSource.length!=3) || (isNaN(strSource))) || 
	   (((strSource.substr(0,1))!="0")&&((strSource.substr(0,1)!="1")))	
	  ){
		alert("欄位\"" + strDisplayName + "格式錯誤!");
		return false;
	}	
	return true;
}	
/* CHECK EMAIL 
 * 處理EMAIL格式判斷(只檢查'@'前面有沒有字而已) */
function check_EMAIL(strDisplayName, strSource) {
	strSource = trim(strSource);
	if((strSource.indexOf("@"))<1){
		alert("欄位 " + strDisplayName + "\"EMail\"格式錯誤!");
		return false;
	}
	return true; 
}	

/* ================================================================> CHECK DATE */

/* CHECK DATE YYYMMDD 
 * 驗証民國年 0930101->20040101 */
function check_DATE_YYYMMDD(strDisplayName, strSource) {
    var stryyyy;
	var strmm;
	var strdd;
	var strday;	
	strSource = trim(strSource);
	stryyyy=parseInt((strSource.substr(0,3)).replace(/^0*/,""))+1911;					
	strmm=strSource.substr(3,2);					
	strdd=strSource.substr(5,2);					
	strday=stryyyy + "/" + strmm + "/" + strdd;

	if((strSource.length!=7) || (isNaN(strSource)) || (!isDate(strday))){
		alert("欄位\"" + strDisplayName + "\"日期\"格式錯誤!");
		//alert(strDisplayName);
		return false;
	}
	return true;			
}	

/* CHECK DATE YYYYMMDD 
 * 處理日期格式YYYYMMDD */
function check_DATE_YYYYMMDD(strDisplayName, strSource) {
    var stryyyy;
	var strmm;
	var strdd;
	var strday;		
	strSource = trim(strSource);
	stryyyy=strSource.substr(0,4);
	strmm=strSource.substr(4,2);
	strdd=strSource.substr(6,2);
	strday=stryyyy + "/" + strmm + "/" + strdd;	
	
	if((strSource.length!=8) || (isNaN(strSource)) || (!isDate(strday))){
		alert("欄位\"" + strDisplayName + "\"日期\"格式錯誤!");
		return false;		
	}	
	return true;
}	

/* CHECK DATE YYYMM 
 * 驗証民國年 格式YYYMM */
function check_DATE_YYYMM(strDisplayName, strSource) {
    var stryyyy;
    var stryyy;
	var strmm;
	var strdd;
	var strday;	
	stryyy=strSource.substr(0,3);
	stryyyy=parseInt(stryyy.replace(/^0*/,"")) + 1911;
	strmm=strSource.substr(3,2);
	strday=stryyyy + "/" + strmm + "/01";
				
	if((strSource.length!=5) || (isNaN(strSource)) || (!isDate(strday))){ 
		alert("欄位\"" + strDisplayName + "\"日期\"格式錯誤!");
		return false;
	}	
	return true;
}	

/* CHECK DATE YYYY 
 * 處理日期格式YYYY */
function check_DATE_YYYY(strDisplayName, strSource) {
	strSource = trim(strSource);
	if((strSource.length!=4) || isNaN(strSource)){
		alert("欄位\"" + strDisplayName + "\"日期\"格式錯誤!");
		return false;	
	}	
	return true;
}	

/* CHECK DATE YYY 
 * 處理日期格式YYY */
function check_DATE_YYY(strDisplayName, strSource) {
	strSource = trim(strSource);
	if((strSource.length!=3) || isNaN(strSource) ){
		alert("欄位\"" + strDisplayName + "\"日期\"格式錯誤!");
		return false;
	}
	return true;
}	

/* CHECK DATE MM 
 * 處理日期格式MM */
function check_DATE_MM(strDisplayName, strSource) {
	strSource = trim(strSource);
	if((strSource.length!=2) || (isNaN(strSource)) ||
		((parseInt(strSource.replace(/^0*/,"")))>12) || (parseInt(strSource.replace(/^0*/,""))==0)
		){					
		alert("欄位\"" + strDisplayName + "\"日期\"格式錯誤!");
		return false;
	}
	return true;
}	

/* CHECK DATE YYYYMM 
 * 處理日期格式YYYYMM */
function check_DATE_YYYYMM(strDisplayName, strSource) {
    var stryyyy;
	var strmm;
	var strdd;
	var strday;		

	strSource = trim(strSource);
	stryyyy=strSource.substr(0,4);
	strmm=strSource.substr(4,2);
	strday=stryyyy + "/" + strmm + "/01";	

	if((strSource.length!=6) || (isNaN(strSource)) || (!isDate(strday))){ 
		alert("欄位\"" + strDisplayName + "\"日期\"格式錯誤!");
		return false;		
	}
	return true;	
}	

/* CHECK DATE  
 * 處理日期格式(ex:2004/01/01) */
function check_DATE(strDisplayName, strSource) {
	strSource = trim(strSource);
	if(!isDate(strSource)){
		alert("欄位\"" + strDisplayName + "\"日期\"格式錯誤!");
		return false;
	}
	return true;	
}	

/* CHECK DATE DATE_TAW 
 * //處理日期格式(ex:094/01/01) */
function check_DATE_TAW(strDisplayName, strSource) {
	var pat = /^(\d{2,3})(\/)(\d{1,2})(\/)(\d{1,2})$/;
	var re = new RegExp(pat);
	var tempArr = "";
    var stryyy;
	var strmm;
	var strdd;
	var strday;
	strSource = trim(strSource);				
	tempArr = strSource.split("/");
	stryyy = parseInt(tempArr[0].replace(/^0*/,""))+1911;
	strmm = tempArr[1];
	strdd = tempArr[2];
	strday = stryyy +"/"+strmm +"/"+strdd;
						
	if(!re.test(strSource) || (!isDate(strday))){
		alert("欄位\"" + strDisplayName + "\"日期\"格式錯誤!");
		return false;
	}
	return true;
}	

/* <================================================================ CHECK DATE */

/* CHECK 'STRING' 
 * 檢查字串 */ 
function  check_STRING(strDisplayName, strSource, blnChkDoubleByte, intLimitedLen) {
	strSource = trim(strSource);
	//alert(intLimitedLen);
	if((intLimitedLen!=null) && (intLimitedLen!="") && !isNaN(intLimitedLen)){
		var intMaxSourceLen;
		var intCountStrBLen;
		var strChar;
		var i ;
					
		intMaxSourceLen = parseInt(intLimitedLen) 
		intCountStrBLen = 0
					
		for( i = 0 ; i<strSource.length;i++){
			strChar = (strSource.substr(i,1)).charCodeAt(0) ;// 取得第 I 個字元組的字元碼
			if((strChar >= 0) && (strChar <= 255)){ // single character
				intCountStrBLen = intCountStrBLen + 1;
			}else{ // 
				//檢查是否有中文
				if(blnChkDoubleByte == true){
					alert("欄位\"" + strDisplayName + "\"不能輸入中文!");
					return false;
				}else{
					intCountStrBLen = intCountStrBLen + 2;
				}
			}
		}
	}else{	
		alert("所需判斷參數intLimitedLen格式錯誤或未輸入(必須輸入大於0的整數)!");
		return false;
	}
					
	if(intCountStrBLen > intMaxSourceLen){		
		alert("欄位\"" + strDisplayName + "\"長度不可大於" + intMaxSourceLen);
		return false;
	}
	return true;
}	

/* CHECK 'RadioList' 
* 檢查是否有選取選項 */
function check_Radio(strDisplayName, strSource) {
    var radioObj = document.getElementById(strSource);
    var radioList = radioObj.getElementsByTagName('input');
    for (var i = 0; i < radioList.length; i++) {
        if (radioList[i].checked) {
            return true;
        }
    }
    alert("欄位\"" + strDisplayName + "\"未選取!");
    return false;
}

/* CHECK 'CheckBoxList' 
* 檢查是否有選取選項 */
function check_Check(strDisplayName, strSource) {
    var cboxObj = document.getElementById(strSource);
    var cboxList = cboxObj.getElementsByTagName('input');
    var lbList = cboxObj.getElementsByTagName('label');
    for (var i = 0; i < cboxList.length; i++) {
        if (cboxList[i].checked) {
            return true;
        }
    }
    alert("欄位\"" + strDisplayName + "\"未選取!");
    return false;
}

/* CHECK 'NUMBER' 
 * 檢查是否為數字 */ 
function  check_NUMBER(strDisplayName, strSource, blnIsInteger, intNumberFrom, intNumberTo) {
	var intSource;
	var intFix;
	
	strSource = trim(strSource);			
	if(isNaN(strSource)){					
		alert("欄位\"" + strDisplayName + "\"只能填數字!");
		return false;
	}else{
		intSource = parseFloat(strSource);
		if(blnIsInteger && (blnIsInteger!=null)){ //要檢查是否為整數嗎?;
			//對intSource做"無條件進位"
			intFix = Math.ceil(intSource);
			if((intSource - intFix != 0)){
				alert("欄位\"" + strDisplayName + "\"只能填整數!");
				return false;
			}             
		}  

		//檢查是否超過設定的範圍;
		if((intNumberFrom!=null) && !isNaN(intNumberFrom) && (intNumberTo!=null) && !isNaN(intNumberTo)){
			//ta = parseInt(intNumberFrom);
			//tb = parseInt(intNumberTo);
			if((intSource < intNumberFrom) || (intSource > intNumberTo)){
				alert("欄位\"" + strDisplayName + "\"只能輸入介於" + intNumberFrom + "和" +  intNumberTo + "之間的數值!");
				return false;				
			}
		}
		return true;
	}	
}	

/* CHECK CID  
 * 處理統編格式判斷 */
//function check_CID(strDisplayName, strSource) {
//	strSource = trim(strSource);
//	if(strSource.length==8){
//		if(isNaN(strSource)){ 
//			alert("欄位 " + strDisplayName + "\"統編\"格式錯誤!");
//			return false;
//		}
//	}else{
//		alert("欄位 " + strDisplayName + "\"統編\"格式錯誤!");
//		return false;
//	}
//	return true;	
//}
/* CHECK CID  
 * 處理新統編格式判斷（20211118 新需求） */
function check_CID(strDisplayName, strSource) {
    strSource = trim(strSource);

    if (strSource.length != 8 || isNaN(strSource)) {
        alert("欄位 " + strDisplayName + "\"統編\"格式錯誤!");
        return false;
    }

    var checkNumList = [0, 0, 0, 0, 0, 0, 0, 0];
    var checkNumTemp = [0, 0];
    var sum = 0;

    // 第一碼
    checkNumList[0] = parseInt(strSource[0]);
    // 第二碼
    if (parseInt(strSource[1]) * 2 > 9) {
        checkNumTemp[0] = (parseInt(strSource[1]) * 2).toString().substring(0, 1);
        checkNumTemp[1] = (parseInt(strSource[1]) * 2).toString().substring(1, 2);
        checkNumList[1] = parseInt(checkNumTemp[0]) + parseInt(checkNumTemp[1]);
    }
    else {
        checkNumList[1] = parseInt(strSource[1]) * 2;
    }
    // 第三碼
    checkNumList[2] = parseInt(strSource[2]);
    // 第四碼
    if (parseInt(strSource[3]) * 2 > 9) {
        checkNumTemp[0] = (parseInt(strSource[3]) * 2).toString().substring(0, 1);
        checkNumTemp[1] = (parseInt(strSource[3]) * 2).toString().substring(1, 2);
        checkNumList[3] = parseInt(checkNumTemp[0]) + parseInt(checkNumTemp[1]);
    }
    else {
        checkNumList[3] = parseInt(strSource[3]) * 2;
    }
    // 第五碼
    checkNumList[4] = parseInt(strSource[4]);
    // 第六碼
    if (parseInt(strSource[5]) * 2 > 9) {
        checkNumTemp[0] = (parseInt(strSource[5]) * 2).toString().substring(0, 1);
        checkNumTemp[1] = (parseInt(strSource[5]) * 2).toString().substring(1, 2);
        checkNumList[5] = parseInt(checkNumTemp[0]) + parseInt(checkNumTemp[1]);
    }
    else {
        checkNumList[5] = parseInt(strSource[5]) * 2;
    }
    // 第七碼（數值非7）
    if (strSource[6] != '7') {
        if (parseInt(strSource[6]) * 4 > 9) {
            checkNumTemp[0] = (parseInt(strSource[6]) * 4).toString().substring(0, 1);
            checkNumTemp[1] = (parseInt(strSource[6]) * 4).toString().substring(1, 2);
            checkNumList[6] = parseInt(checkNumTemp[0]) + parseInt(checkNumTemp[1]);
        }
        else {
            checkNumList[6] = parseInt(strSource[6]) * 4;
        }
    }
    else { // 第七碼（數值7）
        checkNumList[6] == 0;
    }
    // 第八碼
    checkNumList[7] = parseInt(strSource[7]);

    // 相加總和
    for (var i = 0; i < 8; i++) {
        sum += checkNumList[i];
    }
    // 第七位數7
    if (strSource[6] == '7') {
        if (sum % 5 != 0 && (sum + 1) % 5 != 0) {
            alert("欄位 " + strDisplayName + "\"統編\"格式錯誤!");
            return false;
        }
    }
    else { // 第七位數非7
        if (sum % 5 != 0) {
            alert("欄位 " + strDisplayName + "\"統編\"格式錯誤!");
            return false;
        }
    }
    return true;
}


/* CHECK RATE  
* 處理統編格式判斷 */
function check_RATE(strDisplayName, strSource) {
    strSource = trim(strSource);
    if (strSource.lenght <= 3) {
        if (isNaN(strSource)) {
            alert("欄位 " + strDisplayName + "\"持股比例\"格式錯誤!");
            return false;
        } else {
            var strNum = parseInt(strSource);
            if (strNum > 100) {
                alert("欄位 " + strDisplayName + "\"持股比例\"須小於100!");
                return false;
            }
        }
    } else {
        alert("欄位 " + strDisplayName + "\"持股比例\"格式錯誤!");
        return false;
    }
    return true;
}	

/* CHECK ID  
 * 處理身份証號格式判斷(ok) */
function check_ID(strDisplayName, strSource) {
	var chr_one;
	var total1 = 0;
	var total2 = 0;
	var key;
	var pat = /^[a-zA-Z][1-2]\d{8}$/;
	var re = new RegExp(pat);
				
	strSource = trim(strSource);
	if(strSource.length!=10 || (!re.test(strSource))){
		alert("欄位 " + strDisplayName + "\"身分証字號\"格式不對!");
		return false;		
	}					
	chr_one=strSource.substr(0,1);
	chr_one=chr_one.toUpperCase();
	switch(chr_one){
		case "A":  total1=1;   break;
		case "B":  total1=10;  break;
		case "C":  total1=19;  break;
		case "D":  total1=28;  break;
		case "E":  total1=37;  break;
		case "F":  total1=46;  break;
		case "G":  total1=55;  break;
		case "H":  total1=64;  break;
		case "J":  total1=73;  break;
		case "K":  total1=82;  break;
		case "L":  total1=2;   break;
		case "M":  total1=11;  break;
		case "N":  total1=20;  break;
		case "P":  total1=29;  break;
		case "Q":  total1=38;  break;
		case "R":  total1=47;  break;
		case "S":  total1=56;  break;
		case "T":  total1=65;  break;
		case "U":  total1=74;  break;
		case "V":  total1=83;  break;
		case "X":  total1=3;   break;
		case "Y":  total1=12;  break;
		case "W":  total1=21;  break;
		case "Z":  total1=30;  break;
		case "I":  total1=39;  break;
		case "O":  total1=48;  break;
		default:
			alert("欄位 " + strDisplayName + "\"身分証字號\"格式不對!");
			return false;
	}
	//alert("mblnChkField"+mblnChkField);
	//alert("total11_1="+total1);
	for(i=1;i<9;i++){
		c=strSource.substr(i,1);							
		total2=total2+parseInt(c)*(9-i);							
	}
	//alert("total1_2="+total1+"total2="+total2);						
	total1=total1+total2;
	key = parseInt(strSource.substr(9,1).replace(/^0*/,""));
	//alert(key);
	//alert("total1_3="+total1);
	if((10-(total1 % 10)) != key && (total1 % 10) !=0){
		alert("欄位 " + strDisplayName + "\"身分証字號\"格式不對!");
		return false;		
	}
	return true;
}

/* CHECK ID2  
 * 處理身份証號和護照號碼格式判斷(ok) */
function check_ID2(strDisplayName, strSource) {
	var chr_one;
	var total1 = 0;
	var total2 = 0;
	var key;
	var pat = /^[a-zA-Z][1-2]\d{8}$/;
	var re = new RegExp(pat);

	strSource = trim(strSource);
	if (strSource.length == 10) {
	    if (strSource.length != 10 || (!re.test(strSource))) {
	        alert("欄位 " + strDisplayName + "\"身分証字號\"格式不對!");
	        return false;
	    }
	} else if(strSource.length > 10) {
	    if (strSource.length > 20) {
	    alert("欄位 " + strDisplayName + "\"護照號碼\"格式不對!");
	    return false;
	    }else {
	    //護照號碼正確		
	    return true;
	    }		
	} else if(strSource.length < 10) {
	    alert("欄位 " + strDisplayName + "\"身分証字號和護照號碼\"格式不對!");
	    return false;
	} 
	chr_one=strSource.substr(0,1);
	chr_one=chr_one.toUpperCase();
	switch(chr_one){
		case "A":  total1=1;   break;
		case "B":  total1=10;  break;
		case "C":  total1=19;  break;
		case "D":  total1=28;  break;
		case "E":  total1=37;  break;
		case "F":  total1=46;  break;
		case "G":  total1=55;  break;
		case "H":  total1=64;  break;
		case "J":  total1=73;  break;
		case "K":  total1=82;  break;
		case "L":  total1=2;   break;
		case "M":  total1=11;  break;
		case "N":  total1=20;  break;
		case "P":  total1=29;  break;
		case "Q":  total1=38;  break;
		case "R":  total1=47;  break;
		case "S":  total1=56;  break;
		case "T":  total1=65;  break;
		case "U":  total1=74;  break;
		case "V":  total1=83;  break;
		case "X":  total1=3;   break;
		case "Y":  total1=12;  break;
		case "W":  total1=21;  break;
		case "Z":  total1=30;  break;
		case "I":  total1=39;  break;
		case "O":  total1=48;  break;
		default:
			alert("欄位 " + strDisplayName + "\"身分証字號\"格式不對!");
			return false;
	}
	//alert("mblnChkField"+mblnChkField);
	//alert("total11_1="+total1);
	for(i=1;i<9;i++){
		c=strSource.substr(i,1);							
		total2=total2+parseInt(c)*(9-i);							
	}
	//alert("total1_2="+total1+"total2="+total2);						
	total1=total1+total2;
	key = parseInt(strSource.substr(9,1).replace(/^0*/,""));
	//alert(key);
	//alert("total1_3="+total1);
	if((10-(total1 % 10)) != key && (total1 % 10) !=0){
		alert("欄位 " + strDisplayName + "\"身分証字號\"格式不對!");
		return false;		
	}
	return true;
}

/* CHECK ID3  
 * 不跳錯誤訊息
 * 處理身份証號格式判斷(ok) */
function check_ID3(strDisplayName, strSource) {
	var chr_one;
	var total1 = 0;
	var total2 = 0;
	var key;
	var pat = /^[a-zA-Z][1-2]\d{8}$/;
	var re = new RegExp(pat);
				
	strSource = trim(strSource);
	if(strSource.length!=10 || (!re.test(strSource))){
		//alert("欄位 " + strDisplayName + "\"身分証字號\"格式不對!");
		return false;		
	}					
	chr_one=strSource.substr(0,1);
	chr_one=chr_one.toUpperCase();
	switch(chr_one){
		case "A":  total1=1;   break;
		case "B":  total1=10;  break;
		case "C":  total1=19;  break;
		case "D":  total1=28;  break;
		case "E":  total1=37;  break;
		case "F":  total1=46;  break;
		case "G":  total1=55;  break;
		case "H":  total1=64;  break;
		case "J":  total1=73;  break;
		case "K":  total1=82;  break;
		case "L":  total1=2;   break;
		case "M":  total1=11;  break;
		case "N":  total1=20;  break;
		case "P":  total1=29;  break;
		case "Q":  total1=38;  break;
		case "R":  total1=47;  break;
		case "S":  total1=56;  break;
		case "T":  total1=65;  break;
		case "U":  total1=74;  break;
		case "V":  total1=83;  break;
		case "X":  total1=3;   break;
		case "Y":  total1=12;  break;
		case "W":  total1=21;  break;
		case "Z":  total1=30;  break;
		case "I":  total1=39;  break;
		case "O":  total1=48;  break;
		default:
			//alert("欄位 " + strDisplayName + "\"身分証字號\"格式不對!");
			return false;
	}
	//alert("mblnChkField"+mblnChkField);
	//alert("total11_1="+total1);
	for(i=1;i<9;i++){
		c=strSource.substr(i,1);							
		total2=total2+parseInt(c)*(9-i);							
	}
	//alert("total1_2="+total1+"total2="+total2);						
	total1=total1+total2;
	key = parseInt(strSource.substr(9,1).replace(/^0*/,""));
	//alert(key);
	//alert("total1_3="+total1);
	if((10-(total1 % 10)) != key && (total1 % 10) !=0){
		//alert("欄位 " + strDisplayName + "\"身分証字號\"格式不對!");
		return false;		
	}
	return true;
}

/* CHECK FILETYPE  
 * 檢查 上傳 File的附檔名 */
function check_FILETYPE(strDisplayName, strSource, intChkFileType) {	
	var strlen = 0;
	var temp = "";
	
	strSource = trim(strSource);
	strlen = strSource.length;
	temp = strSource.indexOf(".")+1;
	tmpfile = strSource.substr(temp,strlen-temp);
	//alert("temp="+temp);
	//alert("tmpfile="+tmpfile);
	if(intChkFileType == null || isNaN(intChkFileType)){
		alert("所需判斷檔案型態參數格式錯誤或未輸入(必須輸入整數)!");
		return false;
	}		
	switch(intChkFileType){//(借用來表示副檔名類型 "" 和 0 均表示不檢查)
		case 0 :	//all file type
			break;          		
		case 1 : 	//img
			if((trim(tmpfile.toUpperCase()) != "JPG")&& (trim(tmpfile.toUpperCase()) !="GIF")){
				alert("欄位 " + strDisplayName + "\"上傳檔案\"格式不對!");
				return false;
			}
			break;
	}
	return true;
}

/* CHECK ERR_CODE  
 * 驗證奇怪的符號字元(如:!#$^'"()><@#%&*`) */
function check_ERR_CODE(strDisplayName, strSource) {
	//check format for iafi
	var pat = /(\/|~|@|#|\$|%|\^|&|\*|;|\+|=|`|\\|\||\[|\]|{|}|'|"|<|>|\.)/;
	//check format for usual
	//var pat = /(\/|~|@|#|\$|%|\^|&|\*|\(|\)|-|\+|=|`|\\|\||\[|\]|{|}|'|"|<|>|\.)/;
	var re = new RegExp(pat);
	strSource = trim(strSource);
	
	if(re.test(strSource)){					
		alert("欄位 " + strDisplayName + "不得輸入如:~$<>[]等等字元符號!");
		return false;
	}	
	return true;
}	

//----------犯罪防制中心專案新增驗證(開始)--------------------------------------------------------------------------
/* CHECK CASE_ID  
 * 驗證案件編號(格式093-00001) */
function check_CASE_ID(strDisplayName, strSource) {
	var pat = /^\d{3}-\d{5}$/;
	var re = new RegExp(pat);
	strSource = trim(strSource);			
	if(!re.test(strSource)){
		alert("欄位 " + strDisplayName + "\"案件編號\"格式錯誤!\n格式093-00001");
		return false;
	}	
	return true;
}

/* CHECK DOCID 
 * 驗證收發文號(格式093001234，中間的"00 or 05"是固定的) */
function check_DOCID(strDisplayName, strSource) {
	var pat = /^\d{3}0[05]\d{4}$/;
	var re = new RegExp(pat);
				
	if(!(re.test(strSource))){
		alert("欄位 " + strDisplayName + "\"收發文號\"格式錯誤!\n格式XXX00XXXX or XXX05XXXX");
		return false;
	}
	return true;
}

//----------犯罪防制中心專案新增驗證(結束)--------------------------------------------------------------------------


//----------居留證號驗證(開始)--------------------------------------------------------------------------

/* CHECK ResID  
 * 驗證居留證號 */ 
function check_ResID(strDisplayName, strSource){                                                
	strSource = trim(strSource);
	strSource = strSource.toUpperCase();
	if(strSource.length!=10){
		alert("欄位 " + strDisplayName + "\"居留證號\"格式不對!");
		return false;		
	}			
	//檢查居留證號碼
		if (isNaN(strSource.substr(2,8)) || (strSource.substr(0,1)<"A" ||strSource.substr(0,1)>"Z") || (strSource.substr(1,1)<"A" ||strSource.substr(1,1)>"Z")){
			alert("欄位 " + strDisplayName + "\"居留證號\"格式不對!");
		    return false;		
		}
		var head="ABCDEFGHJKLMNPQRSTUVXYWZIO";
		strSource = (head.indexOf(strSource.substr(0,1))+10) +''+ ((head.indexOf(strSource.substr(1,1))+10)%10) +''+ strSource.substr(2,8)
		s =parseInt(strSource.substr(0,1)) + 
		parseInt(strSource.substr(1,1)) * 9 + 
		parseInt(strSource.substr(2,1)) * 8 + 
		parseInt(strSource.substr(3,1)) * 7 + 			
		parseInt(strSource.substr(4,1)) * 6 + 
		parseInt(strSource.substr(5,1)) * 5 + 
		parseInt(strSource.substr(6,1)) * 4 + 
		parseInt(strSource.substr(7,1)) * 3 + 
		parseInt(strSource.substr(8,1)) * 2 + 
		parseInt(strSource.substr(9,1)) + 
		parseInt(strSource.substr(10,1));

		//判斷是否可整除
		if ((s % 10) != 0) {
	    	alert("欄位 " + strDisplayName + "\"居留證號\"格式不對!");
		    return false;	
		}
		//居留證號碼正確		
		return true;
}

/* CHECK ResID  
 * 不直接跳錯誤訊息
 * 驗證居留證號 */ 
function check_ResID2(strDisplayName, strSource){                                                
	strSource = trim(strSource);
	strSource = strSource.toUpperCase();
	if(strSource.length!=10){
	    //alert("欄位 " + strDisplayName + "\"居留證號\"格式不對!");
		return false;		
	}			
	//檢查居留證號碼
		if (isNaN(strSource.substr(2,8)) || (strSource.substr(0,1)<"A" ||strSource.substr(0,1)>"Z") || (strSource.substr(1,1)<"A" ||strSource.substr(1,1)>"Z")){
		    //alert("欄位 " + strDisplayName + "\"居留證號\"格式不對!");
		    return false;		
		}
		var head="ABCDEFGHJKLMNPQRSTUVXYWZIO";
		strSource = (head.indexOf(strSource.substr(0,1))+10) +''+ ((head.indexOf(strSource.substr(1,1))+10)%10) +''+ strSource.substr(2,8)
		s =parseInt(strSource.substr(0,1)) + 
		parseInt(strSource.substr(1,1)) * 9 + 
		parseInt(strSource.substr(2,1)) * 8 + 
		parseInt(strSource.substr(3,1)) * 7 + 			
		parseInt(strSource.substr(4,1)) * 6 + 
		parseInt(strSource.substr(5,1)) * 5 + 
		parseInt(strSource.substr(6,1)) * 4 + 
		parseInt(strSource.substr(7,1)) * 3 + 
		parseInt(strSource.substr(8,1)) * 2 + 
		parseInt(strSource.substr(9,1)) + 
		parseInt(strSource.substr(10,1));

		//判斷是否可整除
		if ((s % 10) != 0) {
		    //alert("欄位 " + strDisplayName + "\"居留證號\"格式不對!");
		    return false;	
		}
		//居留證號碼正確		
		return true;
}

//新式統一證號驗證（新外來人口統一證號）(開始)
function check_ResID3(strDisplayName, strSource) {
    strSource = trim(strSource);                            //排除空白
    strSource = strSource.toUpperCase();                    //將內容轉換大寫（首碼字母）
    validaNum = strSource.substr(strSource.length - 1, 1);  //驗證號（最後一碼）
    //判斷長度
    if (strSource.length != 10) {
        return false;
    }
    //檢查居留證號碼
    if (isNaN(strSource.substr(1, 9)) || (strSource.substr(0, 1) < "A" || strSource.substr(0, 1) > "Z")) {
        return false;
    }
    //檢查性別：8=男性，9=女
    if ((strSource.substr(1, 1) != "8" && strSource.substr(1, 1) != "9")) {
        return false;
    }

    //換算數字表
    var chrSource = "";
    var numChrSource = 0;
    chrSource = strSource.substr(0, 1);
    chrSource = chrSource.toUpperCase();
    switch (chrSource) {
        case "A": numChrSource = 10; break;
        case "B": numChrSource = 11; break;
        case "C": numChrSource = 12; break;
        case "D": numChrSource = 13; break;
        case "E": numChrSource = 14; break;
        case "F": numChrSource = 15; break;
        case "G": numChrSource = 16; break;
        case "H": numChrSource = 17; break;
        case "J": numChrSource = 18; break;
        case "K": numChrSource = 19; break;
        case "L": numChrSource = 20; break;
        case "M": numChrSource = 21; break;
        case "N": numChrSource = 22; break;
        case "P": numChrSource = 23; break;
        case "Q": numChrSource = 24; break;
        case "R": numChrSource = 25; break;
        case "S": numChrSource = 26; break;
        case "T": numChrSource = 27; break;
        case "U": numChrSource = 28; break;
        case "V": numChrSource = 29; break;
        case "X": numChrSource = 30; break;
        case "Y": numChrSource = 31; break;
        case "W": numChrSource = 31; break;
        case "Z": numChrSource = 33; break;
        case "I": numChrSource = 34; break;
        case "O": numChrSource = 35; break;
        default:
            return false;
    }
    strSource = numChrSource + strSource.substr(1, 8);

    //乘以特定數(1987654321)
    var afterCount = parseInt(strSource.substr(0, 1)) * 1;
    afterCount += parseInt(strSource.substr(1, 1)) * 9 % 10;
    afterCount += parseInt(strSource.substr(2, 1)) * 8 % 10;
    afterCount += parseInt(strSource.substr(3, 1)) * 7 % 10;
    afterCount += parseInt(strSource.substr(4, 1)) * 6 % 10;
    afterCount += parseInt(strSource.substr(5, 1)) * 5 % 10;
    afterCount += parseInt(strSource.substr(6, 1)) * 4 % 10;
    afterCount += parseInt(strSource.substr(7, 1)) * 3 % 10;
    afterCount += parseInt(strSource.substr(8, 1)) * 2 % 10;
    afterCount += parseInt(strSource.substr(9, 1)) * 1 % 10;
    //若不為0以10減基數之個位數的檢查碼
    var resultNum = 0;
    if ((afterCount % 10) != 0) {
        resultNum = 10 - (afterCount % 10 );
    }
    return resultNum == validaNum;
}
//----------居留證號驗證(結束)--------------------------------------------------------------------------



/******************************************************************************************
*程式名稱:mblnChkField()
*功    能:檢查欄位值是符合條件
*作    者:????????            		 日期:2005.3.13
*輸    入:strDisplayName              display名稱
*        :strSource                  欄位值
*        :blnRequired                (true\false)是否為必要欄位
*        :strCtlType                 "Date", "String","Number","FileType"...驗證型態(if(strCtlType="FileType") 表不同檔案類型)
*        :intLimitedLen              1.設定最大長度(必須搭配STRING驗證模式用) 2.驗證檔案類型(檢查副檔名)(必須搭配FILETYPE驗證模式用) 
*        :blnChkDoubleByte           (true\false)設定是否測試"不能輸入中文" ex:true的話則不能輸入中文(必須搭配STRING驗證模式用)
*        :blnIsInteger               (true\false)設定是否測試"整數"(必須搭配NUMBER驗證模式用)
*        :intNumberFrom              設定起始值(必須搭配NUMBER驗證模式用)
*        :intNumberTo                設定終止值(必須搭配NUMBER驗證模式用)
*
*相關參數:tmpfile                    儲存副檔名用
*        :stryyyy 
*        :stryyy
*        :strmm                        
*        :strdd                      
*        :strday
*        :strCtlTypeTemp    		 暫存驗證模式資料用
*        :mblnChkField               欄位驗證結果
*
*驗證型態:LIST_BOOK					 驗證列印冊格式(021 | 122)
*        :EMAIL						 驗證E-mail格式(只判斷'@'前面有無字而已)
*		 :YYYMMDD					 日期驗證
*        :YYYYMMDD					 日期驗證
*        :YYYY  					 日期驗證                 
*        :YYY                 		 日期驗證       
*        :MM                    	 日期驗證  
*        :YYYYMM					 日期驗證
*        :YYYMM    		 			 日期驗證
*        :DATE    		 			 日期驗證(驗證格式為2004/01/01的日期)
*        :DATE_TAW    		 		 日期驗證(驗證格式為094/01/01的日期)
*        :STRING 					 檢查是否為文字
*		 :NUMBER					 檢查是否為數字
*        :CID						 檢查統編格式
*        :ID 						 檢查身分證字號格式
*        :FILETYPE 					 驗證上傳檔案格式是否正確(由副檔名判斷此檔是否可以上傳，必須搭配intLimitedLen參數使用)
*        :ERR_CODE 					 驗證欄位裡是否有非法字元如:~$#&<>[]....等
*------------------犯罪防制中心專案新增驗證(開始)---------------------------------------------------------------------------------
*        :CASE_ID 					 驗證案件編號(格式093-00001)
*        :DOCID 					 驗證收發文號(格式093001234，中間的"00 or 05"是固定的)
*------------------犯罪防制中心專案新增驗證(結束)---------------------------------------------------------------------------------
*ERR_CODE
*輸    出:作業成功輸出true，失敗輸出false
*
*錯誤訊息:strErrorStatus             錯誤型態
*        :errEmpty                   不允許空白
*        :errDate					 日期格式錯誤
*        :errNum                     只能填數字
*        :errLen                     長度不可大於
*        :errDB                      不能輸入中文
*        :errInt                     只能填整數
*        :errRange					 只能輸入介於~之間的數字
*		 :errMail                    EMail格式錯誤
*        :errPR                      格式錯誤
*        :errID1                     身分証字號格式不對
*        :errID2                     身份證字號檢查碼不對
*        :errCID                     統編格式錯誤
*        :errFile1                   上傳檔案格式不對
*        :errNoImplement             檢查方式尚未開發
*        :ERR_CODE 					 驗證欄位裡是否有非法字元如:~$#&<>[]....等
*------------------犯罪防制中心專案新增(訊息)---------------------------------------------------------------------------------
*        :errCaseID                  案件編號格式錯誤
*        :errDocID                   收發文號格式錯誤
*------------------犯罪防制中心專案新增(訊息)---------------------------------------------------------------------------------
******************************************************************************************/


function mblnChkField(strDisplayName,strSource,blnRequired,strCtlType,intLimitedLen,blnChkDoubleByte,blnIsInteger,intNumberFrom,intNumberTo){
	if (!check_REQUIRE(strDisplayName, strSource, blnRequired))
		return false;
	if(trim(strSource) == "")	
		return true;
	//處理非空的情況
	switch (strCtlType.toUpperCase()){
		case 'LIST_BOOK':  //驗證列印冊格式(0XX | 1XX)
			return check_LIST_BOOK(strDisplayName, strSource);				
		case 'EMAIL':  //處理EMAIL格式判斷(只檢查'@'前面有沒有字而已)	
			return check_EMAIL(strDisplayName, strSource);
		//==檢查日期==>	
		case 'YYY_MM_DD': 	//驗証民國年 093/01/01->20040101	
		    strSource= strSource.replace("/","");
			return check_DATE_YYYMMDD(strDisplayName, strSource);
		case 'YY_MM_DD': 	//驗証民國年 93/01/01->20040101	
		    strSource= strSource.replace("/","");
		    strSource="0" + strSource.replace("/","");
		   // alert(strSource);
			return check_DATE_YYYMMDD(strDisplayName, strSource);
		case 'YYYMMDD': 	//驗証民國年 0930101->20040101	
			return check_DATE_YYYMMDD(strDisplayName, strSource);
		case 'YYYYMMDD':  //處理西元年日期格式YYYYMMDD
			return check_DATE_YYYYMMDD(strDisplayName, strSource);
		case 'YYYY':  //處理西元年日期格式YYYY;
			return check_DATE_YYYY(strDisplayName, strSource);
		case 'YYY':    //處理民國年格式YYY	
			return check_DATE_YYY(strDisplayName, strSource);
		case 'MM':    //處理日期格式MM
			return check_DATE_MM(strDisplayName, strSource);
		case 'YYYYMM':   //處理西元年日期格式YYYYMM
			return check_DATE_YYYYMM(strDisplayName, strSource);
		case 'YYYMM':    //處理民國年月日期格式YYYMM
			return check_DATE_YYYMM(strDisplayName, strSource);
		case 'DATE':   //處理西元年日期格式(ex:2004/01/01)
			return check_DATE(strDisplayName, strSource);
		case 'DATE_TAW':   //處理民國年日期格式(ex:094/01/01)	
			return check_DATE_TAW(strDisplayName, strSource);				
		//<==檢查日期==	
		case 'STRING':  //檢查是否為文字
			return check_STRING(strDisplayName, strSource, blnChkDoubleByte, intLimitedLen);
		case 'NUMBER':  //檢查是否為數字
			return check_NUMBER(strDisplayName, strSource, blnIsInteger, intNumberFrom, intNumberTo);
		case 'CID':   //處理統編格式判斷
			return check_CID(strDisplayName, strSource);
		case 'ID':    //處理身份証號格式判斷(ok)
		    return check_ID(strDisplayName, strSource);
		case 'ID2':    //處理身份証號和護照號碼格式判斷(ok)
			return check_ID2(strDisplayName, strSource);
		case 'ID3':    //處理身份証號和統編號碼格式判斷(ok)
		    if(strSource.length<10){
			return check_CID(strDisplayName, strSource);
			}else{
			return check_ID(strDisplayName, strSource);
			}
		case 'ID4':    //處理身份証號和居留格式判斷(ok)
		    if (check_ID3(strDisplayName, strSource) == true || check_ResID2(strDisplayName, strSource) == true) {
		        return true;
		    } else {
		        if (strSource.length == 10) {
		            alert("欄位 " + strDisplayName + "\"身分證字號和居留證號\"格式不對!");
		            return false;
		        }
                else {
                    return true;
                }
		    }
		case 'ID5':
		    if (strSource.length < 10) {
		        return check_CID(strDisplayName, strSource);
		    } else {
		        if (check_ID3(strDisplayName, strSource) == true || check_ResID2(strDisplayName, strSource) == true) {
		            return true;
		        } else {
		            alert("欄位 " + strDisplayName + "\"身分證字號和居留證號\"格式不對!");
		            return false;
		        }
		    }
	    case 'ID6':     //20200507,author:LU 處理身份証號、居留格式和新式統一證號(新外來人口統一證號)判斷
	        if (check_ID3(strDisplayName, strSource) == true || check_ResID2(strDisplayName, strSource) == true || check_ResID3(strDisplayName, strSource) == true) {
	            return true;
	        }else{
	            if (trim(strSource).length == 10) {
	                alert("欄位 " + strDisplayName + "\"身分證字號和居留證\"格式不對!");
	                return false;
	            }else{
                    return true;
	            }
	        }
	    case 'ID7':     //20200507,author:LU 處理統編、身份証號、居留格式和新式統一證號(新外來人口統一證號)判斷
	        if (strSource.length < 10) {
	            return check_CID(strDisplayName, strSource);
	        } else {
	            if (check_ID3(strDisplayName, strSource) == true || check_ResID2(strDisplayName, strSource) == true || check_ResID3(strDisplayName, strSource) == true) {
	                return true;
	            } else {
	                alert("欄位 " + strDisplayName + "\"身分證字號和居留證號\"格式不對!");
	                return false;
	            }
	        }
	    case 'RATE':    //持股比例判斷 < 100
		    return check_RATE(strDisplayName, strSource);
		case 'FILETYPE':   //chk 上傳 File的附檔名
			return check_FILETYPE(strDisplayName, strSource, intLimitedLen);
		case 'ERR_CODE'://驗證奇怪的符號字元(如:!#$^'"()><@#%&*`)
			return check_ERR_CODE(strDisplayName, strSource);
		case 'ResID':    //處理居留証號格式判斷(ok)
		    return check_ResID(strDisplayName, strSource);
		case 'RADIO'://驗證RadioButtonList
		    return check_Radio(strDisplayName, strSource);
		case 'CHECKBOX'://驗證CheckBoxList
		    return check_Check(strDisplayName, strSource);
//----------犯罪防制中心專案新增驗證(開始)--------------------------------------------------------------------------
		case 'CASE_ID'://驗證案件編號(格式093-00001)
			return check_CASE_ID(strDisplayName, strSource);
		case 'DOCID'://驗證收發文號(格式093001234，中間的"00"是固定的)
			return check_DOCID(strDisplayName, strSource);
//----------犯罪防制中心專案新增驗證(結束)--------------------------------------------------------------------------
		default:
			alert("欄位 " + strDisplayName + strCtlType.toUpperCase() + "檢查方式尚未開發!");
	}		
	return false;	
}

/***********************************************************************************
使用方式:另外寫一個JavaScript程式，將需要驗證的每個"欄位"都用"驗證方法"跑一遍
ex1:使用button時方法(不可以按enter鍵，只能點選"送出鈕"送出form資料)
function checkField(){
	with(document.formName){
		chk1 = mblnChkField(strDisplayName,strSource,blnRequired,strCtlType,intLimitedLen,blnChkDoubleByte,blnIsInteger,intNumberFrom,intNumberTo);
		if(chk1==false){......}
		chk2 = mblnChkField("請輸入日期",tagName.value,true,"DATE",10,false,false,10,10);
		if(chk2==false){
			tagName.focus();//取得錯誤欄位的停駐點
			//history.back();//回到輸入表單且資料不會不見
			return;
		}
		
	}
	formName.submit();//所有欄位都驗證完成後才submit
}
<FORM NAME='form1' ACTION='處理的頁面(ex:controller)' METHOD='post'>
<INPUT TYPE='text' name='TEST_FIELD' >
<INPUT TYPE='button' value='送出' onClick="useChkField()">

ex2:使用submit時方法(可以按"enter鍵"或點選"送出鈕"送出form資料)
function checkField() {
	if (!mblnChkField('TEST_FIELD',form1.TEST_FIELD.value,true,'LIST_BOOK',null,null,null,null,null))
		form1.TEST_FIELD.focus();
		return false;
	}
	return true;	
}
//onSubmit='return checkField()':如果return 'true'會把整個form的資料submit出去，如果return 'false'則會返回原頁面不處理且游標會停在錯誤的地方。
<FORM NAME='form1' ACTION='處理的頁面(ex:controller)' METHOD='post' onSubmit='return checkField()'>
<INPUT TYPE='text' name='TEST_FIELD' >
<INPUT TYPE='submit' value='送出' >
</FORM>

ex2:簡化方式:
function useChkField(){
			//alert(event.srcElement);
			with(document.forms[0]){//取得網頁中第一個form(用with包起來的內容可以省略form的名稱)
				//alert(elements[3].value);//顯示form中第4個元素的值		
				if(!mblnChkField("起始日期",elements[4].value,true,"DATE_TAW",10,false,false,10,10)){
					elements[4].focus();//取得錯誤欄位的停駐點					
					return false;
				}
				if(!mblnChkField("終訖日期",elements[5].value,true,"DATE_TAW",10,false,false,10,10)){
					elements[5].focus();//取得錯誤欄位的停駐點					
					return false;
				}
			}
			return true;
		}	
***********************************************************************************/


export default mblnChkField;

