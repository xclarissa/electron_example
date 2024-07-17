const path = require("path");
const rootDir = process.cwd();

module.exports = {
  packagerConfig: {
    name: "ElectronStarter",
    executableName: "electron-ts-react-example",
    icon: path.resolve("assets/icon"),
    extraResource: ["assets"],
  },
  rebuildConfig: {},
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {},
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin", "linux", "win32"],
    },
    {
      name: "@electron-forge/maker-deb",
      config: {},
    }
    // ,
    // {
    //   name: "@electron-forge/maker-rpm",
    //   config: {},
    // },
  ],
  plugins: [
    {
      name: "@electron-forge/plugin-webpack",
      config: {
        mainConfig: path.join(rootDir, "./tools/webpack/main.webpack.js"),
        renderer: {
          build: [
          {
            entry: path.join(rootDir, 'electron/main.ts'),
            config: path.join(rootDir, 'tools/webpack/main.webpack.js'),
          },
          {
            entry: path.join(rootDir, 'tools/webpack/renderer.webpack.js'),
          },
        ],
          config: path.join(rootDir, "./tools/webpack/renderer.webpack.js"),
          entryPoints: [
            {
              html: "./public/index.html",
              js: "./src/index.tsx",
              name: "main_window",
              preload: {
                js: "./electron/bridge.ts", //trocar pra payload.ts
              },
            },
          ],
        },
      },
    },
  ],
  buildIdentifier: "ElectronStarter-build",
};
