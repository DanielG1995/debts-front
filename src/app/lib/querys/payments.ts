import { gql } from "graphql-request";

export const mutationCreatePayment = gql`
mutation Mutation($createPaymentInput: CreatePaymentInput!) {
  createPayment(createPaymentInput: $createPaymentInput) {
    id
  }
}
`


export const queryPayments = gql`
query Debt($debtId: String!) {
  debt(id: $debtId) {
    payments {
      id
      paidAmount
      paymentDate
    }
  }
}
`