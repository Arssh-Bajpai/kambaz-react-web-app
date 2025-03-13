import { useState } from "react";
import { useSelector } from "react-redux";
import { ListGroup, Button } from "react-bootstrap";
import VariablesAndConstants from "./VariablesAndConstants";
import VariableTypes from "./VariableTypes";
import BooleanVariables from "./BooleanVariables";
import IfElse from "./IfElse";
import TernaryOperator from "./TernaryOperator";
import ConditionalOutputIfElse from "./ConditionalOutputIfElse";
import ConditionalOutputInline from "./ConditionalOutputInline";
import LegacyFunctions from "./LegacyFunctions";
import ArrowFunctions from "./ArrowFunctions";
import ImpliedReturn from "./ImpliedReturn";
import TemplateLiterals from "./TemplateLiterals";
import SimpleArrays from "./SimpleArrays";
import ArrayIndexAndLength from "./ArrayIndexAndLength";
import AddingAndRemovingToFromArrays from "./AddingAndRemovingToFromArrays";
import ForLoops from "./ForLoops";
import MapFunction from "./MapFunction";
import FindFunction from "./FindFunctions";
import FindIndex from "./FindIndex";
import FilterFunction from "./FilterFunction";
import JsonStringify from "./JsonStringify";
import House from "./House";
import TodoList from "./todos/TodoList";

export default function Lab3() {
  console.log("Hello World!");

  // ✅ State to track which section is active
  const [activeSection, setActiveSection] = useState<"react" | "node">("react");

  // ✅ Select 'todos' from Redux
  const todos = useSelector((state: any) => state.todosReducer.todos);

  return (
    <div id="wd-lab3">
      <h3>Lab 3</h3>

      {/* ✅ Buttons to switch between sections */}
      <Button variant={activeSection === "react" ? "primary" : "outline-primary"} onClick={() => setActiveSection("react")}>
        Learn React
      </Button>
      <Button variant={activeSection === "node" ? "primary" : "outline-primary"} onClick={() => setActiveSection("node")}>
        Learn Node
      </Button>

      <hr />

      {activeSection === "react" && (
        <ListGroup>
          {todos.map((todo: any) => (
            <ListGroup.Item key={todo.id}>{todo.title}</ListGroup.Item>
          ))}
        </ListGroup>
      )}

      {activeSection === "node" && (
        <div>
          <VariablesAndConstants />
          <VariableTypes />
          <BooleanVariables />
          <IfElse />
          <TernaryOperator />
          <ConditionalOutputIfElse />
          <ConditionalOutputInline />
          <LegacyFunctions />
          <ArrowFunctions />
          <ImpliedReturn />
          <TemplateLiterals />
          <SimpleArrays />
          <ArrayIndexAndLength />
          <AddingAndRemovingToFromArrays />
          <ForLoops />
          <MapFunction />
          <FindFunction />
          <FindIndex />
          <FilterFunction />
          <JsonStringify />
          <House />
          <TodoList />
        </div>
      )}
    </div>
  );
}
