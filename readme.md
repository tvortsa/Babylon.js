Babylon.js
==========

Только приступаете? Поиграйте с Babylon.js API прямо на [playground](http://www.babylonjs.com/playground). Там также много простых примеров того как что использовать.

[![Build Status](https://travis-ci.org/BabylonJS/Babylon.js.svg)](https://travis-ci.org/BabylonJS/Babylon.js) 

[![BrowserStack Status](https://www.browserstack.com/automate/badge.svg?badge_key=d0pZcGpNU0NPeTM5cEpEc2lTU2JJTWc2Mk9NSlAzTzdIaFBpTnF2TjBycz0tLStUWkVBejdVQmN4Y0dIUVVYeU0yc2c9PQ==--4e576f7b7c21279bc6d026b6f51796f58134856b)](https://www.browserstack.com/automate/public-build/d0pZcGpNU0NPeTM5cEpEc2lTU2JJTWc2Mk9NSlAzTzdIaFBpTnF2TjBycz0tLStUWkVBejdVQmN4Y0dIUVVYeU0yc2c9PQ==--4e576f7b7c21279bc6d026b6f51796f58134856b)

**Есть вопросы?** Вот наш официальный форум [forum](http://www.html5gamedevs.com/forum/16-babylonjs/) on www.html5gamedevs.com.

## CDN
- https://cdn.babylonjs.com/babylon.js
- https://cdn.babylonjs.com/babylon.max.js
- https://cdn.babylonjs.com/babylon.worker.js

Дополнительные ссылки можно найти здесь https://cdn.babylonjs.com/xxx где xxx это структура папок, которую вы можете найти в /dist папке https://cdn.babylonjs.com/gui/babylon.gui.min.js

For preview release you can use the following ones:

- https://preview.babylonjs.com/babylon.js
- https://preview.babylonjs.com/babylon.max.js
- https://preview.babylonjs.com/babylon.worker.js

Additional references can be found on https://preview.babylonjs.com/xxx where xxx is the folder structure you can find in the /dist/preview release folder like https://preview.babylonjs.com/gui/babylon.gui.min.js

## NPM

BabylonJS и его модули публикуются в NPM с полной поддержкой typing. Для установки наберите

```
npm install babylonjs --save
```

Это позволит вам импортировать BabylonJS полностью используя:

```
import * as BABYLON from 'babylonjs';
```

или отдельные классы используя:

```
import { Scene, Engine } from 'babylonjs';
```

При использовании TypeScript, не забудьте добавить 'babylonjs' к 'types' в tsconfig.json:

```
    ....
    "types": [
        "babylonjs",
        "anotherAwesomeDependency"
    ],
    ....
```

Чтобы добавить модуль, установите соответствующий пакет. Список дополнительных пакетов и их инструкции по установке можно найти на [babylonjs' user at npm](https://www.npmjs.com/~babylonjs).

## Использование
See [Getting Started](http://doc.babylonjs.com/#getting-started)
```javascript
// получаем элемент canvas DOM
var canvas = document.getElementById('renderCanvas');
// загружаем 3D движок
var engine = new BABYLON.Engine(canvas, true);
// функция createScene которая создает и возвращает сцену
var createScene = function(){
    // создаем базовый объект сцены BJS
    var scene = new BABYLON.Scene(engine);
    // создаем FreeCamera, и помещаем ее в позицию (x:0, y:5, z:-10)
    var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5,-10), scene);
    // нацеливаем камеру на нулевую точку сцены
    camera.setTarget(BABYLON.Vector3.Zero());
    // подключаем камеру к canvas
    camera.attachControl(canvas, false);
    // создаем базовый свет, aiming 0,1,0 - meaning, to the sky
    var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);
    // создаем встроенную форму "sphere"; its constructor takes 6 params: name, segment, diameter, scene, updatable, sideOrientation
    var sphere = BABYLON.Mesh.CreateSphere('sphere1', 16, 2, scene);
    // move the sphere upward 1/2 of its height
    sphere.position.y = 1;
    // create a built-in "ground" shape; its constructor takes the same 6 params : name, width, height, subdivision, scene, updatable
    var ground = BABYLON.Mesh.CreateGround('ground1', 6, 6, 2, scene);
    // return the created scene
    return scene;
}
// call the createScene function
var scene = createScene();
// run the render loop
engine.runRenderLoop(function(){
    scene.render();
});
// the canvas/window resize event handler
window.addEventListener('resize', function(){
    engine.resize();
});
```
## Preview release

Прежняя версия **3.2** может быть найдена [здесь](https://github.com/BabylonJS/Babylon.js/tree/master/dist/preview%20release).
If you want to contribute, please read our [contribution guidelines](https://github.com/BabylonJS/Babylon.js/blob/master/contributing.md) first.

## Documentation
- [Documentation](http://doc.babylonjs.com)
- [Samples](https://github.com/BabylonJS/Samples)
- [Video overview (1 hour) of BabylonJS features](http://www.youtube.com/watch?v=z80TYMqsdEM)
- [Complete course (8 hours)](http://www.microsoftvirtualacademy.com/training-courses/introduction-to-webgl-3d-with-html5-and-babylon-js)

## Useful links

 - Official web site: [www.babylonjs.com](http://www.babylonjs.com/)
 - Online [sandbox](http://www.babylonjs.com/sandbox) where you can test your .babylon scenes with a simple drag'n'drop
 - Online [shader creation tool](http://www.babylonjs.com/cyos/) where you can learn how to create GLSL shaders
 - 3DS Max [exporter](https://github.com/BabylonJS/Exporters/tree/master/3ds%20Max) can be used to generate a .babylon file from 3DS Max
 - Blender [exporter](https://github.com/BabylonJS/Exporters/tree/master/Blender) can be used to generate a .babylon file from Blender 3d
 - Unity 5 [exporter](https://github.com/BabylonJS/Exporters/tree/master/Unity%205) can be used to export your geometries from Unity 5 scene editor(animations are supported)

## Features
To get a complete list of supported features, please visit our [website](http://www.babylonjs.com/#specifications).
