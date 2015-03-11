var m = Math;

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