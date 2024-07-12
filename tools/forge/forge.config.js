const path = require("path");
const rootDir = process.cwd();

module.exports = {
  packagerConfig: {
    name: "ElectronStarter",
    executableName: "ElectronStarter",
    icon: path.resolve("assets/icon"),
    extraResource: ["assets"],
  },
  rebuildConfig: {},
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        name: "ElectronStarter",
      },
    },
    {
      name: "@electron-forge/maker-zip",
      executableName: "ElectronStarterAll",
      platforms: ["darwin", "linux", "win32"],
    },
    {
      name: "@electron-forge/maker-deb",
      executableName: "ElectronStarterLinux",
      config: {},
    },
    {
      name: "@electron-forge/maker-rpm",
      executableName: "ElectronStarterLinuxRPM",
      config: {},
    },
  ],
  plugins: [
    {
      name: "@electron-forge/plugin-webpack",
      config: {
        mainConfig: path.join(rootDir, "./tools/webpack/main.webpack.js"),
        renderer: {
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
};
