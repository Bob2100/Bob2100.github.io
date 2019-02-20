/**
 * 路由器
 * 使用：首先引入jquery,再引入此路由，
 * 使用router.init([])初始化路由器，参数为路由地址。
 * 主页面设置容器，给定id，子页面通过b-target设置指定加载到的容器
 */
(function () {
  function Router() {
    //保存所有注册的路由
    this.routers = {};

    //切换页面前执行的函数
    this.before = null;

    //切换页面后执行的函数
    this.after = null;
  }

  Router.prototype = {
    getFullRequest: function(){
      let urlDetails = location.hash.split("?");
      let hashUrl = urlDetails[0].split("#")[1];//路由地址
      //路由不存在，则取配置的第一个路由
      if(!hashUrl){
        hashUrl = Object.keys(this.routers)[0];
      }
			let	paramDetails = urlDetails[1] ? urlDetails[1].split("&") : [];//参数内容
			let	params = {};
			for(let i = 0;i< paramDetails.length ; i++){
				let item = paramDetails[i].split("=");
				params[item[0]] = item[1];
			}		
			return 	{
				path:hashUrl,
				params:params
			}
    },
    //初始化路由器
    init: function(){
      let that = this;
      //注册所有路由,以url为key，以parent为value,保存到routers中
      for(let i = 0; i < arguments.length; i++){
        this.routers[arguments[i].url] = arguments[i].parent;
      }
      //监听hash
      window.addEventListener('hashchange', function() {
        that.urlChange();
      });

      //页面加载
      window.addEventListener('load', function() {
        that.urlChange();
      });
    },
    urlChange: function(){
      let fullReq = this.getFullRequest();
      //发起ajax抓取请求的html
      $.ajax({
        url: fullReq.path,
        type: 'get',
        success: data => {
          let targetId = $(data).attr('b-target');
          $('#' + targetId).html(data);
        }
      });
    }
  }

  window.router = new Router();
})()