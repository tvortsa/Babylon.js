# Использование пост-процессинга из библиотеки

Вы можете найти несколько почтовых процессов, которые просто работают с Babylon.js в папке *dist*. Для их использования, вам нужно только ссылаться на связанные .js файлы и использовать новый предоставленный пост-процесс:

```js
var fire = new BABYLON.FireProceduralTexture2("firePT", 256, scene);
sphere.material.diffuseTexture = fire;
```

## Добавление нового пост- процесса в библиотеку

To add a new post process, you have to create your own folder in *postProcesses/src* folder. Then you need to add a .ts file and one .fragment.fx files:
* The .ts is the TypeScript code of your post process
* .fx file: GLSL code for fragment shaders

## Integrating the post process in the build process

To build all post processes and generate the *dist* folder, just run from the tools/gulp folder:

```
gulp postProcesLibrary
```

To integrate your new post process to the build process, you have to edit the config.json file in the tools/gulp folder and add an entry in the "postProcessLibray/libraries" section of the file:

```
  "libraries": [   
    ... 
      {
        "files": ["../../postProcessLibrary/src/asciiArt/babylon.asciiArtPostProcess.ts"],
        "shaderFiles": [
          "../../postProcessLibrary/src/asciiArt/asciiart.fragment.fx"
        ],
        "output": "babylon.asciiArtPostProcess.js"
      }
    '''
  ]
```

## Testing your post process

To test your post process, you can use the /postProcessLibrary/index.html  page. References are added automatically. You only need to update the code to create an instance of your material and reference it in the UI system:

```
switch (options.postProcess) {
    case "asciiArt":
      camera.detachPostProcess(aaPostProcess);
      camera.detachPostProcess(drPostProcess);
      camera.attachPostProcess(aaPostProcess);
      break;
    case "digitalRain":
      camera.detachPostProcess(aaPostProcess);
      camera.detachPostProcess(drPostProcess);
      camera.attachPostProcess(drPostProcess);
      break;
  }
```

This page allows you to test your code on a simple sphere.

To serve this page, you can start from the tools/gulp folder the task:

```js
gulp webserver
```