import crypto from "crypto"
import { IResolvers } from "@graphql-tools/utils";
import { Google } from "../../../lib/api"
import { Database, User, Viewer } from "../../../lib/types"
import { LogInArgs } from "./types";


const logInViaGoogle = async (
    code: string, 
    token: string, 
    db: Database): 
    Promise<User | undefined> => {
    const { user } = await Google.logIn(code);
    
    if (!user) {
        throw new Error("Google login error")
    }


    // Name/Photo/Email Lists
    const userName = user?.names?.[0]?.displayName ?? null;
    const userId = user?.names?.[0]?.metadata?.source?.id ?? null;
    const userAvatar = user?.photos?.[0]?.url ?? null;
    const userEmail = user?.emailAddresses?.[0]?.value ?? null;

    if (!userId || !userName || !userAvatar || !userEmail) {
        throw new Error("Google login error");
      }
    
      const updateRes = await db.users.findOneAndUpdate(
        { _id: userId },
        {
          $set: {
            name: userName,
            avatar: userAvatar,
            contact: userEmail,
            token
          }
        },
        { returnDocument: 'after' }
      );
    
      let viewer = updateRes.value;
    
      if (!viewer) {
        const insertResult = await db.users.insertOne({
          _id: userId,
          token,
          name: userName,
          avatar: userAvatar,
          contact: userEmail,
          income: 0,
          bookings: [],
          listings: []
        });
    
        viewer = await db.users.findOne({_id: insertResult.insertedId})
      }

      
      return viewer ?? undefined; 
};

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
        logIn: async (_root: undefined, { input }: LogInArgs, { db }: { db: Database}): Promise<Viewer> => {
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
        logOut: (): Viewer => {
            try {
              return { didRequest: true}
            }
            catch(error) {
              throw new Error(`Failed to log out: ${error}`)
            }
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