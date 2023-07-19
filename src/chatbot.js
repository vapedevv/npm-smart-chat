const fetch = require("node-fetch");
const translate = require("@vitalets/google-translate-api");

class Chatbot {
    constructor(ops = {}) {
        this.defaultOptions = {
            language: "en"
        };
        this.ops = { ...this.defaultOptions, ...ops };
    }

    async chat(message) {
        if (!message || typeof message !== "string") {
            throw new Error("You need to provide a valid message to reply to!");
        }

        try {
            const response = await this.fetchMessage(message);
            const translation = await this.translateMessage(response.message);
            return translation.text;
        } catch (error) {
            throw new Error(`An error occurred: ${error.message}`);
        }
    }

    async fetchMessage(message) {
        try {
            const translation = await translate(message, { from: this.ops.language, to: "en" });
            const url = `https://smart-chat-cyan.vercel.app/?message=${encodeURIComponent(translation.text)}`;
            const res = await fetch(url);
            const data = await res.json();

            if (!data || !data.message) {
                throw new Error("[Chatbot API] Invalid response from Chatbot API");
            }
            return data;
        } catch (error) {
            throw new Error(`Failed to fetch message: ${error.message}`);
        }
    }

    async translateMessage(message) {
        try {
            const translation = await translate(message, { from: "en", to: this.ops.language });
            return translation;
        } catch (error) {
            throw new Error(`Failed to translate message: ${error.message}`);
        }
    }
}

module.exports = Chatbot;
