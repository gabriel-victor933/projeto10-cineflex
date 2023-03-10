import { useState } from "react"

export default function Comprador({ r, i, compradores, setCompradores }) {

    const [nome, setNome] = useState("")
    const [cpf, setCpf] = useState("")

    function handleChange(e) {

        const newCompradores = [...compradores]

        let index = -1


        if (newCompradores.length != 0) {
            index = newCompradores.findIndex((e) => { return e.id == r })
        }


        if (newCompradores)

            if (index >= 0) {

                if (e.target.getAttribute("name") == "name") {
                    setNome(e.target.value)
                    newCompradores[index].nome = e.target.value
                } else if (e.target.getAttribute("name") == "cpf") {
                    setCpf(e.target.value)
                    newCompradores[index].cpf = e.target.value
                }



            } else {

                const newComprador = { id: "", nome: "", cpf: "" }

                newComprador.id = r

                if (e.target.getAttribute("name") == "name") {
                    setNome(e.target.value)
                    newComprador.nome = e.target.value
                } else if (e.target.getAttribute("name") == "cpf") {
                    setCpf(e.target.value)
                    newComprador.cpf = e.target.value
                }

                newCompradores.push(newComprador)
            }

        setCompradores(newCompradores)

    }

    return (
        <div>
            <label htmlFor={`name${r}`}>Nome do Comprador {i + 1}:</label>
            <input required id={`name${r}`} name={"name"} data-test="client-name" type="text" value={nome} placeholder="Digite seu nome..." onChange={(e) => handleChange(e)} />
            <label htmlFor={`cpf${r}`}>CPF do Comprador {i + 1}:</label>
            <input required id={`cpf${r}`} name={"cpf"} data-test="client-cpf" type="number" value={cpf} placeholder="Digite seu CPF..." onChange={(e) => handleChange(e)} />
        </div>
    )
}