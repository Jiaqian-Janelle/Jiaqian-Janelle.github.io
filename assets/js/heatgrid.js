/*
 * Heat-grid — a real heat-equation simulation on the GPU (WebGL2).
 *
 *   ∂T/∂t = α ∇²T − k(x,t) · T + Q_brush
 *
 * - The red gaps between squares are a hot boundary held at T = 1 (Dirichlet).
 * - Inside each square heat diffuses (explicit finite differences, 5-point Laplacian).
 * - Moving "coolant" spots pull heat out (Newton cooling, −k·T), so the squares
 *   never fill up with red; where cooling is weak, heat soaks in further.
 * - Press and drag on the canvas to add heat.
 * Colour: T = 1 → red, T = 0 → cyan.
 *
 * Auto-init: <canvas data-heatgrid data-rows="2" data-speed="1" data-alpha="0.22"
 *                    data-cool="1" data-warp="0.8"></canvas>
 * Or: const sim = HeatGrid.create(canvas, {rows: 5}); sim.set({alpha: .1}); sim.reset();
 */
(function () {
  "use strict";

  var STOPS = [
    ["#E8445A", 0.0],  // red  (hot)
    ["#F2874C", 0.22], // orange
    ["#F7F06C", 0.45], // yellow
    ["#C9EF5E", 0.60], // lime
    ["#6CDC6E", 0.76], // green
    ["#67E8F7", 1.0]   // cyan (cold)
  ];
  var CELL_PX = 48; // simulation texels per square

  function hexToVec(h) {
    return [1, 3, 5].map(function (i) { return (parseInt(h.slice(i, i + 2), 16) / 255).toFixed(4); }).join(",");
  }
  var RAMP = "vec3 ramp(float t){" + STOPS.map(function (s, i) {
    return i === 0 ? "vec3 c=vec3(" + hexToVec(s[0]) + ");"
      : "c=mix(c,vec3(" + hexToVec(s[0]) + "),smoothstep(" + STOPS[i - 1][1].toFixed(3) + "," + s[1].toFixed(3) + ",t));";
  }).join("") + "return c;}";

  // Geometry shared by the simulation and the display pass, so both agree on the boundary.
  var COMMON = [
    "precision highp float;",
    "uniform vec2 uGrid; uniform float uTime; uniform float uWarp;",
    "float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}",
    "float sdRB(vec2 p,vec2 b,float r){vec2 q=abs(p)-b+r;return length(max(q,0.))+min(max(q.x,q.y),0.)-r;}",
    "float cellGeom(vec2 uv,out vec2 l,out vec2 seed,out float ph){",
    "  uv.y=1.-uv.y;",
    "  vec2 g=uv*uGrid; vec2 cell=floor(g); l=fract(g)*2.-1.;",
    "  ph=(cell.x+cell.y)/max(uGrid.x+uGrid.y-2.,1.);",
    "  seed=cell*7.31+1.7;",
    "  float act=(.5+.5*sin(uTime*.6-ph*4.))*smoothstep(0.,1.,ph+.15);",
    "  float amp=uWarp*(.015+.09*act);",
    "  vec2 p=l;",
    "  p.x+=amp*sin(l.y*3.1+uTime*.9+seed.x);",
    "  p.y+=amp*sin(l.x*2.7-uTime*.8+seed.y);",
    "  return sdRB(p,vec2(.9),.08);",
    "}"
  ].join("\n");

  var VS = "#version 300 es\nin vec2 a;void main(){gl_Position=vec4(a,0.,1.);}";

  var SIM_FS = [
    "#version 300 es", COMMON,
    "uniform sampler2D uT; uniform float uAlphaDt; uniform float uCool; uniform vec3 uBrush; uniform float uAspect;",
    "out vec4 o;",
    "void main(){",
    "  ivec2 p=ivec2(gl_FragCoord.xy); ivec2 s=textureSize(uT,0)-1;",
    "  float c=texelFetch(uT,p,0).r;",
    "  float n=texelFetch(uT,clamp(p+ivec2(0,1),ivec2(0),s),0).r;",
    "  float so=texelFetch(uT,clamp(p-ivec2(0,1),ivec2(0),s),0).r;",
    "  float e=texelFetch(uT,clamp(p+ivec2(1,0),ivec2(0),s),0).r;",
    "  float w=texelFetch(uT,clamp(p-ivec2(1,0),ivec2(0),s),0).r;",
    "  vec2 uv=gl_FragCoord.xy/vec2(textureSize(uT,0));",
    "  vec2 l,seed; float ph;",
    "  if(cellGeom(uv,l,seed,ph)>0.){o=vec4(1.,0.,0.,1.);return;}",       // hot boundary, T = 1
    "  float wave=.5+.5*sin(uTime*.4-ph*4.);",
    "  vec2 c1=.45*vec2(sin(uTime*.31+seed.x),cos(uTime*.27+seed.y));",
    "  vec2 c2=.5*vec2(cos(uTime*.23+seed.y*1.3),sin(uTime*.37+seed.x*.7));",
    "  float f=.1+exp(-dot(l-c1,l-c1)*3.)+.7*exp(-dot(l-c2,l-c2)*4.);",
    "  float k=uCool*.02*f*mix(.2,1.,wave);",                             // cooling rate k(x,t)
    "  float T=c+uAlphaDt*(n+so+e+w-4.*c)-k*c;",                            // explicit Euler step
    "  vec2 dv=(uv-uBrush.xy)*vec2(uAspect,1.);",
    "  T+=uBrush.z*exp(-dot(dv,dv)/.0012);",                                // heat from the pointer
    "  o=vec4(clamp(T,0.,1.),0.,0.,1.);",
    "}"
  ].join("\n");

  var VIEW_FS = [
    "#version 300 es", COMMON, RAMP,
    "uniform sampler2D uT; uniform vec2 uRes;",
    "out vec4 o;",
    "void main(){",
    "  vec2 uv=gl_FragCoord.xy/uRes;",
    "  float T=texture(uT,uv).r;",
    "  vec2 l,seed; float ph; float d=cellGeom(uv,l,seed,ph);",
    "  float px=2.*uGrid.y/uRes.y;",
    "  vec3 col=mix(ramp(1.-T),ramp(0.),smoothstep(-px,px,d));",
    "  float rim=1.-smoothstep(px*.4,px*1.6,abs(d));",
    "  col=mix(col,vec3(.79,.94,.37),rim*.9);",
    "  o=vec4(col,1.);",
    "}"
  ].join("\n");

  function create(canvas, opts) {
    opts = opts || {};
    var gl = canvas.getContext("webgl2", { antialias: true });
    if (!gl || !gl.getExtension("EXT_color_buffer_float")) { canvas.hidden = true; return null; }
    var linear = !!gl.getExtension("OES_texture_float_linear");

    function compile(type, src) {
      var s = gl.createShader(type);
      gl.shaderSource(s, src); gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(s));
      return s;
    }
    function program(fs) {
      var p = gl.createProgram();
      gl.attachShader(p, compile(gl.VERTEX_SHADER, VS));
      gl.attachShader(p, compile(gl.FRAGMENT_SHADER, fs));
      gl.bindAttribLocation(p, 0, "a");
      gl.linkProgram(p);
      var u = {}, n = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS);
      for (var i = 0; i < n; i++) { var name = gl.getActiveUniform(p, i).name; u[name] = gl.getUniformLocation(p, name); }
      return { p: p, u: u };
    }
    var sim = program(SIM_FS), view = program(VIEW_FS);

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    var cfg = {
      rows: opts.rows || 3,
      speed: opts.speed != null ? opts.speed : 1,     // simulation steps multiplier
      alpha: opts.alpha != null ? opts.alpha : 0.22,  // α·Δt/Δx², must stay below 0.25
      cool: opts.cool != null ? opts.cool : 1,
      warp: opts.warp != null ? opts.warp : 0.8
    };
    var reduced = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    var playing = !reduced, visible = true;
    var cols = 0, simW = 0, simH = 0, tex = [], fbo = [], cur = 0, time = 4;
    var brush = { x: 0, y: 0, on: false };

    function alloc() {
      tex.forEach(function (t) { gl.deleteTexture(t); });
      fbo.forEach(function (f) { gl.deleteFramebuffer(f); });
      tex = []; fbo = [];
      simW = cols * CELL_PX; simH = cfg.rows * CELL_PX;
      for (var i = 0; i < 2; i++) {
        var t = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, t);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.R32F, simW, simH, 0, gl.RED, gl.FLOAT, null);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, linear ? gl.LINEAR : gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, linear ? gl.LINEAR : gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        var f = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, f);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, t, 0);
        tex.push(t); fbo.push(f);
      }
      reset();
    }
    function reset() {
      for (var i = 0; i < 2; i++) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, fbo[i]);
        gl.clearColor(0, 0, 0, 1); gl.clear(gl.COLOR_BUFFER_BIT);
      }
      step(600); // warm up so the first frame already shows the heat profile
      draw();
    }
    function step(n) {
      gl.useProgram(sim.p);
      gl.viewport(0, 0, simW, simH);
      gl.uniform2f(sim.u.uGrid, cols, cfg.rows);
      gl.uniform1f(sim.u.uTime, time);
      gl.uniform1f(sim.u.uWarp, cfg.warp);
      gl.uniform1f(sim.u.uAlphaDt, Math.min(cfg.alpha, 0.249));
      gl.uniform1f(sim.u.uCool, cfg.cool);
      gl.uniform1f(sim.u.uAspect, simW / simH);
      gl.uniform3f(sim.u.uBrush, brush.x, brush.y, brush.on ? 0.03 : 0);
      gl.activeTexture(gl.TEXTURE0);
      gl.uniform1i(sim.u.uT, 0);
      for (var i = 0; i < n; i++) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, fbo[1 - cur]);
        gl.bindTexture(gl.TEXTURE_2D, tex[cur]);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        cur = 1 - cur;
      }
    }
    function draw() {
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.useProgram(view.p);
      gl.uniform2f(view.u.uGrid, cols, cfg.rows);
      gl.uniform1f(view.u.uTime, time);
      gl.uniform1f(view.u.uWarp, cfg.warp);
      gl.uniform2f(view.u.uRes, canvas.width, canvas.height);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, tex[cur]);
      gl.uniform1i(view.u.uT, 0);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
    function resize() {
      var r = canvas.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (!r.width || !r.height) return;
      canvas.width = Math.round(r.width * dpr);
      canvas.height = Math.round(r.height * dpr);
      var c = Math.max(1, Math.round((r.width / r.height) * cfg.rows));
      if (c !== cols || simH !== cfg.rows * CELL_PX) { cols = c; alloc(); } else draw();
    }

    var last = performance.now();
    function loop(now) {
      var dt = Math.min((now - last) / 1000, 0.1); last = now;
      if (visible && (playing || brush.on)) {
        if (playing) time += dt * 0.6 * Math.max(cfg.speed, 0.2);
        step(Math.max(1, Math.round(40 * cfg.speed)));
        draw();
      }
      requestAnimationFrame(loop);
    }

    function setBrush(e) {
      var r = canvas.getBoundingClientRect();
      brush.x = (e.clientX - r.left) / r.width;
      brush.y = 1 - (e.clientY - r.top) / r.height;
    }
    canvas.addEventListener("pointerdown", function (e) { brush.on = true; setBrush(e); });
    canvas.addEventListener("pointermove", function (e) { if (brush.on) setBrush(e); });
    ["pointerup", "pointerleave", "pointercancel"].forEach(function (ev) {
      canvas.addEventListener(ev, function () { brush.on = false; });
    });

    if ("ResizeObserver" in window) new ResizeObserver(resize).observe(canvas);
    else window.addEventListener("resize", resize);
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (e) { visible = e[0].isIntersecting; }).observe(canvas);
    }
    resize();
    requestAnimationFrame(loop);

    return {
      set: function (o) {
        var rowsChanged = o.rows != null && o.rows !== cfg.rows;
        Object.keys(o).forEach(function (k) { cfg[k] = o[k]; });
        if (rowsChanged) { cols = 0; resize(); }
      },
      reset: reset,
      toggle: function () { playing = !playing; return playing; },
      get playing() { return playing; }
    };
  }

  window.HeatGrid = { create: create };

  function boot() {
    Array.prototype.forEach.call(document.querySelectorAll("canvas[data-heatgrid]"), function (c) {
      var d = c.dataset, num = function (v) { return v != null ? parseFloat(v) : undefined; };
      create(c, { rows: num(d.rows), speed: num(d.speed), alpha: num(d.alpha), cool: num(d.cool), warp: num(d.warp) });
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();