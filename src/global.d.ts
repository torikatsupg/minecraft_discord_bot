/// <reference types="node" />

declare namespace NodeJS {
    interface ProcessEnv {
        readonly GCP_SERVECE_ACCOUNT_ID: string,
        readonly GCP_PROJECT_ID: string,
        readonly GCP_MINECRAFT_INSTANCE_ID: string,
        readonly GCP_MINECRAFT_INSTANCE_ZONE: string,
        readonly DISCORD_TOKEN: string,
        readonly DISCORD_BOT_ID: string
    }
}