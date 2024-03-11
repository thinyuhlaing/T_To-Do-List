import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Note {
  label: string;
  time: string;
}

interface NoteSlice {
  notes: Note[];
  isLoading: boolean;
  error: Error | null;
}

const initialState: NoteSlice = {
  notes: [],
  isLoading: false,
  error: null,
};

const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes.push(action.payload);
    },
  },
});
export const { addNote } = noteSlice.actions;
export default noteSlice.reducer;
