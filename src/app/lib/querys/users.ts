import { gql } from "graphql-request";

export const queryGetUsers = gql`
query {
    users {
      id
      name
      img
    }
    
  }  
`;

export const mutationLogin = gql`
mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      token
      user {
        id
        name
      }
    }
  }
  
`;