import { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Todo from './Todo';
import ListGroup from 'react-bootstrap/ListGroup';
import { useId } from "react-id-generator";

function Input() {
    const [todoText, setTodoText] = useState("");
    const [todos, setTodos] = useState([]);
    const [filterTodo, setFilterTodo] = useState([])
    const [dropdownValue, setDropdownValue] = useState("All")
    const [status, setStatus] = useState("")


    //ADD TODO
    const addNewTodo = () => {
        if(todoText !== ""){
            setTodos([...todos, {
                id: new Date().getTime(),
                todo: todoText,
                complete: false
            }])
        }
  
        setTodoText("")
    }

    //DELETE TODO
    const handleDeleteTodo = (id) => {
        const filteredArray = todos.filter((item) => {
            return item.id !== id;
        })
        setTodos(filteredArray)
    }

    //COMPLETE TODO
    const handleComplete = (id) => {
        todos.map((item) => {
            if (item.id === id) {
                item.complete = !item.complete
            }
            setTodos([...todos])
            return todos;
        })
    }

    //FILTER TODO

    const saveLocalTodos = () => {
        localStorage.setItem("todos", JSON.stringify(todos));
    };

    const getLocalTodos = () => {
        if (localStorage.getItem("todos") === null) {
            localStorage.setItem("todos", JSON.stringify([]));
        } else {
            let localTodos = JSON.parse(localStorage.getItem("todos"));
            setTodos(localTodos);
        }
    };

    const handleFilterTodos = () => {
        if (status === "Completed") {
            setFilterTodo(todos.filter((todo) => todo.complete === true));
        } else if (status === "Uncompleted") {
            setFilterTodo(todos.filter((todo) => todo.complete === false));
        } else {
            setFilterTodo(todos);
        }
    }


useEffect(() => {
    getLocalTodos();
}, []);

useEffect(() => {
    handleFilterTodos();
    saveLocalTodos();
}, [todos, status]);


return (
    <Container>
        <div className="justify-content-center d-flex ">
            <div className='me-3 w-50'>
                <InputGroup className="mb-3">
                    <Form.Control
                        value={todoText}
                        onChange={(e) => { setTodoText(e.target.value) }}
                        placeholder="Add new todo"
                        aria-label="Recipient's username"
                        aria-describedby="Add new todo"
                    />
                    <Button onClick={addNewTodo} variant="outline-secondary" id="button-addon2">
                        Add
                    </Button>
                </InputGroup>
            </div>
            <div>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {dropdownValue}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => setStatus("All")} >All</Dropdown.Item>
                        <Dropdown.Item onClick={() => setStatus("Completed")} >Completed</Dropdown.Item>
                        <Dropdown.Item onClick={() => setStatus("Uncompleted")}>Uncompleted</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
        <div className='d-flex justify-content-center '>
            <Todo todoText={todoText} todos={todos} handleDeleteTodo={handleDeleteTodo} handleComplete={handleComplete} dropdownValue={dropdownValue} filterTodo={filterTodo} />
        </div>
    </Container>
)
}

export default Input