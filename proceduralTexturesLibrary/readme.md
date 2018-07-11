## Использование процедурной текстуры из библиотеки

Вы можете найти несколько процедурных текстур, которые просто работают с Babylon.js в папке *dist*. Для их использования, вам нужно только ссылаться на связанные .js файлы и использовать новые текстуры:

```js
var fire = new BABYLON.FireProceduralTexture2("firePT", 256, scene);
sphere.material.diffuseTexture = fire;
```

## Добавление в библиотеку новой процедурной текстуры

Чтобы добавить новую процедурную текстуру, вы должны создать свою собственную папку в папке *proceduralTextures* в src. Затем вам нужно добавить .ts файл и один .fragment.fx файлы:

* .ts это TypeScript код вашей процедурной текстуры

* .fx файл: GLSL код для fragment shaders

## Интеграция процедурной текстуры в процессе сборки

Чтобы собрать все процедурные текстуры и создать *dist* папку, просто запустите папку tools/gulp:

```js
gulp proceduralTextureLibrary
```

To integrate your new procedural texture to the build process, you have to edit the config.jsonfile в папке tools/gulp and add an entry in the "proceduralTextureLibrary/libraries" section of the file:

```js
  "libraries": [
    ...
      {
        "files": ["../../proceduralTexturesLibrary/src/wood/babylon.woodProceduralTexture.ts"],
        "shaderFiles": [
          "../../proceduralTexturesLibrary/src/wood/woodProceduralTexture.fragment.fx"
        ],
        "output": "babylon.woodProceduralTexture.js"
      }
    ...
  ]
```

## Testing your procedural texture

To test your procedural texture, you can use the /proceduralTextureLibrary/index.html  page. References are added automatically. You only need to update the code to create an instance of your procedural texture and reference it in the UI system:

```
gui.add(options, 'texture', ['default', 'fire', 'wood', 'cloud', 'grass', 'road', 'brick', 'marble', '[YOURTEXTURE]', 'starfield']).onFinishChange(function () {
  resetPTOptions();
  switch (options.texture) {
    case "fire":
      currentTexture = firePT;
      addPToptions(firePT, ['time', 'alphaThreshold', 'speed', ]);
      break;

    //.......................

    //YOURTEXTURE

    case "none":
    default:
      currentTexture = diffuseTexture;
      break;
  }

  std.diffuseTexture = currentTexture;
  window.enableTexture(options.texture);
});
```

This page allows you to test your code with animated meshes, shadows, various kinds of lights and fog. Just use the UI on the right to turn features on and off.

To serve this page, you can start from the tools/gulp folder the task:

```js
gulp webserver
```
