import React from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  clearFilter,
  filterByDelivery,
  filterByRating,
  filterByStock,
  sortByPrice,
} from "../features/Products/FilterSlice";
import { Rating } from "./Rating";

export const Filter = () => {
  const { byStock, byFastDelivery, byRating, searchQuery, sort } =
    useAppSelector((state) => state.filters);
  const Filterdispatch = useAppDispatch();

  return (
    <>
      <div className="filters">
        <span className="title">Filter Products</span>
        <span>
          <Form.Check
            inline
            label="Ascending"
            name="group1"
            type="radio"
            id={`inline-1`}
            onChange={() => Filterdispatch(sortByPrice({ sort: "lowToHigh" }))}
            checked={sort === "lowToHigh" ? true : false}
          />
        </span>
        <span>
          <Form.Check
            inline
            label="Descending"
            name="group1"
            type="radio"
            id={`inline-2`}
            onChange={() => Filterdispatch(sortByPrice({ sort: "highToLow" }))}
            checked={sort === "highToLow" ? true : false}
          />
        </span>
        <span>
          <Form.Check
            inline
            label="Include Out of Stock"
            name="group1"
            type="checkbox"
            id={`inline-3`}
            onChange={() => Filterdispatch(filterByStock(!byStock))}
            checked={byStock}
          />
        </span>
        <span>
          <Form.Check
            inline
            label="Fast Delivery Only"
            name="group1"
            type="checkbox"
            id={`inline-4`}
            onChange={() => Filterdispatch(filterByDelivery(!byFastDelivery))}
            checked={byFastDelivery}
          />
        </span>
        <span>
          <label style={{ paddingRight: 10 }}>Rating: </label>
          <Rating
            rating={byRating}
            onClick={(i: number) => {
              return Filterdispatch(filterByRating(i + 1));
            }}
            style={{ cursor: "pointer" }}
          />
        </span>
        <Button
          variant="light"
          onClick={() =>
            Filterdispatch(
              clearFilter({
                byStock: false,
                byFastDelivery: false,
                byRating: 0,
              })
            )
          }>
          Clear Filters
        </Button>
      </div>
    </>
  );
};
