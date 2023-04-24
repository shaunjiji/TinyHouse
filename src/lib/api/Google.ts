import { google } from "googleapis";

const auth = new google.auth.OAuth2(
    process.env.G_CLIENT_ID,
    process.env.G_CLIENT_SECRET,
    `${process.env.PUBLIC_URL}/login`
);

export const Google = {
    authUrl: '',
    logIn: async (code: string) => {}
}
