import { gql } from "apollo-server-express";

export const typeDefs = gql`
    type Booking {
        id: ID!
        title: String!
        image: String!
        address: String!
        timestamp: String!
    }

    type Listing {
        id: ID!
        title: String!
        image: String!
        address: String!
        price: Int!
        numOfGuests: Int!
        numOfBeds: Int!
        numOfBaths: Int!
        rating: Int!
        numOfBookings: Int!
        favorite: Boolean!
    }
    
    type Query {
        listings: [Listing!]!
        bookings: [Booking!]!
    }
    
    type Mutation {
        deleteListing(id: ID!): Listing!
        createBooking(id: ID!, timestamp: String!): Booking!
        favoriteListing(id: ID!): Listing!
    }
    `;