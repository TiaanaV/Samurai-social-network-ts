import React from "react";
import { useState } from "react";
import classes from "./Paginator.module.css";
import cn from "classnames";

type PropsType = {
  totalItemCount:number
  pageSize:number
  currentPage:number
  onPageChanged: (currentPage:number) => void
  portionSize?: number
}

export const Paginator: React.FC<PropsType> = ({
  totalItemCount,
  pageSize,
  currentPage,
  onPageChanged,
  portionSize = 10,
}) => {
  let pagesCount = Math.ceil(totalItemCount / pageSize);
  let pages:Array<number> = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  let portionCount = Math.ceil(pagesCount / portionSize);
  let [portionNumber, setPortionNumber] = useState<number>(1);
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  let rightPortionPageNumber = portionNumber * portionSize;

  return (
    <div className={classes.pagination}>
      {portionNumber > 1 && (
        <button
          className={classes.button}
          onClick={() => {
            setPortionNumber(portionNumber - 1);
          }}
        >
          PREV
        </button>
      )}
      {pages
        .filter(
          (p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber
        )
        .map((p) => {
          return (
            <span
              className={cn(
                {
                  [classes.selectedPage]: currentPage === p,
                },
                classes.pageNumbers
              )}
              key={p}
              onClick={() => {
                onPageChanged(p);
              }}
            >
              {p}
            </span>
          );
        })}
      {portionCount > portionNumber && (
        <button
          className={classes.button}
          onClick={() => {
            setPortionNumber(portionNumber + 1);
          }}
        >
          NEXT
        </button>
      )}
    </div>
  );
};

