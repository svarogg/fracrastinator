function C(r, i){
  o = {
    r:r,
    i:i,
    A: function(){
      return S(P(o.r, 2) + P(o.i, 2));
    },
    N: function(){
      return C(m.log(o.A()), o.t());
    },
    M: function(o){
      return C(o.r * o.r - o.i * o.i, o.r * o.i + o.i * o.r);
    },
    Q: function(s){
      return C(o.r * s, o.i * s);
    },
    e: function(o){
      h = o.M(o.N());
      return C(m.cos(h.i), m.sin(h.i)).Q(m.exp(h.r));
    },
    t: function(){
      t = m.atan2(o.i, o.r);
      return (t < 0) ? m.PI + t : t;
    }
 };
 return o;
}

m = Math;
U = m.random;
F = m.floor;
P = m.pow;
S = m.sqrt;

c = a;
R = c.getBoundingClientRect();
q = U();
s = U();
b = C(m.E + q,  s);
z = c.getContext("2d");
c.style.backgroundColor = "black";

c.addEventListener('click', function(e) { 
  X = e.clientX - R.left;
  Y = e.clientY - R.top;
  r = 0;
  L();
});

function L(){
  for(i = -r; i < r; i+=2)
    for(j = -r; j < r; j+= 2)
      if(C(i,j).A() <= r)
        D(i+X, j+Y);
    
  r++;
  if(r < 75)
    setTimeout(L,10 + r);
}

function J(x){
  for (k = 0; k < 10; k++, x = b.e(x))
    if(x.A() > 20)
      return [k, x.t()];
  
}

function D(x, y){
  x -= x%2;
  y -= y%2;
    v = C(8*(q+0.5)*(x / c.offsetWidth) - 1, 4*(s+0.5)*(y / c.offsetHeight) - 1);
    I = J(v);
    if(I)
    {
      w = F(255*(1-P(I[0]/(10+1),1)));
      p = F((256*(S((I[1])/(2*m.PI)))));
      z.fillStyle = "rgb(" + w + "," + F(p*q +w*(1-q)) +", " + (255-p) + ")";
      z.fillRect(x, y, 2, 2);
    }
}
