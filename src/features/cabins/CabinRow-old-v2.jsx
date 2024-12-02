import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import Button from "../../ui/Button";
import { useEffect, useState } from "react";
import CreateCabinForm from "./CreateCabinForm-v2";
import useDeleteCabin from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { Menus } from "../../ui/Menus";
const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;
const ButtonList = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 5px;
`;
function CabinRow({ cabin }) {
  const {
    description,
    name,
    image,
    discount,
    regularPrice,
    maxCapacity,
    id: cabinId,
  } = cabin;

  const { deleteCabin, isDeleting } = useDeleteCabin();
  const { createCabin, isAdding } = useCreateCabin();
  function handleDublicate() {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      description,
      regularPrice,
      discount,
      image,
    });
  }

  return (
    <>
      <Img src={image} alt={description} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity}</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <Discount>&mdash;</Discount>
      )}
      <ButtonList>
        <Button onClick={handleDublicate}>
          <HiSquare2Stack />
        </Button>
        <Modal>
          <Modal.Open opens="edit">
            <Button>
              <HiPencil />
            </Button>
          </Modal.Open>
          <Modal.Window name="edit">
            <CreateCabinForm cabinToEdit={cabin} />
          </Modal.Window>
          <Modal.Open opens="delete">
            <Button>
              <HiTrash />
            </Button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="cabins"
              disabled={isDeleting}
              onConfirm={() => ConfirmDelete(cabinId)}
            />
          </Modal.Window>
        </Modal>
        <Menus.Menu>
          <Menus.Toogle id={cabinId} />
          <Menus.List id={cabinId}>
            <Menus.Button icon={<HiSquare2Stack />} onClick={handleDublicate}>
              Dublicate
            </Menus.Button>
            <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
            <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
          </Menus.List>
        </Menus.Menu>
      </ButtonList>
    </>
  );
}

export default CabinRow;
