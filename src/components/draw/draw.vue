<template>
  <div id="draw">
  	<canvas ref="canvasDom" @touchstart="start" @touchmove="move" @touchend="end"
  	> 		
  	</canvas>
  	<div class="operator-wrap">
  		<div class="operator-btns weui-flex">
  		<div class="color"></div>
  		<div class="line"></div>
  		<div class="iconfont icon-undo" @click="doAction('cancel')"></div>
  		<div class="iconfont icon-redo" @click="doAction('reset')"></div>
  		<div class="iconfont icon-redo2" @click="clear"></div>
  		</div>
  	</div>
  </div>
</template>

<script type="text/ecmascript6">
export default {
  name: 'draw',
  data () {
    return {
      lineCap: 'round',
      lineWidth: 5,
      offsetTop: 0,
      offsetLeft: 0,
      canvasHeight: 0,
      canvasWidth: 0,
      historyData: [],
      historyIndex: -2,
      aetting: {color: '#000'}
    }
  },
  created () {
  	this.$nextTick(() => {
  			let cDom = this.$refs.canvasDom;
  			let wrapper = cDom.parentElement;
  			this.canvasWidth = wrapper.clientWidth;
  			this.canvasHeight = wrapper.clientHeight;
  			cDom.setAttribute('width', wrapper.clientWidth);
  			cDom.setAttribute('height', wrapper.clientHeight);
  			let ctx = cDom.getContext('2d');
  			ctx.lineCap = this.lineCap;
  			ctx.lineJoin = this.lineCap;
  			this.ctx = ctx;
  			this.offsetTop = cDom.offsetTop;
  			this.offsetLeft = cDom.offsetLeft;
  			this.saveData();
  	});
  },
  methods: {
  	draw ({x, y}, type = 'start') {
  		let ctx = this.ctx;
  		switch (type) {
  			case 'start' :
		  				ctx.beginPath();
		  				ctx.fill();
		  				let lw = this.lineWidth
		  				ctx.lineWidth = lw;
		  				ctx.moveTo(x - lw / 16, y - lw /16);
		  				ctx.lineTo(x, y);
		  				break;
  			case 'move'	:
		  				ctx.lineTo(x, y);
		  				break;
  		}
  		ctx.stroke();
  	},
  	doAction (actionName, data) {
  		switch (actionName) {
  			case 'start' : 
  			case 'move' :
  				this.draw(data, actionName);
  				break;
  			case 'end' :
  				this.ctx.closePath();
  				this.saveData();
  				break;
  			case 'clear' : 
  				this.clearCanvas();
  				this.saveData();
  				break;
  			case 'cancel' :
  				this.cancelAction();
  				break;
  			case 'reset' : 
  				this.restAction();
  				break;
  			default:
  				console.log('unknow actionName', actionName);
  		}
  	},
  	clearCanvas () {
  		this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  	},
  	saveData () {
  		let data = this.ctx.getImageData(0, 0, this.canvasWidth, this.canvasHeight);
  		if (this.historyIndex === -1) {
  			this.historyData = [];	
  		} else if (this.historyIndex > -1) {
 				this.historyData.splice(this.historyIndex + 1, this.historyData.length);
  		}
  		this.historyData.push(data);
  		this.historyIndex = this.historyData.length - 1 ;
  	},
  	restAction () {
  		let data = this.historyData[this.historyIndex + 1];
  		if (data) {
  			this.ctx.putImageData(data, 0, 0);
  			this.historyIndex = this.historyIndex + 1;
  		}
  	},
  	cancelAction () {
  		if (this.historyIndex > 0) {
  			let data = this.historyData[this.historyIndex - 1];
  			this.ctx.putImageData(data,0 ,0);
  			this.historyIndex = this.historyIndex - 1;
  		}
  	},
  	getPoint (e) {
  		let touch = e.touches[0];
  		let x = touch.clientX - this.offsetLeft;
  		let y = touch.clientY - this.offsetTop;
  		return {x, y};
  	},
  	start (e) {
  		this.doAction('start', this.getPoint(e));
  	},
  	move (e) {
  		this.doAction('move', this.getPoint(e));
  	},
  	end (e) {
  		this.doAction('end');
  	},
  	clear () {
  		this.doAction('clear');
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
	#draw
		position: relative
		width: 100%
		background: #fff
		height: 260px
		canvas
			display: block
		.operator-wrap
			position: absolute
			bottom: 0
			width: 100%
			box-shadow: 0 0 5px #ccc
			.operator-btns
				padding: 10px 0
				div
					flex: 1
					display: flex
					align-items: center
					justify-content: center
				.color
					width: 30px
					height: 30px
					borde-radius: 50%
				.iconfont
					font-size: 25px		
</style>

