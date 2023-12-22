import { createContext, useReducer, useState, useMemo, useEffect } from "react";
import { carrinhoReducer } from "../reducers/carrinhoReducer";

export const CarrinhoContext = createContext()
CarrinhoContext.displayName = 'Carrinho'

const estadoInicial = []

export const CarrinhoProvider = ({ children }) => {

  // Funciona de forma similar ao useState. Ao invés de um setState usa-se um dispatch e o hook recebe 2 valores: função redutora e um estado inicial
  const [carrinho, dispatch] = useReducer(carrinhoReducer, estadoInicial)

  const [quantidade, setQuantidade] = useState(0)
  const [valorTotal, setValorTotal] = useState(0)

  const {totalTemp, quantidadeTemp} = useMemo(() => {

    return carrinho.reduce((acumulador, produto) => (
        {
            //1° parâmetro, função redutora
            quantidadeTemp: acumulador.quantidadeTemp + produto.quantidade,
            totalTemp: acumulador.totalTemp + produto.preco * produto.quantidade

        }),
        {
            //2° parâmetro valores inciais
            quantidadeTemp: 0,
            totalTemp: 0,
        }
    )

}, [carrinho])

useEffect(() => {
    
    setQuantidade(quantidadeTemp)
    setValorTotal(totalTemp)

}, [quantidadeTemp, totalTemp])

  return (
    <CarrinhoContext.Provider 
      value={{ 
        carrinho, 
        dispatch,
        quantidade,
        valorTotal,
      }}
    >
      { children }
    </CarrinhoContext.Provider>
  )
}
