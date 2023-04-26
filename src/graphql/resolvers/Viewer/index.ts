import { IResolvers } from "@graphql-tools/utils";
import { Google } from "../../../lib/api"
import { Viewer } from "../../../lib/types"
import { LogInArgs } from "./types";

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
        logIn: (_root: undefined, { input }: LogInArgs) => {
           try {
            
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