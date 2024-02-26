import React from 'react'
import CardTotal from '../cards/CardTotal'
import { fetchDataCard } from '@/app/fetch'

const CARD_OPTIONS = [
  {
    text: 'Total deudas',
    value: '1200',
  },
  {
    text: 'Total Pagado',
    value: '400',

  },
  {
    text: 'Total Pendiente',
    value: '800',

  }
]

const DataCards = async () => {


  const data = await fetchDataCard()
  return (<>
    {
      (data || CARD_OPTIONS).map(({ text, value }) => (
        <CardTotal key={text} text={text} value={value} />
      ))
    }
  </>
  )
}

export default DataCards