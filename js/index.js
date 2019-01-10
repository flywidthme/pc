//等待页面（所有资源）加载完成，
window.onload = function(){
    //获取dom元素
    var arrowNode = document.querySelector('.arrow');
    var headerLisNodes = document.querySelectorAll('.nav li');
    var headerDownNodes = document.querySelectorAll('.down');
    var contentUlNode = document.querySelector('.content-main');
    var contentNode = document.querySelector('.content');
    var contentHeight = contentNode.offsetHeight;
    var timer = null;
    var nowIndex = 0;


    headerArea();
    //头部区域功能
    function headerArea(){

        //初始化时，小箭头默认在第一个li上
        arrowNode.style.left = headerLisNodes[0].getBoundingClientRect().left+headerLisNodes[0].offsetWidth/2
            -arrowNode.offsetWidth/2+'px';
        headerDownNodes[0].style.width = '100%';

        //给所有的li绑定点击事件
        for (var i = 0; i < headerLisNodes.length; i++) {
            //临时保存数值i,
            headerLisNodes[i].index = i;

            headerLisNodes[i].onclick = function(){
                //点击时，同步更新nowIndex；否则点击后滚动容易出问题
                nowIndex = this.index;
               move(nowIndex);
            }
        }
    }

    move(nowIndex);
    function move(nowIndex){
        //其他div的宽度为0
        for (var j = 0; j <headerDownNodes.length; j++) {
            headerDownNodes[j].style.width='0';
        }
        arrowNode.style.left = headerLisNodes[nowIndex].getBoundingClientRect().left+headerLisNodes[nowIndex].offsetWidth/2-arrowNode.offsetWidth/2+'px';
        //设置当前的宽度为100%
        headerDownNodes[nowIndex].style.width = '100%';
        //关联头部ul和轮播
        contentUlNode.style.top = -nowIndex*contentHeight+'px';
    }
    //滚轮事件
    document.onmousewheel = wheel;
    document.addEventListener('DOMMouseScroll',wheel);
    function wheel(event) {
        event = event || window.event;

        var flag = '';
        if (event.wheelDelta) {
            //ie/chrome
            if (event.wheelDelta > 0) {
                flag = 'up';
            } else {
                flag = 'down'
            }
        } else if (event.detail) {
            //firefox
            if (event.detail < 0) {
                flag = 'up';
            } else {
                flag = 'down'
            }
        }
        switch (flag) {
            case 'up' :
                if (nowIndex>0) {
                    nowIndex--;
                    move(nowIndex);
                }
                break;
            case 'down' :
                if (nowIndex<4) {
                    nowIndex++;
                    move(nowIndex);
                }
                break;
        }
        //禁止默认行为
        event.preventDefault && event.preventDefault();
        return false;
    }

    //第一屏轮播
    firstView()
    function firstView() {
        var homeCarouselNodes = document.querySelectorAll('.home-carousel li');
        var homePointNodes = document.querySelectorAll('.home-point li')
        var lastIndex = 0;
        var nowIndex = 0;
        var lastTime = 0;
        for (var i = 0; i <homePointNodes.length; i++) {
            homePointNodes[i].index = i;

            homePointNodes[i].onclick = function () {
              //函数节流：规定时间内，只让第一次执行
              //如果点击的时间间隔小于2s，点击事件不执行
              var nowTime = Data.now();
              if (nowTime-lastTime<=2000) return;
                //同步上一次点击时间
                lastTime = nowTime;
                //同步nowIndex的值
                nowIndex = this.index;
                //如果点击同一个，则不会有任何移动
                if (nowIndex===lastIndex) return;
                if (nowIndex>lastIndex) {
                //点击的右边，右边加rightshow   左边加lefthide
                    homeCarouselNodes[nowIndex].className = 'common-title rightShow'
                    homeCarouselNodes[lastIndex].className = 'common-title leftHide'
                }else{
                    //点击的左边，左边加leftshow   右边加righthide
                    homeCarouselNodes[nowIndex].className = 'common-title leftShow '
                    homeCarouselNodes[lastIndex].className = 'common-title rightHide'
                }
                homePointNodes[lastIndex].className = '';
                this.className = 'active';


                lastIndex = nowIndex;

            }
        }
    //    自动轮播
      nowIndex++;
        setInterval(function(){

          if (nowIndex>=4) {
              nowIndex=0;
          }
          //点击的右边，右边加rightshow   左边加lefthide
          homeCarouselNodes[nowIndex].className = 'common-title rightShow'
          homeCarouselNodes[lastIndex].className = 'common-title leftHide'

          homePointNodes[lastIndex].className = '';
          homePointNodes[nowIndex].className = 'active';

          lastIndex = nowIndex;

        },2500)
    }

    
    
    
    
}