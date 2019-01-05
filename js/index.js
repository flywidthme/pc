//等待页面（所有资源）加载完成，
window.onload = function(){
    headerArea();
    function headerArea(){
        //获取dom元素
        var arrowNode = document.querySelector('.arrow');
        var headerLisNodes = document.querySelectorAll('.nav li');
        var headerDownNodes = document.querySelectorAll('.down');


        //初始化时，小箭头默认在第一个li上
        arrowNode.style.left = headerLisNodes[0].getBoundingClientRect().left+headerLisNodes[0].offsetWidth/2
            -arrowNode.offsetWidth/2+'px';
        headerDownNodes[0].style.width = '100%';

        //给所有的li绑定点击事件
        for (var i = 0; i < headerLisNodes.length; i++) {
            //临时保存数值i,
            headerLisNodes[i].index = i;

            headerLisNodes[i].onclick = function(){
                for (var j = 0; j <headerDownNodes.length; j++) {
                    headerDownNodes[j].style.width='0';
                }
                arrowNode.style.left = this.getBoundingClientRect().left+this.offsetWidth/2-arrowNode.offsetWidth/2+'px';
                //设置当前的宽度为100%
                headerDownNodes[this.index].style.width = '100%';
            }
        }
    }
}