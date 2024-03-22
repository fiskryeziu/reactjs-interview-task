export type TCategory = {
    id: string
    name: string
    notes: TNote[]

}

export type TNote = {
    id: string
    title: string
    text: string
}