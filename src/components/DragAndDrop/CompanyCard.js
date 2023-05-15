import React from "react";
import { Draggable } from "@hello-pangea/dnd";
import styled from "@emotion/styled";

const TaskInformation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 15px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  margin-top: 6px;
  margin-bottom: 6px;
  min-height: 106px;
  border-radius: 5px;
  max-width: 311px;
  background: white;

  .secondary-details {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-size: 12px;
    font-weight: 400px;
    color: #7d7d7d;
  }
`;

const CompanyCard = ({ item, index }) => {
  return (
    <Draggable key={item.companyId} draggableId={item.companyId} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <TaskInformation>
            <p>{item.companyName}</p>
            <div className="secondary-details">
              <p>
                <span>Id: {item.companyId}</span>
              </p>
            </div>
          </TaskInformation>
        </div>
      )}
    </Draggable>
  );
};

export default CompanyCard;
