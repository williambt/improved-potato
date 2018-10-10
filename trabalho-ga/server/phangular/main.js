(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./package.json":
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/*! exports provided: name, version, scripts, private, dependencies, devDependencies, default */
/***/ (function(module) {

module.exports = {"name":"phangular","version":"1.0.0","scripts":{"ng":"ng","start":"ng serve","build":"ng build --prod --base-href \"/phangular/\"","test":"ng test","lint":"ng lint","e2e":"ng e2e","hmr":"ng serve --hmr --configuration=hmr","get-phaser-typings":"curl -o src/phaser.d.ts https://raw.githubusercontent.com/photonstorm/phaser3-docs/master/typescript/phaser.d.ts","postinstall":"npm run get-phaser-typings","angular-cli-ghpages":"angular-cli-ghpages","deploy":"npm run angular-cli-ghpages -- --dir dist/phangular"},"private":true,"dependencies":{"@angular/animations":"^6.1.0","@angular/common":"^6.1.0","@angular/compiler":"^6.1.0","@angular/core":"^6.1.0","@angular/forms":"^6.1.0","@angular/http":"^6.1.0","@angular/platform-browser":"^6.1.0","@angular/platform-browser-dynamic":"^6.1.0","@angular/router":"^6.1.0","@types/express":"^4.16.0","core-js":"^2.5.4","express":"^4.16.3","phaser":"^3.11.0","phaser-component-library":"^2.0.0","rxjs":"^6.0.0","zone.js":"^0.8.26"},"devDependencies":{"@angular-devkit/build-angular":"~0.7.0","@angular/cli":"~6.1.3","@angular/compiler-cli":"^6.1.0","@angular/language-service":"^6.1.0","@angularclass/hmr":"^2.1.3","@types/jasmine":"~2.8.6","@types/jasminewd2":"~2.0.3","@types/node":"~8.9.4","angular-cli-ghpages":"^0.5.3","codelyzer":"~4.2.1","jasmine-core":"~2.99.1","jasmine-spec-reporter":"~4.2.1","karma":"~1.7.1","karma-chrome-launcher":"~2.2.0","karma-coverage-istanbul-reporter":"~2.0.0","karma-jasmine":"~1.1.1","karma-jasmine-html-reporter":"^0.2.2","protractor":"~5.3.0","ts-node":"~5.0.1","tslint":"~5.9.1","typescript":"~2.9.2"}};

/***/ }),

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/Bullet.ts":
/*!***************************!*\
  !*** ./src/app/Bullet.ts ***!
  \***************************/
/*! exports provided: BulletSettings, Bullet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BulletSettings", function() { return BulletSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Bullet", function() { return Bullet; });
var BulletSettings = /** @class */ (function () {
    function BulletSettings(speed, dir, fireRate, angle, shouldHitPlayer) {
        if (shouldHitPlayer === void 0) { shouldHitPlayer = false; }
        this.speed = speed;
        this.angle = angle;
        this.dir = dir;
        this.fireRate = fireRate;
        this.shouldHitPlayer = shouldHitPlayer;
    }
    return BulletSettings;
}());

var Bullet = /** @class */ (function () {
    function Bullet(bullet, settings) {
        this.settings = settings;
        this.bullet = bullet;
    }
    Bullet.prototype.update = function () {
        //  tem que dar um jeito de destruir o objeto quando fora da tela
    };
    return Bullet;
}());



/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"hud\">\r\n    <div id=\"score\">\r\n        <h3>Score: &nbsp; <div id=\"score-value\">{{score}}</div></h3>\r\n    </div>\r\n\r\n    <div id=\"health\">\r\n        <h2>HEALTH</h2>\r\n        <div class=\"back\">\r\n            <div class=\"fore\" [ngStyle]=\"{'width': health / maxHealth * 100 + '%', 'background-color': health > maxHealth / 2 ? 'green' : health > maxHealth / 5 ? 'yellow' : 'red'}\">\r\n            </div>\r\n        </div>\r\n        <p>{{health}}/{{maxHealth}}</p> \r\n    </div>\r\n    <div id=\"game\">\r\n        <phaser-component [gameConfig]=\"gameConfig\" (gameReady)=\"onGameReady($event)\"></phaser-component>\r\n    </div>\r\n\r\n    <app-leaderboard></app-leaderboard>\r\n</div>"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent, Enemy */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Enemy", function() { return Enemy; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _Bullet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Bullet */ "./src/app/Bullet.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




//import { Enemy } from './Enemy';
/**
 * Application component.
 */
var AppComponent = /** @class */ (function (_super) {
    __extends(AppComponent, _super);
    /**
     * Instantiate application component.
     */
    function AppComponent(http) {
        var _this = _super.call(this, { key: 'sceneA', active: true }) || this;
        _this.http = http;
        /**
         * Game configuration.
         */
        _this.gameConfig = {
            title: _environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].title,
            version: _environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].version,
            type: Phaser.AUTO,
            width: 600,
            height: 800,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 300 }
                }
            },
            scene: _this
        };
        _this.speed = 350;
        _this.maximumSpeed = 350;
        _this.precisionSpeed = 150;
        _this.bulletSettings = new _Bullet__WEBPACK_IMPORTED_MODULE_2__["BulletSettings"](10, new Phaser.Math.Vector2(0, -90), 1 / 3, -90);
        _this.enemies = [];
        // player stats
        _this.score = 0;
        _this.maxHealth = 100;
        _this.health = _this.maxHealth;
        _this.fkUp = true;
        _this.clock = 0;
        _this.hasFired = false;
        _this.bullets = [];
        return _this;
    }
    AppComponent.prototype.preload = function () {
        this.load.setBaseURL("../assets");
        this.load.image('sky', "sky.png");
        this.load.image('player', "Player_ship.png");
        this.load.image('bullet1', "bullet1.png");
        this.load.image('bullet2', "enemy_bullet.png");
        this.load.spritesheet('Enemy_big', 'enemy-big.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('Enemy_medium', 'enemy-medium.png', { frameWidth: 32, frameHeight: 16 });
        this.load.spritesheet('Enemy_small', 'enemy-small.png', { frameWidth: 16, frameHeight: 16 });
        this.anims.create({
            key: 'Enemy_big_anim',
            frames: this.anims.generateFrameNumbers('Enemy_big', { start: 0, end: 11 }),
            frameRate: 3,
            repeat: -1
        });
        this.anims.create({
            key: 'Enemy_medium_anim',
            frames: this.anims.generateFrameNumbers('Enemy_medium', { start: 0, end: 1 }),
            frameRate: 3,
            repeat: -1
        });
        this.anims.create({
            key: 'Enemy_small_anim',
            frames: this.anims.generateFrameNumbers('Enemy_small', { start: 0, end: 1 }),
            frameRate: 3,
            repeat: -1
        });
    };
    AppComponent.prototype.create = function () {
        var _this = this;
        this.add.image(0, 0, 'sky').setOrigin(0, 0);
        this.player = this.physics.add.sprite(400, 500, 'player');
        this.player.setOrigin(0.5, 0.5);
        this.player.body.allowGravity = false;
        this.player.setCollideWorldBounds(true);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.fireKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.precisionMovement = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        //let a = this.physics.add.sprite(100 , -200, 'Enemy_big' );
        var b = new Enemy(this, 100, -200, 'Enemy_big');
        this.enemies.push(new Enemy(this, 100, 200, 'Enemy_big'));
        this.enemies.push(new Enemy(this, 300, 200, 'Enemy_medium'));
        this.enemies.push(new Enemy(this, 500, 200, 'Enemy_small'));
        this.enemies.forEach(function (enemy) {
            enemy.body.allowGravity = false;
            enemy.setVelocityY(100);
            _this.physics.add.collider(_this.player, enemy, function () {
                enemy.disableBody();
                enemy.visible = false;
                _this.health -= 10;
            });
        });
    };
    AppComponent.prototype.update = function () {
        this.handleInput();
        if (this.bullets.length > 0) {
            for (var _i = 0, _a = this.bullets; _i < _a.length; _i++) {
                var bul = _a[_i];
                bul.update();
            }
        }
        if (this.enemies.length > 0) {
            for (var _b = 0, _c = this.enemies; _b < _c.length; _b++) {
                var enemy = _c[_b];
                enemy.update();
            }
        }
    };
    /**
     * Game ready event handler.
     *
     * @param game Game instance.
     */
    AppComponent.prototype.onGameReady = function (game) {
        this.game = game;
    };
    AppComponent.prototype.handleInput = function () {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-this.speed);
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(this.speed);
        }
        else {
            this.player.setVelocityX(0);
        }
        if (this.cursors.up.isDown) {
            this.player.setVelocityY(-this.speed);
        }
        else if (this.cursors.down.isDown) {
            this.player.setVelocityY(this.speed);
        }
        else {
            this.player.setVelocityY(0);
        }
        if (!this.fkUp && this.fireKey.isUp) {
            this.http.get('score').subscribe(function (data) { return console.log(data.data); }, function (error) { return console.log(error); }, function () { return console.log("Accessed!"); });
            this.fkUp = true;
        }
        if (this.fireKey.isDown) {
            this.fkUp = false;
            if (!this.hasFired) {
                this.fire(this.player, this.bulletSettings);
                this.hasFired = true;
            }
            else {
                this.clock += this.game.loop.delta / 100;
                if (this.clock > this.bulletSettings.fireRate) {
                    this.clock = 0;
                    this.hasFired = false;
                }
            }
        }
        if (this.precisionMovement.isDown) {
            this.speed = this.precisionSpeed;
        }
        else {
            this.speed = this.maximumSpeed;
        }
    };
    AppComponent.prototype.fire = function (user, settings) {
        var _this = this;
        var newBullet = this.physics.add.sprite(user.x, user.y, 'bullet1');
        newBullet.angle = settings.angle;
        newBullet.body.allowGravity = false;
        //newBullet.body.collideWorldBounds = true;
        newBullet.setVelocity(settings.dir.x * settings.speed, settings.dir.y * settings.speed);
        this.physics.add.collider(newBullet, this.enemies, function (bullet, enemy) {
            var enemyRef = enemy;
            bullet.disableBody();
            bullet.visible = false;
            enemyRef.setHealth(enemyRef.health - 50);
            enemyRef.visible = false;
            _this.score += 10;
        });
        if (settings.shouldHitPlayer) {
            this.physics.add.collider(newBullet, this.player, function (bullet, player) {
                bullet.disableBody();
                bullet.visible = false;
                player.disableBody();
                player.visible = false;
                _this.health -= 10;
            });
        }
        this.bullets.push(new _Bullet__WEBPACK_IMPORTED_MODULE_2__["Bullet"](newBullet, settings));
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html")
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"]])
    ], AppComponent);
    return AppComponent;
}(Phaser.Scene));

var Enemy = /** @class */ (function (_super) {
    __extends(Enemy, _super);
    function Enemy(scene, x, y, texture, frame) {
        var _this = _super.call(this, scene, x, y, texture, frame) || this;
        _this.health = 100;
        _this.scene.add.existing(_this);
        _this.scene.physics.add.existing(_this);
        return _this;
    }
    Enemy.prototype.setHealth = function (hp) {
        this.health = hp;
    };
    Enemy.prototype.update = function () {
        if (this.y > this.scene.gameConfig.height) {
            this.y = -100;
        }
        if (this.health < 0) {
            this.disableBody();
        }
    };
    return Enemy;
}(Phaser.Physics.Arcade.Sprite));



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var phaser_component_library__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! phaser-component-library */ "./node_modules/phaser-component-library/fesm5/phaser-component-library.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _leaderboard_leaderboard_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./leaderboard/leaderboard.component */ "./src/app/leaderboard/leaderboard.component.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Application module.
 */
var AppModule = /** @class */ (function () {
    /**
     * Instantiate application module.
     *
     * @param appRef Application reference, needed for [HMR](../hmr.ts).
     */
    function AppModule(appRef) {
        this.appRef = appRef;
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
                _leaderboard_leaderboard_component__WEBPACK_IMPORTED_MODULE_4__["LeaderboardComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                phaser_component_library__WEBPACK_IMPORTED_MODULE_2__["PhaserModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpClientModule"]
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ApplicationRef"]])
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/leaderboard/leaderboard.component.html":
/*!********************************************************!*\
  !*** ./src/app/leaderboard/leaderboard.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\r\n  leaderboard works!\r\n</p>\r\n"

/***/ }),

/***/ "./src/app/leaderboard/leaderboard.component.scss":
/*!********************************************************!*\
  !*** ./src/app/leaderboard/leaderboard.component.scss ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "phaser-component {\n  margin: auto; }\n"

/***/ }),

/***/ "./src/app/leaderboard/leaderboard.component.ts":
/*!******************************************************!*\
  !*** ./src/app/leaderboard/leaderboard.component.ts ***!
  \******************************************************/
/*! exports provided: LeaderboardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LeaderboardComponent", function() { return LeaderboardComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var LeaderboardComponent = /** @class */ (function () {
    function LeaderboardComponent() {
    }
    LeaderboardComponent.prototype.ngOnInit = function () {
    };
    LeaderboardComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-leaderboard',
            template: __webpack_require__(/*! ./leaderboard.component.html */ "./src/app/leaderboard/leaderboard.component.html"),
            styles: [__webpack_require__(/*! ./leaderboard.component.scss */ "./src/app/leaderboard/leaderboard.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], LeaderboardComponent);
    return LeaderboardComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false,
    hmr: false,
    title: 'Phangular - Development Build',
    version: __webpack_require__(/*! ../../package.json */ "./package.json").version
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/hmr.ts":
/*!********************!*\
  !*** ./src/hmr.ts ***!
  \********************/
/*! exports provided: hmrBootstrap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hmrBootstrap", function() { return hmrBootstrap; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angularclass_hmr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angularclass/hmr */ "./node_modules/@angularclass/hmr/dist/index.js");
/* harmony import */ var _angularclass_hmr__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_angularclass_hmr__WEBPACK_IMPORTED_MODULE_1__);


var hmrBootstrap = function (module, bootstrap) {
    var ngModule;
    module.hot.accept();
    bootstrap().then(function (mod) {
        ngModule = mod;
        var appRef = ngModule.injector.get(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ApplicationRef"]);
        var data = module.hot.data;
        if (data) {
            if ('restoreInputValues' in data) {
                data.restoreInputValues();
            }
            appRef.tick();
        }
    });
    module.hot.dispose(function (data) {
        var appRef = ngModule.injector.get(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ApplicationRef"]);
        var elements = appRef.components.map(function (c) { return c.location.nativeElement; });
        var makeVisible = Object(_angularclass_hmr__WEBPACK_IMPORTED_MODULE_1__["createNewHosts"])(elements);
        data.restoreInputValues = Object(_angularclass_hmr__WEBPACK_IMPORTED_MODULE_1__["createInputTransfer"])();
        Object(_angularclass_hmr__WEBPACK_IMPORTED_MODULE_1__["removeNgStyles"])();
        ngModule.destroy();
        makeVisible();
    });
};


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _hmr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./hmr */ "./src/hmr.ts");





if (true) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
var bootstrap = function () { return Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); }); };
if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].hmr) {
    if (false) {}
    else {
        console.error('HMR is not enabled for webpack-dev-server!');
        console.log('Are you using the --hmr flag for ng serve?');
    }
}
else if (!_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    bootstrap().catch(function (err) { return console.log(err); });
}
else {
    bootstrap();
}


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\willn\Desktop\Lixo\Weeb\improved-potato\trabalho-ga\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map