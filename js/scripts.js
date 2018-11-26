$(document).ready(function(){

	$('.header__wrap--toggle').click(function(e){
		$('.header__wrap--wrappopup').toggleClass('open');
		$('.header__wrap--wrappopup').toggle();
	});

	$(document).on('click', function(e) {
		if ($(e.target).closest('main,footer').length) {
			$('.header__wrap--wrappopup.open').hide();
			$('.header__wrap--wrappopup.open').removeClass('open');
		}
		e.stopPropagation();
	});	

	$('.content__wrap--card').on('click','.content__wrap--buttonprice', function () {
		var content = $('.header__wrap--mouse');
		var url = $(this).closest('.content__wrap--card').find('.content__wrap--img').attr('src');
		var textCards = $(this).closest('.content__wrap--card').find('.content__wrap--titlecard').text();
		var textUnder = $(this).closest('.content__wrap--card').find('.content__wrap--text').text();
		var price = $(this).closest('.content__wrap--card').find('.content__wrap--buttonprice').text();
		var unique = $(this).closest('.content__wrap--card').index();
		
		content.append('<div class="header__wrap--item" data-id="'+unique+'">\n'+
								'<div class="header__wrap--blockitem">\n'+
									'<div class="header__wrap--imgitem"><img class="header__wrap--imgbaket" src="'+ url +'" alt="item"/></div>\n'+
									'<div class="header__wrap--bakettext">\n'+
										'<div class="header__wrap--maintext">'+ textCards  +'</div>\n'+
										'<div class="content__wrap--text">'+ textUnder +'</div>\n'+
										'<button class="header__wrap--delete">Remove</button>\n'+
									'</div>\n'+
								'</div>\n'+
								'<div class="header__wrap--priceitem">'+ price +'</div>\n'+
						'</div>');

			changeButtons($(this));
			countSumm();
			deleteListItem();
			checkList();
			buttonDelete(unique,price);
	});

	function changeButtons(context){
		context.text('in cart');
		context.attr('disabled', 'disabled');
		var hideButton = context.closest('.content__wrap--card').find('.content__wrap--buttongred')[0];
		hideButton.style.opacity = 0;
	}

	function checkList(elemIndex,price){
		var currentElem = $('.content__wrap--cards').children()[elemIndex];
		$(currentElem).find('.content__wrap--wrbutton').html('<div class="content__wrap--buttongred">-50%</div><button class="content__wrap--buttonprice">'+price+'</button>');
	}
	
	function countSumm(){
		var count = 0;
		$('.header__wrap--mouse .header__wrap--item').each(function (index, item) {
			var countBasket = $('.header__wrap--countbasket').text(index+1);
			var itemsCart = $('.header__wrap--left');
			itemsCart.html('');
			var contentTitle = ''+(+index + 1)+ ' item in cart';
			itemsCart.append(contentTitle);

			count+= +$(this).find('.header__wrap--priceitem').text().split(' ')[1];
		});
		$('.header__wrap--center').text('$ '+count);
	}

	function deleteCount() {
		var count = 0;
		$(".header__wrap--mouse .header__wrap--item").each(function(index, item){
			var countBasket = $('.header__wrap--countbasket').text(index+1);
			var itemsCart = $('.header__wrap--left');
			itemsCart.html('');
			var contentTitle = ''+(index+1)+ ' item in cart';
			itemsCart.text(contentTitle);

			count-= +$(this).find('.header__wrap--priceitem').text().split(' ')[1];
		});
		var counts = ""+count;
		$('.header__wrap--center').text('$ '+counts.substr(1));

		if($('.header__wrap--center').text().length == 2){
			$('.header__wrap--center').text('$ 0');
		}

		if(	$(".header__wrap--mouse .header__wrap--item").length == 0){
			$('.header__wrap--left').text('0 items in cart');
			$('.header__wrap--countbasket').text('0');
		}
	}

	function deleteListItem(){
		$('.header__wrap--delete').click(function(){
			var $item = $(this).closest('.header__wrap--item');
			var price = $item.find('.header__wrap--priceitem').text();
			checkList($item.attr('data-id'),price);
			$item.remove();
			deleteCount();
		});
	}

	function buttonDelete(unique,price){
		$('.header__wrap--button').click(function (){
			var currentElem = $('.content__wrap--cards').children()[unique];
			$(currentElem).find('.content__wrap--wrbutton').html('<div class="content__wrap--buttongred">-50%</div><button class="content__wrap--buttonprice">'+price+'</button>');
			$('.header__wrap--mouse').children().remove();
			deleteCount();
			checkList();
		});
	}
	buttonDelete();

	$('.content__wrap--buttonprice').each(function(){
		if(($(this).text() == 'owned') || ($(this).text() == 'in cart')){
			$(this).attr('disabled', 'disabled');
		}
	});
	
});