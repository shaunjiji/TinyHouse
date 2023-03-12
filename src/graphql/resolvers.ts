import { IResolvers } from "@graphql-tools/utils";

import { listings } from '../listings';
import { bookings } from "../bookings";

export const resolvers: IResolvers = {
    Query: {
        listings: () => {
            return listings;
        },
        bookings: () => {
            return bookings;
        }
    },
    Mutation: {
        deleteListing: (_root: undefined, {id}: {id: string}) => {
            for (let i = 0; i < listings.length; i++) {
                if (listings[i].id === id) {
                    return listings.splice(i, 1)[0];
                }
            }
            throw new Error("failed to delete listing")
        },
        createBooking: (_root: undefined, {id, timestamp}: {id:string, timestamp: string}) => {
            const booking = {
                
            }
        }
    }
}