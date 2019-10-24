$('#test1').addClass('red').each((el) => { console.log(el) })
console.log('-----')
$('#test2').find('.test22').print()
console.log('-----')
$('#test2').parent().print()
console.log('-----')
$('#test2').children().print()
console.log('-----')
$('<div>haha</div>').appendTo('#test3').print()
console.log('-----')
$childlist = document.querySelectorAll('.test22')
$('#test3').append($('.test222'))


