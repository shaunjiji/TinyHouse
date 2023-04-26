import crypto from "crypto"
import { IResolvers } from "@graphql-tools/utils";
import { Google } from "../../../lib/api"
import { Database, User, Viewer } from "../../../lib/types"
import { LogInArgs } from "./types";


const logInViaGoogle = async (code: string, token: string, db: Database): Promise<User> | undefined => {

    
}

export const viewerResolvers: IResolvers = {
    Query: {
        authUrl: (): string => {
           try {
            return Google.authUrl;
           }
           catch(error) {
            throw new Error(`Failed to query Google Auth URL: ${error}`)
           }
        }
    },
    Mutation: {
        logIn: (_root: undefined, { input }: LogInArgs, { db }: { db: Database}) => {
           try {
            const code = input ? input.code : null;
            const token = crypto.randomBytes(16).toString("hex");

            const viewer: User | undefined = code 
            ? await logInViaGoogle(code, token, db) 
            : undefined;

            if (!viewer){
                return { didRequest: true }
            }

            return {
                _id: viewer._id,
                token: viewer.token,
                avatar: viewer.avatar,
                walletId: viewer.walletId,
                didRequest: true
            }

           }
           catch (error) {
            throw new Error(`Failed to log in: ${error}`)
           }
        },
        logOnput: () => {
            return "Mutation.logOut";
        }
    },
    Viewer: {
        id: (viewer: Viewer): string | undefined => {   
            return viewer._id;
        },
        hasWallet: (viewer: Viewer): boolean | undefined => {
            return viewer.walletId ? true : undefined;
        }
    }
}