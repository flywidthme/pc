//等待页面（所有资源）加载完成，
window.onload = function(){
    //获取dom元素
    var arrowNode = document.querySelector('.arrow');
    var headerLisNodes = document.querySelectorAll('.nav li');
    var headerDownNodes = document.querySelectorAll('.down');
    var contentUlNode = document.querySelector('.content-main');
    var contentNode = document.querySelector('.content');
    var contentHeight = contentNode.offsetHeight;
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
}