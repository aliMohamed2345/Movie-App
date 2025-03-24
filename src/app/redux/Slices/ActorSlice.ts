import { createSlice } from "@reduxjs/toolkit";

interface initialStateProps {
  id: number;
  name: string;
  biography: string;
  birthday: string;
  deathday: string | null;
  known_for_department: `Acting` | `Directing`;
  place_of_birth: string;
  gender: 0 | 1 | 2 | 3;
}
const initialState: initialStateProps = {
  id: 0,
  name: ``,
  biography: ``,
  known_for_department: `Acting`,
  deathday: null,
  birthday: ``,
  place_of_birth: ``,
  gender: 0,
};

const ActorSlice = createSlice({
  name: `Actor`,
  initialState,
  reducers: {
    setActorId: (state, action) => {
      state.id = action.payload;
    },
    setActorName: (state, action) => {
      state.name = action.payload;
    },
    setActorBiography: (state, action) => {
      state.biography = action.payload;
    },
    setActorDepartment: (state, action) => {
      state.known_for_department = action.payload;
    },
    setActorBirthDay: (state, action) => {
      state.birthday = action.payload;
    },
    setActorDeathDay: (state, action) => {
      state.deathday = action.payload;
    },
    setActorPlaceOfBirth: (state, action) => {
      state.place_of_birth = action.payload;
    },
    setActorGender: (state, action) => {
      state.gender = action.payload;
    },
  },
});
export default ActorSlice.reducer;
export const {
  setActorId,
  setActorBiography,
  setActorBirthDay,
  setActorDeathDay,
  setActorDepartment,
  setActorName,
  setActorPlaceOfBirth,
  setActorGender
} = ActorSlice.actions;
