import { useState } from 'react'



function App() {
    const [id, setId] = useState("");
    const [tarefa, setTarefa] = useState ("");
    const [categoria, setCategoria] = useState ("");

    const [listaTarefa, setListaTarefa] = useState ([]);

    function addItem(event) {
        event.preventDefault();

        if (tarefa === "" || categoria === "") {
            alert("preencha todos os campos");
            return;
        }

        setListaTarefa([
            ...listaTarefa,
            {
              id: Date.now(),
              tarefa: tarefa,
              categoria: categoria,
            },
          ]);
      
          setTarefa("");
          setCategoria("");
          setId("");
    
    }

    function apagarItem (id) {
        const result = listaTarefa.filter((item) => item.id !== id);
        setListaTarefa(result);

    }

    function preencherEstados(item) {
        
        setId(item.id);
        setTarefa(item.tarefa);
        setCategoria(item.categoria);
        
      }

    function editarItem(event) {
        event.preventDefault();
    
        const copyListaTarefa = [...listaTarefa];
    
        const index = copyListaTarefa.findIndex(
          (tarefa) => tarefa.id === id
        );
    
        copyListaTarefa[index].tarefa = tarefa;
        copyListaTarefa[index].categoria = categoria;
    
        setListaTarefa(copyListaTarefa);
      }

      

    return(

       

    <div className='app'>
        
        
        <header> <h1>Lista de tarefas</h1></header>

        <form className ="formulario" onSubmit={id ? editarItem : addItem}>
            
            
            
            <input
            placeholder="Tarefa"
            value = {tarefa}
            onChange = {(event) => setTarefa (event.target.value)}
            
            />
           {/* { console.log(tarefa)}; */}
            <select
            value = {categoria}
            onChange = {(event) => setCategoria (event.target.value)}
            >
            <option value="">selecione a categoria</option>
                <option value="lazer">lazer</option>
                <option value="trabalho">trabalho</option>
                <option value="prioridade">prioridade</option>
                <option value="outros">outros</option>
            </select>
            <br />
            <br />

            <input type = "submit" value = {id ? "Salvar" : "Adcionar tarefa"} ></input>
        
        </form>

        {listaTarefa.length > 0 ? (
        
        
    <div className='painel'>
        <ul className='listaTarefas'>
            {listaTarefa.map((item) => (
            <li className='item'>

            
            <p>tarefa: {item.tarefa}</p> 
            <p> categoria: {item.categoria}</p>
            
            <button onClick={() => apagarItem(item.id)}>Deletar Tarefa</button>
            <button onClick={() => preencherEstados(item)}>editar Tarefa</button>
            
            </li>
            
            
            ))}
        </ul> 
    </div>    
        ) : (
             <h2>nenhuma tarefa.</h2>
        )}
    </div>
    )
}

export default App;

