import React from "react";

type Props<T> = {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string | number;
};

function List<T>({ items, renderItem, keyExtractor }: Props<T>) {
  console.log("Hello")
  return (
    <ul>
      {items.map((item) => (
        <li key={keyExtractor(item)}>
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}

export default List;