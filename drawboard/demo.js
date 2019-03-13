var box = {
    cavs: document.getElementById('cavs'),//建立画布
    ctx: document.getElementById('cavs').getContext('2d'),//拿出画笔
    bool: false,
    btn: document.getElementsByTagName('ul')[0],
    imgsArr: [], 
    colorCavs: document.getElementsByClassName('colorChange')[0],
    lineRuler: document.getElementsByClassName('line')[0],
    init: function () {
        this.ctx.lineCap = 'round';//线条起始和结尾样式
        this.ctx.lineJoin = 'round';
        this.drawing();
        this.btnBoard();
    },
    drawing: function () {
        var self = this,
            cavs = this.cavs,
            c_left = cavs.offsetLeft,
            c_top = cavs.offsetTop;
            console.log(c_left,c_top);
        this.cavs.onmousedown = function (e) {
            self.bool = true;
            var c_x = e.pageX - c_left,
                c_y = e.pageY - c_top;
            self.ctx.beginPath();
            self.ctx.moveTo(c_x,c_y);
            console.log(c_x,c_y);

            var img = self.ctx.getImageData(0,0,self.cavs.offsetWidth,self.cavs.offsetHeight);
            self.imgsArr.push(img);
            console.log(self.imgsArr);
        }
        this.cavs.onmousemove = function (e) {
            if (self.bool) {
                self.ctx.lineTo(e.pageX - c_left,e.pageY - c_top);
                self.ctx.stroke();
            } 
        } 
        this.cavs.onmouseup = function (e) {
            self.ctx.closePath();
            self.bool = false;
        }
        this.cavs.onmouseleave = function (e) {
            self.ctx.closePath();
            self.bool = false;
        }
    },
    btnBoard: function () {
        var self = this;
        this.btn.onclick = function (e) {
            switch (e.target.id) {
                case 'clean':
                    self.ctx.clearRect(0,0,self.cavs.offsetWidth,self.cavs.offsetHeight);
                    break
                case 'eraser':
                    self.ctx.strokeStyle = '#ffffff';
                    break
                case 'rescind':
                    if(self.imgsArr.length > 0){
                        self.ctx.putImageData(self.imgsArr.pop(), 0, 0);
                    }
                    break
            }
        }
        this.colorCavs.onchange = function () {
            self.ctx.strokeStyle = this.value;
        }
        this.lineRuler.onchange = function () {
            self.ctx.lineWidth = this.value;
        }
    }
}
box.init();