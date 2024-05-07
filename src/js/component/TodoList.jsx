import React, { useState } from 'react'
import { useEffect } from 'react'

const TodoList = () => {
    const [list, setList] = useState("");
    const [toDo, setToDo] = useState([{}]);
    const crearUsuario = async () => {
        try {
            const response = await fetch("https://playground.4geeks.com/todo/users/aratarjat", {
                method: "POST",
                body: JSON.stringify([]),
                headers: { "Content-Type": "application/json" }
            })
            const data = await response.json()
            console.log(data)

        } catch (error) {
            console.log(error)
        }
    }
    const obtnenerTareas = async () => {
        try {
            const response = await fetch("https://playground.4geeks.com/todo/users/aratarjat")
            const data = await response.json()
            console.log(data.todos)
            setToDo(data.todos)
        } catch (error) {
            console.log(error)
        }
    }

    const guardarTareas = async () => {
        const tareas = {
            label: list,
            is_done: false
        }
        try {
            await fetch("https://playground.4geeks.com/todo/todos/aratarjat", {
                method: "POST",
                body: JSON.stringify(tareas),
                headers: { "Content-Type": "application/json" }
            })
            obtnenerTareas()
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        crearUsuario()
        obtnenerTareas()
    }, []) // se ejecuta una solo vez, posterior a cargar el componente. 



    const funcionDeBorrado = async (e, value) => {
        e.preventDefault()
        console.log(value)
        try {
            await fetch("https://playground.4geeks.com/todo/todos/" + value, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
            })
            obtnenerTareas()
        } catch (error) {
            console.log(error)
        }

        //const copiaToDo = [...toDo]
        //let arregloFiltrado = copiaToDo.filter((tarea) => tarea.value !== value)
        //console.log("este es tu arreglo despues de borrado", arregloFiltrado)
        //setToDo(arregloFiltrado)
    }
    return (
        <div>
            <ul>
                <input type="text"
                    onChange={(e) => {
                        setList(e.target.value)
                    }}

                    value={list}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            guardarTareas()
                            // setToDo([...toDo, { "label": list, "done": false }])
                            setList(" ")
                            //console.log(toDo)
                        }
                    }
                    }
                    placeholder='things to do' />
                {toDo.map((item, index) =>

                    <li id={index} key={index}>
                        {item.label}
                        <i className="fa-solid fa-x"
                            onClick={(event) => funcionDeBorrado(event, item.id)}>
                        </i>
                    </li>

                )}
            </ul>
            <div>{toDo.length} task</div>
        </div>
    )
}

export default TodoList