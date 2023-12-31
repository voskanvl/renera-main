import { defineConfig } from "vite"
// import pugPlugin from "vite-plugin-pug";
import vitePugPlugin from "./vite-plugin-pug-edited"
import { resolve, extname, posix } from "path"
import { readFileSync, readdirSync } from "fs"
import * as yaml from "js-yaml"
import colors from "picocolors"
import * as fs from "fs"
import * as path from "path"
import sassGlobImports from "vite-plugin-sass-glob-import"

function getShortName(file, root) {
    return file.startsWith(root + "/") ? posix.relative(root, file) : file
}

function YamlHMR() {
    return {
        name: "yaml-hmr",
        enforce: "post",
        // HMR
        handleHotUpdate({ file, server }) {
            if (file.endsWith(".yml") || file.endsWith(".yaml")) {
                console.log("reloading json file...")

                server.ws.send({
                    type: "full-reload",
                    path: "*",
                })
            }
        },
    }
}

const merge = () => {
    console.log(`now merging data files`)
    const fn = { json: JSON.parse, yaml: yaml.load, yml: yaml.load }
    const files = readdirSync(resolve(__dirname, "src/data"))
    return files.reduce(
        (acc, file) => ({
            ...acc,
            ...fn[extname(file).slice(1)](readFileSync(resolve(__dirname, "src/data", file))),
        }),
        {},
    )
}

function htmlsFiles() {
    let files = fs.readdirSync(path.resolve(process.cwd()))
    files = files
        .filter(e => path.extname(e) === ".html")
        .map(e => path.basename(e).replace(".html", ""))
    return files
}

const input = htmlsFiles().reduce(
    (acc, e) => ({ ...acc, [e]: resolve(__dirname, e + ".html") }),
    {},
)

export default defineConfig({
    // plugins: [pugPlugin.default(options, locals)],
    plugins: [YamlHMR(), vitePugPlugin({ pugLocals: merge }), sassGlobImports()],
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                ...input,
            },
            output: {
                assetFileNames: "[name].[ext]",
                entryFileNames: "main.js",
            },
        },
    },
    publicDir: "assets",
    resolve: {
        alias: {
            "@": resolve(__dirname, "./src"),
            "@assets": resolve(__dirname, "./assets"),
            "@var": resolve(__dirname, "./src/sass/_variables.sass"),
        },
    },
})
