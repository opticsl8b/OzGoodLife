import {gql}from '@apollo/client'

export const ADD_USER = gql`
  mutation addUser(
    $username: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      userName: $username
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;