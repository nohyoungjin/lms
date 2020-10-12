$(function() {

	// INIT

	magnific_popup();

	// ON LOAD

    $(window).load(function() {

		$('body').addClass('load');

	});

	// 팝업 레이어

	function magnific_popup() {

		$('.popup-with-move-anim').magnificPopup({

			type: 'inline',
			callbacks: {
				open : function() { $(window).load(); }
			},

			fixedContentPos: false,
			fixedBgPos: true,

			overflowY: 'hidden',

			closeBtnInside: true,
			preloader: false,

			midClick: true,
			removalDelay: 300,
			mainClass: 'my-mfp-slide-bottom'

		});

		//

		$('.pop_close').on('click',function() {                                                      
			$.magnificPopup.proto.close.call(this);
		}); 

	}

	//

	inputFileEvent(
		".wrap_fileSearch .btn_slight"
		, ".wrap_fileSearch input[type='file']"
		, ".wrap_fileSearch .delete"
	) ;


	// 사업구분

	$('input:radio[id=A1], input:radio[id=A2]').on('click', function() { 

		if ($(this).prop('checked')) { 

			// $(this).parent().addClass('selected'); 

			$('.skill_1').css('display','block'); 
			$('.skill_2').css('display','none'); 

			$('input[name="module"]').removeAttr('disabled');
			
		} else { 

			// $(this).parent().removeClass('selected'); 

		} 

	});

	/*  */

	$('input:radio[id=A3]').on('click', function() { 

		if ($(this).prop('checked')) { 

			$('.skill_1').css('display','none'); 
			$('.skill_2').css('display','block'); 

			$('input[name="module"]').attr('disabled', true);
			$('input[name="module"]').attr('checked', false);

			$('#B4').attr('checked', true);

		}

	});


	// 기술분야 - 모듈/skill

	$('input[name="design"], input[name="publish"], input[name="develop"]').attr('disabled', true);

	/*  */

	$('input:radio[id=B4]').on('click', function() { 

		if ($(this).prop('checked')) { 

			$('input[name="design"], input[name="publish"], input[name="develop"]').attr('checked', false);
			$('input[name="design"], input[name="publish"], input[name="develop"]').attr('disabled', true);

		}

	});

	/*  */

	$('input:radio[id=B5]').on('click', function() { 

		if ($(this).prop('checked')) { 

			$('input[name="design"], input[name="publish"], input[name="develop"]').attr('checked', false);
			$('input[name="publish"], input[name="develop"]').attr('disabled', true);

			$('input[name="design"]').removeAttr('disabled');

		}

	});

	$('input:radio[id=B6]').on('click', function() { 

		if ($(this).prop('checked')) { 

			$('input[name="design"], input[name="publish"], input[name="develop"]').attr('checked', false);
			$('input[name="design"], input[name="develop"]').attr('disabled', true);
			$('input[name="publish"]').removeAttr('disabled');

		}

	});

	$('input:radio[id=B7]').on('click', function() { 

		if ($(this).prop('checked')) { 

			$('input[name="design"], input[name="publish"], input[name="develop"]').attr('checked', false);
			$('input[name="design"], input[name="publish"]').attr('disabled', true);
			$('input[name="develop"]').removeAttr('disabled');

		}

	});


});


/* input[type="file"] 이벤트 */

function inputFileEvent (btnFile, inputFile, btnDelete) {

	// 파일첨부 링크 클릭 시

	$(btnFile).bind('click', function() {
		var fileId = $(this).attr('href');
		$(fileId).click() ;

		return false;
	}) ;

	// 파일 첨부 완료, 변경 시

	$(inputFile).change(function(e) {
		var fileObj = $(this).val()
			, Prt = $(this).parent()
			, pathHeader
			, pathMiddle
			, pathEnd
			, allFilename
			, fileName
			, extName ;

		if (fileObj != '') {
			pathHeader = fileObj.lastIndexOf('\\');
			pathMiddle = fileObj.lastIndexOf('.');
			pathEnd = fileObj.length;
			fileName = fileObj.substring(pathHeader + 1, pathMiddle);
			extName = fileObj.substring(pathMiddle + 1, pathEnd);
			allFilename = fileName + '.' + extName;

			$(this).parent().children('.fileName').html( allFilename );
			$(Prt).children('.btn_slight').hide();
			$(Prt).children('.delete').detach();
			$(Prt).children('.fileName').after('<a href="#" class="ico_ del delete">첨부된 ' + allFilename + ' 파일 삭제</a>');
			$(Prt).children('.delete').fadeIn();
		}
	}) ;

	// 파일 삭제 시

	$(document).delegate(btnDelete, 'click', DeleteFileEvt) ;

	function DeleteFileEvt() {
		var _this = $(this) ;
		$(_this).parent().children('input[type="file"]').val(null);
		$(_this).parent().children('.btn_slight').show();
		$(_this).parent().children('.fileName').html('');
		$(_this).detach() ;

		return false;
	}

}


// 바이트 체크

function fnChkByte(obj, maxByte) {

    var str = obj.value;
    var str_len = str.length;

    var rbyte = 0;
    var rlen = 0;
    var one_char = '';
    var str2 = '';

    for (var i = 0; i < str_len; i++) {
        one_char = str.charAt(i);

        if (escape(one_char).length > 4) {
            rbyte += 2; // 한글2Byte
        } else {
            rbyte++; // 영문 등 나머지 1Byte
        }

        if (rbyte <= maxByte) {
            rlen = i + 1; // return할 문자열 갯수
        }
     }


     if (rbyte > maxByte) {
		// alert('한글 ' + (maxByte/2) + '자 / 영문 ' + maxByte + '자를 초과 입력할 수 없습니다.');
		alert('메세지는 최대 ' + maxByte + 'byte를 초과할 수 없습니다.')
		str2 = str.substr(0,rlen); // 문자열 자르기
		obj.value = str2;
		fnChkByte(obj, maxByte);
     } else {
        document.getElementById('byteInfo').innerText = rbyte;
     }

}


// 우편번호 검색

function sample6_execDaumPostcode() {
	new daum.Postcode({
		oncomplete: function(data) {
			// 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

			// 각 주소의 노출 규칙에 따라 주소를 조합한다.
			// 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
			var addr = ''; // 주소 변수
			var extraAddr = ''; // 참고항목 변수

			//사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
			if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
				addr = data.roadAddress;
			} else { // 사용자가 지번 주소를 선택했을 경우(J)
				addr = data.jibunAddress;
			}

			// 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
			if (data.userSelectedType === 'R') {
				// 법정동명이 있을 경우 추가한다. (법정리는 제외)
				// 법정동의 경우 마지막 문자가 '동/로/가'로 끝난다.
				if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
					extraAddr += data.bname;
				}
				// 건물명이 있고, 공동주택일 경우 추가한다.
				if (data.buildingName !== '' && data.apartment === 'Y') {
					extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
				}
				// 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
				if (extraAddr !== '') {
					extraAddr = ' (' + extraAddr + ')';
				}
			}

			// 우편번호와 주소 정보를 해당 필드에 넣는다.
			document.getElementById('sample6_postcode').value = data.zonecode;
			document.getElementById('sample6_address').value = addr;
			// 커서를 상세주소 필드로 이동한다.
			document.getElementById('sample6_detailAddress').focus();
		}
	}).open();
}