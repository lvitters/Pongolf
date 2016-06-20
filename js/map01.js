var map01 = function(game){
    
    var ball;
    var paddle1;
    var paddle2;
    var Wkey, Akey;
    var UpKey, DownKey;
    var debugKey;
    var ballMaterial;
    var debug;
    var paddleSpeed;
    var field;
    
}

map01.prototype = {

    preload: function () {

        this.game.load.image('ball', 'assets/ball.png');
        this.game.load.image('paddle', 'assets/paddle.png');
        this.game.load.image("map01", "assets/map01.png");
        this.game.load.physics("map01_physics", "assets/map01.json");
    },




    create: function () {
        
        debug = false;
        paddleSpeed = 200;
        
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.restitution = 1;
        this.game.physics.p2.applyDamping = false;

        ballMaterial = this.game.physics.p2.createMaterial();
        this.game.physics.p2.createContactMaterial(ballMaterial, ballMaterial, {friction: 0, restitution: 1});

        field = this.createField();
        ball = this.createBall(380, 150, 200, 45);
        paddle1 = this.createPaddle(230, 500, -45);
        paddle2 = this.createPaddle(1050, 500, 45);

        Wkey = this.game.input.keyboard.addKey(Phaser.KeyCode.W);
        Skey = this.game.input.keyboard.addKey(Phaser.KeyCode.S);

        UpKey = this.game.input.keyboard.addKey(Phaser.KeyCode.UP);
        DownKey = this.game.input.keyboard.addKey(Phaser.KeyCode.DOWN);

        debugKey = this.game.input.keyboard.addKey(Phaser.KeyCode.TAB);
        debugKey.onDown.add(this.onDebugKeyDown, this);
    },

    createField: function () {
        var field = this.game.add.sprite(1280/2, 720/2, 'map01');
        this.game.physics.p2.enable(field, this.debug);
        field.body.clearShapes();
        field.body.loadPolygon("map01_physics", "map01");
        field.body.static = true;
        return field;
    },

    createBall: function (x, y, speed, rotation) {
        var ball = this.game.add.sprite(x, y, 'ball');
        this.game.physics.p2.enable(ball, this.debug);
        ball.body.rotation = rotation / 180 * Math.PI;
        ball.body.moveForward(speed);
        ball.body.setCircle(ball.width / 2);
        return ball;
    },

    createPaddle: function (x, y, rotation) {
        var paddle = this.game.add.sprite(x, y, 'paddle');
        this.game.physics.p2.enable(paddle, this.debug);
        paddle.body.kinematic = true;
        paddle.body.rotation = rotation / 180 * Math.PI;
        return paddle;
    },

    onDebugKeyDown: function () { 
        // toggle
        debug = !debug;

        // apply to bodies
        ball.body.debug = debug;
        paddle1.body.debug = debug;
        paddle2.body.debug = debug;
        field.body.debug = debug;

        // apply to debug canvas
        this.game.debug.reset();
    },

    update: function () {
        // paddle1
        paddle1.body.setZeroVelocity();
        if (Wkey.isDown) {
            paddle1.body.moveForward(paddleSpeed);
        } else if (Skey.isDown) {
            paddle1.body.moveBackward(paddleSpeed);
        }

        // paddle2
        paddle2.body.setZeroVelocity();
        if (UpKey.isDown) {
            paddle2.body.moveForward(paddleSpeed);
        } else if (DownKey.isDown) {
            paddle2.body.moveBackward(paddleSpeed);
        }
    },

    render: function () {
        if (this.debug) {
            var ballSpeed = Math.sqrt(Math.pow(ball.body.velocity.x, 2) + Math.pow(ball.body.velocity.y, 2));

            this.game.debug.start(20, 20, 'white');
            this.game.debug.line("Ball speed: " + ballSpeed);
            this.game.debug.line("Ball angular speed: " + ball.body.angularVelocity);
            this.game.debug.stop();
        }
    }
}
