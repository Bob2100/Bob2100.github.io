let $a;
//点击header上的菜单添加样式
$('.nav-item').click(function(){
  $('.nav-item').children('a').removeClass('active');
  $a = $(this).children('a');
  $a.addClass('active');
})

//页面刷新后依然保留目前的样式
if($a){
  $a.addClass('active');
}