import { gql } from "graphql-request";

export const queryDebtsByUser = gql`
query Query($debtsByUserId: String!) {
    payments:debtsByDebtor(id: $debtsByUserId) {
     description
     amount
        payments {
        paidAmount,
        paymentDate
      }
    }
  }
`;

export const queryTotalUser = gql`
query User($userId: String!) {
  user(id: $userId) {
    getTotalPending
    getTotalDebt
    debtsAsDebtor {
      description
      amount
      totalPaidMount
      totalPending
    }
  }
}
`

export const queryCards = gql`
query User($userId: String!) {
  user(id: $userId) {
    getTotalPending
    getTotalDebt
    debtsAsDebtor {
      totalPaidMount
    }
  }
}
`

export const queryDebtsByDebtor = gql`
query DebtsByDebtor($debtsByDebtorId: String!) {
  debts: debtsByDebtor(id: $debtsByDebtorId) {
    creditor {
      name
      img
    }
    id
    description
    amount
    totalPaidMount
    totalPending
  }
}
`

export const queryDebtsByCreditor = gql`
query DebtsByCreditor($debtsByCreditorId: String!) {
  debts: debtsByCreditor(id: $debtsByCreditorId) {
    debtor {
      name
      img
    }
    id
    description
    amount
    totalPaidMount
    totalPending
  }
}
`


export const queryCreateDebt = gql`
mutation CreateDebt($createDebtInput: CreateDebtInput!) {
  createDebt(createDebtInput: $createDebtInput) {
    id
  }
}
`

export const queryDebtById = gql`
query Debt($debtId: String!) {
  debt(id: $debtId) {
    amount
    creditor {
      id
    }
    description
  }
}
`


export const queryDebtPayment = gql`
query Debt($debtId: String!) {
  debt(id: $debtId) {
    creditor {
      name
    }
    totalPending
    totalPaidMount
    amount
    description
  }
}
`

export const mutationDeleteDebt = gql`
mutation DeleteDebt($deleteDebtId: String!) {
  deleteDebt(id: $deleteDebtId)
}
`

export const mutationDeletePayment = gql`
mutation DeletePaymenById($deletePaymenByIdId: String!) {
  deletePaymenById(id: $deletePaymenByIdId) {
    paidAmount
  }
}
`

export const mutationUpdateDebt = gql`
mutation UpdateDebt($updateDebtInput: UpdateDebtInput!) {
  updateDebt(updateDebtInput: $updateDebtInput) {
    id
  }
}
`


