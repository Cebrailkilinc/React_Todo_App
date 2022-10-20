import { useState } from 'react'
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
    const [dropdownValue, setDropdownValue] = useState("All")
    const [completedTodos, setCompleteTodos] = useState([])
    const [uncompletedTodos, setUncompleteTodos] = useState([])


    const addNewTodo = () => {
        setTodos([...todos, {
            id: new Date().getTime(),
            todo: todoText,
            complete: false
        }])
        setTodoText("")
    }

    const handleDeleteTodo = (id) => {
        const filteredArray = todos.filter((item) => {
            return item.id !== id;
        })
        setTodos(filteredArray)
    }

    const handleComplete = (id) => {
        todos.map((item) => {
            if (item.id === id) {
                item.complete = !item.complete
            }
            setTodos([...todos])
            return todos;
        })
    }

    const handleFilterTodos = (a) => {
        const arr1 = [];
        const arr2 = [];
        todos.find((item) => {
            if (a === "Completed" && item.complete === true) {
                setDropdownValue("Complete")
                const result = todos.filter((item) => {
                    return item.complete === true
                })
                setTodos(result)


            } else if (a === "Uncompleted" && item.complete === false) {
                setDropdownValue("Uncomplete")
                const result = todos.filter((item) => {
                    return item.complete !== true
                })
                setTodos(result)

            } else if (a === "All") {
                setDropdownValue("All")
                console.log(todos)

            }
        })
    };





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
                            <Dropdown.Item onClick={() => handleFilterTodos("All")} >All</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleFilterTodos("Completed")} >Completed</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleFilterTodos("Uncompleted")}>Uncompleted</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
            <div className='d-flex justify-content-center '>
                <Todo todoText={todoText} todos={todos} handleDeleteTodo={handleDeleteTodo} handleComplete={handleComplete} dropdownValue={dropdownValue} />
            </div>
        </Container>
    )
}

export default Input