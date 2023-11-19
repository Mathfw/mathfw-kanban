import { get, writable } from "svelte/store";
import type { kanbanColumn, kanbanItem } from "./types";

function createKanban() {
  const { subscribe, set, update } = writable<Array<kanbanColumn>>([]);

  const setLocalStorange = () => {
    let exists = localStorage.getItem("kanban");
    if (!exists) {
      subscribe((val) => {
        localStorage.setItem("kanban", JSON.stringify(val));
      });
    }
  };

  const getLocalStorange = () => {
    let json = localStorage.getItem("kanban")!;
    let parsed = JSON.parse(json);
    set(parsed);
  };

  const getLastColumnID = () => {
    return get(kanban)[get(kanban).length].id || 0;
  };

  const getColumnName = (columnID: number) => {
    return get(kanban)[columnID].name;
  };

  const getLastItemID = (columnID: number) => {
    return (
      get(kanban)[columnID].items[get(kanban)[columnID].items.length].id || 0
    );
  };

  const createColumn = (name: string, color?: string) => {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString()}`;
    update((n) => {
      n.push({
        name: name,
        id: getLastColumnID() + 1,
        color: color ? color : randomColor,
        items: [],
      });
      return n;
    });
  };

  const pushColumn = (column: kanbanColumn) => {
    update((n) => {
      n.push(column);
      return n;
    });
  };

  const createItem = (columnID: number, content: string) => {
    update((n) => {
      n[columnID].items.push({
        columnId: columnID,
        columnName: getColumnName(columnID),
        id: getLastItemID(columnID) + 1,
        content: content,
      });
      return n;
    });
  };

  const pushItem = (columnID: number, item: kanbanItem) => {
    update((n) => {
      n[columnID].items.push(item);
      return n;
    });
  };

  const removeItem = (columnID: number, itemID: number) => {
    update((n) => {
      n[columnID].items.splice(itemID, 1);
      return n;
    });
  };

  return {
    subscribe,
    setLocalStorange,
    getLocalStorange,
    createColumn,
    createItem,
    pushColumn,
    pushItem,
    removeItem,
  };
}

export const kanban = createKanban();
