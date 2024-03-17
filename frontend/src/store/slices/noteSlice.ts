import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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

export const createNote = createAsyncThunk(
  "note/createNote",
  async (newNote: Note) => {
    const response = await fetch("http://localhost:5000/", {
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(newNote),
    });
  }
);

const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes.push(action.payload);
    },
    removeNote: (state, action: PayloadAction<Note>) => {},
  },
});
export const { addNote } = noteSlice.actions;
export default noteSlice.reducer;
