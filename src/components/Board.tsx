"use client";
import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

function Board() {
  return (
    <DragDropContext>
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided) => (
          <div className="">{/* rendering all the columns */}</div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Board;
