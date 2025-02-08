import { db } from "../../config/database.js";
import { users } from "../../models/user.js";

const queries = {

}


const mutations = {
    createUser: async (_, { name, email, password }) => {
        const user = await db.insert(users).values({ name, email, password });
        return user;
    }

}


export const resolvers = {
    queries,
    mutations
}
