import { GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLNonNull} from "graphql";


const Listing = new GraphQLObjectType({
    name: "Listing",
    fields: {
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        image: { type: GraphQLString },
        address: { type: GraphQLString },
        price: { type: GraphQLInt },
        numOfGuests: { type: GraphQLInt },
        numOfBeds: { type: GraphQLInt },
        numOfBaths: { type: GraphQLInt },
        rating: { type: GraphQLInt}
    }
})

const query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        hello: {
            type: GraphQLString,
            resolve: () => 'Hello from the Query!'
        }
    }
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        hello: {
            type: GraphQLString,
            resolve: () => 'Hello from the Mutation!'
        }
    }
});

export const schema = new GraphQLSchema({query, mutation});
