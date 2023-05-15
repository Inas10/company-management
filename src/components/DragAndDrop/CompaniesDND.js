import React, { useState } from "react";
import styled from "@emotion/styled";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import CompanyCard from "./CompanyCard";
import { Box } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

const Container = styled.div`
  display: flex;
`;

const TaskList = styled.div`
  min-height: 100px;
  display: flex;
  flex-direction: column;
  background: #1976d2;
  min-width: 341px;
  border-radius: 5px;
  padding: 15px 15px;
  margin-right: 15px;
`;

const TaskColumnStyles = styled.div`
  margin: 8px;
  display: flex;
  width: 100%;
  min-height: 80vh;
`;

const CompaniesDND = ({ companies }) => {
  const companyData = {
    [uuidv4()]: {
      title: "Active",
      items: companies,
    },
    [uuidv4()]: {
      title: "Inactive",
      items: [],
    },
  };
  const [columns, setColumns] = useState(companyData);
  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };
  return (
    <DragDropContext
      onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
    >
      <Container>
        <TaskColumnStyles>
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <Droppable key={columnId} droppableId={columnId}>
                {(provided, snapshot) => (
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <TaskList
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {column &&
                        column.items &&
                        column.items.length > 0 &&
                        column.items.map((item, itemIndex) => (
                          <CompanyCard
                            key={itemIndex + "column" + index}
                            item={item}
                            index={itemIndex}
                          />
                        ))}
                      {provided.placeholder}
                    </TaskList>
                  </Box>
                )}
              </Droppable>
            );
          })}
        </TaskColumnStyles>
      </Container>
    </DragDropContext>
  );
};

export default CompaniesDND;
