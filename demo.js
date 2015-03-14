var m = Math;
var base = new C(m.E, 0);
var canvas = document.getElementsByTagName("canvas")[0];
var size = 50;
var drawn = {};

function C(r, i){
  return {
    r:r,
    i:i,
    // add: function(o){
    //   return new C(this.r + o.r, this.i + o.i);
    // },
    abs: function(){
      return m.sqrt(m.pow(this.r, 2) + m.pow(this.i, 2));
    },
    ln: function(){
      return new C(m.log(this.abs()), this.t());
    },
    mul: function(o){
      return new C(this.r * o.r - this.i * o.i, this.r * o.i + this.i * o.r);
    },
    mulS: function(scalar){
      return new C(this.r * scalar, this.i * scalar);
    },
    e: function(o){
      var olm = o.mul(this.ln());
      return new C(m.cos(olm.i), m.sin(olm.i)).mulS(m.exp(olm.r));
    },
    t: function(){
      var t = m.atan2(this.i, this.r);
      return (t < 0) ? m.PI + t : t;
    }
 }
}

canvas.addEventListener('mousemove', function(e) {
  // get mouse position
  var rect = canvas.getBoundingClientRect();
  for(var i = -25; i < 25; i++){
    for(var j = -25; j < 25; j++){
      draw(e.clientX - rect.left + i, e.clientY - rect.top + j);
    }
  }
});


function itCounter(x){
  for (var i = 0; i < 20; i++){
    x = base.e(x);
    if(x.abs() > 50){
      return [i, x.t()];
    }
  }
  return [20, 0];
}

function draw(x, y){
  if(!drawn[x+","+y]){
    console.log("start");
    drawn[x+","+y] = true;
    var val = new C(4*(x / canvas.offsetWidth) - 2, 
                    2*(y / canvas.offsetHeight) - 1);
    var ctx = canvas.getContext("2d");
    var itCounterResult = itCounter(val);
    var it = m.floor((255/20)*(20 - itCounterResult[0]));
    var phase = m.floor((256*((itCounterResult[1])/(2*m.PI))));
    ctx.fillStyle = "rgb(" + (it+2*phase)/3 + "," + (it+phase)/2 +", " + (2*it+phase)/3 + ")";
    ctx.fillRect(x, y, 1, 1);
    console.log("end");
  }
}
