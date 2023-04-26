import { IResolvers } from "@graphql-tools/utils";
import { Google } from "../../../lib/api"
import { Viewer } from "../../../lib/types"

export const viewerResolvers: IResolvers = {
    Query: {
        authUrl: () => {
            return "Query.authUrl"
        }
    },
    Mutation: {
        logIn: () => {
            return "Mutation.logIn";
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