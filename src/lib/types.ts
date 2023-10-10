
export type kanbanItem = {
    columnName: string
    columnId: number
    id: number
    content: string
}

export type kanbanColumn = {
    name: string
    id: number
    color: string
    items: Array<kanbanItem>
}
