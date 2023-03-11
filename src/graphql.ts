import { GraphQLID, GraphQLList, GraphQLInt, GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLNonNull} from "graphql";
import { listings } from "./listings";

const Listing = new GraphQLObjectType({
    name: "Listing",
    fields: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        image: { type: new GraphQLNonNull(GraphQLString) },
        address: { type: new GraphQLNonNull(GraphQLString) },
        price: { type: new GraphQLNonNull(GraphQLInt) },
        numOfGuests: { type: new GraphQLNonNull(GraphQLInt) },
        numOfBeds: { type: new GraphQLNonNull(GraphQLInt) },
        numOfBaths: { type: new GraphQLNonNull(GraphQLInt) },
        rating: { type: new GraphQLNonNull(GraphQLInt)}
    }
})

const query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        listings: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Listing))),
            resolve: () => {
                return listings;
            }      
        }
    }
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        deleteListing: {
            type: new GraphQLNonNull(Listing),
            resolve: () => 'Hello from the Mutation!'
        }
    }
});

export const schema = new GraphQLSchema({query, mutation});
