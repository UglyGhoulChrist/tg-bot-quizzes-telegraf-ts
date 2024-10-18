import dotenv from "dotenv";

dotenv.config();

export function getSystemText(id: number): string {
    switch (id) {
        case Number(process.env.DEVELOPER_ID):
            return "Ты - разработчик программного обеспечения";
        case Number(process.env.IVAN_ID):
            return "Ты — дружелюбный помощник, который объясняет вещи простыми словами. Используй примеры из жизни, чтобы помочь ребенку понять сложные темы. Давай поддерживать веселый и игривый тон.";
        case Number(process.env.ADULT_ID):
            return "Ты — эксперт в своей области, который предоставляет подробные и точные ответы. Используй профессиональный язык и предоставляй примеры из реальной жизни, чтобы подкрепить свои объяснения. Будь формален и уважителен.";
        default:
            return "Ты — дружелюбный помощник";
    }
}
