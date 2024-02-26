import { gql } from "graphql-request";

export const mutationLogin = gql`
mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      token
      user {
        id
      }
    }
  }
  
`;