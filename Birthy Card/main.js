let w = (c.width = window.innerWidth),
    h = (c.height = window.innerHeight),
    ctx = c.getContext("2d"),
    hw = w / 2;
    (hh = h / 2),
    (opts = {
        strings: ["HAPPY","BIRTHDAY", "TO YOU"],
        charSize:35,
        charSpacing:38,
        lineHeight:42,

        fireworkPrevPoints: 10,
        fireworkBaseLineWidth: 5,
        fireworkAddedLineWidth: 8,
        fireworkSpawnTime : 200,
        fireworkBaseReachTime: 30,
        fireworkAddedReachTime: 30,
        fireworkCircleBaseSize: 20,
        fireworkCircleAddedSize: 10,
        fireworkCircleBaseTime : 30,
        fireworkCircleAddedTime:30,
        fireworkCircleFadeBaseTime: 10,
        fireworkCircleFadeAddedTime: 5,
        fireworkBaseShards: 5,
        fireworkAddedShards: 5,
        fireworkShardPrevPoints : 3,
        fireworkShardBaseVel: 4,
        fireworkShardAddedVel: 2,
        fireworkShardBaseSize: 3,
        fireworkShardAddedSize: 3,
        gravity: 0.1
    }),
    (calc = {
        totalWidth:
            opts.charSpacing *
            Math.max(opts.strings[0].length, opts.strings[1].length),
    }),
    (Tau = Math.PI * 2),
    (TauQuarter = Tau / 4),
    (letters = []);

ctx.font = opts.charSize + "px Verdana";

function Letter(char , x , y) {
    this.char = char;
    this.x = x;
    this.y = y;

    this.dx = -ctx.measureText(char).width / 2;
    this.dy = +opts.charSize / 2;

    this.fireworkDy = this.y - hh;
    var hue = (x / calc.totalWidth) * 360;

    this.color = "hsl(hue,80%,50%)".replace("hue" , hue);
    this.lightAlphaColor = "hsla(hue, 80% , light%,alp)".replace("hue" , hue);
    this.lightColor = "hssl(hue,80% , light%)".replace("hue" , hue);
    this.alphaColor = "hsla(hue,80%,50%, alp)".replace("hue" , hue);

    this.reset();
}
Letter.prototype.reset = function () {
    this.phase = 'firework';
    this.tick = 0;
    this.spawned = false;
    this.spawningTime = (opts.fireworkSpawnTime * Math.random()) | 0;
    this.reachTime = (opts.fireworkBaseReachTime + opts.fireworkAddedReachTime * Math.random()) | 0;
    this.lineWidth = opts.fireworkBaseLineWidth + opts.fireworkAddedLineWidth * Math.random();
    this.prevPoints = [[0 , hh , 0]];
};
Letter.prototype.step = function (){
    if (this.phase === 'firework') {
        if (!this.spawned) {
            ++this.tick;
            if (this.tick.tick >= this.spawningTime) {
                this.tick = 0;
                this.spawned = true;
            }
        } else {
            ++this.tick;

            var linearProportion = this.tick / this.reachTime,
              armonicProportion = Math.sin(linearProportion * TauQuarter),
              x = linearProportion * this.x,
              y = hh + armonicProportion * this.fireworkDy;

            if (this.prevPoints.length > opts.fireworkPrevPoints) 
                this.prevPoints.shift();

            this.prevPoints.push([x, y , linearProportion* this.lineWidth]);

            var lineWidthProportion = 1 / (this.prevPoints.length - 1);

            for (var i = 1; i < this.prevPoints.length; ++i){
                var point = this.prevPoints[i],
                   point2 = this.prevPoints[i - 1];
                
                ctx.strokeStyle = this.alphaColor.replace("alp" , i / this.prevPoints.length);
                ctx.lineWidth = point[2] * lineWidthProportion * i;
                ctx.beginPath();
                ctx.moveTo(point[0] , point[1]);
                ctx.lineTo(point2[0] , point2[1]);
                ctx.stroke();
            }
            
            if (this.thick >= this.reachTime) {
                this.phase = "contemplate";

                this.circleFinalSize = opts.fireworkCircleBaseSize + opts.fireworkCircleAddedSize * Math.random();
                this.circleCompleteTime = (opts.fireworkCircleBaseTime + opts.fireworkCircleAddedTime * Math.random()) | 0;
                this.circleCreating = true;
                this.circleFading = false;

                this.tick = 0;
                this.tick2 = 0;

                this.shards = [];

                var shardCount = (opts.fireworkBaseShards + opts.fireworkAddedShards * Math.random()) | 0;
                  angle = Tau / shardCount,
                  cos = Math.cos(angle),
                  sin = Math.sin(angle),
                  x = 1,
                  y = 0;

                for (var i = 0; i < shardCount; ++i){
                    var xl = x;
                    x = x * cos - y * sin;
                    y = y * cos + xl * sin;
                     this.shards.push(new Shard(this.x, this.y, x,y, this.alphaColor));
                }
            }
        }
    } else if (this.phase === "contemplate") {
        ++this.tick;
        
        if (this.circleCreating) {
            ++this.tick2;
            var proportion = this.tick2 / this.circleCompleteTime, armonic = -Math.cos(proportion * Math.PI) / 2 + 0.5;

            ctx.beginPath();
            ctx.fillStyle = this.lightAlphaColor
               .replace("light" , 50 + 50 * proportion) 
               .replace("alp" , proportion);
            ctx.beginPath();
            ctx.arc(this.x, this.y , armonic * this.circleFinalSize, 0 , Tau);
            ctx.fill();

            if (this.tick2 > this.circleCompleteTime) {
                this.tick2 = 0;
                this.circleCreating = false;
                this.circleFading = true;
            }
        } else if (this.circleFading) {
            ctx.fillStyle = this.lightColor.replace("light" , 70);
            ctx.fillText(this.char, this.x + this.dx, this.y + this.dy);

            ++this.tick2;
            var proportion = this.tick2 / this.circleFadeTime,
              armonic = -Math.cos(proportion * Math.PI) / 2 + 0.5;

            ctx.beginPath();
            ctx.fillStyle = this.lightAlphaColor 
              .replace("light" , 100)
              .replace("alp" , 1 - armonic);
            ctx.arc(this.x, this.y, this.circleFinalSize, 0 , Tau);
            ctx.fill();

            if (this.tick2 >= this.circleFadeTime) this.circleFading = false;
        } else {
            ctx.fillStyle = this.lightColor.replace("light", 70);
            ctx.fillText(this.char, this.x + this.dx, this.y , this.dy);
        }
        for (var i = 0; i < this.shards.length; ++i) {
            this.shards[i].step();

            if (!this.shards[i].alive) {
                this.shards.splice(i , 1);
                --i;
            }
        }

        if (this.tick > 360) {
            this.phase = "exit";
            this.tick = 0;
            this.exitShards = [];
            for (var i = 0; i < 12; ++i){
                var angle = (Tau / 12) * i,
                  vx = Math.cos(angle) * 3,
                  vy = Math.sin(angle) * 3;
                this.exitShards.push(new Shard(this.x , this.y , vx , vy , this.alphaColor));
            }
        }
    } else if (this.phase === "exit") {
        ++this.tick;
        ctx.fillStyle = this.lightColor.replace("light" , 70);
        ctx.globalAlpha = Math.max(0 , 1 - this.tick / 30);
        ctx.fillText(this.char , this.x + this.dx, this.y + this.dy);
        ctx.globalAlpha = 1;

        for (var i = 0; i < this.exitShards.length; ++i){
            this.exitShards[i].step();
            if (!this.exitShards[i].alive){
                this.exitShards.splice(i , 1);
                --i;
            }
        }

        if (this.tick > 30 && this.exitShards.length === 0 ) {
            this.phase = "done";
        }
    }
};

function Shard(x , y , vx , vy , color) {
    var vel = opts.fireworkShardBaseVel + opts.fireworkShardAddedVel * Math.random();

    this.vx = vx * vel;
    this.vy = vy * vel;

    this.x = x;
    this.y = y;

    this.prevPoints = [[x , y]];
    this.color = color;

    this.alive = true;

    this.size = opts.fireworkShardBaseSize + opts.fireworkShardAddedSize * Math.random();
}
Shard.prototype.step = function () {
    this.x += this.vx;
    this.y += this.vy += opts.gravity;
    
    if (this.prevPoints.length > opts.fireworkShardPrevPoints)
        this.prevPoints.shift();

    this.prevPoints.push([this.x , this.y]);

    var lineWidthProportion = this.size / this.prevPoints.length;

    for (var k = 0; k < this.prevPoints.length - 1; ++k) {
        var point = this.prevPoints[k],
          point2 = this.prevPoints[k + 1];

        ctx.strokeStyle = this.color.replace("alp" , k / this.prevPoints.length);
        ctx.lineWidth = k * lineWidthProportion;
        ctx.beginPath();
        ctx.moveTo(point[0], point[1]);
        ctx.lineTo(point2[0], point2[1]);
        ctx.stroke();
    }

    if (this.prevPoints[0][1] > hh) this.alive = false;
};

function anim(){
    window.requestAnimationFrame(anim);

    ctx.fillStyle = "#111";
    ctx.fillReact(0,0,w,h);

    ctx.translate(hw , hh);

    ctx.strokeStyle = "#9612eb";
    ctx.lineWidth = 5;
    ctx.strokeReact(-250, -175, 500 , 350);

    var done = true;
    for (var l = 0; l < letters.length; ++l) {
        letters[l].step();
        if (letters[l].phase !== "done") done = false;
    }

    ctx.translate(-hw, -hh);

    if (done) for (var l = 0 ; l < letters.length ; ++l) letters[l].reset();
}

for (let i =0 ; i < opts.strings.length; ++i) {
    for (var j = 0; j< opts.strings[i].length; ++j) {
        letters.push(
            new Letter(
                opts.strings[i][j],
                j * opts.charSpacing + opts.charSpacing / 2 - 
    (opts.strings[l].length * opts.charSize) / 2,
                i * opts.lineHeight + opts.lineHeight / 2 - (opts.strings.length * opts.lineHeight) / 2
            )
        );
    }
}

window.onresize = function() {
    w = c.width = window.innerWidth;
    h = c.height = innerHeight;
    hw = w / 2;
    hh = h / 2;
};
anim();