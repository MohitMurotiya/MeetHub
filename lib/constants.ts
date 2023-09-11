
// API constants
export const UNAUTHORIZED = "Unauthorized";
export const SERVER_ERROR = "Internal Server Error";

//modals
export const INVITE_MODAL = "invite";
export const MEMBERS_MODAL = "members";
export const LEAVE_SERVER_MODAL = "leaveServer";
export const CREATE_SERVER_MODAL = "createServer";
export const DELETE_SERVER_MODAL = "deleteServer";
export const CREATE_CHANNEL_MODAL = "createChannel";
export const SERVER_SETTINGS_MODAL = "serverSettings";

//images
export const SERVER_IMG_URL = "https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6918e57475a843f59f_icon_clyde_black_RGB.svg";
const images = [
    "https://www.kindpng.com/picc/m/122-1222894_probably-the-potential-discord-server-icon-cool-free.png",
    "https://www.kindpng.com/picc/m/122-1222778_owly-discord-bot-cartoon-hd-png-download.png",
    "https://www.kindpng.com/picc/m/136-1364618_creepy-discord-icon-logo-remix-by-treetoadart-discord.png",
    "https://www.kindpng.com/picc/m/287-2874533_discord-server-icon-logo-discord-png-transparent-png.png",
    "https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a69f118df70ad7828d4_icon_clyde_blurple_RGB.svg",
]
export const IMAGE_URL = () => {
    return images[Math.floor(Math.random()*images.length)]
}