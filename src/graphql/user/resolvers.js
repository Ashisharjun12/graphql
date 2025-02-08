import UserService from "../../services/user.js";

const queries = {

}


const mutations = {
    createUser: async (_, { name, email, password }) => {
        const user = await UserService.createUser(name, email, password);
        return user;
    }

}


export const resolvers = {
    queries,
    mutations
}
