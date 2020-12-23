class Tool{static randomNumber(t,s){return Math.floor(Math.random()*(s-t+1)+t)}static randomColorRGB(){return"rgb("+this.randomNumber(0,255)+", "+this.randomNumber(0,255)+", "+this.randomNumber(0,255)+")"}static randomColorHSL(t,s,i){return"hsl("+t+", "+s+"%, "+i+"%)"}static gradientColor(t,s,i,h,a,e,r,n){const o=s+","+i+","+h,c=t.createRadialGradient(e,r,0,e,r,n);return c.addColorStop(0,"rgba("+o+", "+1*a+")"),c.addColorStop(.5,"rgba("+o+", "+.5*a+")"),c.addColorStop(1,"rgba("+o+", "+0*a+")"),c}}class Angle{constructor(t){this.a=t,this.rad=this.a*Math.PI/180}incDec(t){return this.a+=t,this.rad=this.a*Math.PI/180,this.rad}}class Controller{constructor(t){this.id=document.getElementById(t)}getVal(){return this.id.value}}class Time{constructor(t){this.startTime=t,this.lastTime,this.elapsedTime}getElapsedTime(){return this.lastTime=Date.now(),this.elapsedTime=-1*(this.startTime-this.lastTime),this.elapsedTime}}let canvas,offCanvas;class Canvas{constructor(t){this.canvas=document.createElement("canvas"),!0===t&&(this.canvas.style.position="fixed",this.canvas.style.display="block",this.canvas.style.top=0,this.canvas.style.left=0,document.getElementsByTagName("body")[0].appendChild(this.canvas)),this.ctx=this.canvas.getContext("2d"),this.width=this.canvas.width=window.innerWidth,this.height=this.canvas.height=window.innerHeight,this.mouseX=null,this.mouseY=null,this.colorPallet=["rgb(173, 67, 230)","rgb(251, 211, 43)","rgb(244, 80, 122)","rgb(65, 175, 249)","rgb(96, 255, 204)"],this.shapeNum=80,this.shapeMaxSize=100,this.shapes=[],this.particles=[],this.data,this.textPosArr=[],this.fontSize=500,this.text="HAPPY BIRTHDAY!",this.randomMax=80,this.width<768&&(this.fontSize=500,this.shapeNum=50,this.randomMax=80,this.shapeMaxSize=100)}init(){for(let t=0;t<this.height;t+=4)for(let s=0;s<this.width;s+=4){let i=4*(s+t*this.width)+3;if(this.data[i]>0){const i=[s,t];this.textPosArr.push(i)}}for(let t=0;t<this.shapeNum;t++){const t=new Shape(this.ctx,Tool.randomNumber(0,this.width),Tool.randomNumber(this.height,2*this.height),this.colorPallet[Tool.randomNumber(0,this.colorPallet.length-1)]);this.shapes.push(t)}}offInit(){const t=this.ctx;if(t.save(),t.fillStyle="black",t.font=this.fontSize+"px sans-selif",t.textAlign="center",t.textBaseline="middle",t.measureText(this.text).width>.95*this.width)return this.fontSize--,void this.offInit();t.fillText(this.text,this.width/2,this.height/2),canvas.data=t.getImageData(0,0,this.width,this.height).data,t.restore()}render(){this.ctx.clearRect(0,0,canvas.width,canvas.height);for(let t=0;t<this.shapes.length;t++)this.shapes[t].render(t);for(let t=0;t<this.particles.length;t++)this.particles[t].render(t)}resize(){this.shapes=[],this.textPosArr=[],this.particles=[],this.width=this.canvas.width=window.innerWidth,this.height=this.canvas.height=window.innerHeight,this.width<768?(this.shapeNum=50,this.shapeMaxSize=80):(this.shapeNum=80,this.shapeMaxSize=100),this.init()}offResize(){this.width=this.canvas.width=window.innerWidth,this.height=this.canvas.height=window.innerHeight,this.fontSize=300,this.offInit()}}class Shape{constructor(t,s,i,h){this.ctx=t,this.init(s,i,h)}init(t,s,i){this.x=t,this.y=s,this.r=Tool.randomNumber(30,canvas.shapeMaxSize),this.c=i,this.cL="rgb(251, 211, 43)",this.ga=.8,this.v={x:0,y:0},this.a=new Angle(Tool.randomNumber(0,360))}draw(t){const s=this.ctx;if(s.save(),s.globalAlpha=this.ga,s.fillStyle=this.c,s.beginPath(),s.moveTo(this.x+this.r/20,this.y+this.r),s.bezierCurveTo(this.x+this.r,this.y+this.r/3,this.x+this.r,this.y-this.r,this.x,this.y-this.r),s.bezierCurveTo(this.x-this.r,this.y-this.r,this.x-this.r,this.y+this.r/3,this.x-this.r/20,this.y+this.r),s.lineTo(this.x-this.r/20,this.y+this.r+this.r/20),s.lineTo(this.x-this.r/20-this.r/20,this.y+this.r+this.r/20),s.quadraticCurveTo(this.x-this.r/20-this.r/10,this.y+this.r+this.r/20+this.r/20,this.x-this.r/20-this.r/20,this.y+this.r+this.r/20+this.r/20+this.r/20),s.lineTo(this.x+this.r/20+this.r/20,this.y+this.r+this.r/20+this.r/20+this.r/20),s.quadraticCurveTo(this.x+this.r/20+this.r/10,this.y+this.r+this.r/20+this.r/20,this.x+this.r/20+this.r/20,this.y+this.r+this.r/20),s.lineTo(this.x+this.r/20,this.y+this.r+this.r/20),s.closePath(),s.fill(),s.isPointInPath(canvas.mouseX,canvas.mouseY)){const t=Tool.randomNumber(5,canvas.randomMax);for(let i=0;i<t;i++)if(canvas.particles.length<canvas.textPosArr.length){const t=new Particle(s,this.x,this.y);canvas.particles.push(t)}canvas.particles.length<canvas.textPosArr.length&&this.init(Tool.randomNumber(0,canvas.width),Tool.randomNumber(canvas.height+100,2*canvas.height),this.c)}s.fillStyle=this.cL,s.fillRect(this.x-this.r/20,this.y+this.r,this.r/10,this.r/20),s.strokeStyle=this.cL,s.lineWidth=3,s.beginPath(),s.moveTo(this.x,this.y+this.r+this.r/20+this.r/20+this.r/20),s.lineTo(this.x,this.y+this.r+this.r/20+this.r),s.stroke(),s.fillStyle="white",s.beginPath(),s.ellipse(this.x-this.r/2.5,this.y-this.r/1.5,this.r/10,this.r/5,45*Math.PI/180,0,2*Math.PI,!1),s.fill(),s.restore()}updatePosition(){this.v.x=.5*Math.cos(this.a.rad),this.v.y=.2*Math.sin(this.a.rad)-5,this.x+=this.v.x,this.y+=this.v.y,this.y-this.r<0&&canvas.particles.length!==canvas.textPosArr.length&&(this.y=0+this.r)}wrapPosition(){this.y+2*this.r<0&&(this.y=Tool.randomNumber(canvas.height+this.r,2*canvas.height),this.x=Tool.randomNumber(0,canvas.width))}updateParams(){this.a.incDec(1)}render(t){this.draw(),this.updatePosition(),this.updateParams(),this.wrapPosition()}}class Particle{constructor(t,s,i){this.ctx=t,this.init(s,i)}init(t,s){this.xi=canvas.textPosArr[canvas.particles.length][0],this.x=t,this.yi=canvas.textPosArr[canvas.particles.length][1],this.y=s,this.r=Tool.randomNumber(2,4),this.c=canvas.colorPallet[Tool.randomNumber(0,canvas.colorPallet.length-1)],this.v={x:0,y:0},this.random=Math.random()*Math.random(),this.a=new Angle(Tool.randomNumber(0,360)),this.ac=new Angle(0)}draw(){const t=this.ctx;t.save(),t.fillStyle=this.c,t.beginPath(),t.arc(this.x,this.y,this.r,0,2*Math.PI,!1),t.fill(),t.restore()}updatePosition(){this.v.x=this.xi-this.x,this.v.y=this.yi-this.y,canvas.particles.length!==canvas.textPosArr.length?(this.x=10*Math.sin(this.a.rad)+this.x,this.y=10*Math.cos(this.a.rad)+this.y):canvas.particles.length===canvas.textPosArr.length&&(this.c="hsl("+360*Math.sin(this.ac.rad)+", 80%, 60%)"),this.x+=this.v.x*this.random,this.y+=this.v.y*this.random}render(){this.draw(),this.updatePosition(),this.a.incDec(1),this.ac.incDec(.1)}}window.addEventListener("load",function(){canvas=new Canvas(!0),(offCanvas=new Canvas(!1)).offInit(),canvas.init(),function t(){window.requestAnimationFrame(function(){canvas.render(),t()})}(),window.addEventListener("resize",function(){offCanvas.offResize(),canvas.resize()},!1),canvas.canvas.addEventListener("mousemove",function(t){canvas.mouseX=t.clientX,canvas.mouseY=t.clientY},!1),canvas.canvas.addEventListener("touchmove",function(t){const s=t.targetTouches[0];canvas.mouseX=s.pageX,canvas.mouseY=s.pageY},!1),canvas.canvas.addEventListener("touchend",function(t){canvas.mouseX=null,canvas.mouseY=null},!1)});
