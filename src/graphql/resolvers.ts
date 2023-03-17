import { IResolvers } from "@graphql-tools/utils";

import { Listing, listings } from '../listings';
import { Booking, bookings } from "../bookings";
import { Database } from "../lib/types";


export const resolvers: IResolvers = {
    Query: {
        listings: async (_root: undefined, _args: {}, { db }: { db: Database }) => {
            return await db.listings.find({}).toArray();
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
          for (let i = 0; i < listings.length; i++){
            if (listings[i].id === id){
                let numOfBookings = listings[i].bookings.length;
                const newBooking: Booking = {
                    id: numOfBookings.toString(),
                    title: listings[i].title,
                    image: listings[i].image,
                    address: listings[i].address,
                    timestamp
                };
                bookings.push(newBooking);
                listings[i].bookings.push(newBooking.id);
                return newBooking;
            }
            throw new Error ("failed to create booking")
          }
        },
        favoriteListing: (_root: undefined, {id}: {id: string}) => {
            for (let i = 0; i < listings.length; i++){
                if (listings[i].id === id){
                    listings[i].favorite = !listings[i].favorite;
                    return listings[i];
                }
            }
            throw new Error ("failed to favorite listing");
        }
    },
    Listing: {
        numOfBookings: (listing: Listing): number => listing.bookings.length
    }
}