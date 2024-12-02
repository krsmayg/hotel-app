import { useEffect, useState } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getCabins } from "../services/apiCabins";

import CabinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import AddCabin from "../features/cabins/Addcabin";
import styled from "styled-components";
import CabinTableOperations from '../features/cabins/CabinTableOperations';

const StyledComponent = styled.div`
  width: 0 auto;
  height: 1000px;

  background-color: #fadfdf;
`;
function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperations /> 
      </Row>
      <Row>
        <CabinTable />
        <AddCabin />
      </Row>
      <StyledComponent></StyledComponent>
    </>
  );
}

export default Cabins;
