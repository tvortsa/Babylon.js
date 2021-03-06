/**
 * Describes the test suite
 */
describe('Babylon glTF Serializer', () => {
    let subject: BABYLON.Engine;

    /**
     * Loads the dependencies
     */
    before(function (done) {
        this.timeout(180000);
        (BABYLONDEVTOOLS).Loader
            .useDist()
            .load(function () {
                done();
            });
    });

    /**
     * Create a null engine subject before each test.
     */
    beforeEach(function () {
        subject = new BABYLON.NullEngine({
            renderHeight: 256,
            renderWidth: 256,
            textureSize: 256,
            deterministicLockstep: false,
            lockstepMaxSteps: 1
        });
    });

    /**
     * This tests the glTF serializer help functions 
     */
    describe('#GLTF', () => {
        it('should get alpha mode from Babylon metallic roughness', () => {
            let alphaMode: string;

            const scene = new BABYLON.Scene(subject);
            const babylonMaterial = new BABYLON.PBRMetallicRoughnessMaterial("metallicroughness", scene);
            babylonMaterial.transparencyMode = BABYLON.PBRMaterial.PBRMATERIAL_OPAQUE;
            
            alphaMode = BABYLON._GLTFMaterial.GetAlphaMode(babylonMaterial);
            alphaMode.should.be.equal('OPAQUE');
            
            babylonMaterial.transparencyMode = BABYLON.PBRMaterial.PBRMATERIAL_ALPHABLEND;
            alphaMode = BABYLON._GLTFMaterial.GetAlphaMode(babylonMaterial);
            alphaMode.should.be.equal('BLEND');

            babylonMaterial.transparencyMode = BABYLON.PBRMaterial.PBRMATERIAL_ALPHATESTANDBLEND;
            alphaMode = BABYLON._GLTFMaterial.GetAlphaMode(babylonMaterial);
            alphaMode.should.be.equal('BLEND');

            babylonMaterial.transparencyMode = BABYLON.PBRMaterial.PBRMATERIAL_ALPHATEST;
            alphaMode = BABYLON._GLTFMaterial.GetAlphaMode(babylonMaterial);
            alphaMode.should.be.equal('MASK'); 
        });
        it('should convert Babylon standard material to metallic roughness', () => {
            const scene = new BABYLON.Scene(subject);
            const babylonStandardMaterial = new BABYLON.StandardMaterial("specGloss", scene);
            babylonStandardMaterial.diffuseColor = BABYLON.Color3.White();
            babylonStandardMaterial.specularColor = BABYLON.Color3.Black();

            const specGloss: BABYLON._IBabylonSpecularGlossiness = {
                diffuse: BABYLON.Color3.White(),
                specular: BABYLON.Color3.Black(),
                glossiness: 0.25,
                opacity: 1.0
            };
            const metalRough = BABYLON._GLTFMaterial.ConvertToMetallicRoughness(specGloss);

            metalRough.baseColor.equals(new BABYLON.Color3(1, 1, 1)).should.be.equal(true);

            metalRough.metallic.should.be.equal(0);
            
            metalRough.roughness.should.be.equal(0.75);
            
            metalRough.opacity.should.be.equal(1);
        });
        it('should solve for metallic', () => {
            BABYLON._GLTFMaterial.SolveMetallic(1.0, 0.0, 1.0).should.be.equal(0);
            BABYLON._GLTFMaterial.SolveMetallic(0.0, 1.0, 1.0).should.be.approximately(1, 1e-6);
        });
        it('should serialize empty Babylon scene to glTF with only asset property', (done) => {
            mocha.timeout(10000);

            const scene = new BABYLON.Scene(subject);
            scene.executeWhenReady(function () {
                const glTFExporter = new BABYLON._GLTF2Exporter(scene);
                const glTFData = glTFExporter._generateGLTF('test');
                const jsonString = glTFData.glTFFiles['test.gltf'] as string;
                const jsonData = JSON.parse(jsonString);

                Object.keys(jsonData).length.should.be.equal(1);
                jsonData.asset.version.should.be.equal("2.0");
                jsonData.asset.generator.should.be.equal("BabylonJS");

                done();
            });
        });
        it('should serialize sphere geometry in scene to glTF', (done) => {
            mocha.timeout(10000);
            const scene = new BABYLON.Scene(subject);
            BABYLON.Mesh.CreateSphere('sphere', 16, 2, scene);

            scene.executeWhenReady(function () {
                const glTFExporter = new BABYLON._GLTF2Exporter(scene);
                const glTFData = glTFExporter._generateGLTF('test');
                const jsonString = glTFData.glTFFiles['test.gltf'] as string;
                const jsonData = JSON.parse(jsonString);

                // accessors, asset, buffers, bufferViews, meshes, nodes, scene, scenes, 
                Object.keys(jsonData).length.should.be.equal(8);

                // positions, normals, texture coords, indices
                jsonData.accessors.length.should.be.equal(4);

                // generator, version
                Object.keys(jsonData.asset).length.should.be.equal(2);

                jsonData.buffers.length.should.be.equal(1);

                // positions, normals, texture coords, indices
                jsonData.bufferViews.length.should.be.equal(4);

                jsonData.meshes.length.should.be.equal(1);

                jsonData.nodes.length.should.be.equal(1);

                jsonData.scenes.length.should.be.equal(1);

                jsonData.scene.should.be.equal(0);

                done();
            });
        });
        it('should serialize alpha mode and cutoff', (done) => {
            mocha.timeout(10000);
            const scene = new BABYLON.Scene(subject);

            const plane = BABYLON.Mesh.CreatePlane('plane', 120, scene);
            const babylonPBRMetalRoughMaterial = new BABYLON.PBRMetallicRoughnessMaterial('metalRoughMat', scene);
            babylonPBRMetalRoughMaterial.transparencyMode = BABYLON.PBRMaterial.PBRMATERIAL_ALPHABLEND;
            const alphaCutoff = 0.8;
            babylonPBRMetalRoughMaterial.alphaCutOff = alphaCutoff;

            plane.material = babylonPBRMetalRoughMaterial;

            scene.executeWhenReady(function () {
                const glTFExporter = new BABYLON._GLTF2Exporter(scene);
                const glTFData = glTFExporter._generateGLTF('test');
                const jsonString = glTFData.glTFFiles['test.gltf'] as string;
                const jsonData = JSON.parse(jsonString);

                Object.keys(jsonData).length.should.be.equal(9);

                jsonData.materials.length.should.be.equal(1);
                
                jsonData.materials[0].alphaMode.should.be.equal('BLEND');
                
                jsonData.materials[0].alphaCutoff.should.be.equal(alphaCutoff);
                
                done();
            });
        });
    });
});