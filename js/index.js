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

    //最后一屏
    lastView();
    function lastView(){
      var teamUlNode = document.querySelector('.team .team-person');
      var teamLiNodes = document.querySelectorAll('.team .team-person li');
      var createCircleTimer = null;
      var paintingTimer = null;
      var canvas = null;
    //  设置画布的宽高
      var width = teamLiNodes[0].offsetWidth;
      var height = teamLiNodes[0].offsetHeight;
      //  给每个li绑定鼠标移入事件
      for (var i = 0; i <teamLiNodes.length; i++) {
        teamLiNodes[i].ind = i;
        teamLiNodes[i].onmouseenter = function(){
          //改变透明度
          for (var j = 0; j < teamLiNodes.length; j++) {
            teamLiNodes[j].style.opacity = 0.5;
          }
          this.style.opacity = 1;
          if(!canvas){
            canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;

            canvas.className = 'canvas';
            bubble(canvas);
            teamUlNode.appendChild(canvas);
          }
          //不管填不添加画布，都会移动
          canvas.style.left = this.ind*width+'px';
        }
      }
      teamUlNode.onmouseleave = function(){
        createCircleTimer = null;
        paintingTimer = null;
        for (var i = 0; i < teamLiNodes.length; i++) {
          teamLiNodes[i].style.opacity = 1;
        }
        canvas.remove();
        canvas = null;
      }
      function bubble(canvas) {
        if (canvas.getContext) {
          var ctx = canvas.getContext('2d');

          var circleArr = [];

          //生成随机圆
          createCircleTimer = setInterval(function () {
            //颜色随机
            var r = Math.round(Math.random() * 255);
            var g = Math.round(Math.random() * 255);
            var b = Math.round(Math.random() * 255);
            //半径随机
            var c_r = Math.round(Math.random() * 8 + 2);
            //缩放系数
            var s = Math.round(Math.random() * 50 + 50);
            //起始位置 x轴坐标随机 y轴坐标不变
            var x = Math.round(Math.random() * canvas.width);
            var y = canvas.height + c_r;

            //添加到数组中
            circleArr.push({
              r: r,
              g: g,
              b: b,
              c_r: c_r,
              s: s,
              x: x,
              y: y,
              d: 0  //角度
            })

          }, 20)

          //画圆
          paintingTimer = setInterval(function () {
            //清除画布, 清除上一次画的东西
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (var i = 0; i < circleArr.length; i++) {
              //获取单个圆
              var item = circleArr[i];
              //角度增加
              item.d += 4;
              //计算得出弧度
              var rad = item.d * Math.PI / 180;
              //计算圆心的坐标
              var x = Math.round(item.x + Math.sin(rad) * item.s);
              var y = Math.round(item.y - rad * item.s);
              //判断y轴的坐标，如果小于0，清除掉
              if (y <= 0) {
                circleArr.splice(i, 1);
                continue;
              }

              //画圆
              ctx.fillStyle = 'rgb(' + item.r + ',' + item.g + ',' + item.b + ')';
              ctx.beginPath();
              ctx.arc(x, y, item.c_r, 0, 2 * Math.PI);
              ctx.fill();
            }

          }, 1000 / 60)

        }
      }







    }
    
    
}