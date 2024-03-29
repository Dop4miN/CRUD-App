import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import itemService from "./itemService";

const initialState = {
  items: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// create new item
export const addItem = createAsyncThunk(
  "items/create",
  async (itemData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await itemService.addItem(itemData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get items
export const getItems = createAsyncThunk(
  "items/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await itemService.getItems(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// delete item
export const deleteItem = createAsyncThunk(
  "items/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await itemService.deleteItem(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.items.push(action.payload);
      })
      .addCase(addItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.items = action.payload;
      })
      .addCase(getItems.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.items = state.items.filter(
          (item) => item._id !== action.payload.id
        );
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = itemSlice.actions;
export default itemSlice.reducer;
