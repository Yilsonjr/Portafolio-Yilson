// SCROLL PROGRESS
const scrollBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  scrollBar.style.width = pct + '%';
}, {passive:true});

// NAV SHRINK ON SCROLL
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, {passive:true});

// HERO ENTRANCE
window.addEventListener('load', () => {
  document.getElementById('home').classList.add('hero-animated');

  // TYPEWRITER
  const words = ['Yilson', 'un Dev', 'Full Stack'];
  let wi = 0, ci = 0, deleting = false;
  const el = document.getElementById('typewriter');
  const cur = document.querySelector('.tw-cursor');
  if(el) {
    setTimeout(() => {
      cur.classList.add('visible');
      function type() {
        const word = words[wi];
        if (!deleting) {
          el.textContent = word.slice(0, ++ci);
          if (ci === word.length) {
            if(wi === 0) { // Stop at "Yilson" permanently after first cycle
              return;
            }
            setTimeout(() => { deleting = true; type(); }, 1800);
            return;
          }
        } else {
          el.textContent = word.slice(0, --ci);
          if (ci === 0) {
            deleting = false;
            wi = (wi + 1) % words.length;
            if(wi === 0) wi = 1;
          }
        }
        setTimeout(type, deleting ? 55 : 90);
      }
      type();
    }, 600);
  }
});

// ANIMATED COUNTERS
function animateCounter(el) {
  const target = parseInt(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current) + suffix;
    if (current >= target) clearInterval(timer);
  }, 16);
}

// SKILL BAR ANIMATION ON SCROLL
const skillObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-fill').forEach(bar => bar.classList.add('animated'));
    }
  });
}, {threshold: 0.3});
document.querySelectorAll('.skills-grid').forEach(el => skillObs.observe(el));

// CURSOR
const cursor=document.getElementById('cursor'),ring=document.getElementById('cursor-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cursor.style.left=mx+'px';cursor.style.top=my+'px';});
(function animRing(){rx+=(mx-rx)*0.12;ry+=(my-ry)*0.12;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(animRing);})();
document.querySelectorAll('a,button,.proj-card,.skill-card,.service-card').forEach(el=>{
  el.addEventListener('mouseenter',()=>{cursor.style.transform='translate(-50%,-50%) scale(2.5)';ring.style.opacity='0.25';});
  el.addEventListener('mouseleave',()=>{cursor.style.transform='translate(-50%,-50%) scale(1)';ring.style.opacity='0.6';});
});

// THREE.JS 3D
(function(){
  const canvas=document.getElementById('canvas3d');
  if(!canvas||typeof THREE==='undefined')return;
  const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true});
  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(60,1,0.1,1000);
  camera.position.z=4;
  function resize(){const w=canvas.clientWidth,h=canvas.clientHeight;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();}
  resize();window.addEventListener('resize',resize);
  const count=2200,geo=new THREE.BufferGeometry(),pos=new Float32Array(count*3),col=new Float32Array(count*3);
  for(let i=0;i<count;i++){
    const phi=Math.acos(-1+2*i/count),theta=Math.sqrt(count*Math.PI)*phi,r=1.6+Math.random()*0.35;
    pos[i*3]=r*Math.sin(phi)*Math.cos(theta);pos[i*3+1]=r*Math.sin(phi)*Math.sin(theta);pos[i*3+2]=r*Math.cos(phi);
    col[i*3]=0;col[i*3+1]=Math.random()>0.6?0.96:0.75;col[i*3+2]=Math.random()>0.6?0.83:0.65;
  }
  geo.setAttribute('position',new THREE.BufferAttribute(pos,3));
  geo.setAttribute('color',new THREE.BufferAttribute(col,3));
  const mat=new THREE.PointsMaterial({size:0.02,vertexColors:true,transparent:true,opacity:0.88,sizeAttenuation:true});
  const sphere=new THREE.Points(geo,mat);scene.add(sphere);
  scene.add(new THREE.Mesh(new THREE.SphereGeometry(1.52,20,20),new THREE.MeshBasicMaterial({color:0x00f5d4,transparent:true,opacity:0.055,wireframe:true})));
  for(let i=0;i<3;i++){const rg=new THREE.TorusGeometry(1.72+i*0.22,0.004,8,100),rm=new THREE.MeshBasicMaterial({color:0x00f5d4,transparent:true,opacity:0.1-i*0.025});const r=new THREE.Mesh(rg,rm);r.rotation.x=Math.PI/2+i*0.28;r.rotation.y=i*0.45;scene.add(r);}
  let tx=0,ty=0;
  document.addEventListener('mousemove',e=>{tx=(e.clientX/window.innerWidth-0.5)*0.45;ty=(e.clientY/window.innerHeight-0.5)*0.45;});
  (function animate(){requestAnimationFrame(animate);sphere.rotation.y+=0.0014;sphere.rotation.x+=0.0004;
    scene.children.forEach((c,i)=>{if(c.geometry&&c.geometry.type==='TorusGeometry'){c.rotation.z+=0.0018*(i+1);}});
    camera.position.x+=(tx-camera.position.x)*0.04;camera.position.y+=(-ty-camera.position.y)*0.04;
    camera.lookAt(scene.position);renderer.render(scene,camera);})();
})();

// SCROLL REVEALS
const obs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('visible');
      // trigger counters inside revealed elements
      e.target.querySelectorAll('[data-count]').forEach(animateCounter);
    }
  });
},{threshold:0.1});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

// also observe stats directly
const statObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting) e.target.querySelectorAll('[data-count]').forEach(animateCounter);});
},{threshold:0.5});
document.querySelectorAll('.hero-stats').forEach(el=>statObs.observe(el));

// NAV ACTIVE
const sections=document.querySelectorAll('section[id]');
const navLinks=document.querySelectorAll('.nav-links a');
window.addEventListener('scroll',()=>{
  let cur='';
  sections.forEach(s=>{if(window.scrollY>=s.offsetTop-200)cur=s.id;});
  navLinks.forEach(a=>{a.style.color=a.getAttribute('href')==='#'+cur?'var(--cyan)':'';});
},{passive:true});

// SKILLS FILTER
function filterSkills(cat){
  document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
  event.target.classList.add('active');
  document.querySelectorAll('.skill-card').forEach(c=>{
    const show = cat==='all' || c.dataset.cat===cat;
    c.style.display = show ? 'block' : 'none';
  });
}
