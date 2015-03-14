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

// canvas.addEventListener('mousemove', function(e) {
//   // get mouse position
//   var rect = canvas.getBoundingClientRect();
//   for(var i = -20; i < 20; i++){
//     for(var j = -20; j < 20; j++){
//       draw(e.clientX - rect.left + i, e.clientY - rect.top + j);
//     }
//   }
// });

// setInterval(function(){
//   base = new C(base.r + 0.01*m.cos(val.t()), base.i + 0.01 * m.sin(val.t()));
// },1000);

var m = Math,
    base = new C(m.E, 0),
    canvas = document.getElementsByTagName("canvas")[0],
    size = 50,
    drawn = {},
    val = new C(0,0),
    cx, cy, radius,
    rect = canvas.getBoundingClientRect(),
    res = 2,
    itr = 10;

canvas.style.backgroundColor = "black"

canvas.addEventListener('click', function(e) { 
  cx = e.clientX - rect.left;
  cy = e.clientY - rect.top;
  radius = 0;
  loop();
});

function loop(){
  for(var i = -radius; i < radius; i+=res){
    for(var j = -radius; j < radius; j+= res){
      if(new C(i,j).abs() <= radius){
        draw(i+cx, j+cy);
      }
    }
  }
  radius++;
  if(radius < 50)
    setTimeout(loop,10 + radius);
}
// loop();

function itCounter(x){
  for (var i = 0; i < itr; i++){
    x = base.e(x);
    if(x.abs() > 20){
      return [i, x.t()];
    }
  }
  return null;
}

function draw(x, y){
  x -= x%res;
  y -= y%res;
  if(!drawn[x+","+y]){
    val = new C(4*(x / canvas.offsetWidth) - 1, 
                    2*(y / canvas.offsetHeight) - 1);
    var ctx = canvas.getContext("2d");
    var itCounterResult = itCounter(val);
    if(itCounterResult)
    {
      var it = m.floor(255*(1-m.pow(itCounterResult[0]/(itr+1),1)));
      var phase = m.floor((256*(m.sqrt((itCounterResult[1])/(2*m.PI)))));
      ctx.fillStyle = "rgb(" + it + "," + phase +", " + (255-phase) + ")";
      ctx.fillRect(x, y, res, res);
    }
  }
}
