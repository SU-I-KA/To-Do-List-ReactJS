import React, {useEffect, useState} from 'react';
import ListItem from './ListItem';
import './App.css';


const storedList = ()=>{
  let list = localStorage.getItem('todoList')
  if(list){
    return JSON.parse(localStorage.getItem('todoList'))
  } else {
    return []
  }
}

function App() {
  const [todoValue, setTodoValue] = useState('');
  const [todoList, setTodoList] = useState(storedList());
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState('');
  const [doneValue, setDoneValue] = useState(false);
  const [alert, setAlert] = useState({status:'', msg:'', active:false})

  const handleSubmit = (e)=>{
    e.preventDefault();
    if(!todoValue){
      setAlert({status:'danger', msg:'please enter a value', active: true})
      return
    }
    if(!isEdit){
      const listObject = {
        id : new Date(),
        value : todoValue,
        done: false
      };
      setTodoList([...todoList, listObject])
      setTodoValue('');
      setAlert({status:'success', msg:'item added to the list', active: true})
    } 
    else{
      let seplist = todoList.filter((item)=> item.id !== editId);
      const listObject = {
        id : editId,
        value : todoValue,
        done: doneValue
      };
      seplist.push(listObject);
      seplist.sort((a, b) => new Date(a.id) - new Date(b.id))
      setTodoList(seplist)
      setTodoValue('');
      setIsEdit(false);
      setEditId('');
      setDoneValue(false);
      setAlert({status:'success', msg:'value changed', active: true})

    }
    
  }

  useEffect(()=>{
    const hide = setTimeout(()=>setAlert({status:'', msg:'', active:false}), 2000);
    return ()=> clearTimeout(hide)
  }, [alert])

  const deleteItem = (itemId)=>{
    const newList = todoList.filter((item)=> item.id !== itemId);
    setTodoList(newList);
    setIsEdit(false);
    setTodoValue('')
    setAlert({status:'danger', msg:'item removed', active: true})
  }

  const editItem = (item)=>{
    setIsEdit(true);
    setTodoValue(item.value);
    setEditId(item.id);
    setDoneValue(item.done);
  }

  const clearAll = ()=>{
    setTodoList([]);
    setIsEdit(false);
    setTodoValue('');
    setAlert({status:'danger', msg:'empty list', active: true})
  }

  useEffect(()=>{
    localStorage.setItem('todoList', JSON.stringify(todoList))
  },[todoList])

  return (
    <div className='container'>
      {alert.active && 
        <div className={` alert ${alert.status}`}>{alert.msg}</div>
      }
      <div className='title'>
        <h1>to do list</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <input type='text' value={todoValue} className='entryField' placeholder='e.g. do landury' onChange={(e)=>setTodoValue(e.target.value)}/>
        <input type='submit' className='submitBtn' value={`${isEdit?'edit':'submit'}`} />
      </form>
      {todoList.length > 0 &&
      <>
        <div className='toDoList'>
          <ul>
            {
              todoList.map((item, index)=>{
                return(
                  <ListItem key={index} item={item} deleteItem={deleteItem} editItem={editItem} setTodoList={setTodoList} todoList={todoList}/>
                )
              })
            }
          </ul>
        </div>
      
        <button onClick={clearAll} className='clearAllBtn'>clear items</button>
      </>
      }
    </div>
    
  );
}

export default App;
