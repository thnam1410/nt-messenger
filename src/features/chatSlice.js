import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    roomId: null,
    roomName: null,
  },
  reducers: {
    setRoom: (state, action) => {
      state.roomId = action.payload.roomId;
      state.roomName = action.payload.roomName;
    },
  },
});

export const { setRoom } = chatSlice.actions;

export const selectRoomName = (state) => state.chat.roomName;
export const selectRoomId = (state) => state.chat.roomId;

export default chatSlice.reducer;
