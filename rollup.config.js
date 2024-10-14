import typescript from "@rollup/plugin-typescript";

export default {
    input: "src/quizzes.ts", // точка входа
    output: {
        // файл бандла
        file: "dist/quizzes.js",
        format: "es", // формат модуля (cjs для Node.js)
    },
    plugins: [
        typescript(), // плагин для работы с TypeScript
    ],
    external: ["dotenv", "telegraf", "node:fs/promises", "node:path"],
    watch: {
        include: ["src/**"],
        exclude: ["dist/**", "*.log", "*.json"],
    },
};
