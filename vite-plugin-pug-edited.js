import path from "path"
import colors from "picocolors"
import { compileFile } from "pug"

export function getShortName(file, root) {
    return file.startsWith(root + "/") ? path.posix.relative(root, file) : file
}

export default function ({ pugOptions = {}, pugLocals = () => {} } = {}) {
    return {
        name: "vite-plugin-pug-transformer",

        handleHotUpdate({ file, server }) {
            const exts = [".pug", ".json", ".yaml"]
            if (exts.some(ext => file.endsWith(ext))) {
                server.config.logger.info(
                    colors.green("page reload ") +
                        colors.dim(getShortName(file, server.config.root)),
                    { clear: true, timestamp: true },
                )

                server.ws.send({
                    type: "full-reload",
                    path: "*",
                })

                return []
            }
        },

        transformIndexHtml: {
            enforce: "pre",
            transform(html, { filename }) {
                const updatedHtml = html.replace(
                    /<template.*?data-type="pug".*?(\/>|<\/template>)/g,
                    matchedString => {
                        const [, rawTemplatePath] =
                            matchedString.match(/data-src=["'](.*?)["']/) || []

                        if (!rawTemplatePath) {
                            throw new Error(`Template path not specified for ${matchedString}`)
                        }

                        const entryFileDir = filename.replace(/(.*)\/.*\.html$/, "$1")
                        const templateFilePath = path.join(entryFileDir, rawTemplatePath)

                        return compileFile(templateFilePath, pugOptions)(pugLocals())
                    },
                )

                return updatedHtml
            },
        },
    }
}
