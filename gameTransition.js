

function gameTransi() {
	if(document.readyState === "complete") {
		if (gameover) {
			var ct;
			var canvas = document.getElementById('GameTransition');
			ct = new Centi('ct');
			ct.init(canvas);
			ct.setupFunc = init;
			ct.drawFunc = draw;
			ct.start();
			canvas.style.width = b_canvasWidthfortransiton* 0.6+ "px";
			canvas.style.height = b_canvasHeightfortransiton * 0.8 + "px";
			console.log(b_canvasWidthfortransiton + "  " + b_canvasHeightfortransiton);
			requestAnimationFrame(update);

			function init() {
				ct.sz(800, 400);
				ct.bg(0);
			}
			function draw() {
				ct.strk();
				for (ct.i = 0; ct.i < 20; ct.i++) {
					ct.ww = ((ct.c + ct.i) % 40 * 20);
					ct.x = (-ct.ww / 2);
					ct.rect(ct.x + ct.cx, ct.x + ct.cy, ct.ww, ct.ww);
				}
				ct.glitch(ct.rnd(50), ct.rnd(100), ct.rnd(10), ct.rnd(10));

			}

			function update() {
				if(!Transitiondone)
				{
				ct.update();
				requestAnimationFrame(update);
				}
				else
				{
					canvas.style.display = "none";
				}
			}

		gameover = false;
		}
	};
}; 

